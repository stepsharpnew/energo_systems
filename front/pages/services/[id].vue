<template>
  <div class="services-detail">
    <Header @open-contact-modal="openContactModal" />
    
    <Navigation 
      :nav-items="navItems"
      @scroll-to="scrollToSection"
    />

    <div class="services-detail-container">
      <div class="container-1">
        <div class="services-detail-header">
          <h1>{{ selectedService?.name || 'Наши услуги' }}</h1>
          <p class="subtitle">
            {{ selectedService?.description || 'Выберите интересующую вас услугу для получения подробной информации' }}
          </p>
        </div>

        <div class="services-detail-content">
          <div class="services-list">
            <h2>Список услуг</h2>
            <div class="services-list-items">
              <button
                v-for="service in services"
                :key="service.id"
                :class="['service-item', { active: selectedServiceId === service.id }]"
                @click="selectService(service.id)"
              >
                <span class="service-item-name">{{ service.name }}</span>
              </button>
            </div>
          </div>

          <div class="service-details">
            <div v-if="selectedService" class="service-details-content">
              <h2>{{ selectedService.name }}</h2>
              
              <div v-if="selectedService.description" class="service-intro">
                <p>{{ selectedService.description }}</p>
              </div>

              <div v-if="selectedService.highlights" class="service-highlights">
                <span
                  v-for="highlight in selectedService.highlights"
                  :key="highlight"
                >
                  {{ highlight }}
                </span>
              </div>

              <div class="service-sections">
                <div
                  v-for="(section, idx) in selectedService.sections"
                  :key="idx"
                  class="service-section"
                  :class="`section-${section.type}`"
                >
                  <h3 class="section-title">{{ section.title }}</h3>
                  
                  <div v-if="section.items" class="section-items">
                    <div
                      v-for="(item, itemIdx) in section.items"
                      :key="itemIdx"
                      class="section-item"
                    >
                      <span class="item-icon"></span>
                      <span class="item-text">{{ item }}</span>
                    </div>
                  </div>
                  
                  <div v-if="section.content" class="section-content">
                    <p>{{ section.content }}</p>
                  </div>
                </div>
              </div>

              <div v-if="selectedService.searchQueries" class="search-queries">
                <h3>Возможно, вы искали</h3>
                <div class="query-list">
                  <span
                    v-for="query in selectedService.searchQueries"
                    :key="query"
                  >
                    {{ query }}
                  </span>
                </div>
              </div>

              <div class="service-gallery">
                <h3>Галерея</h3>
                <div class="gallery-grid">
                  <div
                    v-for="(image, idx) in selectedService.gallery"
                    :key="idx"
                    class="gallery-item"
                    :style="{ backgroundImage: `url(${image})` }"
                    role="img"
                    :aria-label="`${selectedService.name}: фото ${idx + 1}`"
                  ></div>
                </div>
              </div>
              
              <div class="service-actions">
                <button class="contact-button" @click="openContactModal">
                  Заказать услугу
                </button>
                <button class="back-button" @click="navigateTo('/')">
                  Вернуться на главную
                </button>
              </div>
            </div>
            <div v-else class="service-placeholder">
              <p>Выберите услугу из списка</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <ContactModal
      :show="showContactModal"
      :services="services"
      :selected-service-id="selectedServiceId"
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

const route = useRoute()
const router = useRouter()

const services = servicesDetailData
const selectedServiceId = ref(route.params.id || services[0]?.id || null)
const showContactModal = ref(false)

const navItems = [
  { key: 'hero', label: 'Главная' },
  { key: 'services', label: 'Услуги' },
  { key: 'about', label: 'О нас' },
  { key: 'projects', label: 'Проекты' },
  { key: 'clients', label: 'Клиенты' },
  { key: 'certificates', label: 'Документы' },
  { key: 'contact', label: 'Контакты' }
]

const selectedService = computed(() => {
  return services.find(s => s.id === selectedServiceId.value)
})

