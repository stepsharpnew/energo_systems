<template>
  <section class="services-section" ref="aboutSection">
    <div ref="block1" class="content-block content-block-1" data-speed="0.9">
      <img
        ref="image1"
        :src="contentImage1"
        alt="О компании"
        class="content-image content-image-1"
      />
      <div ref="text1" class="content-text">
        <h2 class="content-title">О компании</h2>
        <p class="content-intro">
          Энергетическая компания с более чем 10-летним опытом работы в
          Москве и Московской области. Мы специализируемся на комплексных
          решениях в сфере электроснабжения от проектирования до ввода объектов
          в эксплуатацию.
        </p>
        <div class="content-highlights">
          <div class="highlight-item">
            <span class="highlight-number">2013</span>
            <span class="highlight-text">год основания компании</span>
          </div>
          <div class="highlight-item">
            <span class="highlight-number">5000+</span>
            <span class="highlight-text">реализованных проектов</span>
          </div>
          <div class="highlight-item">
            <span class="highlight-number">Сроки</span>
            <span class="highlight-text">контроль на каждом этапе</span>
          </div>
        </div>
        <a
          class="presentation-link"
          :href="presentationUrl"
          target="_blank"
          rel="noopener"
        >
          <span class="presentation-filetype" aria-hidden="true">PDF</span>
          <span class="presentation-copy">
            <strong>Презентация компании</strong>
            <small>Открыть материал об опыте, услугах и проектах</small>
          </span>
        </a>
        <!-- <p class="content-description">
          ООО «ЭНЕРГОСИСТЕМЫ» работает в сфере энергетики с 2013 года. За это
          время мы собрали команду первоклассных специалистов, обширную
          материально-техническую базу и накопили большой опыт реализации
          проектов любой степени сложности.
        </p>
        <p class="content-description">
          Более 5000 объектов спроектировано и построено для ПАО «Россети
          Московский регион». Наше проектное бюро имеет обширный опыт выпуска проектной
          документации, соответствующей не только всем нормативным требованиям,
          но и конкретным технико-экономическим показателям, установленным
          заказчиком.
        </p>
        <p class="content-description">
          Наша компания на протяжении многих лет является рамочным
          подрядчиком ПАО «Россети» Москвы и московского региона, и имеет
          исключительно положительные характеристики своей работы. Мы готовы
          взять на себя функции подрядчика на строительных объектах любого
          масштаба и назначения для своевременного выполнения работ "под ключ"
          по электрическим и слаботочным системам как по проектам собственного
          исполнения, так и по готовым проектам Заказчика.
        </p> -->
      </div>
    </div>

    <div ref="block2" class="content-block content-block-2" data-speed="0.9">
      <div ref="text2" class="content-text">
        <h2 class="content-title">Как мы работаем</h2>
        <p class="content-intro">
          Мы предлагаем комплексный подход к реализации проектов — от первичной
          консультации до ввода объекта в эксплуатацию. Каждый этап тщательно
          проработан и контролируется нашими специалистами.
        </p>
        <div class="work-steps">
          <div class="work-step">
            <div class="step-number">01</div>
            <div class="step-content">
              <h3 class="step-title">Проектирование и согласование</h3>
              <p class="step-description">
                Разработка проектной документации с учетом всех нормативных
                требований и согласование во всех необходимых инстанциях
              </p>
            </div>
          </div>
          <div class="work-step">
            <div class="step-number">02</div>
            <div class="step-content">
              <h3 class="step-title">Закупка и поставка</h3>
              <p class="step-description">
                Подбор и закупка качественного оборудования и материалов от
                проверенных поставщиков
              </p>
            </div>
          </div>
          <div class="work-step">
            <div class="step-number">03</div>
            <div class="step-content">
              <h3 class="step-title">Строительно-монтажные работы</h3>
              <p class="step-description">
                Выполнение всех видов электромонтажных работ с соблюдением
                технологий и сроков
              </p>
            </div>
          </div>
          <div class="work-step">
            <div class="step-number">04</div>
            <div class="step-content">
              <h3 class="step-title">Пусконаладочные работы</h3>
              <p class="step-description">
                Проверка, настройка и испытание всех систем для обеспечения
                надежной работы
              </p>
            </div>
          </div>
          <div class="work-step">
            <div class="step-number">05</div>
            <div class="step-content">
              <h3 class="step-title">Документация и ввод в эксплуатацию</h3>
              <p class="step-description">
                Формирование полного пакета исполнительной документации и ввод
                объекта в эксплуатацию
              </p>
            </div>
          </div>
          <div class="work-step">
            <div class="step-number">06</div>
            <div class="step-content">
              <h3 class="step-title">Гарантийное обслуживание</h3>
              <p class="step-description">
                Гарантийное и послегарантийное обслуживание с постоянным
                мониторингом состояния систем
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="content-images-group">
        <img
          ref="image2"
          :src="contentImage2"
          alt="Как мы работаем"
          class="content-image content-image-2"
        />
        <img
          v-if="!isMobile"
          ref="image4"
          :src="contentImage4"
          alt="Как мы работаем"
          class="content-image content-image-4"
        />
      </div>
    </div>

    <div ref="block3" class="content-block content-block-3" data-speed="0.9">
      <div class="content-images-group">
        <img
          ref="image3"
          :src="contentImage3"
          alt="Наши преимущества"
          class="content-image content-image-3"
        />
        <img
          v-if="!isMobile"
          ref="image5"
          :src="contentImage5"
          alt="Наши преимущества"
          class="content-image content-image-5"
        />
      </div>
      <div ref="text3" class="content-text">
        <h2 class="content-title">Наши преимущества</h2>
        <p class="content-intro">
          Мы создаем максимальную ценность для наших клиентов, сочетая
          профессиональный опыт, современные технологии и индивидуальный подход
          к каждому проекту.
        </p>
        <div class="advantages-grid">
          <div class="advantage-card">
            <!-- <div class="advantage-icon">💰</div> -->
            <h3 class="advantage-title">Гибкая ценовая политика</h3>
            <p class="advantage-description">
              Индивидуальный подход к ценообразованию с учетом специфики проекта
              и возможностей заказчика
            </p>
          </div>
          <div class="advantage-card">
            <!-- <div class="advantage-icon">🏆</div> -->
            <h3 class="advantage-title">Большой опыт проектов</h3>
            <p class="advantage-description">
              Более 5000 успешно реализованных проектов различной сложности и
              масштаба
            </p>
          </div>
          <div class="advantage-card">
            <!-- <div class="advantage-icon">⚡</div> -->
            <h3 class="advantage-title">Оптимизация расходов</h3>
            <p class="advantage-description">
              Конкретизация нужд заказчика и поиск наиболее экономически
              выгодных решений
            </p>
          </div>
          <div class="advantage-card">
            <!-- <div class="advantage-icon">🔑</div> -->
            <h3 class="advantage-title">Работа "под ключ"</h3>
            <p class="advantage-description">
              Полный цикл работ от проектирования до ввода в эксплуатацию и
              обслуживания
            </p>
          </div>
          <!-- <div class="advantage-card">
            <div class="advantage-icon">⏱️</div>
            <h3 class="advantage-title">Соблюдение сроков</h3>
            <p class="advantage-description">Строгое соблюдение договорных обязательств и сроков на каждом этапе реализации</p>
          </div>
          <div class="advantage-card">
            <div class="advantage-icon">✅</div>
            <h3 class="advantage-title">Контроль качества</h3>
            <p class="advantage-description">Многоуровневая система контроля качества на всех этапах выполнения работ</p>
          </div>
          <div class="advantage-card">
            <div class="advantage-icon">🛠️</div>
            <h3 class="advantage-title">Материально-техническая база</h3>
            <p class="advantage-description">Обширная база современного оборудования и инструментов для выполнения любых задач</p>
          </div>
          <div class="advantage-card">
            <div class="advantage-icon">💡</div>
            <h3 class="advantage-title">Оптимальные решения</h3>
            <p class="advantage-description">Поиск и реализация наиболее эффективных технических решений для каждого проекта</p>
          </div> -->
        </div>
      </div>
    </div>

    <div ref="block4" class="content-block content-block-4">
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
      </div>
    </div>
  </section>
