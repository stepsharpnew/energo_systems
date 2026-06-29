<template>
  <section
    class="hdd-hero"
    ref="heroSection"
    :style="{ backgroundImage: `linear-gradient(90deg, rgba(10, 24, 38, 0.86), rgba(10, 24, 38, 0.55)), url(${backgroundImage})` }"
  >
    <div class="hero-inner">
      <div class="hero-copy">
        <p class="hero-kicker">ГНБ под ключ в Москве и области</p>
        <h1>Проколы под дорогами без вскрытия покрытия</h1>
        <p class="hero-description">
          Прокладываем водопровод, канализацию, газ, кабель, футляры и гильзы методом горизонтально направленного бурения. Работаем в городе, под трассами, ж/д путями и на благоустроенных территориях.
        </p>

        <ul class="hero-tags" aria-label="Направления работ">
          <li>Водопровод</li>
          <li>Канализация</li>
          <li>Газ</li>
          <li>Кабель</li>
          <li>Футляры и гильзы</li>
        </ul>

        <div class="hero-actions">
          <NuxtLink class="primary-link" to="/services/hdd">
            Подробнее о ГНБ
          </NuxtLink>
          <button class="secondary-action" type="button" @click="$emit('open-contact-modal')">
            Получить расчет
          </button>
        </div>
      </div>

      <dl class="hero-facts" aria-label="Ключевые факты">
        <div>
          <dt>2 установки</dt>
          <dd>DDW 36/13 и Теребро Т40</dd>
        </div>
        <div>
          <dt>Под ключ</dt>
          <dd>Обследование, бурение, расширение, протяжка</dd>
        </div>
        <div>
          <dt>Без вскрытия</dt>
          <dd>Сохраняем дорожное покрытие и благоустройство</dd>
        </div>
      </dl>
    </div>
  </section>
</template>

<script>
export default {
  name: "HeroSection",
  emits: ["open-contact-modal"],
  data() {
    return {
      backgroundImage: "/img/background.jpg",
    };
  },
};
</script>

<style scoped>
.hdd-hero {
  position: relative;
  min-height: clamp(560px, 72vh, 760px);
  display: flex;
  align-items: center;
  background-size: cover;
  background-position: center;
  color: #ffffff;
  overflow: hidden;
}

.hero-inner {
  width: min(100% - 48px, 1280px);
  margin: 0 auto;
  padding: clamp(64px, 9vw, 118px) 0;
  display: grid;
  grid-template-columns: minmax(0, 1.15fr) minmax(280px, 0.55fr);
  align-items: end;
  gap: clamp(36px, 7vw, 92px);
}

.hero-copy {
  min-width: 0;
  max-width: 800px;
}

.hero-kicker {
  width: fit-content;
  margin: 0 0 18px;
  padding: 8px 12px;
  border: 1px solid rgba(155, 204, 236, 0.38);
  border-radius: 999px;
  background: rgba(47, 127, 182, 0.16);
  color: #d9efff;
  font-size: 13px;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.hero-copy h1 {
  max-width: 760px;
  margin: 0;
  color: #ffffff;
  font-size: clamp(42px, 6vw, 78px);
  font-weight: 850;
  line-height: 0.98;
  text-wrap: balance;
}

.hero-description {
  max-width: 720px;
  margin: 24px 0 0;
  color: rgba(255, 255, 255, 0.88);
  font-size: clamp(17px, 2vw, 21px);
  line-height: 1.55;
  text-wrap: pretty;
}

.hero-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  padding: 0;
  margin: 28px 0 0;
  list-style: none;
}

.hero-tags li {
  padding: 9px 12px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.94);
  font-size: 14px;
  font-weight: 700;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 14px;
  margin-top: 34px;
}

.primary-link,
.secondary-action {
  min-height: 52px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  padding: 0 24px;
  font-size: 16px;
  font-weight: 800;
  line-height: 1;
  text-decoration: none;
  cursor: pointer;
  transition:
    background-color 0.2s ease,
    border-color 0.2s ease,
    color 0.2s ease,
    box-shadow 0.2s ease,
    transform 0.2s ease;
}

.primary-link {
  color: #082033;
  border: 1px solid #ffffff;
  background: #ffffff;
  box-shadow: 0 16px 34px rgba(0, 0, 0, 0.24);
}

.secondary-action {
  color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.5);
  background: rgba(255, 255, 255, 0.12);
}

.primary-link:hover,
.secondary-action:hover {
  transform: translateY(-1px);
}

.primary-link:hover {
  background: #d9efff;
  border-color: #d9efff;
}

.secondary-action:hover {
  background: rgba(47, 127, 182, 0.62);
  border-color: rgba(155, 204, 236, 0.72);
}

.primary-link:focus-visible,
.secondary-action:focus-visible {
  outline: 3px solid rgba(217, 239, 255, 0.55);
  outline-offset: 4px;
}

.hero-facts {
  display: grid;
  gap: 14px;
  margin: 0;
}

.hero-facts div {
  padding: 18px 20px;
  border-left: 3px solid #8fc7ec;
  background: rgba(4, 16, 28, 0.44);
  backdrop-filter: blur(12px);
}

.hero-facts dt {
  margin: 0 0 6px;
  color: #ffffff;
  font-size: clamp(21px, 2.4vw, 30px);
  font-weight: 850;
  line-height: 1.1;
}

.hero-facts dd {
  margin: 0;
  color: rgba(255, 255, 255, 0.78);
  font-size: 15px;
  line-height: 1.45;
}

@media (max-width: 980px) {
  .hdd-hero {
    min-height: auto;
  }

  .hero-inner {
    grid-template-columns: 1fr;
    padding: clamp(56px, 10vw, 84px) 0;
  }

  .hero-facts {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 720px) {
  .hero-inner {
    width: min(100% - 32px, 1280px);
  }

  .hero-copy h1 {
    font-size: clamp(36px, 11vw, 54px);
  }

  .hero-actions {
    align-items: stretch;
    flex-direction: column;
  }

  .primary-link,
  .secondary-action {
    width: 100%;
  }

  .hero-facts {
    grid-template-columns: 1fr;
  }
}
</style>
