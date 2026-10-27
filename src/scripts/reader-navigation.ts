export class ReaderSnapshotCache<T> {
  private entries = new Map<string, { value: T; version: number; expires: number; verified: number; size: number }>();
  private capacity: number;
  private budget: number;
  constructor(capacity = 12, budget = 8 * 1024 * 1024) { this.capacity = capacity; this.budget = budget; }
  put(key: string, value: T, version: number, expires: number, size: number, now = Date.now()) {
    if (size > this.budget) return;
    this.entries.delete(key); this.entries.set(key, { value, version, expires, verified: now, size });
    while (this.entries.size > this.capacity || [...this.entries.values()].reduce((total, entry) => total + entry.size, 0) > this.budget) this.entries.delete(this.entries.keys().next().value!);
  }
  get(key: string, version: number, now = Date.now()): T | undefined {
    const entry = this.entries.get(key);
    if (!entry) return;
    if (entry.version !== version || entry.expires <= now || now - entry.verified > 45000) { this.entries.delete(key); return; }
    this.entries.delete(key); this.entries.set(key, entry); return entry.value;
  }
  validate(version: number, now = Date.now()) { for (const entry of this.entries.values()) if (entry.version === version) entry.verified = now; }
  clear() { this.entries.clear(); }
}

export interface ReaderSession { dispose(): void; beforeSnapshot(): void; unavailable?(): void }
type Snapshot = { body: HTMLBodyElement; title: string; scroll: [number, number]; scrollers: Array<[number, number]> };

