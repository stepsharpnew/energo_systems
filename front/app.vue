<template>
  <VApp>
    <Preloader />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </VApp>
</template>

<script setup>
import Preloader from "~/components/energy-systems/Preloader.vue";

useHead({
  title: "Энергосистемы",
  meta: [
    {
      name: "description",
      content: "Энергосистемы - ГНБ под ключ, электромонтажные работы, проектирование и инженерные сети в Москве и Московской области.",
    },
  ],
  link: [
    { rel: "icon", type: "image/x-icon", href: "/favicon.ico?v=2" },
    { rel: "icon", type: "image/png", sizes: "32x32", href: "/img/image.png?v=3" },
    { rel: "apple-touch-icon", href: "/img/image.png?v=3" },
  ],
});
</script>

<style>
* {
  box-sizing: border-box;
}

html,
body {
  margin: 0;
  padding: 0;
  width: 100%;
  max-width: 100vw;
  overflow-x: hidden;
  background: #fff;
  color: #142233;
  font-family: Arial, sans-serif;
}

button,
a {
  touch-action: manipulation;
}

#__nuxt {
  width: 100%;
  max-width: 100vw;
  overflow-x: hidden;
}
</style>
