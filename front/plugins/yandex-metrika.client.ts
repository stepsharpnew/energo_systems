const YANDEX_METRIKA_ID = 110919120

declare global {
  interface Window {
    ym?: (...args: unknown[]) => void
  }
}

export default defineNuxtPlugin((nuxtApp) => {
  let previousUrl = document.referrer
  let lastTrackedUrl = ''

  const trackPageView = () => {
    const currentUrl = window.location.href

    // Nuxt can report the initial route through more than one lifecycle hook.
    // Do not send the same page view twice.
    if (currentUrl === lastTrackedUrl) {
      return
    }

    window.ym?.(YANDEX_METRIKA_ID, 'hit', currentUrl, {
      title: document.title,
      referer: previousUrl,
    })

    previousUrl = currentUrl
    lastTrackedUrl = currentUrl
  }

  nuxtApp.hook('app:mounted', trackPageView)
  nuxtApp.$router.afterEach(() => nextTick(trackPageView))
})

