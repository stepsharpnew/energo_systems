import { createPageViewTracker, loadMetrika } from '../lib/browser/analytics.js'
import { afterFirstPaint } from '../lib/browser/afterPaint.js'

export default defineNuxtPlugin((nuxtApp) => {
  const trackPageView = createPageViewTracker(window)
  nuxtApp.hook('app:mounted', () => {
    trackPageView()
    afterFirstPaint(loadMetrika)
  })
  nuxtApp.$router.afterEach(() => nextTick(trackPageView))
})
