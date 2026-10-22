import { loadCallTracking } from '../lib/browser/callTracking.js'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('app:mounted', loadCallTracking)
})
