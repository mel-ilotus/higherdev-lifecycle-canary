import assert from "node:assert/strict";
import test from "node:test";
import { parseTargets } from "../src/targets.mjs";

test("parses and normalizes targets", () => {
  assert.deepEqual(parseTargets([{ name: " API ", url: "https://example.com/health" }]), [
    { name: "API", url: "https://example.com/health" },
  ]);
});

test("rejects invalid target protocols and credentials", () => {
  assert.throws(() => parseTargets([{ name: "Bad", url: "file:///tmp/x" }]), /http or https/);
  assert.throws(() => parseTargets([{ name: "Bad", url: "https://user:pass@example.com" }]), /credentials/);
});