export function createReaderNavigation(initialize: () => ReaderSession | undefined) {
  const cache = new ReaderSnapshotCache<Snapshot>();
  const pending = new Map<string, Promise<Snapshot | undefined>>();
  const images = new Map<string, { promise: Promise<string | undefined>; blob?: string }>();
  const publicImages = new Set<string>();
  const missing = new Set<string>();
  const imageWaiters: Array<() => void> = [];
  const scrollers = '.reader-kanban,.penned-collection-gallery-scroll,.reader-collection-table-scroll,.reader-toc';
  const token = document.body.dataset.publication;
  const path = token ? '/p/' + token : location.pathname;
  let session: ReaderSession | undefined, current = location.pathname + location.search, generation = 0, navigation = 0, imageBytes = 0, activeImages = 0, verifiedAt = Date.now();
  let version = Number(document.body.dataset.version);
  function local(raw: string) {
    const url = new URL(raw, location.href), page = url.searchParams.get('page');
    if (url.origin !== location.origin || url.pathname !== path || [...url.searchParams.keys()].some(key => key !== 'page') || (page && !/^page-[a-f0-9]{32}$/.test(page))) return;
    return url.pathname + (page ? '?page=' + page : '');
  }
  function clear() {
    generation++; cache.clear(); pending.clear();
    for (const item of images.values()) if (item.blob) URL.revokeObjectURL(item.blob);
    images.clear(); imageBytes = 0;
  }
  function put(url: string, snapshot: Snapshot) {
    const expires = Date.parse(snapshot.body.dataset.expires || '');
    snapshot.body.querySelectorAll('script').forEach(script => script.remove());
    cache.put(url, snapshot, Number(snapshot.body.dataset.version), Number.isFinite(expires) ? expires : Infinity, snapshot.body.innerHTML.length * 2, verifiedAt);
  }
  async function imageURL(raw: string) {
    const url = new URL(raw, location.origin);
    if (url.origin === location.origin && url.pathname.startsWith('/viewer-assets/') && !publicImages.has(url.href) && publicImages.size < 64) {
      publicImages.add(url.href); const image = new Image(); image.src = url.href;
    }
    if (url.origin !== location.origin || !url.pathname.startsWith(path + '/media/')) return;
    const key = url.href, existing = images.get(key); if (existing) return existing.promise;
    if (images.size >= 40 || imageBytes >= 32 * 1024 * 1024) return;
    const epoch = generation, item: { promise: Promise<string | undefined>; blob?: string } = { promise: Promise.resolve(undefined) };
    item.promise = (async () => {
      try {
        if (activeImages >= 3) await new Promise<void>(resolve => imageWaiters.push(resolve));
        activeImages++;
        if (generation !== epoch || imageBytes >= 32 * 1024 * 1024) return;
        const response = await fetch(key, { credentials: 'same-origin', cache: 'no-store', signal: AbortSignal.timeout(15000) });
        if (!response.ok || !response.headers.get('content-type')?.startsWith('image/')) return;
        const blob = await response.blob();
        if (generation !== epoch || blob.size > 8 * 1024 * 1024 || imageBytes + blob.size > 32 * 1024 * 1024) return;
        imageBytes += blob.size; item.blob = URL.createObjectURL(blob);
        const decoded = new Image(); decoded.src = item.blob; await decoded.decode().catch(() => {});
        return generation === epoch ? item.blob : undefined;
      } catch { return; } finally { activeImages--; imageWaiters.shift()?.(); }
    })();
    images.set(key, item); return item.promise;
  }
  function warm(body: HTMLBodyElement) {
    const epoch = generation;
    for (const img of body.querySelectorAll<HTMLImageElement>('img[src]')) {
      const source = img.getAttribute('src')!;
      if (source.startsWith('blob:')) continue;
      void imageURL(source).then(blob => { if (generation === epoch && blob && img.getAttribute('src') === source) img.src = blob; });
    }
    for (const element of body.querySelectorAll<HTMLElement>('[style*="url("]')) {
      for (const match of (element.getAttribute('style') || '').matchAll(/url\((?:"([^"]+)"|'([^']+)'|([^\s)]+))\)/g)) {
        const source = match[1] || match[2] || match[3]; if (source.startsWith('blob:')) continue;
        void imageURL(source).then(blob => { if (generation === epoch && blob) element.setAttribute('style', (element.getAttribute('style') || '').replaceAll(match[0], 'url("' + blob + '")')); });
      }
    }
  }
  function ingest(body: HTMLBodyElement) {
    for (const template of body.querySelectorAll<HTMLTemplateElement>('template[data-reader-snapshot]')) {
      const page = template.dataset.page, url = path + (page ? '?page=' + page : '');
      const frame = document.createElement('body'); frame.className = 'penned-reader';
      frame.dataset.publication = token!; if (page) frame.dataset.page = page;
      frame.dataset.api = template.dataset.api!; frame.dataset.version = template.dataset.version!;
      if (template.dataset.expires) frame.dataset.expires = template.dataset.expires;
      frame.append(template.content.cloneNode(true));
      const snapshot: Snapshot = { body: frame, title: template.dataset.title!, scroll: [0, 0], scrollers: [] };
      put(url, snapshot); warm(frame); template.remove();
    }
  }
  function capture() {
    session?.beforeSnapshot();
    const body = document.body.cloneNode(true) as HTMLBodyElement;
    put(current, { body, title: document.title, scroll: [scrollX, scrollY], scrollers: [...document.querySelectorAll<HTMLElement>(scrollers)].map(element => [element.scrollLeft, element.scrollTop]) });
  }
  function show(url: string, snapshot: Snapshot, mode: 'push' | 'pop' | 'replace') {
    session?.dispose(); session = undefined;
    const body = snapshot.body;
    for (const attr of [...document.body.attributes]) document.body.removeAttribute(attr.name);
    for (const attr of [...body.attributes]) document.body.setAttribute(attr.name, attr.value);
    document.body.replaceChildren(...[...body.childNodes].map(child => child.cloneNode(true)));
    document.title = snapshot.title;
    if (mode === 'push') history.pushState({ penned: true }, '', url);
    else if (mode === 'replace') history.replaceState({ penned: true }, '', url);
    current = url; version = Number(document.body.dataset.version);
    session = initialize();
    document.querySelectorAll<HTMLElement>(scrollers).forEach((element, index) => { const saved = snapshot.scrollers[index]; if (saved) { element.scrollLeft = saved[0]; element.scrollTop = saved[1]; } });
    window.scrollTo(...snapshot.scroll);
    if (mode === 'push') document.querySelector<HTMLElement>('#document')?.focus({ preventScroll: true });
    ingest(document.body); warm(document.body); schedule();
    document.dispatchEvent(new CustomEvent('penned:page-ready', { detail: { url } }));
  }
  async function load(url: string, force = false) {
    if (!force) { const hit = cache.get(url, version); if (hit) return hit; if (pending.has(url)) return pending.get(url); }
    const epoch = generation;
    const promise = (async () => {
      try {
        const response = await fetch(url, { credentials: 'same-origin', cache: 'no-store', signal: AbortSignal.timeout(15000) });
        if ([401, 403, 404].includes(response.status)) {
          missing.add(url); clear();
          if (response.status !== 404) { session?.unavailable?.(); location.replace(current); }
          return;
        }
        if (!response.ok) return;
        const html = await response.text(); if (epoch !== generation) return;
        const doc = new DOMParser().parseFromString(html, 'text/html'), body = doc.body;
        if (body.dataset.publication !== token) return;
        const next = Number(body.dataset.version);
        if (next < version) return;
        if (next > version) { clear(); version = next; }
        verifiedAt = Date.now(); cache.validate(next, verifiedAt); missing.delete(url);
        const snapshot: Snapshot = { body, title: doc.title, scroll: [0, 0], scrollers: [] };
        ingest(body); put(url, snapshot); warm(body); return snapshot;
      } catch { return; }
    })();
    pending.set(url, promise);
    try { return await promise; } finally { if (pending.get(url) === promise) pending.delete(url); }
  }
  let scheduled = false;
  function schedule() {
    if (scheduled || !document.body.dataset.publication) return; scheduled = true;
    window.setTimeout(() => {
      scheduled = false;
      const targets = [...new Set([...document.querySelectorAll<HTMLAnchorElement>('[data-reader-linked]')].map(link => local(link.href)).filter((url): url is string => Boolean(url)))].filter(url => url !== current && !cache.get(url, version)).slice(0, 8);
      // Bound network concurrency; pre-rendered frames handle immediate ordinary taps.
      let index = 0;
      const worker = async () => { while (index < targets.length) await load(targets[index++]); };
      void worker(); void worker();
    }, 0);
  }
  async function go(url: string, mode: 'push' | 'pop' | 'replace' = 'push', force = false) {
    const sequence = ++navigation;
    capture();
    const hit = force ? undefined : cache.get(url, version);
    if (hit) { show(url, hit, mode); return; }
    const snapshot = await load(url, force);
    if (sequence !== navigation) return;
    if (snapshot) { show(url, snapshot, mode); return; }
    // No cached private content is served after access expires or is revoked.
    if (mode === 'pop' || !document.body.dataset.publication) location.replace(url);
    else if (missing.has(url)) location.assign(url);
    else {
      const response = document.querySelector<HTMLElement>('[data-network-status]');
      if (response) { response.textContent = 'Could not open this page. Please try again.'; response.hidden = false; }
    }
  }
  return {
    start() {
      session = initialize();
      if (!token) return;
      history.scrollRestoration = 'manual'; history.replaceState({ ...history.state, penned: true }, '', location.href);
      ingest(document.body); warm(document.body); schedule();
      document.addEventListener('click', event => {
        if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || !(event.target instanceof Element)) return;
        const link = event.target.closest<HTMLAnchorElement>('a[data-reader-linked]');
        const url = link && local(link.href); if (!url) return;
        event.preventDefault(); if (url !== current) void go(url);
      });
      window.addEventListener('popstate', () => { const url = local(location.href); if (url && url !== current) void go(url, 'pop'); });
    },
    clear,
    verified(next: number) { verifiedAt = Date.now(); if (next !== version) { clear(); version = next; } else cache.validate(next, verifiedAt); },
    refresh() { return go(current, 'replace', true); },
  };
}
