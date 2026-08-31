export function summarizeResults(results) {
  if (!Array.isArray(results)) throw new TypeError("results must be an array");
  const normalized = results.map((result, index) => {
    if (!result || typeof result !== "object") throw new TypeError(`result ${index} must be an object`);
    const ok = result.ok === true;
    const latencyMs = Number.isFinite(result.latencyMs) && result.latencyMs >= 0 ? result.latencyMs : null;
    return { ok, latencyMs };
  });
  const latencies = normalized.map((result) => result.latencyMs).filter((value) => value !== null);
  return {
    total: normalized.length,
    ok: normalized.filter((result) => result.ok).length,
    failed: normalized.filter((result) => !result.ok).length,
    slowestMs: latencies.length ? Math.max(...latencies) : null,
  };
}
