<template>
  <section class="services-carousel" ref="servicesSection">
    <div class="container-1">
      <h2 class="section-title">Наши услуги</h2>
      <div class="carousel-container" ref="carouselContainer">
        <div
          class="carousel-wrapper"
          ref="carousel"
          @scroll.passive="handleScroll"
        >
          <!-- Дубликаты в конце (для бесконечной прокрутки) -->
          <div
            v-for="(service, index) in services"
            :key="`duplicate-end-${service.id}`"
            class="carousel-card"
            :class="{ active: getRealIndex(index) === activeIndex }"
            :data-index="getRealIndex(index)"
            :data-duplicate="true"
            @click="handleServiceClick(service, getRealIndex(index))"
            :style="getCardStyle(service)"
          >
            <button
              class="card-info-toggle"
              type="button"
              @click.stop="$emit('open-service-modal', service)"
              aria-label="Подробнее об услуге"
            >
              i
            </button>
            <span class="service-name">{{ service.name }}</span>
          </div>

          <!-- Основные элементы -->
          <div
            v-for="(service, index) in services"
            :key="service.id"
            class="carousel-card"
            :class="{ active: index === activeIndex }"
            :data-index="index"
            @click="handleServiceClick(service, index)"
            :style="getCardStyle(service)"
          >
            <button
              class="card-info-toggle"
              type="button"
              @click.stop="$emit('open-service-modal', service)"
              aria-label="Подробнее об услуге"
            >
              i
            </button>
            <span class="service-name">{{ service.name }}</span>
          </div>

          <!-- Дубликаты в начале (для бесконечной прокрутки) -->
          <div
            v-for="(service, index) in services"
            :key="`duplicate-start-${service.id}`"
            class="carousel-card"
            :class="{ active: getRealIndex(index) === activeIndex }"
            :data-index="getRealIndex(index)"
            :data-duplicate="true"
            @click="handleServiceClick(service, getRealIndex(index))"
            :style="getCardStyle(service)"
          >
            <button
              class="card-info-toggle"
              type="button"
              @click.stop="$emit('open-service-modal', service)"
              aria-label="Подробнее об услуге"
            >
              i
            </button>
            <span class="service-name">{{ service.name }}</span>
          </div>
        </div>
      </div>
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
      cardWidth: 0,
      gap: 0,
      isAnimating: false,
      scrollUpdateTimeout: null,
    };
  },
  computed: {
    activeService() {
      return this.services[this.activeIndex] || null;
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.initializeCarousel();
      this.updateActiveByScroll();
      this.startAutoPlay();
    });
    window.addEventListener("resize", this.handleResize, { passive: true });
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.handleResize);
    this.stopAutoPlay();
    if (this.scrollUpdateTimeout) {
      clearTimeout(this.scrollUpdateTimeout);
    }
  },
  methods: {
    getRealIndex(index) {
      return index;
    },
    initializeCarousel() {
      const carousel = this.$refs.carousel;
      if (!carousel) return;

      this.$nextTick(() => {
        requestAnimationFrame(() => {
          // Вычисляем размеры карточек
          const firstCard = carousel.querySelector(
            ".carousel-card:not([data-duplicate])"
          );
          if (firstCard && firstCard.offsetWidth > 0) {
            this.cardWidth = firstCard.offsetWidth;
            const style = window.getComputedStyle(carousel);
            this.gap = parseFloat(style.gap) || 0;
          }

          // Устанавливаем начальную позицию так, чтобы первый элемент был по центру
          if (this.cardWidth > 0 && carousel.offsetWidth > 0) {
            const sectionWidth =
              this.services.length * (this.cardWidth + this.gap);
            // Позиция = начало оригиналов + центр первого элемента - центр viewport
            const firstCardCenter = sectionWidth + this.cardWidth / 2;
            const viewportCenter = carousel.offsetWidth / 2;
            carousel.scrollLeft = Math.max(0, firstCardCenter - viewportCenter);
            // Устанавливаем активный индекс на первый элемент
            this.activeIndex = 0;
          } else {
            // Fallback: устанавливаем на начало оригиналов
            const sectionWidth =
              this.services.length * (this.cardWidth + this.gap);
            carousel.scrollLeft = sectionWidth;
            this.activeIndex = 0;
          }
        });
      });
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
    nextSlide() {
      const nextIndex = (this.activeIndex + 1) % this.services.length;
      this.goToSlide(nextIndex);
    },
    goToSlide(index) {
      const carousel = this.$refs.carousel;
      if (!carousel) return;

      // Находим первый оригинальный элемент с нужным индексом
      const cards = carousel.querySelectorAll(
        `.carousel-card:not([data-duplicate])`
      );
      const target = cards[index];
      if (!target) return;

      // Устанавливаем флаг анимации, чтобы предотвратить обновление activeIndex во время скролла
      this.isAnimating = true;

      const gsap = this.$gsap;
      if (gsap) {
        // Используем GSAP для плавного скролла
        gsap.to(carousel, {
          scrollLeft:
            target.offsetLeft -
            carousel.offsetWidth / 2 +
            target.offsetWidth / 2,
          duration: 0.8,
          ease: "power2.inOut",
          onComplete: () => {
            this.handleInfiniteScroll();
            this.isAnimating = false;
            // Устанавливаем активный индекс только после завершения анимации
            this.activeIndex = index;
            // Обновляем для проверки точности позиционирования
            this.updateActiveByScroll();
          },
        });
      } else {
        // Fallback на нативный скролл
        target.scrollIntoView({
          behavior: "smooth",
          inline: "center",
          block: "nearest",
        });
        setTimeout(() => {
          this.handleInfiniteScroll();
          this.isAnimating = false;
          // Устанавливаем активный индекс только после завершения анимации
          this.activeIndex = index;
          this.updateActiveByScroll();
        }, 800);
      }
    },
    handleInfiniteScroll() {
      if (!this.cardWidth) return;

      const carousel = this.$refs.carousel;
      if (!carousel) return;

      const cardWithGap = this.cardWidth + this.gap;
      const sectionWidth = this.services.length * cardWithGap;
      const originalStart = sectionWidth;
      const originalEnd = originalStart + sectionWidth;
      const duplicateEndStart = 2 * sectionWidth;
      const scrollLeft = carousel.scrollLeft;
      const threshold = cardWithGap;

      // Если прокрутили в конец дубликатов в начале (вправо)
      if (scrollLeft >= duplicateEndStart - threshold) {
        const offset = scrollLeft - duplicateEndStart;
        carousel.scrollLeft = originalStart + offset;
      }
      // Если прокрутили в начало дубликатов в конце (влево)
      else if (scrollLeft <= threshold) {
        carousel.scrollLeft = originalEnd - threshold + scrollLeft;
      }
    },
    handleResize() {
      this.initializeCarousel();
      this.updateActiveByScroll();
    },
    handleScroll() {
      // Отменяем предыдущий таймер, если он есть
      if (this.scrollUpdateTimeout) {
        clearTimeout(this.scrollUpdateTimeout);
      }

      // Устанавливаем новый таймер для debounce
      this.scrollUpdateTimeout = setTimeout(() => {
        this.updateActiveByScroll();
      }, 50);
    },
    updateActiveByScroll() {
      // Не обновляем активный индекс во время анимации
      if (this.isAnimating) return;

      const carousel = this.$refs.carousel;
      if (!carousel) return;

      const cards = carousel.querySelectorAll(
        ".carousel-card:not([data-duplicate])"
      );
      if (cards.length === 0) return;

      const viewportCenter = carousel.scrollLeft + carousel.offsetWidth / 2;
      let closestCard = null;
      let closestDistance = Infinity;

      cards.forEach((card) => {
        const cardCenter = card.offsetLeft + card.offsetWidth / 2;
        const distance = Math.abs(viewportCenter - cardCenter);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestCard = card;
        }
      });

      if (closestCard) {
        const index = parseInt(closestCard.dataset.index);
        if (!isNaN(index) && index !== this.activeIndex) {
          this.activeIndex = index;
        }
      }
    },
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
      this.stopAutoPlay();
      this.goToSlide(index);
      this.startAutoPlay();
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
}

