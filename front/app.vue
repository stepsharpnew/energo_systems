<template>
  <div class="site-app">
    <div class="site-app__wrap">
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </div>
  </div>
</template>

<script setup>
import criticalBase from '~/assets/styles/critical-base.css?raw'
useHead({
  style: [{ key: 'critical-base', innerHTML: criticalBase }],
  title: "Энергосистемы",
  meta: [
    {
      name: "description",
      content: "Энергосистемы - ГНБ под ключ, электромонтажные работы, проектирование и инженерные сети в Москве и Московской области.",
    },
  ],
  link: [
    { rel: "icon", type: "image/x-icon", href: "/favicon.ico?v=4" },
    { rel: "icon", type: "image/png", sizes: "32x32", href: "/img/icons/favicon-32x32.png?v=4" },
    { rel: "apple-touch-icon", sizes: "180x180", href: "/img/icons/apple-touch-icon.png?v=4" },
  ],
});
</script>
