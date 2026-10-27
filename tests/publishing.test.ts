import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { createPublishingReader, ReaderAccessRequired } from "../src/lib/publishing.ts";

test("included child pages use the parent publication and its existing reader grant, not separate publication tokens",async()=>{
  const page="page-"+"a".repeat(32),grant="prg_"+"b".repeat(64);
  const reader=createPublishingReader("https://project.supabase.co",async(url,options)=>{
    assert.equal(url,"https://project.supabase.co/functions/v1/penned-publishing/public/a1b2c3d4/pages/"+page);
    assert.deepEqual(options?.headers,{"X-Penned-Reader":grant});
    return Response.json({version:2,document:{schemaVersion:1,content:{type:"doc"},media:[]},settings:{allowFollowLinkedContent:true},navigation:{parentTitle:"Root",parentPage:null}});
  });
  assert.equal((await reader.read("a1b2c3d4",undefined,grant,page))?.navigation?.parentTitle,"Root");
  await assert.rejects(reader.read("a1b2c3d4",undefined,grant,"../private-document"));
});

test("access form uses the external reader entry under the strict production CSP", async () => {
  const gate=await readFile(new URL("../src/components/publishing/ReaderGate.astro",import.meta.url),"utf8");
  const reader=await readFile(new URL("../src/scripts/public-reader.ts",import.meta.url),"utf8");
  assert.doesNotMatch(gate,/<script/);
  assert.match(gate,/<form method="post"/);
  assert.match(reader,/if \(form\) initializeAccessGate\(form\)/);
  assert.match(reader,/form\.addEventListener\("submit",event=>\{event\.preventDefault\(\)/);
});

test("public reader sends no account credentials and uses publication-scoped media URLs", async () => {
  const token = "a".repeat(64), media = crypto.randomUUID();
  const reader = createPublishingReader("https://project.supabase.co", async (url, options) => {
    assert.equal(url, "https://project.supabase.co/functions/v1/penned-publishing/public/" + token);
    assert.equal(options?.credentials, "omit");
    assert.equal(options?.cache, "no-store");
    assert.equal(options?.referrerPolicy, "no-referrer");
    assert.equal(options?.headers, undefined);
    return Response.json({ version: 1, updatedAt: "2026-10-25T00:00:00Z", document: { schemaVersion: 1, content: { type: "doc" }, media: [] }, settings: {} });
  });
  assert.equal((await reader.read(token))?.version, 1);
  assert.equal(reader.mediaURL(token, media), "https://project.supabase.co/functions/v1/penned-publishing/public/" + token + "/media/" + media);
  assert.throws(() => reader.mediaURL(token, "../private"));
  await assert.rejects(reader.read("../private-document-id"));
});

test("custom paths remain public lookups, never private document IDs, and reader grants are explicit headers",async()=>{
  const grant="prg_"+"d".repeat(64);
  const reader=createPublishingReader("https://project.supabase.co",async(url,options)=>{
    assert.equal(url,"https://project.supabase.co/functions/v1/penned-publishing/public/my-published-page");
    assert.deepEqual(options?.headers,{"X-Penned-Reader":grant});
    assert.equal(options?.credentials,"omit");
    return Response.json({version:2,document:{schemaVersion:1,content:{type:"doc"},media:[]},settings:{}});
  });
  assert.equal((await reader.read("my-published-page",undefined,grant))?.version,2);
});
test("protected documents produce an explicit gate rather than an unavailable or leaked document",async()=>{
  const reader=createPublishingReader("https://project.supabase.co",async()=>Response.json({error:"access_required",password:true,email:true},{status:401}));
  await assert.rejects(reader.read("a".repeat(64)),error=>error instanceof ReaderAccessRequired&&error.password&&error.email);
});

test("unpublished pages are unavailable and server failures do not become empty documents", async () => {
  const token = "b".repeat(64);
  assert.equal(await createPublishingReader("https://project.supabase.co", async () => new Response(null, { status: 404 })).read(token), null);
  await assert.rejects(createPublishingReader("https://project.supabase.co", async () => new Response(null, { status: 503 })).read(token));
  assert.throws(() => createPublishingReader("http://project.supabase.co"));
});
