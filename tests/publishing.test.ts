import test from "node:test";
import assert from "node:assert/strict";
import { createPublishingReader, ReaderAccessRequired } from "../src/lib/publishing.ts";

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
