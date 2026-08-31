import assert from "node:assert/strict";
import test from "node:test";
import { summarizeResults } from "../src/results.mjs";

test("summarizes health and latency", () => {
  assert.deepEqual(summarizeResults([
    { ok: true, latencyMs: 25 },
    { ok: false, latencyMs: 80 },
    { ok: true },
  ]), { total: 3, ok: 2, failed: 1, slowestMs: 80 });
});

test("handles an empty result set", () => {
  assert.deepEqual(summarizeResults([]), { total: 0, ok: 0, failed: 0, slowestMs: null });
});
