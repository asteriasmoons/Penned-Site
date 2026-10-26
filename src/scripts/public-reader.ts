const root = document.querySelector<HTMLBodyElement>("body[data-publication]");
if (root) initializeReader(root);

function initializeReader(root: HTMLBodyElement) {
  const api = root.dataset.api!;
  const contents = document.querySelector<HTMLElement>("#reader-toc");
  const shade = document.querySelector<HTMLElement>("[data-drawer-shade]");
  const search = document.querySelector<HTMLElement>("#reader-search")!;
  const input = search.querySelector<HTMLInputElement>("[data-search-input]")!;
  const output = search.querySelector<HTMLOutputElement>("[data-search-count]")!;
  const openSearch = document.querySelector<HTMLButtonElement>("[data-open-search]")!;
  const openContents = document.querySelector<HTMLButtonElement>("[data-open-contents]");
  let unavailable = false;
  const cleanup: Array<() => void> = [];

  // Native wide/large cards scale their entire fixed-size face with the paper.
  if ("ResizeObserver" in window) {
    const observer = new ResizeObserver(entries => {
      for (const entry of entries) {
        const card = entry.target as HTMLElement;
        card.style.setProperty("--card-scale", String(entry.contentRect.width / Number(card.dataset.cardWidth)));
      }
    });
    document.querySelectorAll<HTMLElement>(".reader-page-card").forEach(card => observer.observe(card));
    cleanup.push(() => observer.disconnect());
  }

  // Native details retains ordinary selection, scrolling and keyboard behavior.
  for (const original of document.querySelectorAll<HTMLElement>("[data-reader-toggle]")) {
    const details = document.createElement("details"), summary = document.createElement("summary"), body = document.createElement("div");
    details.className = "reader-toggle"; details.open = original.dataset.readerToggle !== "false";
    for (const attribute of [...original.attributes]) if (attribute.name !== "class") details.setAttribute(attribute.name, attribute.value);
    const chevron = document.querySelector<HTMLElement>("[data-search-next] .reader-icon")?.cloneNode(true);
    if (chevron) summary.append(chevron);
    if (original.firstElementChild) summary.append(original.firstElementChild);
    while (original.firstChild) body.append(original.firstChild);
    body.className = "reader-toggle-body"; details.append(summary, body); original.replaceWith(details);
  }
  function setContents(open: boolean) {
    contents?.classList.toggle("is-open", open); if (shade) shade.hidden = !open;
    openContents?.setAttribute("aria-expanded", String(open));
  }
  openContents?.addEventListener("click", () => setContents(!contents?.classList.contains("is-open")));
  document.querySelector("[data-close-contents]")?.addEventListener("click", () => { setContents(false); openContents?.focus(); });
  shade?.addEventListener("click", () => setContents(false));
  const reveal = (element: Element) => {
    for (let parent = element.parentElement; parent; parent = parent.parentElement) if (parent instanceof HTMLDetailsElement) parent.open = true;
  };
  for (const link of document.querySelectorAll<HTMLAnchorElement>("[data-toc-link]")) link.addEventListener("click", () => {
    const target = document.getElementById(link.hash.slice(1)); if (target) reveal(target);
    setContents(false);
  });
  const headings = document.querySelectorAll<HTMLElement>(".reader-content h1[id],.reader-content h2[id],.reader-content h3[id],.reader-content h4[id],.reader-content h5[id],.reader-content h6[id]");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
      const active = entries.filter(entry => entry.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
      if (!active) return;
      for (const link of document.querySelectorAll<HTMLAnchorElement>("[data-toc-link]")) {
        if (link.hash === "#" + active.target.id) link.setAttribute("aria-current", "location"); else link.removeAttribute("aria-current");
      }
    }, { rootMargin: "-80px 0px -65% 0px" });
    headings.forEach(heading => observer.observe(heading)); cleanup.push(() => observer.disconnect());
  }

  type Match = { range: Range; element: Element };
  let matches: Match[] = [], current = -1;
  const highlights = (CSS as typeof CSS & { highlights?: Map<string, unknown> }).highlights;
  const HighlightClass = (window as unknown as { Highlight?: new (...ranges: Range[]) => unknown }).Highlight;
  function clearSearch() {
    highlights?.delete("penned-search"); highlights?.delete("penned-current");
    for (const mark of document.querySelectorAll("mark[data-reader-search]")) { const parent = mark.parentNode; mark.replaceWith(...mark.childNodes); parent?.normalize(); }
    matches = []; current = -1;
  }
  function updateMatches() {
    clearSearch(); const query = input.value.trim();
    if (!query) { output.value = ""; updateSearchButtons(); return; }
    const nodes: Array<{ node: Text; from: number; to: number }> = [];
    let source = "", previousBlock: Element | null = null;
    for (const content of document.querySelectorAll(".reader-document-heading,.reader-content")) {
      const walker = document.createTreeWalker(content, NodeFilter.SHOW_TEXT, { acceptNode(node) {
        return node.parentElement?.closest("script,style,audio,video,button,select,textarea,[aria-hidden=true]") ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT;
      } });
      while (walker.nextNode()) {
        const node = walker.currentNode as Text, block = node.parentElement?.closest("p,h1,h2,h3,h4,h5,h6,li,td,th,.reader-page,.reader-collection-card,.reader-property") || node.parentElement;
        if (previousBlock !== block) source += "\n";
        previousBlock = block; const from = source.length; source += node.data; nodes.push({ node, from, to: source.length });
      }
      source += "\n";
    }
    const expression = new RegExp(query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "giu");
    for (const result of source.matchAll(expression)) {
      if (matches.length >= 1000) break;
      const from = result.index!, to = from + result[0].length;
      const first = nodes.find(item => item.to > from), last = nodes.find(item => item.to >= to);
      if (!first || !last) continue;
      const range = document.createRange(); range.setStart(first.node, from - first.from); range.setEnd(last.node, to - last.from);
      matches.push({ range, element: first.node.parentElement! });
    }
    if (highlights && HighlightClass) highlights.set("penned-search", new HighlightClass(...matches.map(match => match.range)));
    else {
      // Wrap each text fragment independently, preserving links and mark hierarchy.
      for (let index = matches.length - 1; index >= 0; index--) {
        const match = matches[index], range = match.range;
        const first = nodes.findIndex(item => item.node === range.startContainer), last = nodes.findIndex(item => item.node === range.endContainer);
        for (let part = last; part >= first; part--) {
          const node = nodes[part].node, from = part === first ? range.startOffset : 0, to = part === last ? range.endOffset : node.length;
          if (to <= from) continue;
          const selected = node.splitText(from); selected.splitText(to - from);
          const mark = document.createElement("mark"); mark.dataset.readerSearch = String(index);
          selected.replaceWith(mark); mark.append(selected); match.element = mark;
        }
      }
    }
    current = matches.length ? 0 : -1; showMatch(false);
  }
  function updateSearchButtons() {
    search.querySelectorAll<HTMLButtonElement>("[data-search-prev],[data-search-next]").forEach(button => { button.disabled = matches.length === 0; });
  }
  function showMatch(scroll = true) {
    updateSearchButtons(); output.value = matches.length ? `${current + 1} of ${matches.length}` : input.value.trim() ? "No results" : "";
    document.querySelectorAll("mark[data-current]").forEach(mark => mark.removeAttribute("data-current"));
    const match = matches[current]; if (!match) return;
    if (highlights && HighlightClass) highlights.set("penned-current", new HighlightClass(match.range));
    else document.querySelectorAll(`mark[data-reader-search="${current}"]`).forEach(mark => mark.setAttribute("data-current", "true"));
    if (scroll) { reveal(match.element); match.element.scrollIntoView({ block: "center", behavior: "auto" }); }
  }
  function moveMatch(delta: number) { if (matches.length) { current = (current + delta + matches.length) % matches.length; showMatch(); } }
  function setSearch(open: boolean) {
    search.hidden = !open; openSearch.setAttribute("aria-expanded", String(open));
    if (open) { setContents(false); input.focus(); input.select(); } else { clearSearch(); input.value = ""; openSearch.focus(); }
  }
  openSearch.addEventListener("click", () => setSearch(Boolean(search.hidden)));
  search.querySelector("[data-close-search]")!.addEventListener("click", () => setSearch(false));
  search.querySelector("[data-search-prev]")!.addEventListener("click", () => moveMatch(-1));
  search.querySelector("[data-search-next]")!.addEventListener("click", () => moveMatch(1));
  input.addEventListener("input", updateMatches);
  input.addEventListener("keydown", event => { if (event.key === "Enter") { event.preventDefault(); moveMatch(event.shiftKey ? -1 : 1); } });
  document.addEventListener("keydown", event => {
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "f" && !unavailable) { event.preventDefault(); setSearch(true); }
    if (event.key === "Escape") { if (!search.hidden) setSearch(false); setContents(false); }
  });

  const dialog = document.querySelector<HTMLDialogElement>("[data-media-dialog]")!;
  const image = dialog.querySelector<HTMLImageElement>("[data-media-image]")!;
  const mediaLinks = [...document.querySelectorAll<HTMLAnchorElement>("[data-reader-image]")];
  const viewport = dialog.querySelector<HTMLElement>(".reader-media-viewport")!;
  let imageIndex = 0, zoom = 1;
  function showImage(index: number) {
    imageIndex = (index + mediaLinks.length) % mediaLinks.length; zoom = 1;
    const link = mediaLinks[imageIndex]; image.src = link.querySelector("img")?.src || link.href; image.alt = link.querySelector("img")?.alt || "Image";
    dialog.querySelector<HTMLElement>("[data-media-name]")!.textContent = image.alt;
    dialog.querySelector<HTMLElement>("[data-media-counter]")!.textContent = `${imageIndex + 1} / ${mediaLinks.length}`;
    dialog.querySelector<HTMLAnchorElement>("[data-media-original]")!.href = link.href;
    updateZoom(); if (!dialog.open) dialog.showModal();
  }
  function updateZoom() {
    viewport.classList.toggle("is-zoomed", zoom > 1); image.style.width = zoom > 1 ? `${image.naturalWidth * zoom}px` : "";
    dialog.querySelector<HTMLButtonElement>("[data-media-zoom-out]")!.disabled = zoom <= 1;
    dialog.querySelector<HTMLButtonElement>("[data-media-zoom-in]")!.disabled = zoom >= 4;
  }
  mediaLinks.forEach((link, index) => link.addEventListener("click", event => { if (!event.metaKey && !event.ctrlKey && !event.shiftKey) { event.preventDefault(); showImage(index); } }));
  dialog.querySelector("[data-media-prev]")!.addEventListener("click", () => showImage(imageIndex - 1));
  dialog.querySelector("[data-media-next]")!.addEventListener("click", () => showImage(imageIndex + 1));
  dialog.querySelector("[data-media-zoom-out]")!.addEventListener("click", () => { zoom = Math.max(1, zoom - .5); updateZoom(); });
  dialog.querySelector("[data-media-zoom-in]")!.addEventListener("click", () => { zoom = Math.min(4, zoom + .5); updateZoom(); });
  dialog.querySelector("[data-media-close]")!.addEventListener("click", () => dialog.close());
  dialog.addEventListener("keydown", event => { if (event.key === "ArrowLeft") showImage(imageIndex - 1); if (event.key === "ArrowRight") showImage(imageIndex + 1); });
  dialog.addEventListener("close", () => { image.removeAttribute("src"); zoom = 1; });
  for (const link of document.querySelectorAll<HTMLAnchorElement>("[data-reader-linked]")) link.addEventListener("click", event => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.defaultPrevented) return;
    const loading = document.querySelector<HTMLElement>("[data-reader-loading]"); if (loading) loading.hidden = false;
  });
  window.addEventListener("pageshow", () => { const loading = document.querySelector<HTMLElement>("[data-reader-loading]"); if (loading) loading.hidden = true; });

  function revoke() {
    if (unavailable) return; unavailable = true;
    clearSearch(); setContents(false); dialog.close();
    document.querySelectorAll<HTMLMediaElement>("audio,video").forEach(media => { media.pause(); media.removeAttribute("src"); media.load(); });
    const main = document.createElement("main"); main.id = "document"; main.className = "reader-state";
    const heading = document.createElement("h1"), message = document.createElement("p");
    heading.textContent = "Document unavailable"; message.textContent = "This link may have been unpublished, expired, or replaced."; main.append(heading, message);
    document.querySelector("[data-reader-layout]")?.replaceWith(main);
    document.querySelector("[data-reader-title]")!.textContent = "";
    document.title = "Document unavailable | Penned"; search.hidden = true; openSearch.hidden = true; if (openContents) openContents.hidden = true;
    document.querySelector<HTMLElement>("[data-network-status]")!.hidden = true;
    document.querySelector<HTMLElement>("[data-reader-loading]")!.hidden = true;
    document.querySelectorAll("[data-reader-file]").forEach(link => link.removeAttribute("href"));
    cleanup.forEach(stop => stop());
  }
  let checking = false;
  let lastInteraction=0, pendingVersion=false, refreshing=false;
  const readingKey="penned-reading-"+root.dataset.publication;
  const touch=()=>{lastInteraction=Date.now();};
  window.addEventListener("scroll",touch,{passive:true});
  document.addEventListener("pointerdown",touch,{passive:true});
  document.addEventListener("keydown",touch);
  function refreshContent(){
    if(!pendingVersion||refreshing||unavailable||document.hidden||Date.now()-lastInteraction<1500||dialog.open||!search.hidden||contents?.classList.contains("is-open")||!getSelection()?.isCollapsed
      ||[...document.querySelectorAll<HTMLMediaElement>("audio,video")].some(media=>!media.paused&&!media.ended))return;
    refreshing=true;
    const candidates=[...document.querySelectorAll<HTMLElement>(".reader-content > *, .reader-document-heading")];
    const block=candidates.find(element=>element.getBoundingClientRect().bottom>70);
    const heading=[...headings].reverse().find(element=>element.getBoundingClientRect().top<innerHeight);
    try{sessionStorage.setItem(readingKey,JSON.stringify({y:scrollY,ratio:scrollY/Math.max(1,document.documentElement.scrollHeight-innerHeight),
      text:block?.textContent?.slice(0,160),index:block?candidates.indexOf(block):-1,offset:block?.getBoundingClientRect().top,heading:heading?.id,headingOffset:heading?.getBoundingClientRect().top,
      toggles:[...document.querySelectorAll<HTMLDetailsElement>("details.reader-toggle")].map(details=>details.open)}));}catch{}
    location.reload();
  }
  const updateTimer=window.setInterval(refreshContent,1000);cleanup.push(()=>window.clearInterval(updateTimer));
  try{
    const saved=sessionStorage.getItem(readingKey);
    if(saved){sessionStorage.removeItem(readingKey);const position=JSON.parse(saved);
      document.querySelectorAll<HTMLDetailsElement>("details.reader-toggle").forEach((details,index)=>{if(typeof position.toggles?.[index]==="boolean")details.open=position.toggles[index];});
      const restore=()=>{
        const candidates=[...document.querySelectorAll<HTMLElement>(".reader-content > *, .reader-document-heading")];
        const block=candidates.filter(element=>element.textContent?.slice(0,160)===position.text).sort((a,b)=>Math.abs(candidates.indexOf(a)-position.index)-Math.abs(candidates.indexOf(b)-position.index))[0];
        const heading=position.heading?document.getElementById(position.heading):null;
        const target=block||heading;
        window.scrollTo(0,target?scrollY+target.getBoundingClientRect().top-(block?position.offset:position.headingOffset):position.ratio*Math.max(1,document.documentElement.scrollHeight-innerHeight));
      };
      void document.fonts.ready.then(()=>requestAnimationFrame(restore));
      window.addEventListener("load",restore,{once:true});
    }
  }catch{}
  async function checkAccess() {
    if (unavailable || checking || document.hidden) return; checking = true;
    const status = document.querySelector<HTMLElement>("[data-network-status]")!;
    try {
      const response = await fetch(api, { cache: "no-store", credentials: "same-origin", referrerPolicy: "no-referrer", signal: AbortSignal.timeout(12000) });
      if (response.status === 404) revoke();
      else if(response.status===401){revoke();location.reload();}
      else if (response.ok) {
        status.hidden=true;const current=await response.json();
        if(Number(current.version)>Number(root.dataset.version)){pendingVersion=true;refreshContent();}
      }
      else throw new Error("Publication verification unavailable");
    } catch { if (!unavailable) { status.textContent = "Connection unavailable. Showing the opened document."; status.hidden = false; } }
    finally { checking = false; }
  }
  const interval = window.setInterval(checkAccess, 45000); cleanup.push(() => window.clearInterval(interval));
  document.addEventListener("visibilitychange", () => { if (!document.hidden) void checkAccess(); });
  window.addEventListener("online", () => void checkAccess());
  const expiry = Date.parse(root.dataset.expires || "");
  if (Number.isFinite(expiry)) {
    const expire = () => { if (Date.now() >= expiry) revoke(); else { const timer = window.setTimeout(expire, Math.min(2147480000, expiry - Date.now())); cleanup.push(() => window.clearTimeout(timer)); } };
    expire();
  }
  if (location.hash) { const target = document.getElementById(location.hash.slice(1)); if (target) { reveal(target); target.scrollIntoView(); } }
  updateSearchButtons();
}
