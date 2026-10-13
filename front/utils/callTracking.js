export const DEFAULT_PHONE_NUMBER = '74951780118'

const CALL_TRACKING_URL = 'https://1ats.ru/vats/api/callTracking/getNumber?apiKey=2c8de6cc488006772c8de6cc49800678'
const LABEL_NAMES = [
  '_openstat', 'utm_source', 'utm_campaign', 'utm_medium', 'utm_term',
  'utm_content', 'gclid', 'yclid', 'utm_referer',
]

export function getFilledLabelsArray(search, referrer = '') {
  const parameters = new URLSearchParams(search)
  const labels = []

  for (const type of LABEL_NAMES) {
    const value = parameters.get(type)
    if (value) labels.push({ type, value })
  }

  if (referrer) labels.push({ type: 'http_referer', value: referrer })
  return labels
}

export async function requestTrackingNumber(labels, fetchImpl = globalThis.fetch) {
  if (!labels.length) return null

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 8000)

  try {
    const response = await fetchImpl(CALL_TRACKING_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(labels),
      signal: controller.signal,
    })
    if (response.status !== 200) return null

    // Accept a phone number, never insert the service response as HTML.
    const text = (await response.text()).trim()
    if (!/^\+?[\d\s()-]+$/.test(text)) return null
    const digits = text.replace(/\D/g, '')
    return /^[78]\d{10}$/.test(digits) ? `7${digits.slice(1)}` : null
  } catch {
    // Keep the default number if the service is unavailable or blocked.
    return null
  } finally {
    clearTimeout(timeout)
  }
}
