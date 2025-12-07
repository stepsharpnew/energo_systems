<template>
  <section class="services-section" ref="aboutSection">
    <div ref="block1" class="content-block content-block-1" data-speed="0.9">
      <img
        :src="contentImage1"
        alt="О компании"
        class="content-image content-image-1"
      />
      <div class="content-text">
        <h2 class="content-title">О компании</h2>
        <p class="content-description">
          ООО «ЭНЕРГОСИСТЕМЫ» работает в сфере энергетики с 2013 года. За это
          время мы собрали команду первоклассных специалистов, обширную
          материально-техническую базу и накопили большой опыт реализации
          проектов любой степени сложности.
        </p>
        <p class="content-description">
          Более 1000 объектов запроектировано и построено для ПАО Россети
          Московский регион.
        </p>

        <p class="content-description">
          Наше проектное бюро имеет обширный опыт выпуска проектной
          документации, соответствующий не только всем нормативным требованиям,
          но и конкретным технико-экономическим показателям, установленным
          заказчиком. Наша компания на протяжении многих лет является рамочным
          подрядчиком ПАО «Россети» Москвы и московского региона, и имеет
          исключительно положительные характеристики своей работы. Мы готовы
          взять на себя функции подрядчика на строительных объектах любого
          масштаба и назначения для своевременного выполнения работ "под ключ"
          по электрическим и слаботочным системам как по проектам собственного
          исполнения, так и по готовым проектам Заказчика.
        </p>
      </div>
    </div>

    <div ref="block2" class="content-block content-block-2" data-speed="0.8">
      <div class="content-text">
        <h2 class="content-title">Как мы работаем</h2>
        <p class="content-description">
          <b>«Энергосистемы»</b> - решаем задачи быстро и эффективно.
        </p>
        <p class="content-description">
          Этапы нашей работы:
        </p>
        <p class="content-description">
          <b>• </b> Проектирование и согласование проектов<br />
          <b>• </b> Закупка и поставка оборудования и материалов<br />
          <b>• </b> Строительно-монтажные работы<br />
          <b>• </b> Пусконаладочные работы<br />
          <b>• </b> Формирование и сдача исполнительной документации<br />
          <b>• </b> Ввод объекта в эксплуатацию<br />
          <b>• </b> Гарантийное и послегарантийное обслуживание<br />
        </p>
      </div>
      <img
        :src="contentImage2"
        alt="Как мы работаем"
        class="content-image content-image-2"
      />
    </div>

    <div ref="block3" class="content-block content-block-3" data-speed="0.8">
      <img
        :src="contentImage3"
        alt="Наши преимущества"
        class="content-image content-image-3"
      />
      <div class="content-text">
        <h2 class="content-title">Наши преимущества</h2>
        <p class="content-description">
          <b>• </b> Гибкая ценовая политика<br />
          <b>• </b> Большой опыт реализованных проектов<br />
          <b>• </b> Конкретизация нужд и оптимизация расходов заказчика<br />
          <b>• </b> Возможность выступать в роли субподрядчика "под ключ"<br />
          <b>• </b> Строгое соблюдение сроков на каждом этапе реализации
          работ<br />
          <b>• </b> Постоянный внутренний контроль качества выполнения работ<br />
          <b>• </b> Обширная материально-техническая база<br />
          <b>• </b> Поиск наиболее оптимальных вариантов реализации проектов<br />
        </p>
      </div>
    </div>

    <div ref="block4" class="content-block content-block-4" data-speed="0.8">
      <div class="partner-info-compact" ref="partnerInfo">
        <div class="partner-logo-compact" ref="logoContainer">
          <img 
            :src="rossetiLogo" 
            alt="ПАО Россети Московский регион" 
            class="partner-logo-img"
          />
        </div>
        <div class="partner-text-compact">
          <p class="partner-compact-description">
            Более <strong>5000 объектов</strong> спроектировано и построено нами 
            для <strong>ПАО "Россети Московский регион"</strong>
          </p>
        </div>
      </div>
      <div class="stats-compact" ref="statsCompact">
        <div class="stat-compact-item" ref="statCompact1">
          <div class="stat-compact-number">5000+</div>
          <div class="stat-compact-label">объектов</div>
        </div>
        <div class="stat-compact-divider"></div>
        <div class="stat-compact-item" ref="statCompact2">
          <div class="stat-compact-icon">📋</div>
          <div class="stat-compact-text">Спроектировано</div>
        </div>
        <div class="stat-compact-divider"></div>
        <div class="stat-compact-item" ref="statCompact3">
          <div class="stat-compact-icon">🏗️</div>
          <div class="stat-compact-text">Построено</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import contentImage1 from "@/assets/content/content-1.png";
