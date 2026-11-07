<template>
  <i class="site-icon" aria-hidden="true" :style="{ fontSize: `${size}px`, height: `${size}px`, width: `${size}px` }">
    <svg class="site-icon__svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path :d="paths[name]" />
    </svg>
  </i>
</template>

<script>
// The existing six Vuetify mdi-svg paths retain their original viewBox and shape.
// MIT copyright 2016-now Vuetify, LLC; see licenses/vuetify.txt.
const paths = {
  complete: 'M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z',
  success: 'M12,2C17.52,2 22,6.48 22,12C22,17.52 17.52,22 12,22C6.48,22 2,17.52 2,12C2,6.48 6.48,2 12,2M11,16.5L18,9.5L16.59,8.09L11,13.67L7.91,10.59L6.5,12L11,16.5Z',
  dropdown: 'M7,10L12,15L17,10H7Z',
  arrowdown: 'M11 4h2v12l5.5-5.5l1.42 1.42L12 19.84l-7.92-7.92L5.5 10.5L11 16z',
  arrowleft: 'M20 11v2H8l5.5 5.5l-1.42 1.42L4.16 12l7.92-7.92L13.5 5.5L8 11z',
  arrowright: 'M4 11v2h12l-5.5 5.5l1.42 1.42L19.84 12l-7.92-7.92L10.5 5.5L16 11z',
}
</script>

<script setup>
defineProps({
  name: { type: String, required: true },
  size: { type: [Number, String], default: 24 },
})
</script>

<style scoped>
.site-icon {
  align-items: center;
  display: inline-flex;
  font-feature-settings: 'liga';
  justify-content: center;
  letter-spacing: normal;
  line-height: 1;
  min-width: 1em;
  position: relative;
  text-indent: 0;
  text-align: center;
  user-select: none;
  vertical-align: middle;
}
.site-icon__svg { fill: currentColor; width: 100%; height: 100%; }
</style>
