<template>
  <header class="header">
    <div class="container">
      <div class="header-main">
        <!-- Логотип и название -->
        <div class="logo-wrapper" @click="goToHome">
          <div class="logo">
            <img src="../../assets/LOGO-electro.png" alt="Энергосистемы">
          </div>
          <div class="brand-info">
            <h1 class="company-name">ЭНЕРГОСИСТЕМЫ</h1>
            <p class="company-description">ЭКСПЕРТЫ В СФЕРЕ ЭНЕРГЕТИКИ</p>
          </div>
        </div>

        <!-- Контактная информация -->
        <div class="contacts">
          <div class="contact-row">
            <svg class="contact-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 5C3 3.89543 3.89543 3 5 3H8.27924C8.70967 3 9.09181 3.27543 9.22792 3.68377L10.7257 8.17721C10.8831 8.64932 10.6694 9.16531 10.2243 9.38787L7.96701 10.5165C9.06925 12.9612 11.0388 14.9308 13.4835 16.033L14.6121 13.7757C14.8347 13.3306 15.3507 13.1169 15.8228 13.2743L20.3162 14.7721C20.7246 14.9082 21 15.2903 21 15.7208V19C21 20.1046 20.1046 21 19 21H18C9.71573 21 3 14.2843 3 6V5Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <a href="tel:+74951780118" class="contact-text">8 (495) 178-01-18</a>
          </div>

          <div class="contact-row">
            <svg class="contact-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <div class="addresses">
              <span>г. Москва, ул.Михалковская, д.63Б с4</span>
              <span>г. Солнечногорск ул.Промышленная с 5</span>
            </div>
          </div>

          <div class="contact-row">
            <svg class="contact-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.5"/>
              <polyline points="12 6 12 12 16 14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span class="contact-text">пн-пт: 9:00 - 18:00</span>
          </div>
        </div>

        <!-- Бейдж и кнопка -->
        <div class="header-actions">
          <div class="badge">№1 В СФЕРЕ ЭНЕРГЕТИКИ</div>
          <button class="cta-button" type="button" @click="$emit('open-contact-modal')">СВЯЗАТЬСЯ С НАМИ</button>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header',
  emits: ['open-contact-modal'],
  methods: {
    goToHome() {
      if (this.$route.path !== '/') {
        this.$router.push('/');
      }
    }
  }
}
</script>

<style scoped>
.header {
  background: #ffffff;
  border-bottom: 1px solid rgba(239, 68, 34, 0.1);
  padding: clamp(20px, 3vw, 28px) 0;
  position: relative;
  z-index: 24;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.04);
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 clamp(20px, 4vw, 40px);
}

.header-main {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: clamp(24px, 4vw, 40px);
  flex-wrap: wrap;
}

.logo-wrapper {
  display: flex;
  align-items: center;
  gap: clamp(12px, 2vw, 20px);
  flex-shrink: 0;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.logo-wrapper:hover {
  transform: translateY(-2px);
}

.logo {
  width: clamp(44px, 5vw, 56px);
  height: clamp(44px, 5vw, 56px);
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgba(239, 68, 34, 0.1), rgba(239, 68, 34, 0.05));
  border-radius: 12px;
  padding: 8px;
  transition: all 0.3s ease;
}

.logo-wrapper:hover .logo {
  background: linear-gradient(135deg, rgba(239, 68, 34, 0.15), rgba(239, 68, 34, 0.1));
  box-shadow: 0 4px 12px rgba(239, 68, 34, 0.2);
}

