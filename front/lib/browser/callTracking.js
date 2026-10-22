// Novofon's supported hook runs before its DOM replacement. Always veto the
// broad replacement: provider selectors can match headings, controls and icons.
const SCRIPT_ID = 'novofon-call-tracking'
const SCRIPT_URL = 'https://widget.novofon.ru/novofon.js?k=eAYAknhHnXHvGm2aloYuaoi6Bkrnc1dw'
const PHONE_LINKS = 'a[data-calltracking-phone]'
const PHONE_LABEL = '[data-calltracking-number]'

function phoneDigits(value) {
  if (typeof value !== 'string' && typeof value !== 'number') return ''
  const digits = String(value).replace(/\D/g, '').replace(/^8/, '7')
  return /^7\d{10}$/.test(digits) ? digits : ''
}

function matchesRule(link, id) {
  if (id.startsWith('number=')) {
    return phoneDigits(id.slice(7)) === phoneDigits(link.dataset.calltrackingPhone)
  }
  const selector = id.startsWith('selector=') ? id.slice(9) : id
  if (!selector || (!id.startsWith('selector=') && !['#', '.', '[name='].some(prefix => id.startsWith(prefix)))) return false
  try {
    // Only a phone anchor or its dedicated number label may select a source.
    // Never treat a heading, decorative span or parent container as a phone.
    return link.matches(selector) || Boolean(link.querySelector(PHONE_LABEL)?.matches(selector))
  } catch {
    return false
  }
}

export function replaceTrackedPhones(rules, document) {
  if (!Array.isArray(rules)) return
  const links = [...document.querySelectorAll(PHONE_LINKS)]
  const replacements = new Map()
  // An explicitly empty replacement list returns to the configured main phone.
  const activeRules = rules.length ? rules : links.map(link => ({
    id: `number=${link.dataset.calltrackingPhone}`, raw: link.dataset.calltrackingPhone,
  }))
  for (const rule of activeRules) {
    if (!rule || typeof rule.id !== 'string' || rule.img) continue
    const digits = phoneDigits(rule.raw)
    if (!digits) continue
    // Format the number ourselves; provider HTML must never become page markup.
    const text = `+7 (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7, 9)}-${digits.slice(9)}`
    for (const link of links) {
      const source = phoneDigits(link.dataset.calltrackingPhone)
      if (source && matchesRule(link, rule.id)) replacements.set(source, { digits, text })
    }
  }
  for (const link of links) {
    const replacement = replacements.get(phoneDigits(link.dataset.calltrackingPhone))
    if (!replacement) continue
    const href = `tel:+${replacement.digits}`
    const label = link.querySelector(PHONE_LABEL)
    if (label && label.textContent !== replacement.text) label.textContent = replacement.text
    if (link.getAttribute('href') !== href) link.setAttribute('href', href)
    // Custom CTA labels and SVG icons remain intact; their dial target is updated.
  }
}

export function loadCallTracking() {
  if (typeof window === 'undefined' || document.getElementById(SCRIPT_ID)) return
  window.__cs_onReplacePhones = (rules) => {
    try {
      replaceTrackedPhones(rules, document)
    } catch {
      // Fail closed: even malformed provider data must not enable broad writes.
    }
    return false
  }
  // Install the hook before the SDK can execute, and after page hydration.
  // Novofon's observer calls it again when SPA navigation adds phone links.
  const script = document.createElement('script')
  script.id = SCRIPT_ID
  script.async = true
  script.src = SCRIPT_URL
  document.head.appendChild(script)
}
