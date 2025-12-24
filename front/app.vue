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

