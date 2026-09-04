<template>
  <div class="product-page">
    <a class="skip-link" href="#main-content">Перейти к содержанию</a>
    <Header @open-contact-modal="scrollToRequest" />
    <Navigation :nav-items="navItems" @scroll-to="handleNavigation" />

    <main id="main-content">
      <section class="product-hero">
        <div class="hero-inner">
          <nav class="breadcrumbs" aria-label="Хлебные крошки">
            <NuxtLink to="/">Главная</NuxtLink>
            <span aria-hidden="true">/</span>
            <NuxtLink to="/equipment">Оборудование</NuxtLink>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{{ equipment.name }}</span>
          </nav>

          <div class="hero-grid">
            <div class="hero-copy">
              <p class="eyebrow">{{ equipment.eyebrow }}</p>
              <h1>{{ equipment.name }}</h1>
              <p class="lead">{{ equipment.description }}</p>
              <div class="hero-actions">
                <button type="button" class="primary-action" @click="scrollToRequest">
                  Подобрать оборудование
                </button>
                <a class="secondary-action" href="tel:+74951780118">Позвонить менеджеру</a>
              </div>
            </div>

            <div class="hero-visual">
              <img :src="equipment.gallery[0]" :alt="equipment.name" width="900" height="700" fetchpriority="high">
              <div class="visual-label">
                <span>ES / {{ equipment.slug.toUpperCase() }}</span>
                <span>Подбор по параметрам</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="overview-section">
        <div class="section-inner overview-grid">
          <div class="content-column">
            <div class="section-heading">
              <p class="eyebrow">Назначение</p>
              <h2>Решение под условия объекта</h2>
              <p>{{ equipment.shortDescription }}</p>
            </div>

            <div class="application-grid">
              <article v-for="(application, index) in equipment.applications" :key="application">
                <span>{{ String(index + 1).padStart(2, '0') }}</span>
                <p>{{ application }}</p>
              </article>
            </div>
          </div>

          <aside class="contact-passport">
            <div class="passport-code">
              <span>Маршрут заявки</span>
              <strong>ES–{{ equipment.slug.toUpperCase() }}</strong>
            </div>
            <ol>
              <li><b>01</b><span>Передайте исходные данные</span></li>
              <li><b>02</b><span>Уточним параметры и исполнение</span></li>
              <li><b>03</b><span>Сформируем предложение под объект</span></li>
            </ol>
            <div class="passport-contacts">
              <span>Позвонить сейчас</span>
              <a href="tel:+74951780118">+7 (495) 178-01-18</a>
              <a href="tel:+79251640560">+7 (925) 164-05-60</a>
            </div>
          </aside>
        </div>
      </section>

      <section class="gallery-section" aria-labelledby="gallery-title">
        <div class="section-inner">
          <div class="section-heading gallery-heading">
            <p class="eyebrow">Примеры оборудования</p>
            <h2 id="gallery-title">Варианты исполнения</h2>
            <p>Выберите снимок или откройте его на весь экран, чтобы увеличить и рассмотреть детали. Точная комплектация уточняется по анкете и данным объекта.</p>
          </div>

          <EquipmentGallery :equipment="equipment" />
        </div>
      </section>

      <section id="equipment-request" class="request-section">
        <div class="section-inner">
          <EquipmentRequestForm
            :equipment="equipment"
            :questionnaire="questionnaire"
          />
        </div>
      </section>

      <section class="related-section" aria-labelledby="related-title">
        <div class="section-inner">
          <div class="related-heading">
            <div>
              <p class="eyebrow">Другие категории</p>
              <h2 id="related-title">Продолжить подбор</h2>
            </div>
            <NuxtLink to="/equipment">Весь каталог <span aria-hidden="true">→</span></NuxtLink>
          </div>
          <div class="related-grid">
            <NuxtLink v-for="item in relatedEquipment" :key="item.slug" :to="`/equipment/${item.slug}`">
              <img :src="item.gallery[0]" :alt="item.name" width="180" height="140" loading="lazy">
              <span>{{ item.eyebrow }}</span>
              <strong>{{ item.name }}</strong>
            </NuxtLink>
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
import EquipmentGallery from '~/components/equipment/EquipmentGallery.vue'
import EquipmentRequestForm from '~/components/equipment/EquipmentRequestForm.vue'
import { equipmentCatalog } from '~/assets/data/equipmentCatalog'
import { equipmentQuestionnaires } from '~/assets/data/equipmentQuestionnaires'

const route = useRoute()
const equipment = equipmentCatalog.find((item) => item.slug === route.params.slug)

