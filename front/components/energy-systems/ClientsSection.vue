<template>
  <section class="clients-section" ref="clientsSection">
    <div class="section-heading" ref="headingRef">
      <p class="section-kicker">Наши клиенты</p>
      <h2>Нам доверяют лидеры отраслей</h2>
      <p>
        Подрядчики, муниципалитеты и девелоперы, которым важна скорость и
        безупречное качество
      </p>
    </div>
    <div class="clients-grid">
      <div
        v-for="(client, index) in clients"
        :key="client.id"
        :ref="(el) => setCardRef(el, index)"
        class="client-card"
      >
        <div class="client-logo" :style="getClientStyle(client)"></div>
        <p>{{ client.name }}</p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "ClientsSection",
  props: {
    clients: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      cardRefs: [],
      scrollTriggers: [],
    };
  },
  mounted() {
    this.initScrollTriggers();
    window.addEventListener("resize", this.handleResize, { passive: true });
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.handleResize);
    if (this.scrollTriggers) {
      this.scrollTriggers.forEach((st) => st.kill());
      this.scrollTriggers = [];
    }
  },
  methods: {
    setCardRef(el, index) {
      if (el) {
        this.cardRefs[index] = el;
      }
    },
    initScrollTriggers() {
      this.$nextTick(() => {
        const gsap = this.$gsap;
        const ScrollTrigger = this.$ScrollTrigger;

        if (!gsap || !ScrollTrigger) return;

        const isMobile = window.innerWidth <= 992;

        // Очищаем предыдущие триггеры
        if (this.scrollTriggers.length > 0) {
          this.scrollTriggers.forEach((st) => st.kill());
          this.scrollTriggers = [];
        }

        // Анимация для заголовка секции
        if (this.$refs.headingRef) {
          const headingAnim = gsap.fromTo(
            this.$refs.headingRef,
            {
              opacity: 0,
              y: 30,
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.2,
              ease: "none",
              scrollTrigger: {
                trigger: this.$refs.headingRef,
                start: "top 85%",
                toggleActions: "play reverse play reverse",
              },
            }
          );
          if (headingAnim.scrollTrigger) {
            this.scrollTriggers.push(headingAnim.scrollTrigger);
          }
        }

        // Анимации для карточек клиентов
        this.cardRefs.forEach((card, index) => {
          if (!card) return;

          const offset = isMobile ? 25 : 40;

          // Чередуем направления и создаем эффект волны
          const row = Math.floor(index / (isMobile ? 2 : 4));
          const col = index % (isMobile ? 2 : 4);
          const xDirection = col % 2 === 0 ? -1 : 1;

          const cardAnim = gsap.fromTo(
            card,
            {
              opacity: 0,
              x: offset * xDirection,
              y: 20,
            },
            {
              opacity: 1,
              x: 0,
              y: 0,
              duration: 0.2,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
                toggleActions: "play reverse play reverse",
              },
            }
          );

          if (cardAnim.scrollTrigger) {
            this.scrollTriggers.push(cardAnim.scrollTrigger);
          }
        });

        // Обновляем ScrollTrigger после создания всех анимаций
        this.refreshScrollTrigger();
      });
    },
    refreshScrollTrigger() {
      const ScrollTrigger = this.$ScrollTrigger;
      if (ScrollTrigger) {
        setTimeout(() => {
          ScrollTrigger.refresh();
        }, 100);
      }
    },
    handleResize() {
      // При изменении размера пересоздаем анимации
      if (this.scrollTriggers.length > 0) {
        this.scrollTriggers.forEach((st) => st.kill());
        this.scrollTriggers = [];
      }
      this.initScrollTriggers();
    },
    getClientStyle(client) {
      if (client.image) {
        return {
          backgroundImage: `url(${client.image})`,
          backgroundSize: "contain",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        };
      } else if (client.color) {
        return {
          background: client.color,
        };
      }
      return {};
    },
  },
};
</script>

<style scoped>
.clients-section {
  padding: clamp(50px, 8vw, 90px) 0;
}

.section-heading {
  text-align: center;
  margin-bottom: clamp(32px, 5vw, 60px);
}

.section-kicker {
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: #ff4800;
  font-size: 12px;
  margin-bottom: 12px;
}

.section-heading h2 {
  font-size: clamp(30px, 4vw, 42px);
  margin-bottom: 12px;
  color: #0f172a;
}

.section-heading p {
  color: #61728a;
  font-size: 16px;
}

.clients-grid {
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  gap: clamp(10px, 1.5vw, 18px);
  max-width: 1280px;
  margin: 0 auto;
}

.client-card {
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(216, 228, 237, 0.9);
  border-radius: 8px;
  padding: 16px 12px;
  text-align: center;
  box-shadow: 0 10px 24px rgba(15, 23, 42, 0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  will-change: transform, opacity;
}

.client-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 16px 34px rgba(15, 23, 42, 0.14);
}

.client-logo {
  width: 100%;
  height: 72px;
  border-radius: 8px;
  margin-bottom: 12px;
  background-color: #ffffff;
}

.client-card p {
  margin: 0;
  font-weight: 600;
  font-size: 13px;
  line-height: 1.25;
  color: #334155;
}

@media (max-width: 1023px) {
  .clients-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (max-width: 768px) {
  .clients-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 560px) {
  .clients-grid {
    grid-template-columns: 1fr;
  }
}
</style>