.services-carousel {
  padding: clamp(36px, 6vw, 72px) 0 20px;
  position: relative;
}

.section-title {
  font-size: clamp(28px, 4vw, 42px);
  font-weight: 700;
  color: #111827;
  margin: 0 0 clamp(32px, 5vw, 48px) 0;
  text-align: center;
  letter-spacing: -0.02em;
}

.carousel-container {
  position: relative;
  padding: 80px 0;
  overflow: hidden;
}

.carousel-wrapper {
  display: flex;
  gap: clamp(16px, 2.5vw, 32px);
  overflow-x: auto;
  overflow-y: hidden;
  padding: 40px 0;
  scroll-behavior: smooth;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
}

.carousel-wrapper::-webkit-scrollbar {
  display: none;
}

.carousel-wrapper {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.carousel-card {
  flex: 0 0 clamp(280px, 25vw, 380px);
  min-width: clamp(280px, 25vw, 380px);
  height: clamp(240px, 28vw, 360px);
  border-radius: 28px;
  border: none;
  color: #fff;
  font-size: clamp(16px, 1.8vw, 20px);
  font-weight: 600;
  text-align: left;
  padding: clamp(20px, 3vw, 32px);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  background-size: cover;
  background-position: center;
  position: relative;
  scroll-snap-align: center;
  transition: transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94),
    opacity 0.6s ease;
  transform: scale(0.85);
  opacity: 0.7;
}

