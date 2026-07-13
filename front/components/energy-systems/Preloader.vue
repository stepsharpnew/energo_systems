<template>
  <transition name="fade">
    <div v-if="isLoading" class="preloader">
      <div class="preloader-content">
        <img
          src="/img/image.png"
          alt="Энергосистемы"
          class="preloader-logo"
        />
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "Preloader",
  data() {
    return {
      isLoading: true,
      hideTimer: null,
    };
  },
  mounted() {
    // Скрываем прелоадер через 1 секунду
    this.hideTimer = setTimeout(() => {
      this.isLoading = false;
    }, 1000);
  },
  beforeUnmount() {
    if (this.hideTimer) clearTimeout(this.hideTimer);
  },
};
</script>

<style scoped>
.preloader {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.preloader-content {
  display: flex;
  align-items: center;
  justify-content: center;
}

.preloader-logo {
  width: min(300px, 82vw);
  height: auto;
  object-fit: contain;
  animation: pulse 1.5s ease-in-out infinite;
}

@keyframes pulse {
  0%,
  100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.8;
  }
}

/* Анимация исчезновения */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Адаптивность */
@media (max-width: 768px) {
  .preloader-logo {
    width: min(260px, 82vw);
  }
}

@media (max-width: 560px) {
  .preloader-logo {
    width: min(220px, 82vw);
  }
}
</style>
