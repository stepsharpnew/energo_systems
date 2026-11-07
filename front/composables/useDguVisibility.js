import { onBeforeUnmount, onMounted, ref } from 'vue'
import { observeViewportBand } from '../utils/viewportVisibility.js'

export function useDguVisibility(element) {
  const visible = ref(false)
  let stop
  onMounted(() => {
    stop = observeViewportBand(element.value, value => { visible.value = value }, { top: .15, bottom: .85 })
  })
  onBeforeUnmount(() => stop?.())
  return visible
}
