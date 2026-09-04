<template>
  <div class="equipment-page">
    <a class="skip-link" href="#main-content">Перейти к содержанию</a>
    <Header @open-contact-modal="scrollToCatalog" />
    <Navigation :nav-items="navItems" @scroll-to="handleNavigation" />

    <main id="main-content">
      <section class="catalog-hero">
        <div class="catalog-hero-inner">
          <div class="hero-copy">
            <p class="eyebrow">Электрооборудование · поставка по России</p>
            <h1>Подберём оборудование под схему и параметры вашего объекта</h1>
            <p class="hero-description">
              Комплектные подстанции, распределительные устройства, ячейки,
              трансформаторы и низковольтные решения. Собираем исходные данные и
              передаём задачу профильному инженеру.
            </p>
            <div class="hero-actions">
              <a class="primary-action" href="#equipment-catalog">Выбрать оборудование</a>
              <a class="secondary-action" href="tel:+74951780118">+7 (495) 178-01-18</a>
            </div>
          </div>

          <div class="passport-panel" aria-label="Как оформить заявку">
            <div class="passport-head">
              <span>ES / EQUIPMENT</span>
              <span>Вся Россия</span>
            </div>
            <ol>
              <li>
                <span>01</span>
                <div><strong>Выберите</strong><small>категорию оборудования</small></div>
              </li>
              <li>
                <span>02</span>
                <div><strong>Уточните</strong><small>параметры и задачу</small></div>
              </li>
              <li>
                <span>03</span>
                <div><strong>Отправьте</strong><small>заявку инженеру</small></div>
              </li>
            </ol>
            <p>Конфигурация оборудования определяется по исходным данным и требованиям объекта.</p>
          </div>
        </div>
      </section>

      <section id="equipment-catalog" class="catalog-section" aria-labelledby="catalog-title">
        <div class="section-inner">
          <div class="section-heading">
            <div>
              <p class="eyebrow">Каталог</p>
              <h2 id="catalog-title">11 направлений оборудования</h2>
            </div>
            <p>
              В каждой категории — назначение, примеры исполнения и отдельная форма
              подбора. Для КТП, КРУН, КСО и ПКУ доступны технические анкеты.
            </p>
          </div>

          <div class="catalog-grid">
            <article
              v-for="(item, index) in equipmentCatalog"
              :key="item.slug"
              class="equipment-card"
            >
              <NuxtLink class="card-media" :to="`/equipment/${item.slug}`" :aria-label="`Подробнее: ${item.name}`">
                <img :src="item.gallery[0]" :alt="item.name" width="900" height="700" loading="lazy">
                <span class="card-number">ES–{{ formatNumber(index + 1) }}</span>
                <span v-if="item.questionnaire" class="questionnaire-badge">Теханкета</span>
              </NuxtLink>
              <div class="card-body">
                <div>
                  <p>{{ item.eyebrow }}</p>
                  <h3>{{ item.name }}</h3>
                  <span>{{ item.shortDescription }}</span>
                </div>
                <ul>
                  <li v-for="application in item.applications.slice(0, 2)" :key="application">
                    {{ application }}
                  </li>
                </ul>
                <NuxtLink class="card-link" :to="`/equipment/${item.slug}`">
                  Подобрать оборудование <span aria-hidden="true">→</span>
                </NuxtLink>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section class="selection-section" aria-labelledby="selection-title">
        <div class="section-inner selection-grid">
          <div>
            <p class="eyebrow">Инженерный подбор</p>
            <h2 id="selection-title">Если точное исполнение пока неизвестно</h2>
            <p>
              Выберите ближайшую категорию и опишите задачу в свободной форме. Мы
              уточним схему электроснабжения, параметры сети, условия установки и
              необходимую комплектацию.
            </p>
          </div>
          <div class="contact-rail">
            <span>Прямой контакт</span>
            <a href="tel:+74951780118">+7 (495) 178-01-18</a>
            <a href="tel:+79251640560">+7 (925) 164-05-60</a>
            <a href="mailto:sales@e-systems.su?cc=inbox@e-systems.su">sales@e-systems.su</a>
          </div>
        </div>
      </section>
    </main>

    <Footer />
  </div>
