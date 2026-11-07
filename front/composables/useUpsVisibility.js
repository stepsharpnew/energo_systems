import { ref, onMounted, onBeforeUnmount } from 'vue'
import { observeViewportBand } from '../utils/viewportVisibility.js'

export function useUpsVisibility(element) {
  const visible = ref(false)
  const reduced = ref(false)
  let stop
  onMounted(() => {
    reduced.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    stop = observeViewportBand(element.value, value => { visible.value = value }, { top: .25, bottom: .7 })
  })
  onBeforeUnmount(() => stop?.())
  return { visible, reduced }
}
