export function summarizeResults(results) {
  if (!Array.isArray(results)) throw new TypeError("results must be an array");
  const normalized = results.map((result, index) => {
    if (!result || typeof result !== "object") throw new TypeError(`result ${index} must be an object`);
    const ok = result.ok === true;
    const latencyMs = Number.isFinite(result.latencyMs) && result.latencyMs >= 0 ? result.latencyMs : null;
    return { ok, latencyMs };
  });
  const latencies = normalized.map((result) => result.latencyMs).filter((value) => value !== null);
  const ok = normalized.filter((result) => result.ok).length;
  const failed = normalized.length - ok;
  const status = normalized.length === 0
    ? "unknown"
    : failed === 0
      ? "healthy"
      : ok === 0
        ? "down"
        : "degraded";

  return {
    total: normalized.length,
    ok,
    failed,
    slowestMs: latencies.length ? Math.max(...latencies) : null,
    status,
  };
}
