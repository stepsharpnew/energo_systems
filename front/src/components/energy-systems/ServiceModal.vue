<template>
  <transition name="modal-fade">
    <div
      v-if="show && service"
      class="modal-overlay"
      @click.self="$emit('close')"
    >
      <div class="modal-window">
        <button class="modal-close" type="button" @click="$emit('close')">
          ×
        </button>
        <div class="modal-body service-modal">
          <div class="modal-info">
            <p class="section-kicker">Услуга</p>
            <h2>{{ service.name }}</h2>
            <p>{{ service.details }}</p>
          </div>
          <div class="modal-gallery">
            <div
              class="modal-carousel"
              ref="carousel"
              @scroll.passive="onScroll"
            >
              <div
                v-for="(frame, idx) in service.gallery"
                :key="idx"
                class="modal-carousel-card"
                :style="{ backgroundImage: `url(${frame})` }"
                @click="handleCardClick(idx, $event)"
              ></div>
            </div>
            <div class="modal-carousel-dots">
              <button
                v-for="(frame, idx) in service.gallery"
                :key="`dot-${idx}`"
                type="button"
                :class="{ active: idx === activeIndex }"
                @click="scrollTo(idx)"
              ></button>
            </div>
          </div>
          <div class="modal-actions">
            <button class="order-button" @click="openContactModal">
              Заказать услугу
            </button>
            <button class="details-button" @click="goToDetails">
              Подробнее
            </button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "ServiceModal",
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    service: {
      type: Object,
      default: null,
    },
  },
  emits: ["close", "open-contact-modal"],
  data() {
    return {
      activeIndex: 0,
    };
  },
  watch: {
    show(newVal) {
      if (newVal) {
        this.activeIndex = 0;
        // Блокируем скролл страницы
        document.body.style.overflow = "hidden";
        this.$nextTick(() => {
          const carousel = this.$refs.carousel;
          if (carousel) {
            carousel.scrollLeft = 0;
          }
        });
      } else {
        // Разблокируем скролл страницы
        document.body.style.overflow = "";
      }
    },
  },
  beforeUnmount() {
    document.body.style.overflow = "";
  },
  methods: {
    handleCardClick(index, event) {
      // Переключаем только если кликнули на другую картинку (не на текущую)
      if (index !== this.activeIndex) {
        this.scrollTo(index);
      }
    },
    onScroll() {
      const carousel = this.$refs.carousel;
      if (!carousel || !this.service) return;
      const cards = carousel.children;
      const viewportStart = carousel.scrollLeft;
      const viewportEnd = viewportStart + carousel.offsetWidth;
      let bestIndex = 0;
      let bestVisibility = -1;
      Array.from(cards).forEach((card, index) => {
        const cardStart = card.offsetLeft;
        const cardEnd = cardStart + card.offsetWidth;
        const visibleStart = Math.max(cardStart, viewportStart);
        const visibleEnd = Math.min(cardEnd, viewportEnd);
        const visibleWidth = Math.max(0, visibleEnd - visibleStart);
        const ratio = visibleWidth / card.offsetWidth;
        if (ratio > bestVisibility) {
          bestVisibility = ratio;
          bestIndex = index;
        }
      });
      this.activeIndex = bestIndex;
    },
    scrollTo(index) {
      const carousel = this.$refs.carousel;
      if (!carousel) return;
      const target = carousel.children[index];
      if (!target) return;
      target.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    },
    goToDetails() {
      if (this.service) {
        this.$emit("close");
        this.$router.push(`/services/${this.service.id}`);
      }
    },
    openContactModal() {
      this.$emit("close");
      this.$emit("open-contact-modal", this.service);
    },
  },
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(8, 13, 34, 0.65);
  backdrop-filter: blur(6px);
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 20px;
  z-index: 9999;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

.modal-window {
  background: #0f172a;
  width: min(960px, 95vw);
  max-height: calc(100vh - 40px);
  border-radius: 32px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 40px 80px rgba(0, 0, 0, 0.45);
  margin: auto;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
}

