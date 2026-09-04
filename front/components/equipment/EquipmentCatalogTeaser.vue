<template>
  <section class="equipment-teaser" aria-labelledby="equipment-teaser-title">
    <div class="equipment-teaser__inner">
      <div class="equipment-teaser__intro">
        <p class="equipment-teaser__eyebrow">Новое направление</p>
        <h2 id="equipment-teaser-title">
          <span>Поставка и подбор</span>
          <span class="equipment-teaser__headline-equipment">электрооборудования</span>
          <span>по России</span>
        </h2>
        <p class="equipment-teaser__lead">
          Подберём исполнение под схему электроснабжения и параметры объекта.
          Комплектация определяется по исходным данным, схеме и условиям объекта.
        </p>

        <NuxtLink class="equipment-teaser__cta" to="/equipment">
          Перейти в каталог
          <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <path d="m8 5 7 7-7 7" />
          </svg>
        </NuxtLink>
      </div>

      <div class="equipment-teaser__directory">
        <div class="equipment-teaser__route" aria-label="Порядок оформления заявки">
          <span>Выбрать категорию</span>
          <i aria-hidden="true"></i>
          <span>Уточнить параметры</span>
          <i aria-hidden="true"></i>
          <span>Отправить заявку</span>
        </div>

        <div class="equipment-teaser__grid" aria-label="Основные направления оборудования">
          <NuxtLink
            v-for="direction in directions"
            :key="direction.to"
            class="equipment-teaser__card"
            :to="direction.to"
          >
            <span class="equipment-teaser__code">{{ direction.code }}</span>
            <strong>{{ direction.title }}</strong>
            <small>{{ direction.items }}</small>
            <span class="equipment-teaser__card-arrow" aria-hidden="true">→</span>
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const directions = [
  {
    code: 'ТП',
    title: 'Трансформаторные подстанции',
    items: 'МТП · КТП · БКТП',
    to: '/equipment/ktp',
  },
  {
    code: 'РУ',
    title: 'Распределительные устройства',
    items: 'КРУН · ячейки КРУН · КСО · КРУ',
    to: '/equipment/krun',
  },
  {
    code: 'УЧ',
    title: 'Учёт и управление',
    items: 'ЯКНО · ПКУ · ВРУ и панели ЩО',
    to: '/equipment/pku',
  },
  {
    code: 'СТ',
    title: 'Силовые трансформаторы',
    items: 'Подбор под сеть и нагрузку объекта',
    to: '/equipment/power-transformers',
  },
]
</script>

<style scoped>
.equipment-teaser {
  padding: 28px 24px 64px;
  background: #ffffff;
  color: #102234;
}

.equipment-teaser__inner {
  width: min(100%, 1280px);
  display: grid;
  grid-template-columns: minmax(0, 0.9fr) minmax(520px, 1.1fr);
  gap: 0;
  margin: 0 auto;
  overflow: hidden;
  border-radius: 10px;
  background: #102234;
  box-shadow: 0 20px 48px rgba(16, 34, 52, 0.16);
}

.equipment-teaser__intro {
  min-width: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 42px;
}