</template>

<script>
const rossetiLogo = '/img/clients/client-5.png';
const contentImage1 = '/img/content/content-1.png';
const contentImage3 = '/img/content/content-2.jpg';
const contentImage2 = '/img/content/content-3.png';
const contentImage4 = '/img/content/content-4.jpg';
const contentImage5 = '/img/content/content-5.jpg';
const presentationUrl = '/Energosistemy_el_vesia_2026.pdf';

export default {
  name: "ContentBlocks",
  data() {
    return {
      scrollTriggers: [],
      contentImage1,
      contentImage2,
      contentImage3,
      contentImage4,
      contentImage5,
      presentationUrl,
      rossetiLogo,
      isMobile: false,
    };
  },
  mounted() {
    this.checkMobile();
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
    checkMobile() {
      this.isMobile = window.innerWidth <= 992;
    },
    setupScrollTrigger() {
      const gsap = this.$gsap;
      const ScrollTrigger = this.$ScrollTrigger;

      if (!gsap || !ScrollTrigger) return;

      // Проверяем, не мобильное ли устройство
      const isMobile = window.innerWidth <= 992;

      this.scrollTriggers = [];

      // Определяем параметры анимации в зависимости от устройства
      const animConfig = isMobile
        ? {
            xOffset: 30, // Меньшее смещение на мобильных
            scrubValue: 0.8, // Плавная привязка к скроллу на мобильных
          }
        : {
            xOffset: 60,
            scrubValue: 0.5,
          };

      // Анимация для блока 1 - весь блок выезжает слева вместе
      if (this.$refs.block1) {
        const anim = gsap.fromTo(
          this.$refs.block1,
          {
            opacity: 0,
            x: -80,
          },
          {
            opacity: 1,
            x: 0,
            duration: 0.3,
            ease: "none",
            scrollTrigger: {
              trigger: this.$refs.block1,
              start: "top 80%",
              toggleActions: "play reverse play reverse",
            },
          }
        );
        if (anim.scrollTrigger) {
          this.scrollTriggers.push(anim.scrollTrigger);
        }
      }

      // Анимация для блока 2 - заголовок, описание и картинки справа одним блоком, этапы справа с отдельными триггерами
      if (this.$refs.block2) {
        // Создаем контейнер для заголовка, описания и картинок
        const headerElements = [];

        if (this.$refs.text2) {
          const title = this.$refs.text2.querySelector(".content-title");
          const intro = this.$refs.text2.querySelector(".content-intro");
          if (title) headerElements.push(title);
          if (intro) headerElements.push(intro);
        }

        if (this.$refs.image2) headerElements.push(this.$refs.image2);
        if (this.$refs.image4) headerElements.push(this.$refs.image4);

        // Анимация заголовка, описания и картинок как один блок справа
        if (headerElements.length > 0) {
          const headerAnim = gsap.fromTo(
            headerElements,
            {
              opacity: 0,
              x: 80,
            },
            {
              opacity: 1,
              x: 0,
              duration: 0.2,
              ease: "none",
              scrollTrigger: {
                trigger: this.$refs.block2,
                start: "top 80%",
                toggleActions: "play reverse play reverse",
              },
            }
          );
          if (headerAnim.scrollTrigger) {
            this.scrollTriggers.push(headerAnim.scrollTrigger);
          }
        }

        // Анимация этапов работы - каждый этап с отдельным ScrollTrigger, появляется слева
        if (this.$refs.text2) {
          const workSteps = this.$refs.text2.querySelectorAll(".work-step");
          workSteps.forEach((step) => {
            const stepAnim = gsap.fromTo(
              step,
              {
                opacity: 0,
                x: -80,
              },
              {
                opacity: 1,
                x: 0,
                duration: 0,
                ease: "none",
                scrollTrigger: {
                  trigger: step,
                  start: "top 85%",
                  toggleActions: "play reverse play reverse",
                },
              }
            );
            if (stepAnim.scrollTrigger) {
              this.scrollTriggers.push(stepAnim.scrollTrigger);
            }
          });
        }
      }

      // Анимация для блока 3 - заголовок, описание и картинки слева одним блоком, карточки справа с отдельными триггерами
      if (this.$refs.block3) {
        // Создаем контейнер для заголовка, описания и картинок
        const headerElements = [];

        if (this.$refs.text3) {
          const title = this.$refs.text3.querySelector(".content-title");
          const intro = this.$refs.text3.querySelector(".content-intro");
          if (title) headerElements.push(title);
          if (intro) headerElements.push(intro);
        }

        if (this.$refs.image3) headerElements.push(this.$refs.image3);
        if (this.$refs.image5) headerElements.push(this.$refs.image5);

        // Анимация заголовка, описания и картинок как один блок слева
        if (headerElements.length > 0) {
          const headerAnim = gsap.fromTo(
            headerElements,
            {
              opacity: 0,
              x: -80,
            },
            {
              opacity: 1,
              x: 0,
              duration: 0.3,
              ease: "none",
              scrollTrigger: {
                trigger: this.$refs.block3,
                start: "top 80%",
                toggleActions: "play reverse play reverse",
              },
            }
          );
          if (headerAnim.scrollTrigger) {
            this.scrollTriggers.push(headerAnim.scrollTrigger);
          }
        }

        // Анимация карточек преимуществ - каждая карточка с отдельным ScrollTrigger, появляется справа
        if (this.$refs.text3) {
          const advantageCards =
            this.$refs.text3.querySelectorAll(".advantage-card");
          advantageCards.forEach((card) => {
            const cardAnim = gsap.fromTo(
              card,
              {
                opacity: 0,
                x: 80,
              },
              {
                opacity: 1,
                x: 0,
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

        // Анимация партнерской информации - отдельно для логотипа и текста
        if (this.$refs.partnerInfo) {
          // Анимация логотипа
          if (this.$refs.logoContainer) {
            const logoAnim = gsap.fromTo(
              this.$refs.logoContainer,
              {
                opacity: 0,
                scale: 0.8,
                x: -20,
              },
              {
                opacity: 1,
                scale: 1,
                x: 0,
                ease: "back.out(1.4)",
                scrollTrigger: {
                  trigger: this.$refs.partnerInfo,
                  start: "top 90%",
                  end: isMobile ? "top 60%" : "top 70%",
                  scrub: animConfig.scrubValue,
                },
              }
            );
            if (logoAnim.scrollTrigger) {
              this.scrollTriggers.push(logoAnim.scrollTrigger);
            }
          }

          // Анимация текста партнерской информации - выезжает справа
          const partnerText = this.$refs.partnerInfo.querySelector(
            ".partner-text-compact"
          );
          if (partnerText) {
            const partnerTextAnim = gsap.fromTo(
              partnerText,
              {
                x: isMobile ? 60 : 100,
                y: isMobile ? 20 : 30,
              },
              {
                x: 0,
                y: 0,
                ease: "power1.out",
                scrollTrigger: {
                  trigger: this.$refs.partnerInfo,
                  start: "top 90%",
                  end: isMobile ? "top 60%" : "top 70%",
                  scrub: animConfig.scrubValue,
                },
              }
            );
            if (partnerTextAnim.scrollTrigger) {
              this.scrollTriggers.push(partnerTextAnim.scrollTrigger);
            }
          }
        }

        // Анимация статистики - плавная привязка к скроллу
        if (this.$refs.statsCompact) {
          const statsAnim = gsap.fromTo(
            this.$refs.statsCompact,
            {
              opacity: 0,
              y: 30,
            },
            {
              opacity: 1,
              y: 0,
              ease: "power2.out",
              scrollTrigger: {
                trigger: this.$refs.statsCompact,
                start: "top 90%",
                end: isMobile ? "top 60%" : "top 70%",
                scrub: animConfig.scrubValue,
              },
            }
          );
          if (statsAnim.scrollTrigger) {
            this.scrollTriggers.push(statsAnim.scrollTrigger);
          }
        }

        // Анимация отдельных элементов статистики - плавная привязка к скроллу
        [
          this.$refs.statCompact1,
          this.$refs.statCompact2,
          this.$refs.statCompact3,
        ].forEach((stat, index) => {
          if (stat) {
            const statAnim = gsap.fromTo(
              stat,
              {
                opacity: 0,
                scale: 0.7,
                y: 20,
              },
              {
                opacity: 1,
                scale: 1,
                y: 0,
                ease: "back.out(1.2)",
                scrollTrigger: {
                  trigger: this.$refs.statsCompact,
                  start: "top 90%",
                  end: isMobile ? "top 60%" : "top 70%",
                  scrub: animConfig.scrubValue,
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

      // Обновляем состояние мобильного устройства
      const wasMobile = this.isMobile;
      this.checkMobile();

      // Если состояние изменилось, нужно пересоздать анимации
      if (wasMobile !== this.isMobile) {
        this.$nextTick(() => {
          if (!gsap || !ScrollTrigger) return;

          // При изменении размера пересоздаем анимации
          if (this.scrollTriggers.length > 0) {
            this.scrollTriggers.forEach((st) => st.kill());
            this.scrollTriggers = [];
          }

          // Пересоздаем анимации с новыми параметрами
          this.setupScrollTrigger();
        });
      } else if (gsap && ScrollTrigger) {
        // Если состояние не изменилось, просто обновляем ScrollTrigger
        if (this.scrollTriggers.length > 0) {
          this.scrollTriggers.forEach((st) => st.kill());
          this.scrollTriggers = [];
        }
        this.setupScrollTrigger();
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
  margin-bottom: 200px;
  position: relative;
  will-change: transform, opacity;
  z-index: 1;
}

.content-block:last-child {
  margin-bottom: 0;
}

.content-block-1 {
  grid-template-areas: "image text";
}

.content-block-2 {
  grid-template-areas: "text image";
  margin-bottom: 200px !important;
  z-index: 1;
  min-height: 0;
}

.content-block-3 {
  grid-template-areas: "image text";
  margin-top: 0 !important;
  margin-bottom: 200px;
  padding-top: 200px;
  z-index: 2;
  position: relative;
  clear: both;
}

@media (max-width: 992px) {
  .content-block-3 {
    padding-top: 0;
  }
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
  background: linear-gradient(90deg, #ff4800 0%, #ff7a2f 50%, #ff4800 100%);
}

.content-images-group {
  grid-area: image;
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: auto;
  gap: clamp(16px, 2.5vw, 24px);
  width: 100%;
}

.content-image {
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
  background: linear-gradient(90deg, #ff4800 0%, #ff7a2f 100%);
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

.content-intro {
  font-size: clamp(18px, 2.2vw, 22px);
  line-height: 1.7;
  color: #4a5568;
  margin-bottom: 32px;
  font-weight: 500;
}

/* Стили для блока "О компании" */
.content-highlights {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin: 32px 0;
  padding: 32px;
  background: linear-gradient(
    135deg,
    rgba(255, 72, 0, 0.05),
    rgba(255, 72, 0, 0.02)
  );
  border-radius: 16px;
  border: 1px solid rgba(255, 72, 0, 0.1);
}

.highlight-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 8px;
}

.highlight-number {
  font-size: clamp(32px, 4vw, 48px);
  font-weight: 800;
  color: #ff4800;
  line-height: 1;
  font-family: "Arial", sans-serif;
}

.highlight-text {
  font-size: clamp(13px, 1.5vw, 16px);
  color: #64748b;
  font-weight: 500;
  line-height: 1.4;
}

.presentation-link {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  align-items: center;
  gap: 14px;
  width: fit-content;
  max-width: 100%;
  margin-top: 24px;
  padding: 14px 18px;
  border: 1px solid rgba(255, 72, 0, 0.24);
  border-radius: 8px;
  color: #162236;
  background: #ffffff;
  text-decoration: none;
  box-shadow: 0 10px 24px rgba(17, 24, 39, 0.08);
  transition:
    border-color 0.25s ease,
    box-shadow 0.25s ease,
    transform 0.25s ease;
}

.presentation-link:hover {
  border-color: #ff4800;
  box-shadow: 0 14px 30px rgba(255, 72, 0, 0.16);
  transform: translateY(-2px);
}

.presentation-filetype {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 8px;
  background: #ff4800;
  color: #ffffff;
  font-size: 13px;
  font-weight: 800;
  line-height: 1;
}

.presentation-copy {
  min-width: 0;
  display: grid;
  gap: 3px;
}

.presentation-copy strong {
  color: #0f172a;
  font-size: clamp(15px, 1.8vw, 17px);
  line-height: 1.2;
}

.presentation-copy small {
  color: #64748b;
  font-size: clamp(12px, 1.4vw, 14px);
  line-height: 1.35;
}

/* Стили для блока "Как мы работаем" */
.work-steps {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 32px;
}

.work-step {
  display: flex;
  gap: 20px;
  padding: 24px;
  background: #fff;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  transition: all 0.3s ease;
}

.work-step:hover {
  border-color: #ff4800;
  box-shadow: 0 4px 12px rgba(255, 72, 0, 0.1);
  transform: translateX(4px);
}

.step-number {
  flex-shrink: 0;
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #ff4800, #ff7a2f);
  color: #fff;
  font-size: 24px;
  font-weight: 800;
  border-radius: 12px;
  font-family: "Arial", sans-serif;
}

.step-content {
  flex: 1;
}

.step-title {
  font-size: clamp(18px, 2vw, 20px);
  font-weight: 700;
  color: #0f172a;
  margin: 0 0 8px 0;
}

.step-description {
  font-size: clamp(15px, 1.8vw, 16px);
  color: #64748b;
  line-height: 1.6;
  margin: 0;
}

/* Стили для блока "Наши преимущества" */
.advantages-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-top: 32px;
}

.advantage-card {
  padding: 24px;
  background: #fff;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.advantage-card:hover {
  border-color: #ff4800;
  box-shadow: 0 8px 24px rgba(255, 72, 0, 0.15);
  transform: translateY(-4px);
}

.advantage-icon {
  font-size: 40px;
  line-height: 1;
  margin-bottom: 4px;
}

.advantage-title {
  font-size: clamp(18px, 2vw, 20px);
  font-weight: 700;
  color: #0f172a;
  margin: 0;
}

.advantage-description {
  font-size: clamp(14px, 1.6vw, 16px);
  color: #64748b;
  line-height: 1.6;
  margin: 0;
}

/* Компактный инфографический блок */
.partner-info-compact {
  display: flex;
  align-items: center;
  gap: clamp(20px, 3vw, 32px);
  padding-bottom: clamp(20px, 3vw, 28px);
  border-bottom: 2px solid rgba(255, 72, 0, 0.1);
  will-change: transform, opacity;
  min-height: 80px;
}

.partner-logo-compact {
  flex-shrink: 0;
  padding: clamp(12px, 2vw, 20px);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  will-change: transform, opacity;
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
  color: #ff4800;
  font-weight: 700;
}

.stats-compact {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: clamp(16px, 3vw, 32px);
  flex-wrap: wrap;
  will-change: transform, opacity;
  min-height: 100px;
}

.stat-compact-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  min-width: 100px;
  will-change: transform, opacity;
}

.stat-compact-number {
  font-size: clamp(32px, 5vw, 56px);
  font-weight: 800;
  color: #ff4800;
  line-height: 1;
  margin-bottom: 8px;
  font-family: "Arial", sans-serif;
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
  background: linear-gradient(
    180deg,
    transparent 0%,
    rgba(255, 72, 0, 0.2) 50%,
    transparent 100%
  );
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

  .content-images-group {
    grid-template-columns: 1fr;
    gap: 20px;
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

  .content-highlights {
    grid-template-columns: 1fr;
    gap: 20px;
    padding: 24px;
  }

  .advantages-grid {
    grid-template-columns: 1fr;
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

  .content-intro {
    font-size: 16px;
    margin-bottom: 24px;
  }

  .content-highlights {
    padding: 20px;
    gap: 16px;
  }

  .highlight-number {
    font-size: 28px;
  }

  .work-step {
    padding: 20px;
    gap: 16px;
  }

  .step-number {
    width: 48px;
    height: 48px;
    font-size: 20px;
  }

  .advantage-card {
    padding: 20px;
  }

  .advantage-icon {
    font-size: 32px;
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
    background: linear-gradient(
      90deg,
      transparent 0%,
      rgba(255, 72, 0, 0.2) 50%,
      transparent 100%
    );
  }
}

.content-description b {
  color: #ff4800;
}
</style>
