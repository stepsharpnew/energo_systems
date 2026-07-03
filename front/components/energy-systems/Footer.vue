<template>
  <footer class="site-footer">
    <div class="footer-content">
      <div class="footer-column">
        <div class="footer-logo">
          <img src="/img/image.png" alt="Энергосистемы" class="logo-img">
        </div>
        <p class="footer-description">
          <b>ООО «Энергосистемы»</b> - надежный партнер с гарантией высокого качества и профессионализма.
        </p>
      </div>
      <div class="footer-column">
        <h4>Контакты</h4>
        <ul>
          <li>
            <a href="tel:+74951780118" class="contact-link">+7 (495) 178-01-18</a>
          </li>
          <li>
            <a href="tel:+79251640560" class="contact-link">+7 (925) 164-05-60</a>
          </li>
          <li>
            <a href="mailto:sales@e-systems.su?cc=inbox@e-systems.su" class="contact-link">sales@e-systems.su</a>
          </li>
          <li class="address-item">
            <span class="address-label">Москва:</span>
            <span>улица Руставели, 14с6</span>
          </li>
          <li class="address-item">
            <span class="address-label">Солнечногорск:</span>
            <span>Московская область, г. Солнечногорск, ул. Промышленная, с. 5</span>
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

    <section class="footer-maps" aria-labelledby="footer-maps-title">
      <div class="footer-maps-heading">
        <h4 id="footer-maps-title">Офисы на карте</h4>
      </div>
      <div class="footer-map-layout">
        <div class="footer-address-list">
          <article
            v-for="office in mapOffices"
            :key="office.title"
            class="map-address-card"
          >
            <span class="address-label">{{ office.title }}</span>
            <span>{{ office.address }}</span>
          </article>
        </div>
        <div class="map-card">
          <iframe
            class="map-frame"
            :src="mapSrc"
            title="Яндекс Карта: офисы в Москве и Солнечногорске"
            loading="lazy"
            allowfullscreen
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </section>

    <div class="footer-bottom">
      <span>© {{ currentYear }} Энергосистемы. Все права защищены.</span>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
  data() {
    return {
      mapOffices: [
        {
          title: 'Москва',
          address: 'Москва, улица Руставели, 14с6',
        },
        {
          title: 'Солнечногорск',
          address: 'Московская область, г. Солнечногорск, ул. Промышленная, с. 5',
        },
      ],
      mapSrc: 'https://yandex.ru/map-widget/v1/?ll=36.996500%2C56.186500&z=8&l=map&pt=37.594900%2C55.814500%2Cpm2blm~36.996500%2C56.186500%2Cpm2rdm',
    };
  },
  computed: {
    currentYear() {
      return new Date().getFullYear();
    }
  }
}
</script>

<style scoped>
.site-footer {
  background: linear-gradient(135deg, #23282d, #111);
  color: rgba(255, 255, 255, 0.85);
  padding: clamp(40px, 5vw, 50px) clamp(20px, 4vw, 40px) clamp(20px, 3vw, 24px);
  border-top: 1px solid rgba(255, 72, 0, 0.22);
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
  width: min(260px, 82vw);
  height: auto;
  max-height: 54px;
  object-fit: contain;
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
  color: #ff4800;
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
  background: linear-gradient(90deg, #ff4800, #ff7a2f);
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
  color: #ff4800;
}

.address-item {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.address-label {
  font-weight: 600;
  color: #ff4800;
  font-size: clamp(12px, 1.4vw, 13px);
}

.footer-maps {
  max-width: 1400px;
  margin: 0 auto clamp(24px, 3vw, 32px);
}

.footer-maps-heading {
  margin-bottom: 16px;
}

.footer-maps-heading h4 {
  margin: 0;
  color: #fff;
  font-size: clamp(16px, 2vw, 18px);
  font-weight: 700;
}

.footer-map-layout {
  display: grid;
  grid-template-columns: minmax(240px, 0.34fr) minmax(0, 0.66fr);
  gap: 16px;
  align-items: stretch;
}

.footer-address-list {
  display: grid;
  gap: 12px;
}

.map-address-card,
.map-card {
  min-width: 0;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.05);
}

.map-address-card {
  display: grid;
  align-content: start;
  gap: 4px;
  padding: 14px 16px;
  color: rgba(255, 255, 255, 0.78);
  font-size: clamp(13px, 1.5vw, 14px);
  line-height: 1.45;
}

.map-card {
  overflow: hidden;
}

.map-frame {
  display: block;
  width: 100%;
  height: clamp(300px, 36vw, 420px);
  border: 0;
  background: #1f2933;
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

  .footer-map-layout {
    grid-template-columns: 1fr;
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
