<template>
  <div class="home">
    <EnergySystems />
  </div>
</template>

<script setup>
import EnergySystems from '~/components/EnergySystems.vue'
import { imageAttrs } from '~/utils/responsiveImage.js'

const heroImage = imageAttrs('/img/background.webp', { width: 1200, sizes: '100vw' })

useHead({
  link: [
    { rel: 'preload', as: 'image', type: 'image/webp', href: heroImage.src, imagesrcset: heroImage.srcset, imagesizes: heroImage.sizes, fetchpriority: 'high' },
  ],
})
</script>