import contentImage3 from "@/assets/content/content-2.jpg";
import contentImage2 from "@/assets/content/content-3.png";
import rossetiLogo from "@/assets/clients/client-5.png";

export default {
  name: "ContentBlocks",
  data() {
    return {
      scrollTriggers: [],
      contentImage1,
      contentImage2,
      contentImage3,
      rossetiLogo,
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.setupScrollTrigger();
      // Обновляем ScrollTrigger после монтирования
      this.refreshScrollTrigger();
    });

    // Добавляем обработчик изменения размера окна
    window.addEventListener("resize", this.handleResize, { passive: true });
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.handleResize);
    // Очищаем ScrollTrigger инстансы
    if (this.scrollTriggers) {
      this.scrollTriggers.forEach((st) => st.kill());
      this.scrollTriggers = [];
    }
  },
  methods: {
    setupScrollTrigger() {
      const gsap = this.$gsap;
      const ScrollTrigger = this.$ScrollTrigger;

      if (!gsap || !ScrollTrigger) return;

      // Проверяем, не мобильное ли устройство
      const isMobile = window.innerWidth <= 992;

      this.scrollTriggers = [];

      // Определяем параметры анимации в зависимости от устройства
      const animConfig = isMobile ? {
        xOffset: 30, // Меньшее смещение на мобильных
        scrubValue: 0.8, // Плавная привязка к скроллу на мобильных
      } : {
        xOffset: 60,
        scrubValue: 0.5,
      };

      // Анимация для блока 1 (движение слева) - появляется вниз, пропадает вверх
      if (this.$refs.block1) {
        const anim1 = gsap.fromTo(
          this.$refs.block1,
          {
            opacity: 0,
            x: -animConfig.xOffset,
          },
          {
            opacity: 1,
            x: 0,
            ease: "power1.out",
            scrollTrigger: {
              trigger: this.$refs.block1,
              start: "top 90%",
              end: isMobile ? "top 50%" : "center 60%",
              scrub: animConfig.scrubValue, // Привязка к скроллу - работает в обе стороны
            },
          }
        );

        if (anim1.scrollTrigger) {
          this.scrollTriggers.push(anim1.scrollTrigger);
        }
      }

      // Анимация для блока 2 (движение справа) - появляется вниз, пропадает вверх
      if (this.$refs.block2) {
        const anim2 = gsap.fromTo(
          this.$refs.block2,
          {
            opacity: 0,
            x: animConfig.xOffset,
          },
          {
            opacity: 1,
            x: 0,
            ease: "power1.out",
            scrollTrigger: {
              trigger: this.$refs.block2,
              start: "top 90%",
              end: isMobile ? "top 50%" : "center 60%",
              scrub: animConfig.scrubValue, // Привязка к скроллу - работает в обе стороны
            },
          }
        );

        if (anim2.scrollTrigger) {
          this.scrollTriggers.push(anim2.scrollTrigger);
        }
      }

      // Анимация для блока 3 (движение слева) - появляется вниз, пропадает вверх
      if (this.$refs.block3) {
        const anim3 = gsap.fromTo(
          this.$refs.block3,
          {
            opacity: 0,
            x: -animConfig.xOffset,
          },
          {
            opacity: 1,
            x: 0,
            ease: "power1.out",
            scrollTrigger: {
              trigger: this.$refs.block3,
              start: "top 90%",
              end: isMobile ? "top 50%" : "center 60%",
              scrub: animConfig.scrubValue, // Привязка к скроллу - работает в обе стороны
            },
          }
        );

        if (anim3.scrollTrigger) {
          this.scrollTriggers.push(anim3.scrollTrigger);
        }
      }

      // Анимация для блока 4 (инфографика) - появляется снизу с масштабом
      if (this.$refs.block4) {
        const anim4 = gsap.fromTo(
          this.$refs.block4,
          {
            opacity: 0,
            y: 50,
            scale: 0.95,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: this.$refs.block4,
              start: "top 90%",
              end: isMobile ? "top 50%" : "center 60%",
              scrub: animConfig.scrubValue,
            },
          }
        );

        if (anim4.scrollTrigger) {
          this.scrollTriggers.push(anim4.scrollTrigger);
        }

        // Анимация партнерской информации
        if (this.$refs.partnerInfo) {
          const partnerInfoAnim = gsap.fromTo(
            this.$refs.partnerInfo,
            {
              opacity: 0,
              y: 20,
            },
            {
              opacity: 1,
              y: 0,
              ease: "power2.out",
              duration: 0.6,
              scrollTrigger: {
                trigger: this.$refs.block4,
                start: "top 85%",
                toggleActions: "play none none none",
              },
            }
          );
          if (partnerInfoAnim.scrollTrigger) {
            this.scrollTriggers.push(partnerInfoAnim.scrollTrigger);
          }
        }

        // Анимация логотипа
        if (this.$refs.logoContainer) {
          const logoAnim = gsap.fromTo(
            this.$refs.logoContainer,
            {
              opacity: 0,
              scale: 0.9,
            },
            {
              opacity: 1,
              scale: 1,
              ease: "back.out(1.7)",
              duration: 0.5,
              delay: 0.2,
              scrollTrigger: {
                trigger: this.$refs.block4,
                start: "top 85%",
                toggleActions: "play none none none",
              },
            }
          );
          if (logoAnim.scrollTrigger) {
            this.scrollTriggers.push(logoAnim.scrollTrigger);
          }
        }

        // Анимация статистики
        if (this.$refs.statsCompact) {
          const statsAnim = gsap.fromTo(
            this.$refs.statsCompact,
            {
              opacity: 0,
              y: 20,
            },
            {
              opacity: 1,
              y: 0,
              ease: "power2.out",
              duration: 0.6,
              delay: 0.3,
              scrollTrigger: {
                trigger: this.$refs.block4,
                start: "top 85%",
                toggleActions: "play none none none",
              },
            }
          );
          if (statsAnim.scrollTrigger) {
            this.scrollTriggers.push(statsAnim.scrollTrigger);
          }
        }

        // Анимация отдельных элементов статистики
        [this.$refs.statCompact1, this.$refs.statCompact2, this.$refs.statCompact3].forEach((stat, index) => {
          if (stat) {
            const statAnim = gsap.fromTo(
              stat,
              {
                opacity: 0,
                scale: 0.8,
              },
              {
                opacity: 1,
                scale: 1,
                ease: "back.out(1.4)",
                duration: 0.5,
                delay: 0.4 + index * 0.1,
                scrollTrigger: {
                  trigger: this.$refs.block4,
                  start: "top 85%",
                  toggleActions: "play none none none",
                },
              }
            );
            if (statAnim.scrollTrigger) {
              this.scrollTriggers.push(statAnim.scrollTrigger);
            }
          }
        });
      }

      // Обновляем ScrollTrigger после создания всех анимаций
      this.refreshScrollTrigger();
    },
    refreshScrollTrigger() {
      const ScrollTrigger = this.$ScrollTrigger;
      if (ScrollTrigger) {
        // Небольшая задержка для гарантии готовности DOM
        setTimeout(() => {
          ScrollTrigger.refresh();
        }, 100);
      }
    },
    handleResize() {
      const gsap = this.$gsap;
      const ScrollTrigger = this.$ScrollTrigger;

      if (!gsap || !ScrollTrigger) return;

      // При изменении размера пересоздаем анимации
      if (this.scrollTriggers.length > 0) {
        this.scrollTriggers.forEach((st) => st.kill());
        this.scrollTriggers = [];
      }
      
      // Пересоздаем анимации с новыми параметрами
      this.setupScrollTrigger();
    },
  },
};
</script>

