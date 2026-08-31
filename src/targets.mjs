export function parseTargets(value) {
  if (!Array.isArray(value)) throw new TypeError("targets must be an array");
  const urls = new Set();
  return value.map((entry, index) => {
    if (!entry || typeof entry !== "object" || Array.isArray(entry)) {
      throw new TypeError(`target ${index} must be an object`);
    }
    const name = typeof entry.name === "string" ? entry.name.trim() : "";
    if (!name) throw new TypeError(`target ${index} name must be a non-empty string`);
    if (typeof entry.url !== "string") throw new TypeError(`target ${index} url must be a string`);
    let parsed;
    try { parsed = new URL(entry.url); }
    catch { throw new TypeError(`target ${index} url must be valid`); }
    if (!['http:', 'https:'].includes(parsed.protocol)) {
      throw new TypeError(`target ${index} url must use http or https`);
    }
    if (parsed.username || parsed.password) {
      throw new TypeError(`target ${index} url must not contain credentials`);
    }
    const url = parsed.href;
    if (urls.has(url)) {
      throw new TypeError(`target ${index} url duplicates a previous normalized URL`);
    }
    urls.add(url);
    return { name, url };
  });
}
