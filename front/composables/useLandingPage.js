import { onBeforeUnmount, onMounted, ref } from 'vue'
import { getLeadAttribution } from '../utils/attribution.js'

// DOM reads are limited to viewport measurements; Vue owns the rendered state.
export function useLandingPage(root, options = {}) {
  const isWorkingHours = ref(false)
  const headerScrolled = ref(false)
  const stickyVisible = ref(false)
  const reducedMotion = ref(false)
  let interval, frame, motion

  const updateHours = () => {
    const parts = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Europe/Moscow', weekday: 'short', hour: '2-digit', hourCycle: 'h23',
    }).formatToParts(new Date())
    const value = type => parts.find(part => part.type === type)?.value
    isWorkingHours.value = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].includes(value('weekday'))
      && Number(value('hour')) >= 9 && Number(value('hour')) < 18
  }
  const updateViewport = () => {
    frame = undefined
    headerScrolled.value = window.scrollY > 8
    if (window.scrollY <= (options.stickyMinScroll ?? 0)) {
      stickyVisible.value = false
      return
    }
    const selectors = options.stickySelectors || '.hero__cta .btn-pill, #quiz, .pcard__cta .btn-pill, .cases__cta .btn-pill, .trust-sec__cta .btn-pill'
    const ctaVisible = [...(root.value?.querySelectorAll(selectors) || [])].some(element => {
      // Reading a descendant of a skipped content-visibility section forces it
      // to render. Its outer section is enough to reject offscreen controls.
      const section = element.closest('main > section')
      if (section && section !== element) {
        const bounds = section.getBoundingClientRect()
        if (bounds.bottom <= 0 || bounds.top >= window.innerHeight) return false
      }
      const bounds = element.getBoundingClientRect()
      return bounds.width > 0 && bounds.height > 0 && bounds.bottom > 0 && bounds.top < window.innerHeight
    })
    stickyVisible.value = window.scrollY > (options.stickyMinScroll ?? 0) && !ctaVisible
  }
  const queueViewport = () => {
    if (frame === undefined) frame = requestAnimationFrame(updateViewport)
  }
  const updateMotion = () => { reducedMotion.value = motion.matches }

  onMounted(() => {
    getLeadAttribution()
    updateHours()
    interval = setInterval(updateHours, 60000)
    motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    updateMotion()
    motion.addEventListener('change', updateMotion)
    window.addEventListener('scroll', queueViewport, { passive: true })
    window.addEventListener('resize', queueViewport)
    updateViewport()
  })
  onBeforeUnmount(() => {
    clearInterval(interval)
    if (frame !== undefined) cancelAnimationFrame(frame)
    motion?.removeEventListener('change', updateMotion)
    window.removeEventListener('scroll', queueViewport)
    window.removeEventListener('resize', queueViewport)
  })
  return { isWorkingHours, headerScrolled, stickyVisible, reducedMotion }
}