</template>

<script setup>
import Header from '~/components/energy-systems/Header.vue'
import Navigation from '~/components/energy-systems/Navigation.vue'
import Footer from '~/components/energy-systems/Footer.vue'
import { equipmentCatalog } from '~/assets/data/equipmentCatalog'

const navItems = [
  { key: 'home', label: 'Главная', href: '/' },
  { key: 'services', label: 'Услуги', href: '/services' },
  { key: 'equipment', label: 'Оборудование', href: '/equipment', featured: true },
  { key: 'about', label: 'О нас', href: '/#about' },
  { key: 'projects', label: 'Проекты', href: '/#projects' },
  { key: 'documents', label: 'Документы', href: '/#certificates' },
  { key: 'contact', label: 'Контакты', href: '/#contact' },
]

const schema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Поставка и подбор электрооборудования по России',
  description: 'Подбор комплектных подстанций, распределительных устройств, трансформаторов и низковольтного оборудования по параметрам объекта.',
  areaServed: { '@type': 'Country', name: 'Россия' },
  provider: {
    '@type': 'Organization',
    name: 'Энергосистемы',
    url: 'https://e-systems.su',
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Категории электрооборудования',
    itemListElement: equipmentCatalog.map((item) => ({
      '@type': 'OfferCatalog',
      name: item.name,
      url: `https://e-systems.su/equipment/${item.slug}`,
    })),
  },
}

useHead({
  title: 'Электрооборудование — подбор и поставка по России | Энергосистемы',
  meta: [
    {
      name: 'description',
      content: 'Каталог электрооборудования Энергосистемы: МТП, КТП, БКТП, КРУН, КСО, КРУ, ЯКНО, ПКУ, трансформаторы, ВРУ и панели ЩО. Подбор по параметрам и заявка инженеру.',
    },
  ],
  link: [{ rel: 'canonical', href: 'https://e-systems.su/equipment' }],
  script: [{ type: 'application/ld+json', children: JSON.stringify(schema) }],
})

const formatNumber = (value) => String(value).padStart(2, '0')

const scrollToCatalog = () => {
  document.getElementById('equipment-catalog')?.scrollIntoView({ behavior: 'smooth' })
}

const handleNavigation = (key) => {
  if (key === 'equipment') scrollToCatalog()
}
</script>

<style scoped>
.equipment-page {
  min-height: 100vh;
  background: #f5f8fa;
  color: #102234;
  font-family: Arial, Helvetica, sans-serif;
}

.skip-link {
  position: fixed;
  top: 10px;
  left: 10px;
  z-index: 100;
  padding: 10px 14px;
  border-radius: 6px;
  background: #fff;
  color: #102234;
  font-weight: 900;
  transform: translateY(-150%);
}

.skip-link:focus {
  transform: translateY(0);
}

.catalog-hero {
  position: relative;
  overflow: hidden;
  background:
    linear-gradient(120deg, rgba(16, 34, 52, 0.98), rgba(18, 54, 78, 0.93)),
    url('/img/equipment/ktp-1.jpg') center / cover;
  color: #fff;
}

.catalog-hero::after {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.035) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.035) 1px, transparent 1px);
  background-size: 44px 44px;
  mask-image: linear-gradient(to right, transparent, #000);
}

.catalog-hero-inner,
.section-inner {
  width: min(100% - 48px, 1280px);
  margin: 0 auto;
}

.catalog-hero-inner {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: minmax(0, 1.25fr) minmax(320px, 0.75fr);
  gap: clamp(48px, 8vw, 108px);
  align-items: center;
  min-height: 620px;
  padding: 88px 0;
}

