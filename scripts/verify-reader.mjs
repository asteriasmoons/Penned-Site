import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { resolve, join } from "node:path";
import { pathToFileURL } from "node:url";

const args = process.argv.slice(2), option = name => { const index = args.indexOf(name); return index < 0 ? undefined : args[index + 1]; };
const ref = option("--project-ref"), directory = resolve(option("--fixtures") || "/tmp/penned-reader-verification");
const base = option("--base-url") || "http://127.0.0.1:4321", mode = option("--mode") || "verify";
assert.ok(args.includes("--confirm-live") && /^[a-z]{20}$/.test(ref || ""), "Explicit --project-ref and --confirm-live are required");
const project = `https://${ref}.supabase.co`, api = project + "/functions/v1/penned-publishing";
await mkdir(directory, { recursive: true });
const keyList = JSON.parse(execFileSync("supabase", ["projects", "api-keys", "--project-ref", ref, "--reveal", "--output", "json"], { cwd: directory, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] }));
const key = keyList.find(value => value.type === "publishable")?.api_key || keyList.find(value => value.name === "anon")?.api_key;
const secret = keyList.find(value => value.name === "service_role")?.api_key;
assert.ok(key && secret);
const { createClient } = await import(process.env.PENNED_SUPABASE_MODULE || "@supabase/supabase-js");
const options = { auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false } };
const admin = createClient(project, secret, options), statePath = join(directory, "live.json");
let state;
try { state = JSON.parse(await readFile(statePath, "utf8")); } catch { state = { run: crypto.randomUUID(), users: [], publications: {}, paths: [] }; }
async function save() { await writeFile(statePath, JSON.stringify(state, null, 2), { mode: 0o600 }); }
function checked(result) { if (result.error) throw new Error(result.error.code || result.error.name || "Supabase operation failed"); return result.data; }
async function call(path, method = "GET", token, body, extra = {}) {
  const response = await fetch(api + "/" + path, { method, headers: { apikey: key, ...(token ? { Authorization: "Bearer " + token } : {}), ...(body == null ? {} : { "Content-Type": "application/json" }), ...extra.headers },
    body: extra.bytes || (body == null ? undefined : JSON.stringify(body)), signal: AbortSignal.timeout(45000) });
  const data = await response.json();
  if (!response.ok) throw new Error(`${method} ${path.split("/")[0]} failed: ${response.status} ${data.error || "unknown"}`);
  return data;
}
async function tokenFor(id) {
  const user = checked(await admin.auth.admin.getUserById(id)).user;
  const link = checked(await admin.auth.admin.generateLink({ type: "magiclink", email: user.email }));
  return checked(await createClient(project, key, options).auth.verifyOtp({ type: "magiclink", token_hash: link.properties.hashed_token })).session.access_token;
}
async function createUser(index) {
  const email = `penned-reader-${state.run}-${index}@example.com`;
  const user = checked(await admin.auth.admin.createUser({ email, email_confirm: true, password: crypto.randomUUID() + crypto.randomUUID() })).user;
  state.users.push(user.id); await save(); return tokenFor(user.id);
}
async function publish(name, fixture, token) {
  let publication = await call("publications", "POST", token, { sourceLibraryID: fixture.sourceLibraryID, sourceDocumentID: fixture.sourceDocumentID });
  state.publications[name] = publication; await save();
  for (const asset of fixture.document.media) {
    const uploaded = await call(`publications/${publication.id}/media/${asset.id}`, "PUT", token, undefined,
      { bytes: Buffer.from(fixture.files[asset.id], "base64"), headers: { "Content-Type": asset.mimeType, "X-File-Name": encodeURIComponent(asset.name) } });
    assert.deepEqual(uploaded, asset);
    const rows = checked(await admin.from("penned_publication_media").select("object_path").eq("publication_id", publication.id));
    state.paths = [...new Set([...state.paths, ...rows.map(row => row.object_path)])]; await save();
  }
  publication = await call("publications/" + publication.id, "PUT", token, { action: "publish", expectedVersion: publication.version, document: fixture.document,
    settings: { showTitle: true, showAuthor: true, authorName: "Penned Reader Verification", showTableOfContents: true, allowIndexing: false, allowFollowLinkedContent: false,
      expiresAt: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString() } });
  state.publications[name] = publication; await save(); return publication;
}
if (mode === "prepare") {
  assert.equal(state.users.length, 0, "Clean up the previous fixture run first");
  try {
    const first = await createUser(1), second = await createUser(2);
    const fixture = async name => JSON.parse(await readFile(join(directory, name + ".json"), "utf8"));
    await publish("otherLinked", await fixture("linked"), second);
    await publish("linked", await fixture("linked"), first);
    await publish("dark", await fixture("dark"), first);
    await publish("light", await fixture("light"), first);
    // The same local media IDs under another account must never collide or cross-read.
    await publish("otherDark", await fixture("dark"), second);
    for (const name of ["dark", "light"]) {
      const document = await call("public/" + state.publications[name].token);
      assert.doesNotMatch(JSON.stringify(document), /PRIVATE|targetDocumentID|collectionID|relativePath|parentDocumentID|sourceDocumentID|sourceLibraryID/);
      assert.ok(JSON.stringify(document).includes("publishedCollection"));
    }
    console.log("Prepared saved native documents through the actual publishing API; no mock responses or user documents used.");
    console.log(Object.fromEntries(["dark", "light"].map(name => [name, base + "/p/" + state.publications[name].token])));
  } catch (error) { console.error("Preparation failed; fixture IDs remain in the restricted state file for cleanup."); throw error; }
} else if (mode === "cleanup") {
  const ids = Object.values(state.publications).map(value => value.id);
  if (ids.length) {
    const remaining = checked(await admin.from("penned_publication_media").select("object_path").in("publication_id", ids));
    const paths = [...new Set([...state.paths, ...remaining.map(row => row.object_path)])];
    if (paths.length) checked(await admin.storage.from("penned-publications").remove(paths));
    checked(await admin.from("penned_publications").delete().in("id", ids));
  }
  for (const id of state.users) { const result = await admin.auth.admin.deleteUser(id); if (result.error && result.error.status !== 404) throw new Error("Fixture account cleanup failed"); }
  state = { run: crypto.randomUUID(), users: [], publications: {}, paths: [] }; await save();
  console.log("Removed the disposable reader accounts, publications and media.");
} else if (mode === "verify") {
  const { chromium } = await import(process.env.PENNED_PLAYWRIGHT_MODULE || "playwright");
  const browser = await chromium.launch({ headless: true, channel: process.env.PENNED_BROWSER_CHANNEL || "chrome" });
  const owner = await tokenFor(state.users[0]);
  let dark = await call("publications/" + state.publications.dark.id, "GET", owner);
  const fixture = JSON.parse(await readFile(join(directory, "dark.json"), "utf8"));
  const output = option("--screenshots") || join(directory, "screenshots"); await mkdir(output, { recursive: true });
  const page = await browser.newPage(); let errors = [], responseErrors = [];
  page.on("pageerror", error => errors.push(error.message));
  page.on("console", message => { if (message.type() === "error") errors.push(message.text()); });
  page.on("response", response => { if (response.status() >= 400) responseErrors.push({ status: response.status(), url: response.url() }); });
  const open = async token => {
    const response = await page.goto(base + "/p/" + token, { waitUntil: "networkidle" });
    assert.equal(response.status(), 200); assert.match(response.headers()["cache-control"], /no-store/);
    assert.equal(await page.locator(".reader-document-heading h1").innerText(), "A Penned Reading Journal");
  };
  async function change(action, settings) {
    dark = await call(`publications/${dark.id}/${action}`, "POST", owner, { expectedVersion: dark.version, ...(settings ? { settings } : {}) });
    state.publications.dark = dark; await save();
  }
  try {
    for (const [name, width, height] of [["desktop", 1440, 1000], ["tablet", 834, 1112], ["phone", 390, 844]]) {
      await page.setViewportSize({ width, height }); await open(dark.token);
      await page.locator(".reader-content").first().waitFor();
      assert.equal(await page.locator("[contenteditable=true]").count(), 0);
      assert.equal(await page.locator("[data-collection-kind=table]").count(), 1);
      assert.equal(await page.locator("[data-collection-kind=gallery]").count(), 1);
      assert.equal(await page.locator("[data-collection-kind=kanban]").count(), 1);
      assert.equal(await page.locator(".reader-page-card").count(), 1);
      assert.equal(await page.locator("[data-reader-linked]").count(), 0);
      assert.ok(await page.locator(".reader-content table.vellix-table").innerText().then(value => value.includes("13")));
      assert.equal(await page.locator(".reader-component input[type=range]").inputValue(), "3");
      assert.ok(await page.locator(".reader-component input[type=range]").isDisabled());
      assert.ok(await page.locator("input[type=checkbox]").first().isDisabled());
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), `${name}: document overflows the viewport`);
      await page.screenshot({ path: join(output, name + ".png") });
      const toggle = page.locator("details.reader-toggle").first();
      assert.equal(await toggle.getAttribute("open"), null); await toggle.locator("summary").click();
      assert.notEqual(await toggle.getAttribute("open"), null); await toggle.locator("summary").click();
      await page.locator("[data-open-search]").click(); await page.locator("[data-search-input]").fill("Expandable writing");
      assert.equal(await page.locator("[data-search-count]").innerText(), "1 of 1");
      await page.locator("[data-search-next]").click(); assert.notEqual(await toggle.getAttribute("open"), null);
      await page.locator("[data-close-search]").click();
      if (width < 1280) {
        await page.locator("[data-open-contents]").click(); assert.ok(await page.locator("#reader-toc").isVisible());
        await page.locator("[data-toc-link]").first().click(); assert.ok(!(await page.locator("#reader-toc").isVisible()));
      }
      await page.evaluate(() => { const node = document.querySelector(".reader-content p"); const range = document.createRange(); range.selectNodeContents(node); const selection = getSelection(); selection.removeAllRanges(); selection.addRange(range); });
      assert.ok((await page.evaluate(() => getSelection().toString())).length > 0);
      await page.evaluate(() => getSelection().removeAllRanges());
      await page.locator("[data-reader-image]").first().click(); assert.ok(await page.locator("[data-media-dialog]").isVisible());
      await page.waitForFunction(() => document.querySelector("[data-media-image]").naturalWidth > 0);
      await page.locator("[data-media-zoom-in]").click(); await page.locator("[data-media-close]").click();
      assert.ok(!(await page.locator("[data-media-dialog]").isVisible()));
      const images = await page.locator(".reader-document img").evaluateAll(images => images.filter(image => image.complete && image.naturalWidth === 0).map(image => image.src));
      assert.deepEqual(images, [], `${name}: broken images`);
      console.log(`PASS ${name}: real content, layout, tables/formulas, collections, read-only controls, selection, toggles, contents, search and image viewing`);
    }
    await page.locator("[data-collection-kind=kanban]").scrollIntoViewIfNeeded(); await page.screenshot({ path: join(output, "phone-kanban.png") });
    const before = await page.locator(".reader-kanban-column").first().getAttribute("open");
    await page.locator(".reader-kanban-column").first().locator("summary").click(); assert.notEqual(await page.locator(".reader-kanban-column").first().getAttribute("open"), before);
    const media = await call("public/" + dark.token);
    const asset = media.document.media.find(asset => asset.mimeType === "image/png");
    const range = await page.evaluate(async url => { const response = await fetch(url, { headers: { Range: "bytes=0-7" }, credentials: "omit" }); return { status: response.status, length: (await response.arrayBuffer()).byteLength }; }, `${api}/public/${dark.token}/media/${asset.id}`);
    assert.deepEqual(range, { status: 206, length: 8 });
    await page.waitForFunction(() => [...document.querySelectorAll("audio,video")].every(media => media.readyState >= 1));
    const pdf = media.document.media.find(asset => asset.mimeType === "application/pdf");
    const pdfResponse = await fetch(`${api}/public/${dark.token}/media/${pdf.id}`); assert.equal(pdfResponse.status, 200); assert.match(await pdfResponse.text(), /^%PDF/);
    assert.deepEqual(errors, [], "Browser console/runtime errors"); assert.deepEqual(responseErrors, [], "Unexpected network errors");
    console.log("PASS real media delivery: native image/PDF/audio/video, metadata and browser byte ranges");

    await change("settings", { allowFollowLinkedContent: true }); await open(dark.token);
    const card = page.locator("a.reader-page-card"); assert.equal(await card.count(), 1);
    assert.equal(await card.getAttribute("href"), "/p/" + state.publications.linked.token);
    assert.notEqual(await card.getAttribute("href"), "/p/" + state.publications.otherLinked.token);
    await card.click(); await page.waitForURL("**/p/" + state.publications.linked.token);
    assert.match(await page.locator(".reader-title-row h1").innerText(), /nested reading page/);
    await change("settings", { allowFollowLinkedContent: false }); await open(dark.token);
    assert.equal(await page.locator("a.reader-page-card").count(), 0);
    assert.equal(await page.locator(".reader-page-card").count(), 1);
    console.log("PASS follow-linked-content setting: visible read-only cards by default; only the same owner's separately published destination opens when enabled");

    await open(state.publications.light.token);
    assert.match(await page.locator(".reader-paper").first().getAttribute("style"), /ui-serif/);
    await page.setViewportSize({width:1440,height:1000}); await page.screenshot({ path: join(output, "light-desktop.png") });
    await open(dark.token);
    await change("unpublish"); responseErrors = []; errors = [];
    await page.evaluate(() => window.dispatchEvent(new Event("online")));
    await page.locator("main.reader-state").waitFor();
    assert.doesNotMatch(await page.locator("body").innerText(), /A Penned Reading Journal|The reading desk/);
    assert.equal((await page.goto(base + "/p/" + dark.token)).status(), 404);
    dark = await call("publications/" + dark.id, "PUT", owner, { action: "publish", expectedVersion: dark.version, document: fixture.document, settings: { allowFollowLinkedContent: false } });
    state.publications.dark = dark; await save();
    const old = dark.token; await change("regenerate");
    assert.equal((await fetch(base + "/p/" + old)).status, 404); await open(dark.token);
    console.log("PASS reopened and already-open unpublish states, republish, link rotation and no-cache responses");
    console.log("Screenshots: " + output);
  } finally { await browser.close(); }
} else throw new Error("Use --mode prepare, verify, or cleanup");
