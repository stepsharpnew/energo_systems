const ATTRIBUTION_KEYS = [
  "utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term",
  "utm_id", "utm_source_platform", "utm_creative_format", "utm_marketing_tactic",
  "utm_referer", "gclid", "yclid", "gbraid", "wbraid", "_openstat",
];

function normalizeAttribution(value) {
  if (value === undefined) return {};
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;

  const attribution = {};
  for (const [key, entry] of Object.entries(value)) {
    if (!ATTRIBUTION_KEYS.includes(key) || typeof entry !== "string" ||
        entry.length > 1000 || /[\r\n]/.test(entry)) return null;
    if (entry.trim()) attribution[key] = entry.trim();
  }
  return attribution;
}

module.exports = { ATTRIBUTION_KEYS, normalizeAttribution };
