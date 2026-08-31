import assert from "node:assert/strict";
import test from "node:test";
import { summarizeResults } from "../src/results.mjs";

test("summarizes health and latency", () => {
  assert.deepEqual(summarizeResults([
    { ok: true, latencyMs: 25 },
    { ok: false, latencyMs: 80 },
    { ok: true },
  ]), { total: 3, ok: 2, failed: 1, slowestMs: 80, status: "degraded" });
});

test("classifies an empty result set as unknown", () => {
  assert.equal(summarizeResults([]).status, "unknown");
});

test("classifies all successful results as healthy", () => {
  assert.equal(summarizeResults([
    { ok: true },
    { ok: true },
  ]).status, "healthy");
});

test("classifies mixed results as degraded", () => {
  assert.equal(summarizeResults([
    { ok: true },
    { ok: false },
  ]).status, "degraded");
});

test("classifies all failed results as down", () => {
  assert.equal(summarizeResults([
    { ok: false },
    { ok: false },
  ]).status, "down");
});
