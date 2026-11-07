import { ref, onMounted, onBeforeUnmount } from 'vue'

export function useUpsVisibility(element) {
  const visible = ref(false)
  const reduced = ref(false)
  let observer
  function update() {
    const box = element.value?.getBoundingClientRect()
    visible.value = Boolean(box && box.top < window.innerHeight * .7 && box.bottom > window.innerHeight * .25)
  }
  onMounted(() => {
    reduced.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver(update, { threshold: [0, .3, .6] })
      if (element.value) observer.observe(element.value)
    }
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    update()
  })
  onBeforeUnmount(() => { observer?.disconnect(); window.removeEventListener('scroll', update); window.removeEventListener('resize', update) })
  return { visible, reduced }
}