.modal-body {
  padding: clamp(24px, 5vw, 48px);
  color: #e2e8f0;
  overflow-y: auto;
  overflow-x: hidden;
  flex: 1;
  min-height: 0;
  -webkit-overflow-scrolling: touch;
}

.service-modal {
  display: flex;
  flex-direction: column;
  gap: clamp(24px, 4vw, 40px);
  min-height: 100%;
}

.section-kicker {
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: rgba(255, 255, 255, 0.7);
  font-size: 12px;
  margin-bottom: 12px;
}

.modal-info h2 {
  margin: 6px 0 14px;
  color: #fff;
}

.modal-gallery {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
}

.modal-carousel {
  display: flex;
  gap: 16px;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  padding-bottom: 6px;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.modal-carousel::-webkit-scrollbar {
  display: none;
}

.modal-carousel::-webkit-scrollbar {
  height: 6px;
}

.modal-carousel-card {
  flex: 0 0 clamp(400px, 70vw, 600px);
  height: clamp(300px, 50vw, 450px);
  border-radius: 24px;
  scroll-snap-align: center;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.08);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  cursor: pointer;
  transition: transform 0.2s ease, opacity 0.2s ease;
}

.modal-carousel-card:hover {
  transform: scale(0.98);
  opacity: 0.9;
}

.modal-carousel-dots {
  display: flex;
  gap: 8px;
  justify-content: center;
}

.modal-carousel-dots button {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: none;
  background: rgba(255, 255, 255, 0.3);
  cursor: pointer;
}

.modal-carousel-dots button.active {
  background: #ef4422;
}

.modal-actions {
  grid-column: 1 / -1;
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-top: auto;
  padding-top: 24px;
  flex-wrap: wrap;
  flex-shrink: 0;
  position: sticky;
  bottom: 0;
  background: linear-gradient(to top, #0f172a 0%, #0f172a 80%, rgba(15, 23, 42, 0.95) 100%);
  z-index: 10;
}

.order-button {
  padding: 14px 32px;
  background: linear-gradient(135deg, #ef4422, #ff6934);
  border: none;
  border-radius: 16px;
  color: #fff;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(239, 68, 34, 0.3);
}

.order-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(239, 68, 34, 0.4);
}

.order-button:active {
  transform: translateY(0);
}

.details-button {
  padding: 14px 32px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  color: #fff;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.details-button:hover {
  background: rgba(255, 255, 255, 0.15);
  transform: translateY(-2px);
}

.details-button:active {
  transform: translateY(0);
}

.modal-close {
  position: absolute;
  top: 18px;
  right: 18px;
  border: none;
  background: rgba(255, 255, 255, 0.15);
  color: #fff;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  font-size: 20px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.modal-close:hover {
  background: rgba(255, 255, 255, 0.35);
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

/* Адаптивные стили */
@media (max-width: 768px) {
  .modal-overlay {
    align-items: flex-start;
    padding: 10px;
  }

  .modal-window {
    max-height: calc(100vh - 20px);
    margin-top: 10px;
    margin-bottom: 10px;
  }

  .modal-body {
    padding: 24px;
  }

  .modal-carousel-card {
    flex: 0 0 90vw;
    height: clamp(250px, 60vw, 400px);
  }

  .modal-carousel {
    gap: 12px;
  }

  .modal-carousel-dots {
    gap: 6px;
  }

  .modal-carousel-dots button {
    width: 8px;
    height: 8px;
  }

  .modal-actions {
    padding-top: 20px;
    background: linear-gradient(to top, #0f172a 0%, #0f172a 85%, rgba(15, 23, 42, 0.95) 100%);
  }

  .order-button,
  .details-button {
    width: 100%;
    padding: 16px 32px;
  }
}

@media (max-width: 480px) {
  .modal-carousel-card {
    flex: 0 0 95vw;
    height: clamp(200px, 50vw, 300px);
  }

  .modal-carousel {
    gap: 8px;
  }
}
</style>