<style scoped>
.services-section {
  padding: clamp(40px, 6vw, 80px) 0;
}

.content-block {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: clamp(32px, 5vw, 60px);
  align-items: center;
  margin-bottom: 200px;
  position: relative;
  will-change: transform, opacity;
}

.content-block:last-child {
  margin-bottom: 0;
}

.content-block-1 {
  grid-template-areas: "image text";
}

.content-block-2 {
  grid-template-areas: "text image";
}

.content-block-3 {
  grid-template-areas: "image text";
}

.content-block-4 {
  grid-template-columns: 1fr;
  grid-template-areas: none;
  display: flex;
  flex-direction: column;
  gap: clamp(24px, 3vw, 32px);
  padding: clamp(32px, 4vw, 48px);
  border-radius: 20px;
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  position: relative;
  max-width: 100%;
  margin: 0 auto;
}

.content-block-4::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, #ef4422 0%, #ff6b4a 50%, #ef4422 100%);
}

.content-image {
  grid-area: image;
  width: 100%;
  aspect-ratio: 4 / 3;
  border-radius: 24px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
  transition: transform 0.5s ease, box-shadow 0.5s ease;
  object-fit: cover;
}

.content-image:hover {
  transform: translateY(-8px);
  box-shadow: 0 28px 80px rgba(0, 0, 0, 0.2);
}

.content-text {
  grid-area: text;
}

.content-title {
  font-size: clamp(28px, 4vw, 42px);
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 24px;
  line-height: 1.2;
  position: relative;
  padding-bottom: 16px;
}

