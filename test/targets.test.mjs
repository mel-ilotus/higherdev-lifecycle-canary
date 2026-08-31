import assert from "node:assert/strict";
import test from "node:test";
import { parseTargets } from "../src/targets.mjs";

test("parses and normalizes targets", () => {
  assert.deepEqual(parseTargets([{ name: " API ", url: "https://example.com/health" }]), [
    { name: "API", url: "https://example.com/health" },
  ]);
});

test("preserves the order of unique targets", () => {
  assert.deepEqual(parseTargets([
    { name: "API", url: "https://example.com/api" },
    { name: "Web", url: "https://example.com/" },
    { name: "Status", url: "https://status.example.com/health" },
  ]), [
    { name: "API", url: "https://example.com/api" },
    { name: "Web", url: "https://example.com/" },
    { name: "Status", url: "https://status.example.com/health" },
  ]);
});

test("rejects duplicate normalized target URLs with their indexes", () => {
  assert.throws(
    () => parseTargets([
      { name: "Primary API", url: "https://example.com:443/health" },
      { name: "Backup API", url: "HTTPS://EXAMPLE.COM/health" },
    ]),
    /target 1 url duplicates target 0 url/,
  );
});

test("rejects invalid target protocols and credentials", () => {
  assert.throws(() => parseTargets([{ name: "Bad", url: "file:///tmp/x" }]), /http or https/);
  assert.throws(() => parseTargets([{ name: "Bad", url: "https://user:pass@example.com" }]), /credentials/);
});
