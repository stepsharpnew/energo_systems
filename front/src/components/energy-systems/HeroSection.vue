<template>
  <section class="impact-hero" ref="heroSection" :style="{ backgroundImage: `url(${backgroundImage})` }">
    <div class="hero-container">
      <div class="hero-content">
        <p class="hero-kicker">Инфраструктура будущего</p>
        <h2>Чем мы занимаемся:</h2>
        <p class="hero-description">
          Получите бесплатную консультацию по интересующему Вас вопросу.
        </p>
        <ul class="hero-list">
          <li>Производство ГНБ (горизонтально-направленное бурение) - современный бестраншейный метод прокладки подземных коммуникаций. Позволяет проводить трубы, кабели и трубопроводы на значительные расстояния, не нарушая целостности ландшафта и обходя сущестющие препятствия.</li>
          <li>Электромонтажные работы - включают вынос сетей из пятна застройки, подключение к энергосетям, выполнение технических условий (ТУ) и комплексный монтаж элетрооборудования.</li>
          <li>Проектирование - разработка технической документации, согласование проектов и сопровождение на всех этапах реализации.</li>
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
          <strong>55</strong>
          <span>Округов Москва и область</span>
        </div>
        <div class="stat-card stat-card-full">
          <strong>5000+</strong>
          <span>Выполненных проектов</span>
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
  padding: clamp(40px, 5vw, 60px);
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: clamp(32px, 5vw, 80px);
  border-radius: 32px;
  color: #fff;
  position: relative;
  z-index: 1;
  background: rgba(15, 23, 42, 0.3);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
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
  font-weight: 600;
  display: inline-block;
  padding: 6px 12px;
  background: rgba(239, 68, 34, 0.1);
  border-radius: 6px;
  border: 1px solid rgba(239, 68, 34, 0.3);
}

.hero-content h2 {
  font-size: clamp(30px, 4vw, 44px);
  margin-bottom: 20px;
  line-height: 1.2;
  font-weight: 700;
  background: linear-gradient(135deg, #ffffff 0%, rgba(255, 255, 255, 0.9) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-description {
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 28px;
  font-size: clamp(16px, 1.8vw, 18px);
  line-height: 1.6;
  font-weight: 400;
}

.hero-list {
  list-style: none;
  padding: 0;
  margin: 0 0 32px;
  display: grid;
  gap: 16px;
}

.hero-list li {
  position: relative;
  padding: 16px 20px 16px 48px;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: rgba(255, 255, 255, 0.9);
  font-size: clamp(15px, 1.6vw, 17px);
  line-height: 1.6;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.hero-list li:hover {
  background: rgba(255, 255, 255, 0.06);
  border-color: rgba(239, 68, 34, 0.3);
  transform: translateX(4px);
}

.hero-list li::before {
  content: '';
  position: absolute;
  left: 20px;
  top: 20px;
  width: 8px;
  height: 8px;
  background: linear-gradient(135deg, #ef4422, #ff6934);
  border-radius: 50%;
  box-shadow: 0 0 12px rgba(239, 68, 34, 0.6);
}

.hero-cta {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  align-items: center;
}

.hero-cta button {
  background: linear-gradient(135deg, #ef4422, #ff6934);
  border: none;
  border-radius: 12px;
  padding: 16px 36px;
  color: #fff;
  font-weight: 700;
  cursor: pointer;
  font-size: 16px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 16px rgba(239, 68, 34, 0.3);
  position: relative;
  overflow: hidden;
}

.hero-cta button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s ease;
}

.hero-cta button:hover::before {
  left: 100%;
}

.hero-cta button:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 24px rgba(239, 68, 34, 0.5);
  background: linear-gradient(135deg, #ff6934, #ef4422);
}

.hero-cta button:active {
  transform: translateY(-1px);
}

.hero-cta span {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 8px;
}

.hero-cta span::before {
  content: '⚡';
  font-size: 16px;
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
  background: rgba(15, 23, 42, 0.4);
  border-radius: 20px;
  padding: 28px;
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.stat-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, #ef4422, #ff6934, #ef4422);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-4px);
  border-color: rgba(239, 68, 34, 0.4);
  box-shadow: 0 12px 40px rgba(239, 68, 34, 0.2);
  background: rgba(15, 23, 42, 0.5);
}

.stat-card:hover::before {
  opacity: 1;
}

.stat-card strong {
  display: block;
  font-size: clamp(32px, 4vw, 42px);
  line-height: 1;
  margin-bottom: 8px;
  font-weight: 800;
  background: linear-gradient(135deg, #ffffff 0%, rgba(255, 255, 255, 0.9) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-family: 'Arial', sans-serif;
}

.stat-card span {
  color: #ef4422;
  font-size: clamp(15px, 1.8vw, 17px);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
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
    grid-template-columns: 1fr 1fr;
    gap: 12px;
  }

  .stat-card-full {
    grid-column: 1 / -1;
  }
}

@media (max-width: 560px) {
  .hero-container {
    padding: 24px;
  }
}
</style>

