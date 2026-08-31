import assert from "node:assert/strict";
import test from "node:test";
import { summarizeResults } from "../src/results.mjs";

test("returns degraded for mixed monitor results", () => {
  assert.deepEqual(summarizeResults([
    { ok: true, latencyMs: 25 },
    { ok: false, latencyMs: 80 },
    { ok: true },
  ]), { total: 3, ok: 2, failed: 1, slowestMs: 80, status: "degraded" });
});

test("returns unknown for an empty result set", () => {
  assert.deepEqual(summarizeResults([]), {
    total: 0,
    ok: 0,
    failed: 0,
    slowestMs: null,
    status: "unknown",
  });
});

test("returns healthy when every monitor result is ok", () => {
  assert.deepEqual(summarizeResults([
    { ok: true, latencyMs: 10 },
    { ok: true, latencyMs: 30 },
  ]), {
    total: 2,
    ok: 2,
    failed: 0,
    slowestMs: 30,
    status: "healthy",
  });
});

test("returns down when every monitor result fails", () => {
  assert.deepEqual(summarizeResults([
    { ok: false },
    { ok: false, latencyMs: 15 },
  ]), {
    total: 2,
    ok: 0,
    failed: 2,
    slowestMs: 15,
    status: "down",
  });
});
