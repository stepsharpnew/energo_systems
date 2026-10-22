<template>
  <a ref="phoneLink" class="phone-link" href="tel:+74951795920">
    <slot><span>+7 (495) 179-59-20</span></slot>
  </a>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'

const phoneLink = ref(null)
let observer

function syncPhoneHref() {
  const link = phoneLink.value
  const text = link?.textContent?.trim() || ''
  // A selector targeting the inner span changes the text but leaves href intact.
  // Only synchronize a complete phone number; preserve custom link labels.
  if (!/^\+?[78](?:[\s().\-‒‑–]*\d){10}$/.test(text)) return

  const digits = text.replace(/\D/g, '').replace(/^8/, '7')
  const href = `tel:+${digits}`
  if (link.getAttribute('href') !== href) link.setAttribute('href', href)
}

onMounted(() => {
  syncPhoneHref()
  observer = new MutationObserver(syncPhoneHref)
  observer.observe(phoneLink.value, { childList: true, characterData: true, subtree: true })
})

onBeforeUnmount(() => observer?.disconnect())
</script>

<style scoped>
.phone-link {
  white-space: nowrap;
}
</style>
