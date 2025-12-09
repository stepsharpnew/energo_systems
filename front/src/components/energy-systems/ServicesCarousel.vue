<template>
  <section class="services-carousel" ref="servicesSection">
    <div class="container-1">
      <h2 class="section-title">Наши услуги</h2>
      <div class="carousel-indicators">
        <button
          v-for="(service, index) in services"
          :key="`indicator-${index}`"
          class="indicator-dot"
          :class="{ active: index === activeIndex }"
          @click="goToSlide(index)"
          :aria-label="`Перейти к услуге ${index + 1}`"
        ></button>
      </div>
      <div class="image-slide">
        <img src="..//../assets/slide-carosel.png"/>
      </div>
      
      <div 
        class="carousel-wrapper" 
        ref="carouselWrapper"
        @mouseenter="showNavButtons = true"
        @mouseleave="showNavButtons = false"
      >
        <div 
          class="carousel-track"
          :style="{ transform: `translateX(-${activeIndex * 100}%)` }"
        >
          <div
            v-for="(service, index) in services"
            :key="`card-${service.id}`"
            class="carousel-card"
            :class="{ active: index === activeIndex }"
            :style="getCardStyle(service)"
            @click="handleServiceClick(service, index)"
          >
            <span class="service-name">{{ service.name }}</span>
          </div>
        </div>
        
        <button
          class="carousel-nav carousel-nav-prev"
          :class="{ 'is-visible': showNavButtons }"
          @click="prevSlide"
          aria-label="Предыдущий слайд"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.5" fill="rgba(255, 255, 255, 0.1)"/>
            <path d="M14 8l-4 4 4 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <button
          class="carousel-nav carousel-nav-next"
          :class="{ 'is-visible': showNavButtons }"
          @click="nextSlide"
          aria-label="Следующий слайд"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.5" fill="rgba(255, 255, 255, 0.1)"/>
            <path d="M10 8l4 4-4 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>
      
      <div class="carousel-description-wrapper">
        <transition name="description-flight" mode="out-in">
          <div
            class="carousel-description"
            v-if="activeService"
            :key="activeService.id"
          >
            <h2>{{ activeService.name }}</h2>
            <p>{{ activeService.description }}</p>
          </div>
        </transition>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "ServicesCarousel",
  props: {
    services: {
      type: Array,
      required: true,
    },
  },
  emits: ["open-service-modal"],
  data() {
    return {
      activeIndex: 0,
      autoPlayInterval: null,
      isTransitioning: false,
      showNavButtons: false,
    };
  },
  computed: {
    activeService() {
      return this.services[this.activeIndex] || null;
    },
  },
  mounted() {
    this.startAutoPlay();
    // Поддержка свайпов на мобильных
    this.initTouchHandlers();
  },
  beforeUnmount() {
    this.stopAutoPlay();
    this.removeTouchHandlers();
  },
  methods: {
    getCardStyle(service) {
      const layers = [
        "linear-gradient(135deg, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.7))",
      ];
      if (service.image) {
        layers.push(`url(${service.image})`);
      }
      return {
        backgroundImage: layers.join(", "),
      };
    },
    handleServiceClick(service, index) {
      // Если кликнули на уже активный слайд, открываем модалку
      if (this.activeIndex === index) {
        this.$emit("open-service-modal", service);
        return;
      }
      // Переключаем на выбранный слайд
      this.goToSlide(index, true);
    },
    goToSlide(index, isManual = false) {
      if (this.isTransitioning) return;
      if (index === this.activeIndex && !isManual) return;
      
      // Сбрасываем таймер при ручном переходе
      if (isManual) {
        this.resetAutoPlay();
      }
      
      this.isTransitioning = true;
      this.activeIndex = index;
      
      setTimeout(() => {
        this.isTransitioning = false;
      }, 500);
    },
    nextSlide() {
      if (this.isTransitioning) return;
      
      this.isTransitioning = true;
      this.activeIndex = (this.activeIndex + 1) % this.services.length;
      
      setTimeout(() => {
        this.isTransitioning = false;
      }, 500);
    },
    prevSlide() {
      if (this.isTransitioning) return;
      
      this.isTransitioning = true;
      this.activeIndex = (this.activeIndex - 1 + this.services.length) % this.services.length;
      
      setTimeout(() => {
        this.isTransitioning = false;
      }, 500);
      
      // Сбрасываем таймер при ручном переходе
      this.resetAutoPlay();
    },
    startAutoPlay() {
      this.stopAutoPlay();
      this.autoPlayInterval = setInterval(() => {
        this.nextSlide();
      }, 5000);
    },
    stopAutoPlay() {
      if (this.autoPlayInterval) {
        clearInterval(this.autoPlayInterval);
        this.autoPlayInterval = null;
      }
    },
    resetAutoPlay() {
      this.stopAutoPlay();
      this.startAutoPlay();
    },
    initTouchHandlers() {
      const wrapper = this.$refs.carouselWrapper;
      if (!wrapper) return;
      
      let touchStartX = 0;
      let touchEndX = 0;
      
      wrapper.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
      }, { passive: true });
      
      wrapper.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        this.handleSwipe(touchStartX, touchEndX);
      }, { passive: true });
    },
    removeTouchHandlers() {
      const wrapper = this.$refs.carouselWrapper;
      if (!wrapper) return;
      // Обработчики будут удалены автоматически при размонтировании компонента
    },
    handleSwipe(startX, endX) {
      const swipeThreshold = 50;
      const diff = startX - endX;
      
      if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
          // Свайп влево - следующий слайд
          this.nextSlide();
        } else {
          // Свайп вправо - предыдущий слайд
          this.prevSlide();
        }
        // Сбрасываем таймер при ручном переходе
        this.resetAutoPlay();
      }
    },
  },
};
</script>

