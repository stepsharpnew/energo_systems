<template>
  <section class="services-carousel" ref="servicesSection">
    <div class="container-1">
      <div class="services-heading">
        <div>
          <p class="section-kicker">Услуги</p>
          <h2>Наши услуги</h2>
        </div>
        <p>
          Комплекс работ для подключения, строительства и эксплуатации объектов
          электроснабжения.
        </p>
      </div>

      <div class="services-directory" aria-label="Направления услуг">
        <button
          v-for="(service, index) in services"
          :key="`directory-${service.id}`"
          class="directory-item"
          :class="{ active: index === activeIndex }"
          type="button"
          @click="goToSlide(index, true)"
        >
          <span>{{ formatNumber(index + 1) }}</span>
          {{ shortServiceName(service) }}
        </button>
      </div>

      <div
        class="showcase-shell"
        ref="carouselWrapper"
        @mouseenter="stopAutoPlay"
        @mouseleave="startAutoPlay"
        @focusin="stopAutoPlay"
        @focusout="startAutoPlay"
        @touchstart.passive="onTouchStart"
        @touchend.passive="onTouchEnd"
      >
        <div class="showcase-copy">
          <span class="slide-counter">
            {{ activeNumber }} / {{ totalNumber }}
          </span>

          <transition name="copy-fade" mode="out-in">
            <div
              v-if="activeService"
              :key="activeService.id"
              class="service-copy-body"
            >
              <h3>{{ activeService.name }}</h3>
              <p>{{ activeService.description }}</p>
            </div>
          </transition>

          <div v-if="activeService" class="showcase-actions">
            <button class="primary-action" type="button" @click="openActiveService">
              Подробнее
            </button>
            <NuxtLink
              v-if="activeService.id === 'hdd'"
              class="secondary-link"
              to="/services/hdd"
            >
              Страница ГНБ
            </NuxtLink>
          </div>
        </div>

        <div class="showcase-media">
          <transition name="image-fade" mode="out-in">
            <div
              v-if="activeService"
              :key="activeService.id"
              class="media-image"
              :style="getImageStyle(activeService)"
              role="img"
              :aria-label="activeService.name"
            ></div>
          </transition>

          <div class="media-caption" aria-hidden="true">
            <span>Энергосистемы</span>
            <span>Инженерные работы</span>
          </div>

          <div class="carousel-controls">
            <button
              class="carousel-nav"
              type="button"
              @click="prevSlide(true)"
              aria-label="Предыдущая услуга"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <path d="M15 6 9 12l6 6" />
              </svg>
            </button>
            <button
              class="carousel-nav"
              type="button"
              @click="nextSlide(true)"
              aria-label="Следующая услуга"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <path d="m9 6 6 6-6 6" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div class="carousel-dots" aria-label="Выбор услуги">
        <button
          v-for="(service, index) in services"
          :key="`dot-${service.id}`"
          class="carousel-dot"
          :class="{ active: index === activeIndex }"
          type="button"
          @click="goToSlide(index, true)"
          :aria-label="`Показать услугу ${index + 1}`"
          :aria-current="index === activeIndex ? 'true' : undefined"
        >
          <span class="carousel-dot-mark" aria-hidden="true"></span>
        </button>
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
      touchStartX: 0,
    };
  },
  computed: {
    activeService() {
      return this.services[this.activeIndex] || null;
    },
    activeNumber() {
      return this.formatNumber(this.activeIndex + 1);
    },
    totalNumber() {
      return this.formatNumber(this.services.length);
    },
  },
  mounted() {
    this.startAutoPlay();
  },
  beforeUnmount() {
    this.stopAutoPlay();
  },
  methods: {
    formatNumber(value) {
      return String(value).padStart(2, "0");
    },
    shortServiceName(service) {
      const labels = {
        hdd: "ГНБ под ключ",
        road: "Подключение к сетям",
        water: "Технические условия",
        sewer: "Согласование проекта",
        power: "Электромонтаж",
        gas: "Пуско-наладка",
        design: "Эксплуатация объектов",
        support: "Ремонт сетей",
        heating: "Электролаборатория",
        monitoring: "Вынос электросетей",
      };

      return labels[service?.id] || service?.name || "Услуга";
    },
    getImageStyle(service) {
      const layers = [
        "linear-gradient(90deg, rgba(8, 22, 35, 0.1), rgba(8, 22, 35, 0.34))",
      ];

      if (service?.image) {
        layers.push(`url(${service.image})`);
      }

      return {
        backgroundImage: layers.join(", "),
      };
    },
    openActiveService() {
      if (!this.activeService) return;
      this.$emit("open-service-modal", this.activeService);
    },
    goToSlide(index, isManual = false) {
      if (this.isTransitioning || this.services.length === 0) return;

      const nextIndex = (index + this.services.length) % this.services.length;
      if (nextIndex === this.activeIndex) return;

      if (isManual) {
        this.resetAutoPlay();
      }

      this.isTransitioning = true;
      this.activeIndex = nextIndex;

      setTimeout(() => {
        this.isTransitioning = false;
      }, 420);
    },
    nextSlide(isManual = false) {
      this.goToSlide(this.activeIndex + 1, isManual);
    },
    prevSlide(isManual = false) {
      this.goToSlide(this.activeIndex - 1, isManual);
    },
    startAutoPlay() {
      this.stopAutoPlay();
      if (this.services.length <= 1) return;

      this.autoPlayInterval = setInterval(() => {
        this.nextSlide(false);
      }, 6500);
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
    onTouchStart(event) {
      this.touchStartX = event.changedTouches[0]?.screenX || 0;
    },
    onTouchEnd(event) {
      const touchEndX = event.changedTouches[0]?.screenX || 0;
      this.handleSwipe(this.touchStartX, touchEndX);
    },
    handleSwipe(startX, endX) {
      const swipeThreshold = 50;
      const diff = startX - endX;

      if (Math.abs(diff) <= swipeThreshold) return;

      if (diff > 0) {
        this.nextSlide(true);
      } else {
        this.prevSlide(true);
      }
    },
  },
};
</script>

