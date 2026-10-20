const ATTRIBUTION_KEYS = [
  'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content',
  'utm_id', 'utm_source_platform', 'utm_creative_format', 'utm_marketing_tactic',
  'utm_referer', 'gclid', 'yclid', 'gbraid', 'wbraid', '_openstat',
]
const STORAGE_KEY = 'e-systems:attribution'

export function getAttributionQuery(query = {}) {
  const attribution = {}
  for (const key of ATTRIBUTION_KEYS) {
    const value = Array.isArray(query?.[key]) ? query[key][0] : query?.[key]
    if (typeof value === 'string' && value) attribution[key] = value
  }
  return attribution
}

export function createAttributionSession(getStorage) {
  let current = {}

  return {
    resolve(query) {
      const incoming = getAttributionQuery(query)
      if (Object.keys(incoming).length) {
        // A new campaign replaces the old one, including its click IDs.
        current = incoming
        try {
          getStorage().setItem(STORAGE_KEY, JSON.stringify(current))
        } catch {
          // Navigation still works when browser storage is unavailable.
        }
      } else if (!Object.keys(current).length) {
        try {
          current = getAttributionQuery(JSON.parse(getStorage().getItem(STORAGE_KEY)))
        } catch {
          // Ignore corrupt or inaccessible storage.
        }
      }
      return { ...current, ...query }
    },
  }
}

// Used only by client-side middleware; nothing is persisted during prerendering.
export const attributionSession = createAttributionSession(() => window.sessionStorage)

export function withAttributionUrl(href, baseUrl, query) {
  const attribution = getAttributionQuery(query)
  if (!href || href.startsWith('#') || !Object.keys(attribution).length) return href

  let url
  try {
    url = new URL(href, baseUrl)
  } catch {
    return href
  }
  const base = new URL(baseUrl)
  if (
    !['http:', 'https:'].includes(url.protocol) || url.origin !== base.origin ||
    /^\/api(?:\/|$)/.test(url.pathname) || /\.[^/]+$/.test(url.pathname)
  ) return href

  // Explicitly tagged links represent a separate campaign.
  if (Object.keys(getAttributionQuery(Object.fromEntries(url.searchParams))).length) return href

  for (const [key, value] of Object.entries(attribution)) {
    if (!url.searchParams.has(key)) url.searchParams.set(key, value)
  }
  return url.href
}