.logo img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.brand-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.company-name {
  color: #0f172a;
  font-size: clamp(18px, 2.5vw, 24px);
  font-weight: 800;
  letter-spacing: -0.02em;
  margin: 0;
  line-height: 1.2;
  background: linear-gradient(135deg, #0f172a, #1f2937);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.company-description {
  color: #ef4422;
  font-size: clamp(10px, 1.2vw, 12px);
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin: 0;
}

.contacts {
  display: flex;
  flex-direction: column;
  gap: clamp(8px, 1vw, 12px);
  flex: 1;
  min-width: 0;
}

.contact-row {
  display: flex;
  align-items: center;
  gap: clamp(8px, 1.5vw, 12px);
  padding: 6px 0;
}

.contact-icon {
  width: clamp(16px, 2vw, 20px);
  height: clamp(16px, 2vw, 20px);
  color: #ef4422;
  flex-shrink: 0;
  transition: transform 0.2s ease;
}

.contact-row:hover .contact-icon {
  transform: scale(1.1);
}

.contact-text {
  color: #0f172a;
  font-size: clamp(13px, 1.6vw, 15px);
  font-weight: 600;
  text-decoration: none;
  transition: color 0.2s ease;
}

.contact-text:hover {
  color: #ef4422;
}

.addresses {
  display: flex;
  flex-direction: column;
  gap: 4px;
  color: #0f172a;
  font-size: clamp(13px, 1.6vw, 15px);
  font-weight: 500;
  line-height: 1.4;
}

.addresses span {
  line-height: 1.5;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: clamp(12px, 2vw, 20px);
  flex-shrink: 0;
}

.badge {
  padding: clamp(8px, 1.2vw, 10px) clamp(16px, 2vw, 20px);
  color: #ef4422;
  font-weight: 700;
  font-size: clamp(11px, 1.3vw, 13px);
  border-radius: 8px;
  white-space: nowrap;
  letter-spacing: 0.05em;
  border: 2px solid #ef4422;
  background: rgba(239, 68, 34, 0.05);
  transition: all 0.3s ease;
}

.badge:hover {
  background: rgba(239, 68, 34, 0.1);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(239, 68, 34, 0.2);
}

.cta-button {
  padding: clamp(12px, 1.5vw, 14px) clamp(24px, 3vw, 32px);
  background: linear-gradient(135deg, #ef4422, #ff6934);
  border: none;
  border-radius: 12px;
  color: #ffffff;
  font-weight: 700;
  font-size: clamp(13px, 1.5vw, 15px);
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
  letter-spacing: 0.02em;
  box-shadow: 0 4px 16px rgba(239, 68, 34, 0.3);
}

.cta-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 24px rgba(239, 68, 34, 0.4);
  background: linear-gradient(135deg, #ff6934, #ef4422);
}

.cta-button:active {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(239, 68, 34, 0.3);
}

/* Адаптивность */
@media (max-width: 1200px) {
  .header-main {
    gap: 24px;
  }
}

@media (max-width: 992px) {
  .header-main {
    flex-direction: column;
    align-items: flex-start;
    gap: 24px;
  }

  .logo-wrapper {
    width: 100%;
  }

  .contacts {
    width: 100%;
    gap: 12px;
  }

  .header-actions {
    width: 100%;
    justify-content: space-between;
    gap: 16px;
  }

  .badge {
    flex: 1;
    text-align: center;
  }

  .cta-button {
    flex: 1;
  }
}

@media (max-width: 768px) {
  .header {
    padding: 20px 0;
  }

  .container {
    padding: 0 20px;
  }

  .header-main {
    gap: 20px;
  }

  .contacts {
    gap: 10px;
  }

  .contact-row {
    gap: 10px;
  }

  .header-actions {
    flex-direction: column;
    width: 100%;
    gap: 12px;
  }

  .badge {
    width: 100%;
    padding: 10px 20px;
  }

  .cta-button {
    width: 100%;
    padding: 14px 24px;
  }
}

@media (max-width: 560px) {
  .container {
    padding: 0 16px;
  }

  .header-main {
    gap: 16px;
  }

  .logo-wrapper {
    gap: 12px;
  }

  .contacts {
    gap: 8px;
  }

  .contact-row {
    flex-wrap: wrap;
    gap: 8px;
  }

  .addresses {
    gap: 4px;
  }

  .header-actions {
    gap: 10px;
  }
}
</style>