<style scoped>
.container-1 {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 24px;
  width: 100%;
  box-sizing: border-box;
}

.services-carousel {
  position: relative;
  width: 100%;
  max-width: 100vw;
  padding: clamp(48px, 7vw, 90px) 0;
  overflow-x: hidden;
  background: linear-gradient(180deg, #f5f9fc 0%, #ffffff 100%);
}

.services-heading {
  display: grid;
  grid-template-columns: minmax(0, 0.85fr) minmax(280px, 0.55fr);
  align-items: end;
  gap: clamp(24px, 5vw, 72px);
  margin-bottom: clamp(24px, 4vw, 40px);
}

.section-kicker {
  margin: 0 0 10px;
  color: #f05a28;
  font-size: 12px;
  font-weight: 850;
  letter-spacing: 0.14em;
  line-height: 1.2;
  text-transform: uppercase;
}

.services-heading h2 {
  margin: 0;
  color: #102234;
  font-size: clamp(32px, 4.8vw, 58px);
  font-weight: 850;
  line-height: 1.02;
}

.services-heading p {
  margin: 0;
  color: #607286;
  font-size: clamp(15px, 1.6vw, 18px);
  line-height: 1.55;
}

.services-directory {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 0 0 18px;
}

.directory-item {
  min-height: 42px;
  display: inline-flex;
  align-items: center;
  gap: 9px;
  border: 1px solid #d8e4ed;
  border-radius: 8px;
  padding: 0 12px;
  background: #ffffff;
  color: #102234;
  font-size: 13px;
  font-weight: 800;
  line-height: 1;
  cursor: pointer;
  box-shadow: 0 8px 18px rgba(16, 34, 52, 0.05);
  transition:
    background-color 0.18s ease,
    border-color 0.18s ease,
    color 0.18s ease,
    box-shadow 0.18s ease,
    transform 0.18s ease;
}

.directory-item span {
  color: #f05a28;
  font-size: 11px;
  font-weight: 850;
}

.directory-item:hover {
  border-color: #adc9dc;
  box-shadow: 0 12px 24px rgba(16, 34, 52, 0.09);
  transform: translateY(-1px);
}

.directory-item.active {
  border-color: #f05a28;
  background: #fff6f1;
  color: #d84618;
}

.showcase-shell {
  display: grid;
  grid-template-columns: minmax(300px, 0.78fr) minmax(0, 1.22fr);
  height: clamp(500px, 44vw, 590px);
  min-height: 0;
  border-radius: 8px;
  overflow: hidden;
  background: #102234;
  box-shadow: 0 24px 54px rgba(16, 34, 52, 0.18);
}

.showcase-copy {
  min-width: 0;
  min-height: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 24px;
  overflow: hidden;
  padding: clamp(26px, 3.4vw, 42px);
  color: #ffffff;
}

.slide-counter {
  flex: 0 0 auto;
  width: fit-content;
  padding: 8px 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 8px;
  color: rgba(255, 255, 255, 0.72);
  font-size: 12px;
  font-weight: 850;
  line-height: 1;
}

.service-copy-body {
  min-height: 0;
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
}

.service-copy-body h3 {
  margin: 0;
  color: #ffffff;
  font-size: clamp(22px, 1.9vw, 28px);
  font-weight: 850;
  line-height: 1.16;
  overflow-wrap: normal;
  text-wrap: balance;
  word-break: normal;
}

.service-copy-body p {
  margin: 16px 0 0;
  color: rgba(255, 255, 255, 0.78);
  font-size: clamp(15px, 1.35vw, 17px);
  line-height: 1.56;
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
}

.showcase-actions {
  flex: 0 0 auto;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
}

.primary-action,
.secondary-link {
  min-height: 46px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  padding: 0 18px;
  font-size: 14px;
  font-weight: 850;
  line-height: 1;
  text-decoration: none;
  cursor: pointer;
  transition:
    background-color 0.18s ease,
    border-color 0.18s ease,
    color 0.18s ease,
    box-shadow 0.18s ease,
    transform 0.18s ease;
}

.primary-action {
  border: 1px solid #f05a28;
  background: #f05a28;
  color: #ffffff;
  box-shadow: 0 14px 26px rgba(240, 90, 40, 0.22);
}

.secondary-link {
  border: 1px solid rgba(255, 255, 255, 0.22);
  background: rgba(255, 255, 255, 0.08);
  color: #ffffff;
}

.primary-action:hover {
  background: #d84618;
  border-color: #d84618;
  transform: translateY(-1px);
}

.secondary-link:hover {
  background: rgba(255, 255, 255, 0.14);
  border-color: rgba(255, 255, 255, 0.34);
  transform: translateY(-1px);
}

.primary-action:focus-visible,
.secondary-link:focus-visible,
.carousel-nav:focus-visible,
.directory-item:focus-visible,
.carousel-dot:focus-visible {
  outline: 3px solid rgba(240, 90, 40, 0.38);
  outline-offset: 3px;
}

.showcase-media {
  position: relative;
  min-width: 0;
  min-height: 100%;
  overflow: hidden;
  background: #20364b;
}

.media-image {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  transform: scale(1.01);
}

.media-caption {
  position: absolute;
  left: clamp(18px, 3vw, 34px);
  right: clamp(18px, 3vw, 34px);
  bottom: clamp(18px, 3vw, 34px);
  display: flex;
  justify-content: space-between;
  gap: 16px;
  color: rgba(255, 255, 255, 0.88);
  font-size: 12px;
  font-weight: 850;
  line-height: 1.2;
  text-transform: uppercase;
}

.carousel-controls {
  position: absolute;
  top: clamp(18px, 3vw, 30px);
  right: clamp(18px, 3vw, 30px);
  display: flex;
  gap: 10px;
  z-index: 2;
}

.carousel-nav {
  width: 46px;
  height: 46px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(255, 255, 255, 0.26);
  border-radius: 8px;
  background: rgba(16, 34, 52, 0.72);
  color: #ffffff;
  cursor: pointer;
  backdrop-filter: blur(10px);
  transition:
    background-color 0.18s ease,
    border-color 0.18s ease,
    transform 0.18s ease;
}

.carousel-nav:hover {
  background: #f05a28;
  border-color: #f05a28;
  transform: translateY(-1px);
}

.carousel-nav svg {
  width: 24px;
  height: 24px;
  fill: none;
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.carousel-dots {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 4px;
  width: fit-content;
  max-width: 100%;
  margin-top: 18px;
  margin-right: auto;
  margin-left: auto;
  padding: 6px 8px;
  border: 1px solid #c6d5e0;
  border-radius: 999px;
  background: #ffffff;
  box-shadow: 0 8px 20px rgba(16, 34, 52, 0.1);
}

.carousel-dot {
  -webkit-appearance: none;
  appearance: none;
  flex: 0 0 32px;
  width: 32px;
  min-width: 32px;
  height: 32px;
  min-height: 32px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  border: 0;
  border-radius: 999px;
  padding: 0;
  background: transparent;
  color: #102234;
  opacity: 1;
  visibility: visible;
  cursor: pointer;
  forced-color-adjust: auto;
}

.carousel-dot-mark {
  display: block;
  width: 12px;
  height: 12px;
  border: 2px solid #102234;
  border-radius: 999px;
  background: #5f7488;
  box-shadow: 0 0 0 1px #ffffff;
  opacity: 1;
  transition:
    width 0.18s ease,
    background-color 0.18s ease,
    border-color 0.18s ease,
    transform 0.18s ease;
}

.carousel-dot:hover .carousel-dot-mark {
  border-color: #f05a28;
  background: #f05a28;
  transform: scale(1.08);
}

.carousel-dot.active .carousel-dot-mark {
  width: 26px;
  border-color: #f05a28;
  background: #f05a28;
}

.copy-fade-enter-active,
.copy-fade-leave-active,
.image-fade-enter-active,
.image-fade-leave-active {
  transition:
    opacity 0.28s ease,
    transform 0.28s ease;
}

.copy-fade-enter-from,
.copy-fade-leave-to {
  opacity: 0;
  transform: translateY(12px);
}

.image-fade-enter-from,
.image-fade-leave-to {
  opacity: 0;
  transform: scale(1.04);
}

@media (max-width: 1023px) {
  .services-heading {
    grid-template-columns: 1fr;
    gap: 14px;
  }

  .showcase-shell {
    grid-template-columns: 1fr;
    height: auto;
    min-height: 0;
  }

  .showcase-copy {
    min-height: 320px;
  }

  .service-copy-body {
    min-height: 0;
  }

  .showcase-media {
    height: clamp(260px, 45vw, 420px);
    min-height: 0;
    order: -1;
  }

  .services-directory {
    gap: 7px;
  }
}

@media (max-width: 720px) {
  .container-1 {
    padding: 0 16px;
  }

  .services-carousel {
    padding: 42px 0;
  }

  .showcase-copy {
    padding: 22px;
  }

  .service-copy-body h3 {
    font-size: clamp(22px, 6vw, 29px);
  }

  .service-copy-body p {
    -webkit-line-clamp: 5;
  }

  .showcase-actions,
  .primary-action,
  .secondary-link {
    width: 100%;
  }

  .showcase-media {
    height: 240px;
  }

  .media-caption {
    display: none;
  }

  .directory-item {
    width: 100%;
    justify-content: flex-start;
  }
}

@media (max-width: 480px) {
  .container-1 {
    padding: 0 12px;
  }

  .carousel-controls {
    top: 12px;
    right: 12px;
  }

  .carousel-nav {
    width: 42px;
    height: 42px;
  }

  .showcase-copy {
    padding: 18px;
    min-height: 300px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .primary-action,
  .secondary-link,
  .carousel-nav,
  .directory-item,
  .carousel-dot,
  .carousel-dot-mark,
  .copy-fade-enter-active,
  .copy-fade-leave-active,
  .image-fade-enter-active,
  .image-fade-leave-active {
    transition: none;
  }
}

@media (forced-colors: active) {
  .carousel-dots {
    border: 1px solid CanvasText;
  }

  .carousel-dot-mark {
    border-color: CanvasText;
    background: Canvas;
    box-shadow: none;
  }

  .carousel-dot.active .carousel-dot-mark {
    border-color: Highlight;
    background: Highlight;
  }
}
</style>
