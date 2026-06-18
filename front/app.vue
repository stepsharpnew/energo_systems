<template>
  <VApp>
    <Preloader />
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
    { name: 'description', content: 'Энергосистемы - эксперты в сфере энергетики. ГНБ, электромонтажные работы, проектирование.' }
  ],
  link: [
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico?v=2' },
    { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/img/LOGO-electro.png?v=2' },
    { rel: 'apple-touch-icon', href: '/img/LOGO-electro.png?v=2' }
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
  background: #f5f5f5;
}

#__nuxt {
  overflow-x: hidden;
  width: 100%;
  max-width: 100vw;
}
</style>

