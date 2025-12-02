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
          <h1>Наши услуги</h1>
          <p class="subtitle">Выберите интересующую вас услугу для получения подробной информации</p>
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
              <div class="service-description">
                <div class="detailed-text" v-html="formatText(selectedService.detailedDescription)"></div>
              </div>
              <div class="service-gallery">
                <h3>Галерея</h3>
                <div class="gallery-grid">
                  <div
                    v-for="(image, idx) in selectedService.gallery"
                    :key="idx"
                    class="gallery-item"
                    :style="{ backgroundImage: `url(${image})` }"
                  ></div>
                </div>
              </div>
              <div class="service-actions">
                <button class="contact-button" @click="openContactModal">
                  Заказать услугу
                </button>
                <button class="back-button" @click="$router.push('/')">
                  Вернуться на главную
                </button>
              </div>
            </div>
            <div v-else class="service-placeholder">
              <p>Выберите услугу из списка слева</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <ContactModal
      :show="showContactModal"
      :services="services"
      @close="closeContactModal"
    />

    <Footer />
  </div>
</template>

<script>
import Header from '@/components/energy-systems/Header.vue'
import Navigation from '@/components/energy-systems/Navigation.vue'
import Footer from '@/components/energy-systems/Footer.vue'
import ContactModal from '@/components/energy-systems/ContactModal.vue'
import { servicesDetailData } from '../data/servicesDetail'

export default {
  name: 'ServicesDetailView',
  components: {
    Header,
    Navigation,
    Footer,
    ContactModal
  },
  data() {
    return {
      services: servicesDetailData,
      selectedServiceId: null,
      showContactModal: false,
      navItems: [
        { key: 'hero', label: 'Главная' },
        { key: 'services', label: 'Услуги' },
        { key: 'about', label: 'О нас' },
        { key: 'projects', label: 'Проекты' },
        { key: 'clients', label: 'Клиенты' },
        { key: 'certificates', label: 'Сертификаты' },
        { key: 'contact', label: 'Контакты' }
      ]
    };
  },
  computed: {
    selectedService() {
      return this.services.find(s => s.id === this.selectedServiceId);
    }
  },
  mounted() {
    // Если перешли с параметром serviceId, выбираем эту услугу
    const serviceId = this.$route.params.serviceId;
    if (serviceId) {
      this.selectService(serviceId);
    } else {
      // Иначе выбираем первую услугу по умолчанию
      this.selectService(this.services[0].id);
    }
  },
  methods: {
    selectService(serviceId) {
      this.selectedServiceId = serviceId;
      // Обновляем URL без перезагрузки страницы
      this.$router.replace({ params: { serviceId } });
    },
    openContactModal() {
      this.showContactModal = true;
    },
    closeContactModal() {
      this.showContactModal = false;
    },
    scrollToSection(key) {
      if (key === 'hero' || key === 'services') {
        this.$router.push('/');
      }
    },
    formatText(text) {
      // Форматируем текст: заменяем переносы строк на <br> и обрабатываем списки
      if (!text) return '';
      return text
        .split('\n')
        .map(line => {
          // Если строка начинается с "•", делаем её элементом списка
          if (line.trim().startsWith('•')) {
            return `<div class="list-item">${line.trim().substring(1).trim()}</div>`;
          }
          // Если строка начинается с "-", делаем её элементом списка
          if (line.trim().startsWith('-')) {
            return `<div class="list-item">${line.trim().substring(1).trim()}</div>`;
          }
          // Если строка не пустая, делаем её параграфом
          if (line.trim()) {
            return `<p>${line.trim()}</p>`;
          }
          return '';
        })
        .join('');
    }
  }
}
</script>

<style scoped>
.services-detail {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
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
  border-radius: 12px;
  text-align: left;
  cursor: pointer;
  transition: all 0.3s ease;
}

.service-item:hover {
  border-color: #ef4422;
  transform: translateX(4px);
}

.service-item.active {
  background: #ef4422;
  border-color: #ef4422;
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
  border-radius: 24px;
  padding: 40px;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.1);
  min-height: 500px;
}

.service-details-content h2 {
  font-size: 32px;
  color: #0f172a;
  margin-bottom: 24px;
}

.service-description,
.service-details-text {
  margin-bottom: 32px;
}

.service-description h3,
.service-details-text h3 {
  font-size: 20px;
  color: #0f172a;
  margin-bottom: 12px;
}

.service-description p,
.service-details-text p {
  color: #4a5568;
  font-size: 16px;
  line-height: 1.7;
  margin-bottom: 16px;
}

.detailed-text {
  color: #4a5568;
  font-size: 16px;
  line-height: 1.8;
}

.detailed-text p {
  margin-bottom: 16px;
  color: #4a5568;
}

.detailed-text .list-item {
  margin-bottom: 12px;
  padding-left: 24px;
  position: relative;
  color: #4a5568;
}

.detailed-text .list-item::before {
  content: '•';
  position: absolute;
  left: 0;
  color: #ef4422;
  font-weight: bold;
  font-size: 20px;
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
  background: linear-gradient(135deg, #ef4422, #ff6934);
  color: #fff;
}

.contact-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(239, 68, 34, 0.4);
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

