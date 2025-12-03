<template>
  <div id="app">
    <Preloader />
    <router-view />
  </div>
</template>

<script>
import Preloader from "./components/energy-systems/Preloader.vue";

export default {
  name: "App",
  components: {
    Preloader,
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  overflow-x: hidden;
  width: 100%;
  max-width: 100vw;
}

body {
  font-family: "Arial", sans-serif;
  background: #f5f5f5;
  overflow-x: hidden;
  width: 100%;
  max-width: 100vw;
}

#app {
  overflow-x: hidden;
  width: 100%;
  max-width: 100vw;
}
</style>
