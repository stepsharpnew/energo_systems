<template>
  <div class="home">
    <EnergySystems />
  </div>
</template>

<script setup>
import EnergySystems from '~/components/EnergySystems.vue'

useHead({
  link: [
    { rel: 'preload', as: 'image', type: 'image/webp', href: '/img/background.webp', fetchpriority: 'high' },
  ],
})
</script>
