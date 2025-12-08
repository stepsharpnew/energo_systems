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
      <div class="carousel-container" ref="carouselContainer">
        <div
          class="carousel-wrapper"
          ref="carousel"
          @scroll.passive="handleScroll"
          @touchstart="handleTouchStart"
          @touchmove="handleTouchMove"
          @touchend="handleTouchEnd"
        >
          <!-- Всегда показываем только 3 элемента: предыдущий, текущий, следующий -->
          <div
            v-for="card in visibleCards"
            :key="`card-${card.index}`"
            class="carousel-card"
            :class="{ active: card.index === activeIndex && !card.isDuplicate }"
            :data-index="card.index"
            :data-duplicate="card.isDuplicate"
            @click="handleServiceClick(card.service, card.index)"
            :style="getCardStyle(card.service)"
          >
            <button
              class="card-info-toggle"
              type="button"
              @click.stop="$emit('open-service-modal', card.service)"
              aria-label="Подробнее об услуге"
            >
              i
            </button>
            <span class="service-name">{{ card.service.name }}</span>
          </div>
        </div>
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
      cardWidth: 0,
      gap: 0,
      isAnimating: false,
      scrollUpdateTimeout: null,
      touchStartX: 0,
      touchStartY: 0,
      touchStartScrollLeft: 0,
      isTouching: false,
      isScrolling: false,
    };
  },
  computed: {
    activeService() {
      return this.services[this.activeIndex] || null;
    },
    visibleCards() {
      if (this.services.length === 0) return [];

      const total = this.services.length;
      const current = this.activeIndex;

      // Вычисляем индексы предыдущего и следующего элементов
      const prevIndex = (current - 1 + total) % total;
      const nextIndex = (current + 1) % total;

      const cards = [];

      // Предыдущий элемент
      cards.push({
        service: this.services[prevIndex],
        index: prevIndex,
        isDuplicate: false,
      });

      // Текущий элемент
      cards.push({
        service: this.services[current],
        index: current,
        isDuplicate: false,
      });

      // Следующий элемент
      cards.push({
        service: this.services[nextIndex],
        index: nextIndex,
        isDuplicate: false,
      });

      return cards;
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
    resetAutoPlay() {
      this.stopAutoPlay();
      this.startAutoPlay();
    },
    initializeCarousel() {
      const carousel = this.$refs.carousel;
      if (!carousel) return;

      this.$nextTick(() => {
        requestAnimationFrame(() => {
          // Вычисляем размеры карточек
          const firstCard = carousel.querySelector(".carousel-card");
          if (firstCard && firstCard.offsetWidth > 0) {
            this.cardWidth = firstCard.offsetWidth;
            const style = window.getComputedStyle(carousel);
            this.gap = parseFloat(style.gap) || 0;
          }

          // Устанавливаем начальную позицию так, чтобы средний элемент (текущий) был по центру
          if (this.cardWidth > 0 && carousel.offsetWidth > 0) {
            // Средний элемент - это второй в массиве из 3 элементов (индекс 1)
            const middleCard = carousel.querySelectorAll(".carousel-card")[1];
            if (middleCard) {
              const middleCardCenter =
                middleCard.offsetLeft + middleCard.offsetWidth / 2;
              const viewportCenter = carousel.offsetWidth / 2;
              carousel.scrollLeft = Math.max(
                0,
                middleCardCenter - viewportCenter
              );
            }
            // Устанавливаем активный индекс на первый элемент
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
      if (this.isAnimating) return;
      if (index === this.activeIndex) return;

      const carousel = this.$refs.carousel;
      if (!carousel) return;

      // Определяем, какой элемент нужно показать по центру
      // Если переходим на следующий элемент, он уже виден справа
      // Если переходим на предыдущий, он уже виден слева
      const total = this.services.length;
      const current = this.activeIndex;
      const diff = (index - current + total) % total;

      // Устанавливаем флаг анимации
      this.isAnimating = true;

      // Обновляем activeIndex сразу, чтобы visibleCards обновился
      // Это создаст правильный порядок элементов для плавного перехода
      this.activeIndex = index;

      this.$nextTick(() => {
        // Находим средний элемент (текущий активный)
        const cards = carousel.querySelectorAll(".carousel-card");
        const middleCard = cards[1]; // Средний элемент всегда по индексу 1

        if (!middleCard) {
          this.isAnimating = false;
          return;
        }

        const gsap = this.$gsap;
        if (gsap) {
          // Используем GSAP для плавного скролла
          gsap.to(carousel, {
            scrollLeft:
              middleCard.offsetLeft -
              carousel.offsetWidth / 2 +
              middleCard.offsetWidth / 2,
            duration: 0.8,
            ease: "power2.inOut",
            onComplete: () => {
              this.isAnimating = false;
            },
          });
        } else {
          // Fallback на нативный скролл
          middleCard.scrollIntoView({
            behavior: "smooth",
            inline: "center",
            block: "nearest",
          });
          setTimeout(() => {
            this.isAnimating = false;
          }, 800);
        }
      });
    },
    handleInfiniteScroll() {
      // Этот метод больше не нужен, так как мы всегда показываем только 3 элемента
      // и используем computed свойство visibleCards для управления отображением
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

      const cards = carousel.querySelectorAll(".carousel-card");
      if (cards.length === 0) return;

      const viewportCenter = carousel.scrollLeft + carousel.offsetWidth / 2;
      let closestCard = null;
      let closestDistance = Infinity;

      // Проверяем все карточки, но предпочитаем среднюю (индекс 1)
      cards.forEach((card, idx) => {
        const cardCenter = card.offsetLeft + card.offsetWidth / 2;
        const distance = Math.abs(viewportCenter - cardCenter);
        // Даем приоритет средней карточке (индекс 1)
        const adjustedDistance = idx === 1 ? distance * 0.5 : distance;
        if (adjustedDistance < closestDistance) {
          closestDistance = adjustedDistance;
          closestCard = card;
        }
      });

      if (closestCard) {
        const index = parseInt(closestCard.dataset.index);
        if (!isNaN(index) && index !== this.activeIndex) {
          this.activeIndex = index;
          // Пользователь переключил слайд вручную (скроллом) — сбрасываем таймер
          this.resetAutoPlay();
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
      this.goToSlide(index);
      // Сбрасываем таймер автопрокрутки при ручном переключении
      this.resetAutoPlay();
    },
    handleTouchStart(e) {
      const carousel = this.$refs.carousel;
      if (!carousel) return;

      this.touchStartX = e.touches[0].clientX;
      this.touchStartY = e.touches[0].clientY;
      this.touchStartScrollLeft = carousel.scrollLeft;
      this.isTouching = true;
      this.isScrolling = false;
    },
    handleTouchMove(e) {
      if (!this.isTouching) return;

      const carousel = this.$refs.carousel;
      if (!carousel) return;

      // Пересчитываем размеры, если они не были вычислены
      if (!this.cardWidth || !this.gap) {
        const firstCard = carousel.querySelector(".carousel-card");
        if (firstCard && firstCard.offsetWidth > 0) {
          this.cardWidth = firstCard.offsetWidth;
          const style = window.getComputedStyle(carousel);
          this.gap = parseFloat(style.gap) || 0;
        }
      }

      if (!this.cardWidth) return;

      const touchX = e.touches[0].clientX;
      const touchY = e.touches[0].clientY;
      const deltaX = touchX - this.touchStartX;
      const deltaY = touchY - this.touchStartY;

      // Определяем, это горизонтальный или вертикальный свайп
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        // Горизонтальный свайп - блокируем вертикальную прокрутку
        e.preventDefault();
        this.isScrolling = true;

        // Вычисляем максимальное расстояние прокрутки (один элемент)
        const cardWithGap = this.cardWidth + this.gap;
        const maxScroll = this.touchStartScrollLeft + cardWithGap;
        const minScroll = this.touchStartScrollLeft - cardWithGap;

        // Увеличиваем чувствительность свайпа (умножаем на 2.0 для более быстрого отклика)
        const newScrollLeft = this.touchStartScrollLeft - deltaX * 2.0;

        // Ограничиваем прокрутку одним элементом
        carousel.scrollLeft = Math.max(
          minScroll,
          Math.min(maxScroll, newScrollLeft)
        );
      }
    },
    handleTouchEnd(e) {
      if (!this.isTouching) return;

      const carousel = this.$refs.carousel;
      if (!carousel) return;

      // Пересчитываем размеры, если они не были вычислены
      if (!this.cardWidth || !this.gap) {
        const firstCard = carousel.querySelector(".carousel-card");
        if (firstCard && firstCard.offsetWidth > 0) {
          this.cardWidth = firstCard.offsetWidth;
          const style = window.getComputedStyle(carousel);
          this.gap = parseFloat(style.gap) || 0;
        }
      }

      if (this.isScrolling && this.cardWidth) {
        const touchEndX = e.changedTouches[0].clientX;
        const deltaX = touchEndX - this.touchStartX;
        const cardWithGap = this.cardWidth + this.gap;
        const threshold = cardWithGap * 0.25; // Порог для переключения (25% от ширины карточки)

        // Определяем направление и переключаем слайд
        if (Math.abs(deltaX) > threshold) {
          if (deltaX < 0) {
            // Свайп влево - следующий слайд
            this.nextSlide();
          } else {
            // Свайп вправо - предыдущий слайд
            const prevIndex =
              (this.activeIndex - 1 + this.services.length) %
              this.services.length;
            this.goToSlide(prevIndex);
          }
          this.resetAutoPlay();
        } else {
          // Недостаточный свайп - возвращаемся к текущему слайду
          this.goToSlide(this.activeIndex);
        }
      }

      this.isTouching = false;
      this.isScrolling = false;
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
  margin: 0 0 clamp(24px, 3vw, 32px) 0;
  text-align: center;
  letter-spacing: -0.02em;
}

.carousel-indicators {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: clamp(8px, 1.2vw, 12px);
  margin: 0 0 clamp(32px, 5vw, 48px) 0;
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

.carousel-container {
  position: relative;
  padding: 60px 0;
  overflow: hidden;
  width: 100%;
  max-width: 100vw;
  box-sizing: border-box;
}

.carousel-wrapper {
  display: flex;
  gap: clamp(20px, 3vw, 40px);
  overflow-x: auto;
  overflow-y: hidden;
  padding: 60px 0;
  scroll-behavior: smooth;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  position: relative;
}

.carousel-wrapper::-webkit-scrollbar {
  display: none;
}

.carousel-wrapper {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.carousel-card {
  flex: 0 0 clamp(320px, 32vw, 480px);
  min-width: clamp(320px, 32vw, 480px);
  height: clamp(280px, 32vw, 420px);
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
  scroll-snap-align: center;
  transition: transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94),
    opacity 0.6s ease;
  transform: scale(0.85);
  opacity: 0.7;
  transform-origin: center;
  will-change: transform;
}

.carousel-card.active {
  transform: scale(1.15);
  opacity: 1;
  z-index: 10;
  cursor: pointer;
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

.carousel-description-wrapper {
  margin-top: clamp(24px, 4vw, 40px);
  height: 200px;
  min-height: 200px;
}

.carousel-description {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-radius: 24px;
  padding: clamp(20px, 3vw, 32px);
  text-align: center;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-sizing: border-box;
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
  .carousel-container {
    padding: 40px 0;
  }

  .carousel-wrapper {
    padding: 50px 0;
  }

  .carousel-card {
    flex: 0 0 75vw;
    min-width: 75vw;
    height: clamp(220px, 42vw, 320px);
    transform: scale(0.9);
    opacity: 0.8;
  }

  .carousel-card.active {
    transform: scale(1);
    opacity: 1;
  }
}

@media (max-width: 768px) {
  .image-slide {
    display: flex;
  }

  .carousel-description-wrapper {
    height: 150px;
    min-height: 150px;
  }

  .container-1 {
    padding: 0 16px;
  }

  .section-title {
    font-size: clamp(24px, 5vw, 32px);
    margin-bottom: clamp(20px, 3vw, 28px);
  }

  .carousel-indicators {
    gap: 8px;
    margin-bottom: clamp(24px, 4vw, 36px);
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

  .carousel-container {
    padding: 40px 0;
    overflow-x: hidden;
  }

  .carousel-wrapper {
    padding: 40px 0;
    scroll-snap-type: none;
    overflow-x: auto;
    overflow-y: hidden;
    width: 100%;
    max-width: 100vw;
  }

  .carousel-card {
    flex: 0 0 80vw;
    min-width: 80vw;
    max-width: 80vw;
    height: 200px;
    font-size: 16px;
    padding: 20px;
    border-radius: 20px;
    transform: scale(0.9) !important;
  }

  .carousel-card.active {
    transform: scale(1) !important;
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

  .carousel-container {
    padding: 30px 0;
    overflow-x: hidden;
  }

  .carousel-wrapper {
    padding: 30px 0;
    overflow-x: auto;
    overflow-y: hidden;
    width: 100%;
    max-width: 100vw;
  }

  .carousel-card {
    flex: 0 0 85vw;
    min-width: 85vw;
    max-width: 85vw;
    height: 180px;
    padding: 16px;
    transform: scale(0.9) !important;
  }

  .carousel-card.active {
    transform: scale(1) !important;
  }

  .carousel-description-wrapper {
    height: 130px;
    min-height: 130px;
  }
}

.image-slide {
  width:100%;
  display: none;
  justify-content: center;
}

.image-slide img{
  width:35px;
  height: 35px;
  opacity: .2;
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
</style>
