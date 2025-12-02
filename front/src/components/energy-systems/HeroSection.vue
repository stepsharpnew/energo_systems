<template>
  <section class="impact-hero" ref="heroSection" :style="{ backgroundImage: `url(${backgroundImage})` }">
    <div class="hero-container">
      <div class="hero-content">
        <p class="hero-kicker">Инфраструктура будущего</p>
        <h2>Давайте знакомиться!</h2>
        <p class="hero-description">
          Получите бесплатную консультацию по интересующему Вас вопросу.
        </p>
        <ul class="hero-list">
          <li>ГНБ | Горизонтальное бурение является одним из наиболее эффективных методов прокладки коммуникаций. Он позволяет проложить трубы, трубопроводы, кабели на большие расстояния, минуя препятствия, такие как дороги, здания, водоемы и т.д. При этом поверхность земли остается в исходном состоянии, что позволяет сохранить ландшафт.</li>
          <li>Получение или выполнение ТУ.</li>
          <li>Вынос электросетей из пятна застройки.</li>
        </ul>
        <div class="hero-cta">
          <button type="button" @click="$emit('open-contact-modal')">Консультация</button>
          <span>Ответим в течение 15 минут</span>
        </div>
      </div>
      <div class="hero-stats">
        <div class="hero-glow"></div>
        <div class="stat-card">
          <strong>100+</strong>
          <span>Специалистов</span>
        </div>
        <div class="stat-card">
          <strong>5000+</strong>
          <span>Выполненных проектов</span>
        </div>
        <div class="stat-card">
          <strong>55</strong>
          <span>Округов Москва и область</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'HeroSection',
  emits: ['open-contact-modal'],
  data() {
    return {
      backgroundImage: require('../../assets/background.jpg')
    };
  }
}
</script>

<style scoped>
.impact-hero {
  padding: clamp(60px, 3vw, 150px) 0;
  margin-top: -200px;
  padding-top: calc(clamp(60px, 3vw, 150px) + 200px);
  position: relative;
  overflow: visible;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  z-index: 0;
}

.impact-hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.8);
  z-index: 0;
  pointer-events: none;
}

.hero-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px 40px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: clamp(24px, 5vw, 60px);
  border-radius: 36px;
  color: #fff;
  position: relative;
  z-index: 1;
}

.hero-content,
.hero-stats {
  position: relative;
  z-index: 2;
}

.hero-kicker {
  text-transform: uppercase;
  letter-spacing: 0.2em;
  font-size: 12px;
  color: #ef4422;
  margin-bottom: 14px;
}

.hero-content h2 {
  font-size: clamp(30px, 4vw, 44px);
  margin-bottom: 16px;
  line-height: 1.2;
}

.hero-description {
  color: rgba(255, 255, 255, 0.85);
  margin-bottom: 20px;
  font-size: 17px;
}

.hero-list {
  list-style: none;
  padding: 0;
  margin: 0 0 24px;
  display: grid;
  gap: 10px;
}

.hero-list li {
  position: relative;
  padding-left: 26px;
}

.hero-list li::before {
  content: '•';
  position: absolute;
  left: 0;
  color: #f97316;
}

.hero-cta {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  align-items: center;
}

.hero-cta button {
  background: linear-gradient(135deg, #ef4422, #ff4c34);
  border: none;
  border-radius: 999px;
  padding: 12px 32px;
  color: #fff;
  font-weight: 600;
  cursor: pointer;
  font-size: 16px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.hero-cta button:hover {
  transform: translateY(-3px);
  box-shadow: 0 15px 30px rgba(239, 68, 34, 0.4);
}

.hero-cta span {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
}

.hero-stats {
  display: grid;
  gap: 16px;
  padding: clamp(24px, 4vw, 40px) 0;
}

.hero-glow {
  position: absolute;
  width: 220px;
  height: 220px;
  filter: blur(120px);
  background: rgba(239, 68, 34, 0.75);
  top: 10%;
  right: 0;
  opacity: 0.8;
}

.stat-card {
  background: rgba(15, 23, 42, 0.178);
  border-radius: 24px;
  padding: 24px;
  backdrop-filter: blur(10px);
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.03);
}

.stat-card strong {
  display: block;
  font-size: 34px;
  line-height: 1;
  margin-bottom: 6px;
}

.stat-card span {
  color: #ef4422;
  font-size: 17px;
  font-weight: 600;
}

@media (max-width: 768px) {
  .hero-container {
    padding: 32px;
  }

  .hero-cta button {
    width: 100%;
    text-align: center;
  }

  .hero-cta span {
    width: 100%;
  }

  .hero-stats {
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  }
}

@media (max-width: 560px) {
  .hero-container {
    padding: 24px;
  }
}
</style>

