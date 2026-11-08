<template>
  <div class="home">
    <EnergySystems />
  </div>
</template>

<script setup>
import EnergySystems from '~/components/EnergySystems.vue'
import { imageAttrs } from '~/utils/responsiveImage.js'
import { createPageSeo } from '~/utils/pageSeo.js'

const heroImage = imageAttrs('/img/background.webp', { width: 1200, sizes: '100vw' })

useHead(createPageSeo({
  path: '/',
  title: 'Энергосистемы — ГНБ, электромонтаж и инженерные сети',
  description: 'Энергосистемы - ГНБ под ключ, электромонтажные работы, проектирование и инженерные сети в Москве и Московской области.',
  image: '/img/background.webp',
  imageAlt: 'Электротехническое оборудование на объекте Энергосистемы',
}, {
  link: [
    { rel: 'preload', as: 'image', type: 'image/webp', href: heroImage.src, imagesrcset: heroImage.srcset, imagesizes: heroImage.sizes, fetchpriority: 'high' },
  ],
}))
</script>