if (!equipment) {
  throw createError({ statusCode: 404, statusMessage: 'Категория оборудования не найдена' })
}

const questionnaire = equipment.questionnaire ? equipmentQuestionnaires[equipment.questionnaire] : null
const relatedEquipment = computed(() => equipmentCatalog.filter((item) => item.slug !== equipment.slug).slice(0, 3))

const navItems = [
  { key: 'home', label: 'Главная', href: '/' },
  { key: 'services', label: 'Услуги', href: '/services' },
  { key: 'equipment', label: 'Оборудование', href: '/equipment', featured: true },
  { key: 'about', label: 'О нас', href: '/#about' },
  { key: 'projects', label: 'Проекты', href: '/#projects' },
  { key: 'documents', label: 'Документы', href: '/#certificates' },
  { key: 'contact', label: 'Контакты', href: '/#contact' },
]

const canonicalUrl = `https://e-systems.su/equipment/${equipment.slug}`
const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Product',
      name: equipment.name,
      category: equipment.eyebrow,
      description: equipment.description,
      image: equipment.gallery.map((image) => `https://e-systems.su${image}`),
      url: canonicalUrl,
    },
    {
      '@type': 'Service',
      name: `Подбор и поставка: ${equipment.name}`,
      serviceType: 'Подбор и поставка электрооборудования',
      areaServed: { '@type': 'Country', name: 'Россия' },
      provider: {
        '@type': 'Organization',
        name: 'Энергосистемы',
        url: 'https://e-systems.su',
      },
      url: canonicalUrl,
    },
  ],
}

useHead({
  title: `${equipment.name} — подбор и поставка | Энергосистемы`,
  meta: [
    { name: 'description', content: `${equipment.shortDescription} Подбор по параметрам объекта, техническая заявка и поставка по России.` },
  ],
  link: [{ rel: 'canonical', href: canonicalUrl }],
  script: [{ type: 'application/ld+json', children: JSON.stringify(schema) }],
})

