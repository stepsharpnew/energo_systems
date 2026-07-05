<template>
  <div class="services-page">
    <Header @open-contact-modal="openContactModal()" />

    <Navigation
      :nav-items="navItems"
      @scroll-to="scrollToSection"
    />

    <main>
      <section
        class="services-hero"
        :style="{ backgroundImage: servicesHeroBackground }"
      >
        <div class="services-hero-inner">
          <div class="services-hero-copy">
            <p class="eyebrow">Инженерные услуги</p>
            <h1>Услуги для строительства, подключения и эксплуатации объектов</h1>
            <p>
              Подбираем состав работ под объект: от ГНБ и электромонтажа до согласований,
              испытаний и обслуживания инженерной инфраструктуры.
            </p>
            <div class="hero-actions">
              <a class="primary-action" href="#services-catalog">Выбрать услугу</a>
              <button class="secondary-action" type="button" @click="openContactModal()">
                Получить консультацию
              </button>
            </div>
          </div>

          <div class="hero-summary" aria-label="Ключевые направления">
            <div>
              <strong>10</strong>
              <span>направлений работ</span>
            </div>
            <div>
              <strong>ГНБ</strong>
              <span>коммуникации без вскрытия</span>
            </div>
            <div>
              <strong>ЭТЛ</strong>
              <span>измерения и техотчеты</span>
            </div>
          </div>
        </div>
      </section>

      <section id="services-catalog" class="services-catalog">
        <div class="catalog-inner">
          <aside class="catalog-sidebar" aria-label="Навигация по услугам">
            <h2>Направления</h2>
            <nav>
              <a
                v-for="service in services"
                :key="`anchor-${service.id}`"
                :href="`#service-${service.id}`"
              >
                {{ shortServiceName(service) }}
              </a>
            </nav>
          </aside>

          <div class="catalog-content">
            <div class="catalog-heading">
              <h2>Каталог услуг</h2>
              <p>Выберите направление, посмотрите детали и отправьте заявку на расчет.</p>
            </div>

            <div class="service-grid">
              <article
                v-for="(service, index) in services"
                :id="`service-${service.id}`"
                :key="service.id"
                class="service-card"
              >
                <NuxtLink class="service-media" :to="`/services/${service.id}`">
                  <img
                    :src="serviceImage(service, index)"
                    :alt="service.name"
                    loading="lazy"
                  >
                  <span>{{ formatNumber(index + 1) }}</span>
                </NuxtLink>

                <div class="service-card-body">
                  <div>
                    <p class="service-label">{{ shortServiceName(service) }}</p>
                    <h3>{{ service.name }}</h3>
                    <p>{{ service.description }}</p>
                  </div>

                  <div v-if="service.highlights" class="service-tags">
                    <span
                      v-for="highlight in service.highlights.slice(0, 4)"
                      :key="highlight"
                    >
                      {{ highlight }}
                    </span>
                  </div>

                  <div class="service-card-actions">
                    <NuxtLink class="details-link" :to="`/services/${service.id}`">
                      Подробнее
                    </NuxtLink>
                    <button type="button" @click="openContactModal(service.id)">
                      Обсудить
                    </button>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section class="workflow-section" aria-labelledby="workflow-title">
        <div class="workflow-inner">
          <div>
            <p class="eyebrow">Как работаем</p>
            <h2 id="workflow-title">От заявки до результата на объекте</h2>
          </div>
          <div class="workflow-steps">
            <div
              v-for="(step, index) in workflowSteps"
              :key="step.title"
              class="workflow-step"
            >
              <span>{{ formatNumber(index + 1) }}</span>
              <h3>{{ step.title }}</h3>
              <p>{{ step.text }}</p>
            </div>
          </div>
        </div>
      </section>
    </main>

    <ContactModal
      :show="showContactModal"
      :services="services"
      :selected-service-id="contactModalServiceId"
      @close="closeContactModal"
    />

    <Footer />
  </div>
</template>

<script setup>
import Header from '~/components/energy-systems/Header.vue'
import Navigation from '~/components/energy-systems/Navigation.vue'
import Footer from '~/components/energy-systems/Footer.vue'
import ContactModal from '~/components/energy-systems/ContactModal.vue'
import { servicesDetailData } from '~/assets/data/servicesDetail'

const services = servicesDetailData
const showContactModal = ref(false)
const contactModalServiceId = ref(null)

const navItems = [
  { key: 'hero', label: 'Главная' },
  { key: 'services', label: 'Услуги' },
  { key: 'about', label: 'О нас' },
  { key: 'projects', label: 'Проекты' },
  { key: 'clients', label: 'Клиенты' },
  { key: 'certificates', label: 'Документы' },
  { key: 'contact', label: 'Контакты' },
]

