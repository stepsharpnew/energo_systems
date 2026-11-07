<template>
  <section id="about" class="services-section" ref="aboutSection">
    <div ref="block1" class="content-block content-block-1">
      <img
        ref="image1"
        v-bind="imageAttrs(contentImage1, { sizes: '(max-width: 992px) 100vw, 50vw', width: 1200 })"
        alt="О компании"
        width="921"
        height="707"
        loading="lazy"
        decoding="async"
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

    <div ref="block2" class="content-block content-block-2">
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
          v-bind="imageAttrs(contentImage2, { sizes: '(max-width: 992px) 100vw, 50vw', width: 1200 })"
          alt="Как мы работаем"
          width="1200"
          height="715"
          loading="lazy"
          decoding="async"
          class="content-image content-image-2"
        />
        <img
          ref="image4"
          v-bind="imageAttrs(contentImage4, { sizes: '(max-width: 992px) 100vw, 50vw', width: 1200 })"
          alt="Как мы работаем"
          width="1200"
          height="800"
          loading="lazy"
          decoding="async"
          class="content-image content-image-4"
        />
      </div>
    </div>

    <div ref="block3" class="content-block content-block-3">
      <div class="content-images-group">
        <img
          ref="image3"
          v-bind="imageAttrs(contentImage3, { sizes: '(max-width: 992px) 100vw, 50vw', width: 1200 })"
          alt="Наши преимущества"
          width="626"
          height="351"
          loading="lazy"
          decoding="async"
          class="content-image content-image-3"
        />
        <img
          ref="image5"
          v-bind="imageAttrs(contentImage5, { sizes: '(max-width: 992px) 100vw, 50vw', width: 1200 })"
          alt="Наши преимущества"
          width="1200"
          height="795"
          loading="lazy"
          decoding="async"
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
            v-bind="imageAttrs(rossetiLogo, { sizes: '(max-width: 992px) 100vw, 50vw', width: 1200 })"
            alt="ПАО Россети Московский регион"
            width="985"
            height="251"
            loading="lazy"
            decoding="async"
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
import { revealOnVisible } from '~/utils/revealOnVisible.js';
import { imageAttrs } from '~/utils/responsiveImage.js';
import '~/assets/styles/progressive-reveal.css';

export default {
  name: "ContentBlocks",
  data() {
    return {
      contentImage1: '/img/content/content-1.webp',
      contentImage3: '/img/content/content-2.webp',
      contentImage2: '/img/content/content-3.webp',
      contentImage4: '/img/content/content-4.webp',
      contentImage5: '/img/content/content-5.webp',
      presentationUrl: '/Energosistemy_el_vesia_2026.pdf',
      rossetiLogo: '/img/clients/client-5.png',
      stopReveals: null,
    };
  },
  mounted() {
    this.stopReveals = revealOnVisible(this.$el, '.content-block');
  },
  beforeUnmount() { this.stopReveals?.(); },
  methods: { imageAttrs },
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
  height: auto;
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
  color: #c94218;
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
  border-color: #c94218;
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
  background: #c94218;
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
  border-color: #c94218;
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
  background: linear-gradient(135deg, #c94218, #ac3713);
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
  border-color: #c94218;
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
  min-height: 80px;
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
  color: #c94218;
  font-weight: 700;
}

.stats-compact {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: clamp(16px, 3vw, 32px);
  flex-wrap: wrap;
  min-height: 100px;
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
  color: #c94218;
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

  .content-image-4, .content-image-5 { display: none; }
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
  color: #c94218;
}
</style>
