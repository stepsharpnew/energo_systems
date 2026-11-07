export const METRIKA_ID = 110919120

// Capture the landing URL/referrer and queue the initial hit before Vue starts.
// The SDK itself is requested after the first paint, without delaying events.
export const METRIKA_BOOTSTRAP = `(() => {
  if (window.__energoAnalytics) return;
  window.ym = window.ym || function () { (window.ym.a = window.ym.a || []).push(arguments); };
  window.ym.l = window.ym.l || Date.now();
  window.__energoAnalytics = { lastUrl: location.href };
  window.ym(${METRIKA_ID}, 'init', { defer: true, clickmap: true, trackLinks: true, accurateTrackBounce: true });
  window.ym(${METRIKA_ID}, 'hit', location.href, { title: document.title, referer: document.referrer });
})();`

export function loadMetrika() {
  if (document.getElementById('yandex-metrika-sdk')) return
  const script = document.createElement('script')
  script.id = 'yandex-metrika-sdk'
  script.src = 'https://mc.yandex.ru/metrika/tag.js'
  script.async = true
  document.head.appendChild(script)
}

export function createPageViewTracker(browser) {
  const state = browser.__energoAnalytics ||= { lastUrl: '' }
  return () => {
    const currentUrl = browser.location.href
    if (currentUrl === state.lastUrl) return
    browser.ym?.(METRIKA_ID, 'hit', currentUrl, {
      title: browser.document.title,
      referer: state.lastUrl || browser.document.referrer,
    })
    state.lastUrl = currentUrl
  }
}
