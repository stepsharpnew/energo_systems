import { getFilledLabelsArray, requestTrackingNumber } from '~/utils/callTracking'

export default defineNuxtPlugin((nuxtApp) => {
  const phoneNumber = useTrackingPhoneNumber()

  nuxtApp.hook('app:mounted', () => {
    const labels = getFilledLabelsArray(window.location.search, document.referrer)

    // Start once after hydration; shared state also covers later page changes.
    void requestTrackingNumber(labels).then((number) => {
      if (number) phoneNumber.value = number
    })
  })
})