.eyebrow {
  margin: 0 0 14px;
  color: #f05a28;
  font-size: 12px;
  font-weight: 900;
  letter-spacing: 0.15em;
  text-transform: uppercase;
}

.hero-copy h1 {
  max-width: 820px;
  margin: 0;
  font-size: clamp(38px, 5.5vw, 72px);
  line-height: 0.98;
  letter-spacing: -0.04em;
  text-wrap: balance;
}

.hero-description {
  max-width: 720px;
  margin: 26px 0 0;
  color: #c7d7e2;
  font-size: clamp(17px, 1.8vw, 21px);
  line-height: 1.58;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 34px;
}

.primary-action,
.secondary-action {
  min-height: 54px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0 22px;
  border-radius: 8px;
  font-weight: 900;
  text-decoration: none;
}

.primary-action {
  background: #f05a28;
  color: #fff;
}

.secondary-action {
  border: 1px solid rgba(255, 255, 255, 0.32);
  color: #fff;
}

.passport-panel {
  border: 1px solid rgba(255, 255, 255, 0.22);
  border-radius: 14px;
  background: rgba(7, 23, 36, 0.76);
  backdrop-filter: blur(12px);
  box-shadow: 0 28px 64px rgba(0, 0, 0, 0.22);
}

.passport-head {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  padding: 16px 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.16);
  color: #91b7d0;
  font-size: 11px;
  font-weight: 900;
  letter-spacing: 0.1em;
}

.passport-panel ol {
  margin: 0;
  padding: 12px 20px;
  list-style: none;
}

.passport-panel li {
  display: grid;
  grid-template-columns: 45px 1fr;
  gap: 14px;
  align-items: center;
  padding: 15px 0;
  border-bottom: 1px dashed rgba(255, 255, 255, 0.18);
}

.passport-panel li > span {
  color: #f05a28;
  font-size: 13px;
  font-weight: 900;
}

.passport-panel strong,
.passport-panel small {
  display: block;
}

.passport-panel strong {
  font-size: 17px;
}

.passport-panel small {
  margin-top: 4px;
  color: #9fb4c4;
  font-size: 13px;
}

.passport-panel > p {
  margin: 0;
  padding: 18px 20px;
  color: #adc0ce;
  font-size: 13px;
  line-height: 1.55;
}

.catalog-section {
  scroll-margin-top: 76px;
  padding: 96px 0 110px;
}

.section-heading {
  display: grid;
  grid-template-columns: minmax(0, 0.9fr) minmax(320px, 0.72fr);
  gap: 72px;
  align-items: end;
  margin-bottom: 42px;
}

.section-heading h2,
.selection-section h2 {
  margin: 0;
  color: #102234;
  font-size: clamp(34px, 4vw, 54px);
  line-height: 1.04;
  letter-spacing: -0.03em;
  text-wrap: balance;
}

.section-heading > p,
.selection-section p {
  margin: 0;
  color: #647789;
  font-size: 17px;
  line-height: 1.65;
}

.catalog-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 22px;
}

.equipment-card {
  min-width: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  border: 1px solid #cfdae3;
  border-radius: 12px;
  background: #fff;
  box-shadow: 0 12px 34px rgba(16, 34, 52, 0.06);
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
}

.equipment-card:hover {
  transform: translateY(-4px);
  border-color: #a9c6d9;
  box-shadow: 0 20px 44px rgba(16, 34, 52, 0.12);
}

.card-media {
  position: relative;
  display: block;
  aspect-ratio: 16 / 10;
  overflow: hidden;
  background: #dfe8ee;
}

.card-media img {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
  transition: transform 0.35s ease;
}

.equipment-card:hover .card-media img {
  transform: scale(1.035);
}

