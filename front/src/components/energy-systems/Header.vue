<template>
  <header class="header">
    <div class="container">
      <div class="header-main">
        <!-- Логотип и название -->
        <div class="logo-wrapper">
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
  emits: ['open-contact-modal']
}
</script>

<style scoped>
.header {
  background: #ffffff;
  border-bottom: 1px solid #e5e7eb;
  padding: 24px 0;
  position: relative;
  z-index: 24;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

.header-main {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 32px;
  flex-wrap: wrap;
}

.logo-wrapper {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-shrink: 0;
}

.logo {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
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
  color: #111827;
  font-size: 20px;
  font-weight: 700;
  letter-spacing: -0.01em;
  margin: 0;
  line-height: 1.2;
}

.company-description {
  color: #6b7280;
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  margin: 0;
}

.contacts {
  display: flex;
  flex-direction: column;
  gap: 5px;
  flex: 1;
  min-width: 0;
}

.contact-row {
  display: flex;
  align-items: center;
  gap: 10px;
}

.contact-icon {
  width: 16px;
  height: 16px;
  color: #6b7280;
  flex-shrink: 0;
}

.contact-text {
  color: #303030;
  font-size: 14px;
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
  gap: 2px;
  color: #111827;
  font-size: 14px;
  font-weight: 500;
}

.addresses span {
  line-height: 1.4;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-shrink: 0;
}

.badge {
  padding: 6px 16px;
  color: #ef4422;
  font-weight: 600;
  font-size: 14px;
  border-radius: 4px;
  white-space: nowrap;
  letter-spacing: 0.02em;
  border: 2px solid #ef4422;
}

.cta-button {
  padding: 10px 20px;
  background-color: #ef4422;
  border: 1px solid #ef4422;
  border-radius: 4px;
  color: #ffffff;
  font-weight: 600;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  letter-spacing: 0.02em;
}


.cta-button:hover {
  background: #ffffff;
  border-color: #ef4422;
  color:#ef4422;
}

.cta-button:active {
  transform: scale(0.98);
}

/* Адаптивность */
@media (max-width: 992px) {
  .header-main {
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
  }

  .contacts {
    width: 100%;
  }

  .header-actions {
    width: 100%;
    justify-content: space-between;
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

  .logo {
    width: 44px;
    height: 44px;
  }

  .logo-wrapper {
    gap: 12px;
  }

  .company-name {
    font-size: 18px;
  }

  .company-description {
    font-size: 10px;
  }

  .contact-row {
    gap: 8px;
  }

  .contact-icon {
    width: 14px;
    height: 14px;
  }

  .contact-text,
  .addresses {
    font-size: 13px;
  }

  .header-actions {
    flex-direction: column;
    width: 100%;
    gap: 12px;
  }

  .badge {
    width: 100%;
    text-align: center;
    padding: 8px 16px;
  }

  .cta-button {
    width: 100%;
    padding: 12px 20px;
  }
}

@media (max-width: 560px) {
  .container {
    padding: 0 16px;
  }

  .logo {
    width: 40px;
    height: 40px;
  }

  .company-name {
    font-size: 16px;
  }

  .contacts {
    gap: 10px;
  }

  .contact-row {
    flex-wrap: wrap;
  }

  .addresses {
    flex-direction: column;
    gap: 4px;
  }
}
</style>
