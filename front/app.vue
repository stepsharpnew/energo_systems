<template>
  <VApp>
    <ClientOnly>
      <Preloader />
    </ClientOnly>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </VApp>
</template>

<script setup>
import Preloader from '~/components/energy-systems/Preloader.vue'

// Устанавливаем title и meta теги
useHead({
  title: 'Энергосистемы',
  meta: [
    { name: 'description', content: 'Энергосистемы - ГНБ под ключ, электромонтажные работы, проектирование и инженерные сети в Москве и Московской области.' }
  ],
  link: [
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico?v=2' },
    { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/img/image.png?v=3' },
    { rel: 'apple-touch-icon', href: '/img/image.png?v=3' }
  ]
})
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body {
  margin: 0;
  padding: 0;
  overflow-x: hidden;
  width: 100%;
  max-width: 100vw;
  font-family: "Arial", sans-serif;
  background: #fff;
}

#__nuxt {
  overflow-x: hidden;
  width: 100%;
  max-width: 100vw;
}
</style>