const scrollToRequest = () => {
  document.getElementById('equipment-request')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

const handleNavigation = (key) => {
  if (key === 'equipment') navigateTo('/equipment')
}
</script>

<style scoped>
.product-page {
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

.section-inner,
.hero-inner {
  width: min(100% - 48px, 1280px);
  margin: 0 auto;
}

.product-hero {
  overflow: hidden;
  background:
    linear-gradient(rgba(255, 255, 255, 0.96), rgba(239, 245, 248, 0.96)),
    repeating-linear-gradient(90deg, transparent 0 59px, rgba(45, 122, 172, 0.08) 60px);
  border-bottom: 1px solid #cfdae3;
}

.hero-inner {
  padding: 24px 0 76px;
}

.breadcrumbs {
  display: flex;
  flex-wrap: wrap;
  gap: 9px;
  margin-bottom: 42px;
  color: #738696;
  font-size: 13px;
}

.breadcrumbs a {
  color: #1f6797;
  text-decoration: none;
}

.hero-grid {
  display: grid;
  grid-template-columns: minmax(0, 0.92fr) minmax(420px, 0.78fr);
  gap: clamp(48px, 7vw, 96px);
  align-items: center;
}

.eyebrow {
  margin: 0 0 12px;
  color: #f05a28;
  font-size: 12px;
  font-weight: 900;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.hero-copy h1 {
  margin: 0;
  color: #102234;
  font-size: clamp(44px, 6vw, 78px);
  line-height: 0.96;
  letter-spacing: -0.05em;
  text-wrap: balance;
}

.lead {
  max-width: 720px;
  margin: 26px 0 0;
  color: #526a7c;
  font-size: clamp(17px, 1.8vw, 21px);
  line-height: 1.62;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 32px;
}

.primary-action,
.secondary-action {
  min-height: 52px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0 22px;
  border-radius: 8px;
  font: inherit;
  font-weight: 900;
  text-decoration: none;
  cursor: pointer;
}

.primary-action {
  border: 1px solid #f05a28;
  background: #f05a28;
  color: #fff;
}

.secondary-action {
  border: 1px solid #aec2d1;
  background: #fff;
  color: #102234;
}

.hero-visual {
  position: relative;
  height: clamp(380px, 42vw, 540px);
  min-height: 0;
  display: grid;
  place-items: center;
  overflow: hidden;
  border: 1px solid #b9cbd8;
  border-radius: 14px;
  background: #dce6ed;
  box-shadow: 0 26px 56px rgba(16, 34, 52, 0.16);
}

.hero-visual > img {
  width: 100%;
  height: 100%;
  min-height: 0;
  display: block;
  object-fit: contain;
  object-position: center;
}

.visual-label {
  position: absolute;
  right: 14px;
  bottom: 14px;
  left: 14px;
  display: flex;
  justify-content: space-between;
  gap: 12px;
  padding: 12px 14px;
  border-radius: 6px;
  background: rgba(16, 34, 52, 0.9);
  color: #d8e4ec;
  font-size: 10px;
  font-weight: 900;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.overview-section {
  padding: 92px 0;
  background: #fff;
}

.overview-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(320px, 0.42fr);
  gap: clamp(56px, 8vw, 110px);
  align-items: start;
}

.section-heading h2,
.related-heading h2 {
  margin: 0;
  color: #102234;
  font-size: clamp(32px, 4vw, 52px);
  line-height: 1.04;
  letter-spacing: -0.03em;
  text-wrap: balance;
}

.section-heading > p:last-child {
  max-width: 760px;
  margin: 18px 0 0;
  color: #637789;
  font-size: 17px;
  line-height: 1.66;
}

.application-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
  margin-top: 34px;
}

.application-grid article {
  display: grid;
  grid-template-columns: 34px 1fr;
  gap: 12px;
  padding: 20px;
  border: 1px solid #d6e1e8;
  background: #f8fafb;
}

.application-grid span {
  color: #f05a28;
  font-size: 11px;
  font-weight: 900;
}

.application-grid p {
  margin: 0;
  color: #334e62;
  font-size: 14px;
  line-height: 1.5;
}

.contact-passport {
  overflow: hidden;
  border-radius: 12px;
  background: #102234;
  color: #fff;
  box-shadow: 0 18px 42px rgba(16, 34, 52, 0.15);
}

.passport-code {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  padding: 18px 22px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.15);
  color: #9bb5c7;
  font-size: 10px;
  font-weight: 900;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.passport-code strong {
  color: #fff;
}

.contact-passport ol {
  margin: 0;
  padding: 12px 22px;
  list-style: none;
}

.contact-passport li {
  display: grid;
  grid-template-columns: 35px 1fr;
  gap: 12px;
  padding: 15px 0;
  border-bottom: 1px dashed rgba(255, 255, 255, 0.18);
  color: #dbe6ed;
  font-size: 14px;
}

.contact-passport b {
  color: #f05a28;
  font-size: 11px;
}

.passport-contacts {
  display: grid;
  gap: 7px;
  padding: 20px 22px 24px;
}

.passport-contacts span {
  color: #8fa9bb;
  font-size: 10px;
  font-weight: 900;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.passport-contacts a {
  color: #fff;
  font-size: 18px;
  font-weight: 900;
  text-decoration: none;
}

.gallery-section {
  padding: 92px 0;
  background: #e8f0f5;
}

.gallery-heading {
  margin-bottom: 34px;
}

.gallery-layout {
  --gallery-height: clamp(420px, 58vh, 620px);
  --gallery-height: clamp(420px, 58svh, 620px);
  display: grid;
  gap: 14px;
}

.gallery-main {
  position: relative;
  isolation: isolate;
  height: var(--gallery-height);
  min-height: 0;
  overflow: hidden;
  border: 1px solid rgba(89, 137, 169, 0.48);
  border-radius: 12px;
  outline: none;
  background: #102234;
  box-shadow: 0 22px 46px rgba(16, 34, 52, 0.2);
}

.gallery-main::after {
  position: absolute;
  z-index: 1;
  inset: 0;
  background:
    linear-gradient(180deg, rgba(9, 25, 39, 0.78) 0, rgba(9, 25, 39, 0.06) 24%, rgba(9, 25, 39, 0.04) 66%, rgba(9, 25, 39, 0.82) 100%),
    linear-gradient(90deg, rgba(9, 25, 39, 0.38), transparent 24%, transparent 76%, rgba(9, 25, 39, 0.38));
  content: '';
  pointer-events: none;
}

.gallery-backdrop {
  position: absolute;
  z-index: 0;
  inset: -8%;
  width: 116%;
  height: 116%;
  display: block;
  object-fit: cover;
  object-position: center;
  filter: blur(26px) saturate(0.78) contrast(0.92);
  opacity: 0.56;
  transform: scale(1.04);
}

.gallery-grid {
  position: absolute;
  z-index: 2;
  inset: 0;
  background-image:
    linear-gradient(rgba(159, 197, 222, 0.12) 1px, transparent 1px),
    linear-gradient(90deg, rgba(159, 197, 222, 0.12) 1px, transparent 1px);
  background-size: 72px 72px;
  opacity: 0.28;
  pointer-events: none;
}

.gallery-toolbar {
  position: absolute;
  z-index: 6;
  top: 0;
  right: 0;
  left: 0;
  min-height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding: 0 20px;
  border-bottom: 1px solid rgba(191, 219, 237, 0.2);
  color: rgba(235, 245, 251, 0.76);
  font-size: 10px;
  font-weight: 900;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.gallery-counter {
  display: flex;
  align-items: baseline;
  gap: 7px;
  color: rgba(235, 245, 251, 0.7);
  font-variant-numeric: tabular-nums;
  letter-spacing: 0.08em;
}

.gallery-counter strong {
  color: #ff7040;
  font-size: 14px;
}

.gallery-counter i {
  color: rgba(235, 245, 251, 0.36);
  font-style: normal;
}

.gallery-photo-frame {
  position: absolute;
  z-index: 3;
  inset: 58px 76px 68px;
  min-width: 0;
  min-height: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.gallery-photo {
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
  display: block;
  border: 1px solid rgba(235, 245, 251, 0.46);
  border-radius: 4px;
  box-shadow: 0 18px 46px rgba(4, 15, 24, 0.42);
}

.gallery-nav {
  position: absolute;
  z-index: 7;
  top: 50%;
  width: 46px;
  height: 62px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  border: 1px solid rgba(221, 238, 248, 0.38);
  border-radius: 5px;
  color: #fff;
  background: rgba(10, 29, 44, 0.7);
  box-shadow: 0 8px 20px rgba(5, 17, 27, 0.22);
  cursor: pointer;
  transform: translateY(-50%);
  transition: border-color 160ms ease, background-color 160ms ease, transform 160ms ease;
}

.gallery-nav--previous {
  left: 17px;
}

.gallery-nav--next {
  right: 17px;
}

.gallery-nav svg {
  width: 23px;
  height: 23px;
  fill: none;
  stroke: currentColor;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 1.8;
}

.gallery-nav:hover {
  border-color: #f05a28;
  background: #f05a28;
}

.gallery-caption {
  position: absolute;
  z-index: 6;
  right: 20px;
  bottom: 16px;
  left: 20px;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 20px;
  color: rgba(235, 245, 251, 0.64);
  pointer-events: none;
}

.gallery-caption span {
  font-size: 10px;
  font-weight: 900;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.gallery-caption strong {
  color: #fff;
  font-size: 13px;
  text-align: right;
}

.gallery-photo-enter-active,
.gallery-photo-leave-active {
  transition: opacity 180ms ease, transform 180ms ease;
}

.gallery-photo-enter-from,
.gallery-photo-leave-to {
  opacity: 0;
  transform: scale(0.985);
}

.gallery-thumbs {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 10px;
}

.gallery-thumbs button {
  position: relative;
  height: 94px;
  overflow: hidden;
  padding: 0;
  border: 1px solid rgba(45, 122, 172, 0.26);
  border-radius: 6px;
  background: #102234;
  box-shadow: inset 0 0 0 0 #f05a28;
  cursor: pointer;
  opacity: 0.72;
  transition: border-color 160ms ease, box-shadow 160ms ease, opacity 160ms ease, transform 160ms ease;
}

.gallery-thumbs button.active {
  border-color: #f05a28;
  box-shadow: inset 0 -4px 0 #f05a28;
  opacity: 1;
}

.gallery-thumbs button:hover {
  border-color: rgba(240, 90, 40, 0.72);
  opacity: 1;
  transform: translateY(-2px);
}

.gallery-thumbs img {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
  transition: transform 220ms ease;
}

.gallery-thumbs span {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 10px;
  padding: 26px 10px 9px;
  background: linear-gradient(transparent, rgba(10, 27, 41, 0.9));
  color: #fff;
  text-align: left;
}

.gallery-thumbs span b {
  font-size: 11px;
  font-weight: 900;
  font-variant-numeric: tabular-nums;
}

.gallery-thumbs span small {
  color: rgba(255, 255, 255, 0.72);
  font-size: 9px;
  font-weight: 800;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.request-section {
  scroll-margin-top: 70px;
  padding: 96px 0;
}

.related-section {
  padding: 82px 0 96px;
  background: #102234;
}

.related-heading {
  display: flex;
  justify-content: space-between;
  align-items: end;
  gap: 24px;
  margin-bottom: 30px;
}

.related-heading h2 {
  color: #fff;
}

.related-heading > a {
  color: #fff;
  font-weight: 900;
  text-decoration: none;
}

.related-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 18px;
}

.related-grid > a {
  overflow: hidden;
  display: grid;
  grid-template-columns: 96px 1fr;
  grid-template-rows: 1fr 1fr;
  column-gap: 16px;
  min-height: 110px;
  padding: 10px;
  border: 1px solid rgba(255, 255, 255, 0.16);
  border-radius: 8px;
  color: #fff;
  text-decoration: none;
}

.related-grid img {
  width: 96px;
  height: 88px;
  grid-row: 1 / 3;
  align-self: center;
  object-fit: cover;
  border-radius: 5px;
}

.related-grid span {
  align-self: end;
  color: #83afd0;
  font-size: 10px;
  font-weight: 900;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.related-grid strong {
  align-self: start;
  margin-top: 5px;
  font-size: 18px;
}

.primary-action:hover {
  background: #d94b1e;
}

.secondary-action:hover {
  border-color: #2d7aac;
  color: #1f6797;
}

.primary-action:focus-visible,
.secondary-action:focus-visible,
.breadcrumbs a:focus-visible,
.passport-contacts a:focus-visible,
.gallery-main:focus-visible,
.gallery-nav:focus-visible,
.gallery-thumbs button:focus-visible,
.related-heading a:focus-visible,
.related-grid a:focus-visible {
  outline: 3px solid rgba(240, 90, 40, 0.42);
  outline-offset: 4px;
}

.primary-action,
.secondary-action,
.breadcrumbs a,
.passport-contacts a,
.gallery-nav,
.gallery-thumbs button,
.related-heading a,
.related-grid a {
  touch-action: manipulation;
}

@media (max-width: 1040px) {
  .hero-grid,
  .overview-grid {
    grid-template-columns: 1fr;
  }

  .hero-visual {
    max-width: 800px;
  }

  .contact-passport {
    max-width: 620px;
  }

  .related-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 760px) {
  .section-inner,
  .hero-inner {
    width: min(100% - 32px, 1280px);
  }

  .hero-inner {
    padding-bottom: 56px;
  }

  .breadcrumbs {
    margin-bottom: 30px;
  }

  .hero-grid {
    gap: 36px;
  }

  .hero-visual,
  .hero-visual > img {
    min-height: 0;
  }

  .hero-visual {
    height: clamp(320px, 62vw, 460px);
  }

  .overview-section,
  .gallery-section,
  .request-section,
  .related-section {
    padding: 68px 0;
  }

  .application-grid {
    grid-template-columns: 1fr;
  }

  .gallery-layout {
    --gallery-height: clamp(340px, 58vh, 480px);
    --gallery-height: clamp(340px, 58svh, 480px);
  }

  .gallery-photo-frame {
    inset: 56px 54px 66px;
  }

  .gallery-nav {
    width: 40px;
    height: 54px;
  }

  .gallery-nav--previous {
    left: 8px;
  }

  .gallery-nav--next {
    right: 8px;
  }

  .gallery-toolbar {
    min-height: 48px;
    padding: 0 14px;
  }

  .gallery-caption {
    right: 14px;
    bottom: 14px;
    left: 14px;
  }

  .gallery-thumbs {
    grid-template-columns: none;
    grid-auto-flow: column;
    grid-auto-columns: minmax(112px, 34%);
    grid-auto-rows: 80px;
    overflow-x: auto;
    overflow-y: hidden;
    padding-bottom: 5px;
    overscroll-behavior-x: contain;
    scroll-snap-type: x mandatory;
    scrollbar-width: thin;
  }

  .gallery-thumbs button {
    height: 80px;
    scroll-snap-align: start;
  }

  .gallery-thumbs span small {
    display: none;
  }
}

@media (max-width: 480px) {
  .hero-actions {
    display: grid;
  }

  .visual-label,
  .related-heading {
    align-items: flex-start;
    flex-direction: column;
  }

  .gallery-layout {
    --gallery-height: clamp(310px, 52vh, 430px);
    --gallery-height: clamp(310px, 52svh, 430px);
  }

  .gallery-photo-frame {
    inset: 54px 12px 64px;
  }

  .gallery-caption span {
    display: none;
  }

  .gallery-caption strong {
    width: 100%;
    font-size: 12px;
    text-align: left;
  }

  .gallery-toolbar {
    gap: 10px;
    font-size: 9px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .gallery-photo-enter-active,
  .gallery-photo-leave-active,
  .gallery-nav,
  .gallery-thumbs button,
  .gallery-thumbs img {
    transition: none;
  }

  .gallery-thumbs button:hover {
    transform: none;
  }
}
</style>
