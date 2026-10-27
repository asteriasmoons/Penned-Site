import test from "node:test";
import assert from "node:assert/strict";
import { ReaderSnapshotCache } from "../src/scripts/reader-navigation.ts";
import { readFile } from "node:fs/promises";

test("snapshots expire on publication version changes, access deadline and authorization freshness", () => {
  const cache = new ReaderSnapshotCache<string>();
  cache.put("child", "saved child", 3, Infinity, 10, 0);
  assert.equal(cache.get("child", 3, 44000), "saved child");
  assert.equal(cache.get("child", 3, 45001), undefined);
  cache.put("child", "saved child", 3, Infinity, 10, 0);
  cache.validate(3, 44000);
  assert.equal(cache.get("child", 3, 45001), "saved child");
  assert.equal(cache.get("child", 4, 45002), undefined);
  cache.put("child", "saved child", 4, 46000, 10, 45000);
  assert.equal(cache.get("child", 4, 46000), undefined);
});
test("snapshot memory stays bounded, recently visited pages survive and revocation clears everything", () => {
  const cache = new ReaderSnapshotCache<string>(2, 30);
  for (const key of ["parent", "child"]) cache.put(key, key, 1, Infinity, 10, 0);
  cache.get("parent", 1, 1); cache.put("grandchild", "grandchild", 1, Infinity, 10, 1);
  assert.equal(cache.get("child", 1, 1), undefined);
  assert.equal(cache.get("parent", 1, 1), "parent");
  cache.put("large", "large", 1, Infinity, 25, 1);
  assert.equal(cache.get("parent", 1, 1), undefined);
  cache.clear(); assert.equal(cache.get("large", 1, 1), undefined);
});
test("cached reader sessions dispose listeners and preserve already-converted toggles without a loading overlay", async () => {
  const reader = await readFile(new URL("../src/scripts/public-reader.ts", import.meta.url), "utf8");
  const body = await readFile(new URL("../src/components/publishing/ReaderPageBody.astro", import.meta.url), "utf8");
  assert.match(reader, /original instanceof HTMLDetailsElement/);
  assert.match(reader, /lifetime\.abort\(\)/);
  assert.doesNotMatch(body, /data-reader-loading/);
});