.content-title::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 60px;
  height: 4px;
  background: linear-gradient(90deg, #ef4422 0%, #ff6b4a 100%);
  border-radius: 2px;
}

.content-description {
  font-size: clamp(15px, 1vw, 18px);
  line-height: 1.8;
  color: #4a4a4a;
  margin-bottom: 20px;
}

.content-description:last-child {
  margin-bottom: 0;
}

/* Компактный инфографический блок */
.partner-info-compact {
  display: flex;
  align-items: center;
  gap: clamp(20px, 3vw, 32px);
  padding-bottom: clamp(20px, 3vw, 28px);
  border-bottom: 2px solid rgba(239, 68, 34, 0.1);
}

.partner-logo-compact {
  flex-shrink: 0;
  padding: clamp(12px, 2vw, 20px);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.partner-logo-img {
  max-width: clamp(120px, 15vw, 180px);
  max-height: clamp(50px, 6vw, 80px);
  object-fit: contain;
}

.partner-text-compact {
  flex: 1;
}

.partner-compact-description {
  font-size: clamp(12px, 2vw, 16px);
  line-height: 1.6;
  color: #4a4a4a;
  margin: 0;
}

.partner-compact-description strong {
  color: #ef4422;
  font-weight: 700;
}

.stats-compact {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: clamp(16px, 3vw, 32px);
  flex-wrap: wrap;
}

.stat-compact-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  min-width: 100px;
}

.stat-compact-number {
  font-size: clamp(32px, 5vw, 56px);
  font-weight: 800;
  color: #ef4422;
  line-height: 1;
  margin-bottom: 8px;
  font-family: 'Arial', sans-serif;
}

.stat-compact-label {
  font-size: clamp(13px, 1.5vw, 16px);
  font-weight: 600;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.stat-compact-icon {
  font-size: clamp(24px, 3vw, 32px);
  margin-bottom: 8px;
  line-height: 1;
}

.stat-compact-text {
  font-size: clamp(13px, 1.5vw, 16px);
  font-weight: 600;
  color: #334155;
}

.stat-compact-divider {
  width: 1px;
  height: 50px;
  background: linear-gradient(180deg, transparent 0%, rgba(239, 68, 34, 0.2) 50%, transparent 100%);
  flex-shrink: 0;
}

@media (max-width: 992px) {
  .content-block {
    grid-template-columns: 1fr;
    gap: 40px;
    margin-bottom: 200px;
  }

  .content-block-1,
  .content-block-2,
  .content-block-3 {
    grid-template-areas:
      "image"
      "text";
    z-index: auto !important;
  }

  .content-block-4 {
    padding: clamp(28px, 4vw, 40px);
  }

  .partner-info-compact {
    flex-direction: column;
    text-align: center;
    gap: clamp(16px, 2vw, 24px);
  }

  .partner-logo-compact {
    margin: 0 auto;
  }

  /* Отключаем data-speed эффект на мобильных */
  [data-speed] {
    transform: none !important;
  }
}

@media (max-width: 768px) {
  .content-block {
    margin-bottom: 200px;
    gap: 32px;
  }

  .content-image {
    border-radius: 20px;
  }

  .content-title {
    font-size: 26px;
    margin-bottom: 20px;
  }

  .content-description {
    font-size: 16px;
    margin-bottom: 16px;
  }

  .content-block-4 {
    padding: clamp(24px, 3vw, 32px);
  }

  .stats-compact {
    gap: clamp(12px, 2vw, 24px);
  }

  .stat-compact-divider {
    display: none;
  }
}

@media (max-width: 560px) {
  .content-block {
    margin-bottom: 150px;
    gap: 28px;
  }

  .content-image {
    border-radius: 16px;
  }

  .content-title {
    font-size: 24px;
    margin-bottom: 16px;
    padding-bottom: 12px;
  }

  .content-title::after {
    width: 50px;
    height: 3px;
  }

  .content-description {
    font-size: 15px;
    line-height: 1.7;
  }

  .content-block-4 {
    padding: clamp(20px, 3vw, 28px);
    border-radius: 16px;
  }

  .partner-info-compact {
    padding-bottom: clamp(16px, 2vw, 24px);
    gap: clamp(12px, 2vw, 20px);
  }

  .partner-logo-img {
    max-width: clamp(100px, 12vw, 150px);
    max-height: clamp(40px, 5vw, 60px);
  }

  .stats-compact {
    flex-direction: column;
    gap: clamp(16px, 2vw, 20px);
  }

  .stat-compact-divider {
    width: 60px;
    height: 1px;
    background: linear-gradient(90deg, transparent 0%, rgba(239, 68, 34, 0.2) 50%, transparent 100%);
  }
}

.content-description b {
  color:#ef4422
}
</style>
