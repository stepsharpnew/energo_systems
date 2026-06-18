<template>
  <footer class="site-footer">
    <div class="footer-content">
      <div class="footer-column">
        <div class="footer-logo">
          <img src="/img/LOGO-electro.png" alt="Энергосистемы" class="logo-img">
          <div>
            <h3>Энергосистемы</h3>
            <p class="company-tagline">ЭКСПЕРТЫ В СФЕРЕ ЭНЕРГЕТИКИ</p>
          </div>
        </div>
        <p class="footer-description">
          <b>ООО «Энергосистемы»</b> - надежный партнер с гарантией высокого качества и профессионализма.
        </p>
      </div>
      <div class="footer-column">
        <h4>Контакты</h4>
        <ul>
          <li>
            <a href="tel:+74951780118" class="contact-link">8 (495) 178-01-18</a>
          </li>
          <li>
            <a href="mailto:info@energosystems.ru" class="contact-link">info@energosystems.ru</a>
          </li>
          <li class="address-item">
            <span class="address-label">Москва:</span>
            <span>125445, ул.Михалковская, д.63Б с4</span>
          </li>
          <li class="address-item">
            <span class="address-label">Солнечногорск:</span>
            <span>141504, ул.Промышленная с 5</span>
          </li>
        </ul>
      </div>
      <div class="footer-column">
        <h4>Режим работы</h4>
        <ul>
          <li>Пн-Пт: 09:00 – 18:00</li>
        </ul>
        <p class="founder">Дмитрий Чернявский - учредитель компании</p>
      </div>
    </div>
    <div class="footer-bottom">
      <span>© {{ currentYear }} Энергосистемы. Все права защищены.</span>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
  computed: {
    currentYear() {
      return new Date().getFullYear();
    }
  }
}
</script>

<style scoped>
.site-footer {
  background: linear-gradient(135deg, #0f172a, #1f2937);
  color: rgba(255, 255, 255, 0.85);
  padding: clamp(40px, 5vw, 50px) clamp(20px, 4vw, 40px) clamp(20px, 3vw, 24px);
  border-top: 1px solid rgba(239, 68, 34, 0.2);
}

.footer-content {
  max-width: 1400px;
  margin: 0 auto clamp(24px, 3vw, 32px);
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: clamp(24px, 4vw, 32px);
}

.footer-column {
  display: flex;
  flex-direction: column;
  gap: clamp(12px, 2vw, 16px);
}

.footer-logo {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
}

.logo-img {
  width: clamp(40px, 4vw, 48px);
  height: clamp(40px, 4vw, 48px);
  object-fit: contain;
  background: rgba(239, 68, 34, 0.1);
  border-radius: 10px;
  padding: 6px;
}

.footer-column h3 {
  margin: 0;
  font-size: clamp(18px, 2.2vw, 22px);
  font-weight: 800;
  color: #fff;
  line-height: 1.2;
}

.company-tagline {
  margin: 4px 0 0 0;
  font-size: clamp(10px, 1.2vw, 12px);
  font-weight: 600;
  color: #ef4422;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.footer-column h4 {
  margin: 0 0 clamp(8px, 1vw, 12px) 0;
  font-size: clamp(16px, 2vw, 18px);
  font-weight: 700;
  color: #fff;
  position: relative;
  padding-bottom: 8px;
}

.footer-column h4::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 40px;
  height: 2px;
  background: linear-gradient(90deg, #ef4422, #ff6934);
  border-radius: 2px;
}

.footer-description {
  margin: 0;
  font-size: clamp(13px, 1.5vw, 14px);
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.75);
}

.footer-description b {
  color: #fff;
  font-weight: 600;
}

.footer-column ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: clamp(6px, 1vw, 8px);
}

.footer-column li {
  font-size: clamp(13px, 1.5vw, 14px);
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.75);
}

.contact-link {
  color: rgba(255, 255, 255, 0.85);
  text-decoration: none;
  font-weight: 600;
  transition: color 0.2s ease;
  display: inline-block;
}

.contact-link:hover {
  color: #ef4422;
}

.address-item {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.address-label {
  font-weight: 600;
  color: #ef4422;
  font-size: clamp(12px, 1.4vw, 13px);
}

.founder {
  margin-top: clamp(12px, 2vw, 16px);
  font-size: clamp(12px, 1.4vw, 13px);
  color: rgba(255, 255, 255, 0.6);
  font-style: italic;
}

.footer-bottom {
  text-align: center;
  font-size: clamp(12px, 1.4vw, 13px);
  color: rgba(255, 255, 255, 0.5);
  padding-top: clamp(16px, 2vw, 20px);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  max-width: 1400px;
  margin: 0 auto;
}

@media (max-width: 992px) {
  .footer-content {
    grid-template-columns: repeat(2, 1fr);
    gap: clamp(20px, 3vw, 28px);
  }
}

@media (max-width: 768px) {
  .footer-content {
    grid-template-columns: 1fr;
    gap: clamp(20px, 3vw, 24px);
  }

  .footer-logo {
    margin-bottom: 12px;
  }
}

@media (max-width: 560px) {
  .site-footer {
    padding: clamp(32px, 4vw, 40px) clamp(16px, 3vw, 20px) clamp(16px, 2vw, 20px);
  }

  .footer-content {
    gap: 20px;
  }
}
</style>