<style scoped>
.container-1 {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  width: 100%;
  box-sizing: border-box;
}

.services-carousel {
  padding: clamp(36px, 6vw, 72px) 0 20px;
  position: relative;
  overflow-x: hidden;
  width: 100%;
  max-width: 100vw;
  box-sizing: border-box;
}

.section-title {
  font-size: clamp(28px, 4vw, 42px);
  font-weight: 700;
  color: #111827;
  margin: 0 0 clamp(16px, 2vw, 24px) 0;
  text-align: center;
  letter-spacing: -0.02em;
}

.carousel-indicators {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: clamp(8px, 1.2vw, 12px);
  margin: 0 0 clamp(20px, 3vw, 32px) 0;
  flex-wrap: wrap;
  padding: 0 24px;
}

.indicator-dot {
  width: clamp(10px, 1.5vw, 14px);
  height: clamp(10px, 1.5vw, 14px);
  border-radius: 50%;
  border: 2px solid rgba(15, 23, 42, 0.3);
  background: transparent;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  padding: 0;
  position: relative;
  outline: none;
}

.indicator-dot:hover {
  border-color: rgba(15, 23, 42, 0.6);
  transform: scale(1.2);
}

.indicator-dot.active {
  background: #ef4422;
  border-color: #ef4422;
  width: clamp(14px, 2vw, 18px);
  height: clamp(14px, 2vw, 18px);
  box-shadow: 0 0 0 3px rgba(239, 68, 34, 0.2);
}

.indicator-dot:focus-visible {
  outline: 2px solid #ef4422;
  outline-offset: 2px;
}

.image-slide {
  width: 100%;
  display: none;
  justify-content: center;
}

.image-slide img {
  width: 35px;
  height: 35px;
  opacity: 0.2;
  animation: slide-hint 5s linear infinite;
}

@keyframes slide-hint {
  0% {
    transform: translateX(50px);
  }
  99.9% {
    transform: translateX(-50px);
  }
  100% {
    transform: translateX(50px);
  }
}

.carousel-wrapper {
  position: relative;
  width: 100%;
  overflow: hidden;
  margin: 0 auto;
  padding: 40px 0;
}

.carousel-track {
  display: flex;
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  will-change: transform;
}

.carousel-card {
  flex: 0 0 100%;
  min-width: 100%;
  height: clamp(320px, 38vw, 480px);
  border-radius: 28px;
  border: none;
  color: #fff;
  font-size: clamp(18px, 2vw, 24px);
  font-weight: 600;
  text-align: left;
  padding: clamp(24px, 3.5vw, 40px);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  background-size: cover;
  background-position: center;
  position: relative;
  cursor: pointer;
  transition: transform 0.3s ease, opacity 0.3s ease, filter 0.3s ease;
  transform: scale(0.9);
  opacity: 0.7;
}

.carousel-card.active {
  transform: scale(1);
  opacity: 1;
}

.carousel-card:hover {
  filter: brightness(1.15) saturate(1.15);
}

.carousel-card.active:hover {
  filter: brightness(1.2) saturate(1.2);
}

.service-name {
  z-index: 1;
  line-height: 1.3;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
}