.carousel-card.active {
  transform: scale(1.15);
  opacity: 1;
  z-index: 10;
}

.carousel-card:not(.active) {
  cursor: pointer;
}

.carousel-card:not(.active):hover {
  transform: scale(0.92);
  opacity: 0.9;
}

.service-name {
  z-index: 1;
  line-height: 1.3;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
}

.card-info-toggle {
  position: absolute;
  top: clamp(14px, 2vw, 20px);
  right: clamp(14px, 2vw, 20px);
  width: clamp(32px, 4vw, 44px);
  height: clamp(32px, 4vw, 44px);
  border-radius: 50%;
  border: none;
  background: rgba(255, 255, 255, 0.9);
  color: #0f172a;
  font-weight: 700;
  font-size: clamp(14px, 1.8vw, 18px);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
}

.card-info-toggle:hover {
  transform: translateY(-2px) scale(1.1);
  background: #fff;
}

.carousel-description {
  margin-top: clamp(24px, 4vw, 40px);
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-radius: 24px;
  padding: clamp(20px, 3vw, 32px);
  text-align: center;
}

.carousel-description h2 {
  margin: 0 0 12px 0;
  font-size: clamp(22px, 3vw, 28px);
  font-weight: 700;
  color: #111827;
  line-height: 1.3;
}

.carousel-description p {
  margin: 0;
  color: #4a5568;
  font-size: clamp(14px, 1.8vw, 18px);
  line-height: 1.6;
}

.description-flight-enter-active,
.description-flight-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
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
  .carousel-card {
    flex: 0 0 75vw;
    min-width: 75vw;
    height: clamp(200px, 40vw, 280px);
    transform: scale(0.9);
    opacity: 0.8;
  }

  .carousel-card.active {
    transform: scale(1);
    opacity: 1;
  }
}

@media (max-width: 768px) {
  .section-title {
    font-size: clamp(24px, 5vw, 32px);
    margin-bottom: clamp(24px, 4vw, 36px);
  }

  .carousel-container {
    padding: 30px 0;
  }

  .carousel-card {
    flex: 0 0 80vw;
    min-width: 80vw;
    height: 200px;
    font-size: 16px;
    padding: 20px;
    border-radius: 20px;
  }

  .carousel-description {
    padding: 20px;
    border-radius: 20px;
  }

  .carousel-description h2 {
    font-size: 20px;
  }

  .carousel-description p {
    font-size: 15px;
  }
}

@media (max-width: 560px) {
  .carousel-container {
    padding: 20px 0;
  }

  .carousel-card {
    flex: 0 0 85vw;
    min-width: 85vw;
    height: 180px;
    padding: 16px;
  }
}
</style>
