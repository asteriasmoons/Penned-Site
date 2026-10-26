import test from "node:test";
import assert from "node:assert/strict";
import { Window } from "happy-dom";
import { renderPublicContent, safePhoto } from "../vendor/penned-reader/index.mjs";

const paragraph = (text: string) => ({ type: "paragraph", content: [{ type: "text", text }] });
const options = { mediaURL: (id: string) => "https://project.supabase.co/public/media/" + id,
  iconURL: (name: string) => "/viewer-assets/icons/" + encodeURIComponent(name) + ".png" };
function render(content: unknown[], media: unknown[] = [], settings = {}) {
  return renderPublicContent({ content: { type: "doc", content }, media } as any, { ...options, ...settings });
}
function document(html: string) { const window = new Window({ settings: { disableJavaScriptEvaluation: true } }); window.document.body.innerHTML = html; return window.document; }

test("the actual editor serializer renders formatting, unique contents anchors, toggles and real paper breaks", () => {
  const result = render([{ type: "heading", attrs: { level: 2 }, content: [{ type: "text", text: "Repeated heading" }] },
    { type: "toggleItem", attrs: { open: false }, content: [paragraph("Toggle title"), paragraph("Selectable text")] },
    { type: "pageBreak" }, { type: "heading", attrs: { level: 2 }, content: [{ type: "text", text: "Repeated heading" }] },
    { type: "paragraph", content: [{ type: "text", text: "Color", marks: [{ type: "bold" }, { type: "underline" }, { type: "textStyle", attrs: { gradient: { start: "#BC76FF", end: "#FF7AB6", angle: 90 } } }] }] }]);
  assert.equal(result.segments.length, 2); assert.equal(result.toc.length, 2); assert.notEqual(result.toc[0].id, result.toc[1].id);
  const doc = document(result.segments.join(""));
  assert.equal(doc.querySelectorAll("[data-reader-toggle=false]").length, 1);
  assert.equal(doc.querySelectorAll("strong u, u strong").length, 1);
  assert.match(result.segments[1], /linear-gradient\(90deg,\s*#BC76FF,\s*#FF7AB6\)/);
  assert.equal(doc.querySelectorAll("[contenteditable],script,[onclick]").length, 0);
});
test("tables use the real formula engine, saved widths, spans, colors and number formatting", () => {
  const cell = (value: string, attrs = {}) => ({ type: "tableCell", attrs: { colspan: 1, rowspan: 1, colwidth: [150], ...attrs }, content: [paragraph(value)] });
  const result = render([{ type: "table", attrs: { name: "Values", stripeColor: "#abcdef" }, content: [
    { type: "tableRow", content: [cell("5"), cell("8"), cell("", { formula: "=SUM(A1:B1)", format: "number", decimals: 0, fillColor: "#334455", bold: true, align: "right" })] },
  ] }]);
  const doc = document(result.segments[0]);
  assert.equal(doc.querySelectorAll("col").length, 3);
  assert.equal(doc.querySelectorAll("td")[2].textContent, "13");
  assert.match(doc.querySelectorAll("td")[2].getAttribute("style")!, /background-color:\s*#334455/);
  assert.equal((doc.querySelectorAll("td")[2] as HTMLElement).style.textAlign, "right");
});
test("visible table, gallery and native-dependent Kanban collections render their real rows without edit controls", () => {
  for (const kind of ["table", "gallery", "kanban"]) {
    const projection = { name: "Saved collection", viewName: "Main", kind, fields: [{ key: "field-0", name: "Status", kind: "select", icon: "listcircle" }],
      entries: [{ title: "Saved entry", group: "group-0", values: { "field-0": { text: "Active", chips: [{ name: "Active", color: "#55CCAA" }] } } }],
      groups: [{ key: "group-0", name: "In Progress", color: "#225544", collapsed: false }], galleryColumns: 2 };
    const doc = document(render([{ type: "publishedCollection", attrs: { projection } }]).segments[0]);
    assert.match(doc.body.textContent!, /Saved collection/); assert.match(doc.body.textContent!, /Saved entry/); assert.match(doc.body.textContent!, /Active/);
    assert.equal(doc.querySelectorAll("input,[draggable=true],[contenteditable],button:not([data-select-collection-view])").length, 0);
    if (kind === "kanban") assert.equal(doc.querySelectorAll("details.reader-kanban-column[open]").length, 1);
  }
});
test("gallery matches native cover slots, table grid tracks, saved views and read-only board cards", () => {
  const base = { name: "Daily Tasks", viewName: "Home", kind: "gallery", galleryColumns: 3, showsCover: true,
    fields: [{ key: "field-0", name: "Priority", kind: "select", icon: "flag" }],
    entries: [{ title: "Take Medicine", group: "group-0", values: { "field-0": { text: "Medium", chips: [{ name: "Medium", color: "#BC76FF" }] } } }],
    groups: [{ key: "group-0", name: "Unassigned", color: "#34363f" }] };
  const projection = { ...base, activeViewKey: "view-0", views: [{ ...base, key: "view-0" }, { ...base, key: "view-1", viewName: "Main", kind: "table" }, { ...base, key: "view-2", viewName: "Board", kind: "kanban" }] };
  const doc = document(render([{ type: "publishedCollection", attrs: { projection } }]).segments[0]);
  assert.equal(doc.querySelectorAll("[data-select-collection-view]").length, 3);
  assert.equal(doc.querySelectorAll("[data-collection-view]:not([hidden])").length, 1);
  assert.equal(doc.querySelectorAll(".penned-collection-cover .reader-icon").length, 1);
  assert.equal((doc.querySelector(".penned-collection-gallery") as HTMLElement).style.getPropertyValue("--collection-columns"), "3");
  assert.match(doc.querySelector(".penned-collection-table")!.getAttribute("style")!, /220px 180px 44px/);
  assert.equal(doc.querySelectorAll(".reader-kanban-card .penned-collection-cover").length, 0);
  assert.match(doc.querySelector(".reader-kanban-card")!.textContent!, /Take Medicine.*Medium/);
});
test("cards/pages are always visible and become links only through the follow-linked-content setting", () => {
  const preview = { title: "Actual page", excerpt: "Actual saved excerpt", targetToken: "a".repeat(64), cardStyle: { size: "large", backdrop: "gradient", startColor: "#123456", endColor: "#654321", showsPages: true } };
  const nodes = [{ type: "publishedPage", attrs: { preview } }];
  const closed = document(render(nodes).segments[0]);
  assert.equal(closed.querySelectorAll(".reader-page-card").length, 1); assert.equal(closed.querySelectorAll("a").length, 0);
  assert.match(closed.body.textContent!, /Actual saved excerpt/);
  const open = document(render(nodes, [], { allowFollowLinkedContent: true }).segments[0]);
  assert.equal(open.querySelector("a")!.getAttribute("href"), "/p/" + "a".repeat(64));
});
test("tasks and template values stay non-editable while preserving completion, skip and actual slider response", () => {
  const doc = document(render([{ type: "taskList", content: [{ type: "taskItem", attrs: { checked: true }, content: [paragraph("Done")] },
    { type: "taskItem", attrs: { crossed: true }, content: [paragraph("Skipped")] }] },
    { type: "templateComponent", attrs: { definition: { kind: "slider", minimum: 1, maximum: 5, step: 1 }, response: 3 } }]).segments[0]);
  assert.equal(doc.querySelectorAll("input[type=checkbox]:checked:disabled").length, 2);
  assert.equal(doc.querySelectorAll("[data-crossed=true]").length, 1);
  assert.equal(doc.querySelector("input[type=range]")!.getAttribute("value"), "3");
  assert.ok(doc.querySelector("input[type=range]")!.hasAttribute("disabled"));
});
test("manifest-only images and audio/video/PDF references resolve to publication media URLs", () => {
  for (const [kind, mime, tag] of [["image", "image/png", "img"], ["audio", "audio/wav", "audio"], ["video", "video/mp4", "video"], ["pdf", "application/pdf", "a[data-reader-file]"]]) {
    const id = crypto.randomUUID(), node = { type: "attachment", attrs: { file: { mediaID: id, kind } } };
    const doc = document(render([node], [{ id, mimeType: mime, name: "Actual file", size: 12 }]).segments[0]);
    assert.ok(doc.querySelector(tag)); assert.match(doc.body.innerHTML, new RegExp(id));
    assert.throws(() => render([node]));
  }
});
test("untrusted content stays text; unsafe photos, unexpected nodes and private media never become executable HTML", () => {
  const attack = '<img src=x onerror="alert(1)"><script>alert(1)</script>';
  const doc = document(render([paragraph(attack), { type: "publishedPage", attrs: { preview: { title: attack, excerpt: attack } } }]).segments[0]);
  assert.equal(doc.querySelectorAll("script,[onerror],img[src=x]").length, 0);
  assert.match(doc.body.textContent!, /<script>/);
  assert.equal(safePhoto("javascript:alert(1)"), null); assert.equal(safePhoto("https://evil.example/image.png"), null);
  assert.throws(() => render([{ type: "privateWorkspaceDump" }]));
});
test("saved nested-cover photos use only approved image origins", () => {
  const coverPhoto = { imageURL: "https://images.unsplash.com/photo-real", photographer: "Saved photographer", photographerURL: "https://unsplash.com/@person", sourceURL: "https://unsplash.com/photos/real" };
  const preview = { title: "Nested page", excerpt: "Actual preview", coverPhoto, cardStyle: { size: "large", showsPages: true, backdrop: "solid", startColor: "#242424" } };
  const doc = document(render([{ type: "publishedPage", attrs: { preview } }]).segments[0]);
  assert.equal(doc.querySelector("img.reader-entry-cover")!.getAttribute("src"), coverPhoto.imageURL);
  assert.match(doc.body.textContent!, /Saved photographer/);
});