.carousel-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%) scale(0.8);
  width: 56px;
  height: 56px;
  border-radius: 50%;
  border: none;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  color: #ef4422;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  pointer-events: none;
}

.carousel-nav.is-visible {
  opacity: 1;
  visibility: visible;
  pointer-events: auto;
}

.carousel-nav:hover {
  background: #fff;
  transform: translateY(-50%) scale(1);
  box-shadow: 0 8px 24px rgba(239, 68, 34, 0.3);
  color: #ef4422;
}

.carousel-nav:active {
  transform: translateY(-50%) scale(0.95);
}

.carousel-nav svg {
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
  transition: transform 0.2s ease;
}

.carousel-nav:hover svg {
  transform: scale(1.1);
}

.carousel-nav-prev:hover svg {
  transform: scale(1.1) translateX(-2px);
}

.carousel-nav-next:hover svg {
  transform: scale(1.1) translateX(2px);
}

.carousel-nav-prev {
  left: 20px;
}

.carousel-nav-next {
  right: 20px;
}

.carousel-description-wrapper {
  margin-top: clamp(16px, 2.5vw, 28px);
  height: 240px;
  min-height: 240px;
  max-height: 240px;
}

.carousel-description {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-radius: 24px;
  padding: clamp(20px, 3vw, 32px);
  text-align: center;
  height: 100%;
  max-height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-sizing: border-box;
  overflow: hidden;
}

.carousel-description h2 {
  margin: 0 0 8px 0;
  font-size: clamp(22px, 3vw, 28px);
  font-weight: 700;
  color: #111827;
  line-height: 1.2;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.carousel-description p {
  margin: 0;
  color: #4a5568;
  font-size: clamp(14px, 1.8vw, 18px);
  line-height: 1.5;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  flex: 1;
}

.description-flight-enter-active,
.description-flight-leave-active {
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

.description-flight-enter-from,
.description-flight-leave-to {
  opacity: 0;
  transform: translateY(20px) scale(0.95);
}

.description-flight-enter-to,
.description-flight-leave-from {
  opacity: 1;
  transform: translateY(0) scale(1);
}

@media (max-width: 992px) {
  .carousel-wrapper {
    padding: 40px 0;
  }

  .carousel-card {
    height: clamp(220px, 42vw, 320px);
  }

  .carousel-nav {
    display: none;
  }
}

@media (max-width: 768px) {
  .image-slide {
    display: flex;
  }

  .container-1 {
    padding: 0 16px;
  }

  .section-title {
    font-size: clamp(24px, 5vw, 32px);
    margin-bottom: clamp(12px, 2vw, 20px);
  }

  .carousel-indicators {
    gap: 8px;
    margin-bottom: clamp(16px, 2.5vw, 24px);
    padding: 0 16px;
  }

  .indicator-dot {
    width: 10px;
    height: 10px;
  }

  .indicator-dot.active {
    width: 12px;
    height: 12px;
  }

  .carousel-wrapper {
    padding: 30px 0;
  }

  .carousel-card {
    height: 220px;
    font-size: 16px;
    padding: 20px;
    border-radius: 20px;
  }

  .carousel-description-wrapper {
    margin-top: clamp(12px, 2vw, 20px);
    height: 180px;
    min-height: 180px;
    max-height: 180px;
  }

  .carousel-description {
    padding: 16px;
    border-radius: 20px;
  }

  .carousel-description h2 {
    font-size: 18px;
    margin-bottom: 6px;
    -webkit-line-clamp: 2;
  }

  .carousel-description p {
    font-size: 13px;
    line-height: 1.4;
    -webkit-line-clamp: 4;
  }
}

@media (max-width: 560px) {
  .container-1 {
    padding: 0 12px;
  }

  .carousel-indicators {
    gap: 6px;
    padding: 0 12px;
  }

  .indicator-dot {
    width: 8px;
    height: 8px;
    border-width: 1.5px;
  }

  .indicator-dot.active {
    width: 10px;
    height: 10px;
  }

  .carousel-wrapper {
    padding: 30px 0;
  }

  .carousel-card {
    height: 180px;
    padding: 16px;
  }

  .carousel-description-wrapper {
    height: 130px;
    min-height: 130px;
    max-height: 130px;
  }

  .carousel-description {
    padding: 14px;
  }

  .carousel-description h2 {
    font-size: 16px;
    margin-bottom: 4px;
    -webkit-line-clamp: 1;
  }

  .carousel-description p {
    font-size: 12px;
    line-height: 1.3;
    -webkit-line-clamp: 4;
  }
}
</style>
