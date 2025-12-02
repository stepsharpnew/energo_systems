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
          <b>«Энергосистемы»</b> - задачи решаются быстро и эффективно
        </p>
        <p class="content-description">
          <b>1.</b> Проектирование и согласование проектов<br />
          <b>2.</b> Закупка и поставка оборудования и материалов<br />
          <b>3.</b> Строительно-монтажные работы<br />
          <b>4.</b> Пусконаладочные работы<br />
          <b>5.</b> Формирование и сдача исполнительной документации<br />
          <b>6.</b> Строительно-монтажные работы<br />
          <b>7.</b> Ввод объекта в эксплуатацию<br />
          <b>8.</b> Гарантийное и послегарантийное обслуживание<br />
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
          <b>1.</b> Гибкая ценовая политика<br />
          <b>2.</b> Большой опыт реализованных проектов<br />
          <b>3.</b> Конкретизация нужд и оптимизация расходов заказчика<br />
          <b>4.</b> Возможность выступать в роли субподрядчика "под ключ"<br />
          <b>5.</b> Строгое соблюдение сроков на каждом этапе реализации
          работ<br />
          <b>6.</b> Постоянный внутренний контроль качества выполнения работ<br />
          <b>7.</b> Обширная материально-техническая база<br />
          <b>8.</b> Поиск наиболее оптимальных вариантов реализации проектов<br />
        </p>
      </div>
    </div>
  </section>
</template>

<script>
import contentImage1 from "@/assets/content/content-1.png";
import contentImage3 from "@/assets/content/content-2.png";
import contentImage2 from "@/assets/content/content-3.png";

export default {
  name: "ContentBlocks",
  data() {
    return {
      scrollTriggers: [],
      contentImage1,
      contentImage2,
      contentImage3,
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

      // На мобильных устройствах устанавливаем начальные значения
      if (isMobile) {
        if (this.$refs.block1) {
          gsap.set(this.$refs.block1, { opacity: 1, x: 0 });
        }
        if (this.$refs.block2) {
          gsap.set(this.$refs.block2, { opacity: 1, x: 0 });
        }
        if (this.$refs.block3) {
          gsap.set(this.$refs.block3, { opacity: 1, x: 0 });
        }
        return;
      }

      // Анимация для блока 1 (движение слева)
      if (this.$refs.block1) {
        const anim1 = gsap.fromTo(
          this.$refs.block1,
          {
            opacity: 0,
            x: -60,
          },
          {
            opacity: 1,
            x: 0,
            ease: "power1.out",
            scrollTrigger: {
              trigger: this.$refs.block1,
              start: "top 90%",
              end: "center 60%",
              scrub: 0.5,
            },
          }
        );

        this.scrollTriggers.push(anim1.scrollTrigger);
      }

      // Анимация для блока 2 (движение справа)
      if (this.$refs.block2) {
        const anim2 = gsap.fromTo(
          this.$refs.block2,
          {
            opacity: 0,
            x: 60,
          },
          {
            opacity: 1,
            x: 0,
            ease: "power1.out",
            scrollTrigger: {
              trigger: this.$refs.block2,
              start: "top 90%",
              end: "center 60%",
              scrub: 0.5,
            },
          }
        );

        this.scrollTriggers.push(anim2.scrollTrigger);
      }

      // Анимация для блока 3 (движение слева)
      if (this.$refs.block3) {
        const anim3 = gsap.fromTo(
          this.$refs.block3,
          {
            opacity: 0,
            x: -60,
          },
          {
            opacity: 1,
            x: 0,
            ease: "power1.out",
            scrollTrigger: {
              trigger: this.$refs.block3,
              start: "top 90%",
              end: "center 60%",
              scrub: 0.5,
            },
          }
        );

        this.scrollTriggers.push(anim3.scrollTrigger);
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
      const isMobile = window.innerWidth <= 992;
      const gsap = this.$gsap;
      const ScrollTrigger = this.$ScrollTrigger;

      if (!gsap || !ScrollTrigger) return;

      // Если переключились на мобильный режим
      if (isMobile && this.scrollTriggers.length > 0) {
        // Убиваем все ScrollTrigger
        this.scrollTriggers.forEach((st) => st.kill());
        this.scrollTriggers = [];
        // Устанавливаем видимость элементов
        if (this.$refs.block1) {
          gsap.set(this.$refs.block1, { opacity: 1, x: 0 });
        }
        if (this.$refs.block2) {
          gsap.set(this.$refs.block2, { opacity: 1, x: 0 });
        }
        if (this.$refs.block3) {
          gsap.set(this.$refs.block3, { opacity: 1, x: 0 });
        }
      } else if (!isMobile && this.scrollTriggers.length === 0) {
        // Если переключились на десктоп, пересоздаем анимации
        this.setupScrollTrigger();
      } else if (this.scrollTriggers.length > 0) {
        // Просто обновляем ScrollTrigger
        this.refreshScrollTrigger();
      }
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
  margin-bottom: clamp(60px, 8vw, 100px);
  position: relative;
  will-change: transform, opacity;
}

.content-block:last-child {
  margin-bottom: 0;
}

.content-block-1 {
  grid-template-areas: "image text";
  z-index: 1;
}

.content-block-2 {
  grid-template-areas: "text image";
  z-index: 2;
}

.content-block-3 {
  grid-template-areas: "image text";
  z-index: 3;
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
  font-size: clamp(12px, 1vw, 14px);
  line-height: 1.8;
  color: #4a4a4a;
  margin-bottom: 20px;
}

.content-description:last-child {
  margin-bottom: 0;
}

@media (max-width: 992px) {
  .content-block {
    grid-template-columns: 1fr;
    gap: 40px;
    opacity: 1 !important;
    transform: none !important;
    will-change: auto !important;
  }

  .content-block-1,
  .content-block-2,
  .content-block-3 {
    grid-template-areas:
      "image"
      "text";
    opacity: 1 !important;
    transform: none !important;
    z-index: auto !important;
  }

  .content-block {
    margin-bottom: clamp(50px, 7vw, 80px);
  }

  /* Отключаем data-speed эффект на мобильных */
  [data-speed] {
    transform: none !important;
  }
}

@media (max-width: 768px) {
  .content-block {
    margin-bottom: 50px;
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
}

@media (max-width: 560px) {
  .content-block {
    margin-bottom: 40px;
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
}
</style>