useHead(() => {
  const service = selectedService.value
  const title = service?.metaTitle || (service ? `${service.name} | Энергосистемы` : 'Услуги | Энергосистемы')
  const description = service?.metaDescription || service?.description || 'Энергосистемы - инженерные услуги, электромонтажные работы, ГНБ и проектирование.'
  const servicePath = `/services/${selectedServiceId.value || 'hdd'}`
  const keywords = service?.searchQueries?.join(', ')

  const serviceSchema = service
    ? {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: service.name,
        description,
        serviceType: service.id === 'hdd' ? 'Горизонтально направленное бурение' : service.name,
        areaServed: ['Москва', 'Московская область'],
        provider: {
          '@type': 'LocalBusiness',
          name: 'Энергосистемы',
          email: 'sales@e-systems.su',
          telephone: ['+7 495 178-01-18', '+7 925 164-05-60'],
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Москва',
            streetAddress: 'улица Руставели, 14с6',
            addressCountry: 'RU'
          }
        },
        url: `https://e-systems.su${servicePath}`
      }
    : null

  return {
    title,
    meta: [
      { name: 'description', content: description },
      ...(keywords ? [{ name: 'keywords', content: keywords }] : []),
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: `https://e-systems.su${servicePath}` },
      { property: 'og:image', content: 'https://e-systems.su/img/background.jpg' }
    ],
    link: [
      { rel: 'canonical', href: `https://e-systems.su${servicePath}` }
    ],
    script: serviceSchema
      ? [
          {
            type: 'application/ld+json',
            innerHTML: JSON.stringify(serviceSchema)
          }
        ]
      : []
  }
})

onMounted(() => {
  // Если перешли с параметром id, выбираем эту услугу
  const serviceId = route.params.id
  if (serviceId && services.some(s => s.id === serviceId)) {
    selectService(serviceId)
  } else if (services[0]) {
    // Иначе выбираем первую услугу по умолчанию
    selectService(services[0].id)
  }
})

const selectService = (serviceId) => {
  selectedServiceId.value = serviceId
  // Обновляем URL без перезагрузки страницы
  router.replace(`/services/${serviceId}`)
}

const openContactModal = () => {
  showContactModal.value = true
}

const closeContactModal = () => {
  showContactModal.value = false
}

const scrollToSection = (key) => {
  if (key === 'hero' || key === 'services') {
    navigateTo('/')
  }
}
</script>

<style scoped>
.services-detail {
  min-height: 100vh;
  background: #fff;
}

.services-detail-container {
  padding: 40px 0;
}

.container-1 {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  width: 100%;
}

.services-detail-header {
  text-align: center;
  margin-bottom: 48px;
}

.services-detail-header h1 {
  font-size: clamp(32px, 4vw, 48px);
  color: #0f172a;
  margin-bottom: 12px;
}

.subtitle {
  color: #61728a;
  font-size: 18px;
}

.services-detail-content {
  display: grid;
  grid-template-columns: 350px 1fr;
  gap: 40px;
  align-items: start;
}

.services-list h2 {
  font-size: 24px;
  color: #0f172a;
  margin-bottom: 20px;
}

.services-list-items {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.service-item {
  padding: 16px 20px;
  background: #fff;
  border: 2px solid #e5e7eb;
  border-radius: 4px;
  text-align: left;
  cursor: pointer;
  transition: all 0.3s ease;
}

.service-item:hover {
  border-color: #ff4800;
  transform: translateX(4px);
}

.service-item.active {
  background: #ff4800;
  border-color: #ff4800;
  color: #fff;
}

.service-item-name {
  font-size: 14px;
  font-weight: 500;
  line-height: 1.4;
  display: block;
}

.service-details {
  background: #fff;
  border-radius: 8px;
  padding: 40px;
  box-shadow: 0 12px 40px rgba(35, 40, 45, 0.1);
  min-height: 500px;
}

.service-details-content h2 {
  font-size: 32px;
  color: #0f172a;
  margin-bottom: 24px;
}

.service-intro {
  margin-bottom: 32px;
  padding: 20px;
  background: #f9f9f9;
  border-left: 4px solid #ff4800;
  border-radius: 8px;
}

.service-intro p {
  color: #4a5568;
  font-size: 18px;
  line-height: 1.7;
  margin: 0;
}

.service-highlights {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin: -12px 0 32px;
}

.service-highlights span,
.query-list span {
  display: inline-flex;
  align-items: center;
  min-height: 34px;
  padding: 7px 12px;
  border: 1px solid rgba(255, 72, 0, 0.22);
  border-radius: 4px;
  background: rgba(255, 72, 0, 0.06);
  color: #23282d;
  font-size: 14px;
  font-weight: 600;
}

.service-sections {
  margin-bottom: 40px;
}

.service-section {
  margin-bottom: 32px;
  padding: 24px;
  background: #f9fafb;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  transition: all 0.3s ease;
}

.service-section:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  border-color: #ff4800;
}

