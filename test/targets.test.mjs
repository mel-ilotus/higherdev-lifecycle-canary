import assert from "node:assert/strict";
import test from "node:test";
import { parseTargets } from "../src/targets.mjs";

test("parses and normalizes targets", () => {
  assert.deepEqual(parseTargets([
    { name: " API ", url: "https://example.com/health" },
    { name: "Web", url: "https://example.com/status" },
  ]), [
    { name: "API", url: "https://example.com/health" },
    { name: "Web", url: "https://example.com/status" },
  ]);
});

test("rejects later duplicate normalized target URLs despite different names", () => {
  assert.throws(
    () => parseTargets([
      { name: "Primary API", url: "https://EXAMPLE.com/health" },
      { name: "API replica", url: "https://example.com/health" },
    ]),
    /target 1 url duplicates a previous normalized URL/,
  );
});

test("rejects invalid target protocols and credentials", () => {
  assert.throws(() => parseTargets([{ name: "Bad", url: "file:///tmp/x" }]), /http or https/);
  assert.throws(() => parseTargets([{ name: "Bad", url: "https://user:pass@example.com" }]), /credentials/);
});
