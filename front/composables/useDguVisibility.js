import { onBeforeUnmount, onMounted, ref } from 'vue'

// Observers measure visibility; component state owns the resulting animation.
export function useDguVisibility(element, threshold = 0.15) {
  const visible = ref(false)
  let observer
  const measure = () => {
    const rect = element.value?.getBoundingClientRect()
    visible.value = Boolean(rect && rect.top < window.innerHeight * 0.85 && rect.bottom > window.innerHeight * 0.15)
  }
  onMounted(() => {
    measure()
    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver(measure, { threshold: [0, threshold, 0.6] })
      if (element.value) observer.observe(element.value)
    }
    window.addEventListener('scroll', measure, { passive: true })
    window.addEventListener('resize', measure)
  })
  onBeforeUnmount(() => {
    observer?.disconnect()
    window.removeEventListener('scroll', measure)
    window.removeEventListener('resize', measure)
  })
  return visible
}