const workflowSteps = [
  {
    title: 'Разбираем задачу',
    text: 'Фиксируем исходные данные, ограничения объекта и требуемый результат.',
  },
  {
    title: 'Подбираем решение',
    text: 'Определяем состав работ, технологию, сроки и нужную документацию.',
  },
  {
    title: 'Выполняем работы',
    text: 'Организуем бригаду, технику, согласования и контроль качества.',
  },
  {
    title: 'Передаем результат',
    text: 'Готовим исполнительные документы, отчеты и закрывающие материалы.',
  },
]

const servicesHeroBackground = [
  'linear-gradient(90deg, rgba(8, 20, 32, 0.9), rgba(8, 20, 32, 0.62))',
  "url('/img/service/service-center0.jpg')",
].join(', ')

const imageMap = {
  hdd: '/img/service/service-center0.jpg',
  road: '/img/service/service-center1.jpg',
  water: '/img/service/service-center2.jpg',
  sewer: '/img/service/service-center3.jpg',
  power: '/img/service/service-center4.jpg',
  gas: '/img/service/service-center5.jpg',
  design: '/img/service/service-center6.jpg',
  support: '/img/service/service-center7.jpg',
  heating: '/img/service/service-center8.jpg',
  monitoring: '/img/service/service-center9.jpg',
}

const labelMap = {
  hdd: 'ГНБ под ключ',
  road: 'Подключение к сетям',
  water: 'Технические условия',
  sewer: 'Согласование проекта',
  power: 'Электромонтаж',
  gas: 'Пуско-наладка',
  design: 'Эксплуатация объектов',
  support: 'Ремонт сетей',
  heating: 'Электролаборатория',
  monitoring: 'Вынос электросетей',
}

useHead({
  title: 'Услуги | Энергосистемы',
  meta: [
    {
      name: 'description',
      content: 'Каталог инженерных услуг Энергосистемы: ГНБ, электромонтаж, ТУ, проектирование, ремонт, испытания и обслуживание объектов.',
    },
  ],
  link: [
    { rel: 'canonical', href: 'https://e-systems.su/services' },
  ],
})

const formatNumber = (value) => String(value).padStart(2, '0')

const shortServiceName = (service) => labelMap[service?.id] || service?.name || 'Услуга'

const serviceImage = (service, index) => {
  return imageMap[service?.id] || `/img/service/service-center${index % 10}.jpg`
}

const openContactModal = (serviceId = null) => {
  contactModalServiceId.value = serviceId
  showContactModal.value = true
}

const closeContactModal = () => {
  showContactModal.value = false
  contactModalServiceId.value = null
}

const scrollToSection = (key) => {
  if (key === 'hero') {
    navigateTo('/')
    return
  }

  if (key === 'services') {
    document.getElementById('services-catalog')?.scrollIntoView({ behavior: 'smooth' })
    return
  }

  navigateTo('/')
}
</script>

<style scoped>
.services-page {
  min-height: 100vh;
  background: #f6f8fb;
  color: #172334;
}

.services-hero {
  color: #ffffff;
  background-position: center;
  background-size: cover;
}

.services-hero-inner,
.catalog-inner,
.workflow-inner {
  width: min(100% - 48px, 1280px);
  margin: 0 auto;
}

.services-hero-inner {
  min-height: 470px;
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(280px, 430px);
  gap: 48px;
  align-items: end;
  padding: 72px 0;
}

.services-hero-copy {
  max-width: 760px;
}

.eyebrow {
  margin: 0 0 12px;
  color: #f05a28;
  font-size: 13px;
  font-weight: 800;
  line-height: 1.2;
  text-transform: uppercase;
}

.services-hero h1 {
  max-width: 760px;
  margin: 0;
  color: #ffffff;
  font-size: 58px;
  font-weight: 850;
  line-height: 1.02;
}

.services-hero-copy > p:last-of-type {
  max-width: 690px;
  margin: 22px 0 0;
  color: rgba(255, 255, 255, 0.84);
  font-size: 19px;
  line-height: 1.58;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 30px;
}

.primary-action,
.secondary-action,
.details-link,
.service-card-actions button {
  min-height: 46px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  padding: 0 18px;
  font-size: 15px;
  font-weight: 800;
  line-height: 1;
  text-decoration: none;
  cursor: pointer;
}

.primary-action,
.service-card-actions button {
  color: #ffffff;
  border: 1px solid #f05a28;
  background: #f05a28;
}

.secondary-action,
.details-link {
  color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.46);
  background: rgba(255, 255, 255, 0.12);
}

.hero-summary {
  display: grid;
  gap: 12px;
}

.hero-summary div {
  padding: 18px;
  border-left: 3px solid #8fc7ec;
  background: rgba(4, 16, 28, 0.58);
}

.hero-summary strong {
  display: block;
  margin-bottom: 5px;
  color: #ffffff;
  font-size: 28px;
  line-height: 1;
}

.hero-summary span {
  color: rgba(255, 255, 255, 0.76);
  font-size: 14px;
  line-height: 1.35;
}

.services-catalog {
  padding: 54px 0 70px;
}

.catalog-inner {
  display: grid;
  grid-template-columns: 250px minmax(0, 1fr);
  gap: 28px;
  align-items: start;
}

