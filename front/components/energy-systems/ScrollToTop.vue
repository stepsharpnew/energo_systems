<template>
  <button
    v-if="show"
    class="scroll-top-button"
    type="button"
    @click="scrollToTop"
  >
    ↑ Наверх
  </button>
</template>

<script>
export default {
  name: 'ScrollToTop',
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
}
</script>

<style scoped>
.scroll-top-button {
  position: fixed;
  bottom: clamp(20px, 3vw, 32px);
  right: clamp(20px, 3vw, 32px);
  border: none;
  border-radius: 50px;
  padding: clamp(10px, 1.5vw, 14px) clamp(16px, 2.5vw, 20px);
  background: linear-gradient(135deg, #ff4800, #ff7a2f);
  color: #fff;
  font-weight: 600;
  font-size: clamp(13px, 1.5vw, 15px);
  cursor: pointer;
  box-shadow: 0 8px 24px rgba(255, 72, 0, 0.4);
  z-index: 9998;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

.scroll-top-button:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(255, 72, 0, 0.5);
  background: linear-gradient(135deg, #ff7a2f, #ff4800);
}

.scroll-top-button:active {
  transform: translateY(-2px);
}
</style>