.card-number,
.questionnaire-badge {
  position: absolute;
  top: 14px;
  padding: 7px 9px;
  border-radius: 4px;
  font-size: 10px;
  font-weight: 900;
  letter-spacing: 0.09em;
}

.card-number {
  left: 14px;
  background: #102234;
  color: #fff;
}

.questionnaire-badge {
  right: 14px;
  background: #f05a28;
  color: #fff;
  text-transform: uppercase;
}

.card-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 24px;
}

.card-body p {
  margin: 0 0 8px;
  color: #2d7aac;
  font-size: 11px;
  font-weight: 900;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.card-body h3 {
  margin: 0 0 12px;
  color: #102234;
  font-size: clamp(22px, 2vw, 29px);
  line-height: 1.08;
}

.card-body > div > span {
  color: #647789;
  line-height: 1.55;
}

.card-body ul {
  display: grid;
  gap: 7px;
  margin: 20px 0;
  padding: 0;
  list-style: none;
}

.card-body li {
  position: relative;
  padding-left: 16px;
  color: #42596b;
  font-size: 13px;
}

.card-body li::before {
  content: '';
  position: absolute;
  top: 0.48em;
  left: 0;
  width: 6px;
  height: 6px;
  background: #f05a28;
}

.card-link {
  display: flex;
  justify-content: space-between;
  gap: 14px;
  margin-top: auto;
  padding-top: 17px;
  border-top: 1px solid #e0e8ed;
  color: #1f6797;
  font-size: 14px;
  font-weight: 900;
  text-decoration: none;
}

.selection-section {
  padding: 80px 0;
  background: #e8f0f5;
}

.selection-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(290px, 0.55fr);
  gap: clamp(48px, 8vw, 100px);
  align-items: center;
}

.selection-section h2 {
  margin-bottom: 20px;
}

.contact-rail {
  display: grid;
  gap: 10px;
  padding: 28px;
  border-left: 5px solid #f05a28;
  background: #102234;
}

.contact-rail span {
  margin-bottom: 5px;
  color: #8eacc0;
  font-size: 11px;
  font-weight: 900;
  letter-spacing: 0.13em;
  text-transform: uppercase;
}

.contact-rail a {
  color: #fff;
  font-size: clamp(16px, 2vw, 22px);
  font-weight: 900;
  text-decoration: none;
}

.primary-action,
.secondary-action,
.card-media,
.card-link,
.contact-rail a {
  touch-action: manipulation;
}

.primary-action:hover,
.card-link:hover {
  filter: brightness(0.94);
}

.secondary-action:hover {
  background: rgba(255, 255, 255, 0.08);
}

.primary-action:focus-visible,
.secondary-action:focus-visible,
.card-media:focus-visible,
.card-link:focus-visible,
.contact-rail a:focus-visible {
  outline: 3px solid rgba(240, 90, 40, 0.46);
  outline-offset: 4px;
}

@media (max-width: 1020px) {
  .catalog-hero-inner {
    grid-template-columns: 1fr;
    min-height: auto;
  }

  .passport-panel {
    max-width: 680px;
  }

  .catalog-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 760px) {
  .catalog-hero-inner,
  .section-inner {
    width: min(100% - 32px, 1280px);
  }

  .catalog-hero-inner {
    gap: 38px;
    padding: 64px 0;
  }

  .hero-actions,
  .section-heading,
  .selection-grid {
    grid-template-columns: 1fr;
  }

  .section-heading,
  .selection-grid {
    gap: 24px;
  }

  .catalog-section {
    padding: 68px 0 76px;
  }

  .catalog-grid {
    grid-template-columns: 1fr;
  }

  .selection-section {
    padding: 64px 0;
  }
}

@media (max-width: 480px) {
  .hero-actions {
    display: grid;
  }

  .passport-head {
    align-items: flex-start;
    flex-direction: column;
  }

  .catalog-grid {
    gap: 16px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .equipment-card,
  .card-media img {
    transition: none;
  }
}
</style>