.catalog-sidebar {
  position: sticky;
  top: 86px;
  min-width: 0;
  padding: 18px;
  border: 1px solid #dce5ed;
  border-radius: 8px;
  background: #ffffff;
}

.catalog-sidebar h2,
.catalog-heading h2,
.workflow-section h2 {
  margin: 0;
  color: #172334;
  font-size: 28px;
  line-height: 1.15;
}

.catalog-sidebar h2 {
  margin-bottom: 14px;
  font-size: 20px;
}

.catalog-sidebar nav {
  display: grid;
  gap: 6px;
}

.catalog-sidebar a {
  padding: 10px 0;
  color: #435468;
  font-size: 14px;
  font-weight: 700;
  line-height: 1.25;
  text-decoration: none;
  border-bottom: 1px solid #eef2f5;
}

.catalog-sidebar a:hover {
  color: #f05a28;
}

.catalog-heading {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 24px;
}

.catalog-heading p {
  max-width: 420px;
  margin: 0;
  color: #65758a;
  font-size: 16px;
  line-height: 1.55;
}

.service-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;
}

.service-card {
  min-width: 0;
  display: grid;
  grid-template-rows: 220px 1fr;
  overflow: hidden;
  border: 1px solid #dce5ed;
  border-radius: 8px;
  background: #ffffff;
}

.service-media {
  position: relative;
  display: block;
  min-width: 0;
  overflow: hidden;
  background: #d8e4ed;
}

.service-media img {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
  transition: transform 0.24s ease;
}

.service-media span {
  position: absolute;
  left: 14px;
  bottom: 14px;
  min-width: 46px;
  padding: 8px 10px;
  color: #ffffff;
  font-size: 14px;
  font-weight: 850;
  line-height: 1;
  background: #172334;
  border-radius: 8px;
}

.service-card:hover .service-media img {
  transform: scale(1.04);
}

.service-card-body {
  display: grid;
  gap: 18px;
  padding: 20px;
}

.service-label {
  margin: 0 0 8px;
  color: #f05a28;
  font-size: 12px;
  font-weight: 850;
  line-height: 1.2;
  text-transform: uppercase;
}

.service-card h3 {
  margin: 0;
  color: #172334;
  font-size: 22px;
  line-height: 1.22;
}

.service-card-body p:not(.service-label) {
  margin: 12px 0 0;
  color: #5d6e82;
  font-size: 15px;
  line-height: 1.58;
}

.service-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.service-tags span {
  min-height: 28px;
  display: inline-flex;
  align-items: center;
  padding: 5px 9px;
  color: #22415b;
  font-size: 12px;
  font-weight: 750;
  line-height: 1.2;
  background: #edf5fa;
  border: 1px solid #cfe0eb;
  border-radius: 8px;
}

.service-card-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-self: end;
}

.details-link {
  color: #22415b;
  border-color: #cfe0eb;
  background: #f4f8fb;
}

.workflow-section {
  padding: 56px 0 70px;
  background: #ffffff;
  border-top: 1px solid #dce5ed;
}

.workflow-inner {
  display: grid;
  grid-template-columns: 290px minmax(0, 1fr);
  gap: 30px;
}

.workflow-steps {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 14px;
}

.workflow-step {
  min-width: 0;
  padding: 18px;
  border: 1px solid #dce5ed;
  border-radius: 8px;
  background: #f8fafc;
}

.workflow-step span {
  display: inline-flex;
  margin-bottom: 24px;
  color: #f05a28;
  font-size: 14px;
  font-weight: 850;
}

.workflow-step h3 {
  margin: 0;
  color: #172334;
  font-size: 18px;
  line-height: 1.25;
}

.workflow-step p {
  margin: 10px 0 0;
  color: #65758a;
  font-size: 14px;
  line-height: 1.5;
}

@media (max-width: 1060px) {
  .services-hero h1 {
    font-size: 46px;
  }

  .services-hero-inner,
  .catalog-inner,
  .workflow-inner {
    width: min(100% - 32px, 1280px);
  }

  .catalog-inner,
  .workflow-inner {
    grid-template-columns: 1fr;
  }

  .catalog-sidebar {
    position: static;
  }

  .catalog-sidebar nav {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .workflow-steps {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 780px) {
  .services-hero-inner {
    min-height: auto;
    grid-template-columns: 1fr;
    gap: 28px;
    padding: 58px 0;
  }

  .services-hero h1 {
    font-size: 38px;
  }

  .services-hero-copy > p:last-of-type {
    font-size: 17px;
  }

  .hero-actions,
  .service-card-actions {
    align-items: stretch;
    flex-direction: column;
  }

  .primary-action,
  .secondary-action,
  .details-link,
  .service-card-actions button {
    width: 100%;
  }

  .catalog-heading {
    display: grid;
    align-items: start;
  }

  .service-grid,
  .catalog-sidebar nav,
  .workflow-steps {
    grid-template-columns: 1fr;
  }

  .service-card {
    grid-template-rows: 190px 1fr;
  }
}
</style>
