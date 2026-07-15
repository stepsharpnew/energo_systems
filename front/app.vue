<template>
  <VApp>
    <Preloader v-if="showPreloader" />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </VApp>
</template>

<script setup>
import Preloader from "~/components/energy-systems/Preloader.vue";

const route = useRoute();
const showPreloader = computed(() => route.path !== "/privacy");

useHead({
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
