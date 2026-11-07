import { loadCallTracking } from '../lib/browser/callTracking.js'
import { afterFirstPaint } from '../lib/browser/afterPaint.js'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('app:mounted', () => afterFirstPaint(loadCallTracking))
})