.equipment-teaser__eyebrow {
  margin: 0 0 12px;
  color: #f05a28;
  font-size: 12px;
  font-weight: 800;
  line-height: 1.2;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.equipment-teaser h2 {
  width: 100%;
  max-width: none;
  margin: 0;
  color: #ffffff;
  font-size: clamp(30px, 2.8vw, 43px);
  font-weight: 850;
  line-height: 1.07;
  letter-spacing: -0.025em;
}

.equipment-teaser h2 span {
  display: block;
}

.equipment-teaser__headline-equipment {
  font-size: 0.82em;
  letter-spacing: -0.035em;
}

.equipment-teaser__lead {
  max-width: 590px;
  margin: 20px 0 0;
  color: rgba(255, 255, 255, 0.75);
  font-size: 16px;
  line-height: 1.6;
}

.equipment-teaser__cta {
  min-height: 48px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 9px;
  margin-top: 28px;
  padding: 0 20px;
  border: 1px solid #f05a28;
  border-radius: 8px;
  color: #ffffff;
  background: #f05a28;
  font-size: 15px;
  font-weight: 800;
  line-height: 1;
  text-decoration: none;
  transition: background-color 180ms ease, border-color 180ms ease, transform 180ms ease;
}

.equipment-teaser__cta svg {
  width: 18px;
  height: 18px;
  fill: none;
  stroke: currentColor;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 2;
}

.equipment-teaser__directory {
  display: grid;
  grid-template-rows: auto 1fr;
  padding: 24px;
  background: #f3f7fa;
}

.equipment-teaser__route {
  display: grid;
  grid-template-columns: auto minmax(20px, 1fr) auto minmax(20px, 1fr) auto;
  gap: 10px;
  align-items: center;
  margin: 0 0 18px;
  color: #52687a;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.04em;
  line-height: 1.25;
  text-transform: uppercase;
}

.equipment-teaser__route i {
  height: 1px;
  background: #b5c7d4;
}

.equipment-teaser__grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

.equipment-teaser__card {
  position: relative;
  min-width: 0;
  min-height: 154px;
  display: grid;
  grid-template-columns: 42px minmax(0, 1fr);
  grid-template-rows: auto 1fr auto;
  column-gap: 13px;
  padding: 18px;
  border: 1px solid #d6e0e7;
  border-radius: 8px;
  color: #102234;
  background: #ffffff;
  text-decoration: none;
  transition: border-color 180ms ease, box-shadow 180ms ease, transform 180ms ease;
}

.equipment-teaser__code {
  grid-row: 1 / span 3;
  width: 42px;
  height: 42px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(45, 122, 172, 0.28);
  border-radius: 6px;
  color: #2d7aac;
  background: rgba(45, 122, 172, 0.08);
  font-size: 12px;
  font-weight: 900;
  letter-spacing: 0.04em;
}

.equipment-teaser__card strong {
  min-width: 0;
  padding-right: 24px;
  font-size: 17px;
  font-weight: 850;
  line-height: 1.22;
  overflow-wrap: anywhere;
}

.equipment-teaser__card small {
  align-self: end;
  margin-top: 16px;
  color: #647789;
  font-size: 13px;
  line-height: 1.4;
}

.equipment-teaser__card-arrow {
  position: absolute;
  top: 17px;
  right: 17px;
  color: #f05a28;
  font-size: 20px;
  font-weight: 700;
  line-height: 1;
}

.equipment-teaser__cta:hover {
  border-color: #da4818;
  background: #da4818;
  transform: translateY(-1px);
}

.equipment-teaser__card:hover {
  border-color: rgba(45, 122, 172, 0.58);
  box-shadow: 0 10px 24px rgba(16, 34, 52, 0.1);
  transform: translateY(-2px);
}

.equipment-teaser__cta:focus-visible,
.equipment-teaser__card:focus-visible {
  outline: 3px solid rgba(240, 90, 40, 0.45);
  outline-offset: 3px;
}

@media (max-width: 960px) {
  .equipment-teaser__inner {
    grid-template-columns: 1fr;
    gap: 0;
  }

  .equipment-teaser__intro {
    padding: 36px;
  }
}

@media (max-width: 640px) {
  .equipment-teaser {
    padding: 20px 16px 44px;
  }

  .equipment-teaser__inner {
    border-radius: 8px;
  }

  .equipment-teaser__intro,
  .equipment-teaser__directory {
    padding: 24px;
  }

  .equipment-teaser h2 {
    font-size: clamp(29px, 8vw, 36px);
  }

  .equipment-teaser__lead {
    font-size: 15px;
  }

  .equipment-teaser__route {
    grid-template-columns: 1fr;
    gap: 5px;
  }

  .equipment-teaser__route i {
    width: 16px;
    margin-left: 2px;
    transform: rotate(90deg);
    transform-origin: left center;
  }

  .equipment-teaser__grid {
    grid-template-columns: 1fr;
  }

  .equipment-teaser__card {
    min-height: 126px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .equipment-teaser__cta,
  .equipment-teaser__card {
    transition: none;
  }

  .equipment-teaser__cta:hover,
  .equipment-teaser__card:hover {
    transform: none;
  }
}
</style>