.section-title {
  font-size: 22px;
  font-weight: 700;
  color: #0f172a;
  margin: 0 0 20px 0;
  display: flex;
  align-items: center;
  gap: 12px;
}

.section-title::before {
  content: '';
  width: 4px;
  height: 24px;
  background: linear-gradient(135deg, #ff4800, #ff7a2f);
  border-radius: 2px;
}

.section-items {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.section-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 12px;
  background: #fff;
  border-radius: 8px;
  transition: all 0.2s ease;
}

.section-item:hover {
  transform: translateX(4px);
  box-shadow: 0 2px 8px rgba(255, 72, 0, 0.12);
}

.item-icon {
  flex-shrink: 0;
  width: 6px;
  height: 6px;
  background: #ff4800;
  border-radius: 50%;
  margin-top: 8px;
}

.item-text {
  color: #4a5568;
  font-size: 16px;
  line-height: 1.6;
  flex: 1;
}

.section-content {
  color: #4a5568;
  font-size: 16px;
  line-height: 1.7;
}

.section-content p {
  margin: 0;
}

/* Специальные стили для разных типов секций */
.section-advantages .section-title::before {
  background: linear-gradient(135deg, #10b981, #34d399);
}

.section-warning .section-title::before {
  background: linear-gradient(135deg, #f59e0b, #fbbf24);
}

.section-warning {
  background: linear-gradient(135deg, rgba(245, 158, 11, 0.05), rgba(245, 158, 11, 0.02));
  border-color: #f59e0b;
}

.section-steps .section-item {
  counter-increment: step-counter;
  position: relative;
  padding-left: 48px;
}

.section-steps .section-item::before {
  content: counter(step-counter);
  position: absolute;
  left: 12px;
  top: 12px;
  width: 28px;
  height: 28px;
  background: linear-gradient(135deg, #ff4800, #ff7a2f);
  color: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 14px;
}

.section-steps {
  counter-reset: step-counter;
}

.section-steps .item-icon {
  display: none;
}

.search-queries {
  margin: 0 0 36px;
  padding: 24px;
  background: #f4f4f4;
  border-radius: 8px;
}

.search-queries h3 {
  margin: 0 0 14px;
  color: #23282d;
  font-size: 20px;
}

.query-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.query-list span {
  min-height: 30px;
  padding: 6px 10px;
  font-size: 13px;
  font-weight: 500;
  background: #fff;
}

.service-gallery {
  margin-bottom: 32px;
}

.service-gallery h3 {
  font-size: 20px;
  color: #0f172a;
  margin-bottom: 16px;
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
}

.gallery-item {
  aspect-ratio: 4 / 3;
  background-size: cover;
  background-position: center;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.service-actions {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.contact-button,
.back-button {
  padding: 14px 28px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
}

.contact-button {
  background: linear-gradient(135deg, #ff4800, #ff7a2f);
  color: #fff;
}

.contact-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(255, 72, 0, 0.32);
}

.back-button {
  background: #e5e7eb;
  color: #0f172a;
}

.back-button:hover {
  background: #d1d5db;
  transform: translateY(-2px);
}

.service-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  color: #9ca3af;
  font-size: 18px;
}

@media (max-width: 992px) {
  .services-detail-content {
    grid-template-columns: 1fr;
  }

  .services-list {
    margin-bottom: 32px;
  }

  .service-details {
    padding: 24px;
  }
}

@media (max-width: 768px) {
  .services-detail-header h1 {
    font-size: 28px;
  }

  .subtitle {
    font-size: 16px;
  }

  .service-details-content h2 {
    font-size: 24px;
  }

  .service-intro {
    padding: 16px;
  }

  .service-intro p {
    font-size: 16px;
  }

  .service-section {
    padding: 20px;
    margin-bottom: 24px;
  }

  .section-title {
    font-size: 20px;
  }

  .section-item {
    padding: 10px;
  }

  .item-text {
    font-size: 15px;
  }

  .section-content {
    font-size: 15px;
  }

  .gallery-grid {
    grid-template-columns: 1fr;
  }

  .service-actions {
    flex-direction: column;
  }

  .contact-button,
  .back-button {
    width: 100%;
  }
}
</style>
