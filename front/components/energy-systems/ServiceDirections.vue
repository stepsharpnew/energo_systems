<template>
  <nav class="service-directions" aria-labelledby="service-directions-title">
    <div class="directions-heading">
      <p id="service-directions-title">Наши направления</p>
      <NuxtLink class="all-services" to="/services">
        Все услуги <span aria-hidden="true">→</span>
      </NuxtLink>
    </div>

    <div class="directions-links">
      <NuxtLink
        v-for="direction in directions"
        :key="direction.id"
        :to="direction.href"
        class="direction-link"
      >
        <svg class="direction-icon" viewBox="0 0 32 32" fill="none" aria-hidden="true" focusable="false">
          <template v-if="direction.id === 'hdd'">
            <path d="M3 9h26M7 5v4m18-4v4M4 15v6a6 6 0 0 0 6 6h12a6 6 0 0 0 6-6v-6M9 15v6a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-6" />
            <path d="m20 19 3-4 3 4" />
          </template>
          <template v-else-if="direction.id === 'ups'">
            <rect x="5" y="7" width="22" height="21" rx="3" />
            <path d="M11 7V4h10v3m-4 5-5 7h7l-4 6" />
          </template>
          <template v-else>
            <rect x="3" y="9" width="26" height="17" rx="2" />
            <path d="M7 26v3m18-3v3M7 9V5h9v4m7 5h2m-2 4h2m-2 4h2" />
            <circle cx="13" cy="17.5" r="4.5" />
            <path d="m14 15-2 3h2l-2 3" />
          </template>
        </svg>
        <span class="direction-copy">
          <span class="direction-title">{{ direction.title }}</span>
          <span class="direction-description">{{ direction.description }}</span>
        </span>
        <svg class="direction-arrow" viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
          <path d="M5 19 19 5M6 5h13v13" />
        </svg>
      </NuxtLink>
    </div>
  </nav>
</template>

<script setup>
const directions = [
  { id: 'hdd', href: '/services/hdd', title: 'ГНБ под ключ', description: 'Проколы и коммуникации' },
  { id: 'ups', href: '/services/ups', title: 'ИБП для дома', description: 'Бесперебойное питание' },
  { id: 'dgu', href: '/services/dgu', title: 'ДГУ для бизнеса', description: 'Коммерция и промышленность' },
]
</script>

<style scoped>
.service-directions {
  grid-column: 1 / -1;
  min-width: 0;
}

.directions-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 12px;
}

.directions-heading p {
  margin: 0;
  color: #c0d7e7;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.09em;
  line-height: 1.4;
  text-transform: uppercase;
}

.all-services {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-height: 28px;
  color: #e0eff9;
  font-size: 13px;
  font-weight: 700;
  line-height: 1.4;
  text-decoration: none;
  white-space: nowrap;
}

.all-services:hover {
  text-decoration: underline;
  text-underline-offset: 4px;
}

.directions-links {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
}

.direction-link {
  min-width: 0;
  display: grid;
  grid-template-columns: 36px minmax(0, 1fr) 20px;
  align-items: center;
  gap: 16px;
  padding: 20px;
  border: 1px solid #426078;
  border-radius: 10px;
  background: #102a3c;
  color: #ffffff;
  text-decoration: none;
  transition: background-color 0.2s ease, border-color 0.2s ease;
}

.direction-icon {
  width: 36px;
  height: 36px;
  color: #9dcdef;
  stroke: currentColor;
  stroke-width: 1.5;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.direction-copy {
  min-width: 0;
  display: grid;
  gap: 5px;
}

.direction-title {
  color: #ffffff;
  font-size: clamp(16px, 1.5vw, 20px);
  font-weight: 700;
  line-height: 1.2;
  text-wrap: balance;
}

.direction-description {
  color: #bed2e1;
  font-size: 13px;
  line-height: 1.4;
}

.direction-arrow {
  width: 20px;
  height: 20px;
  align-self: start;
  color: #9dcdef;
  stroke: currentColor;
  stroke-width: 1.5;
  stroke-linecap: round;
  stroke-linejoin: round;
  transition: color 0.2s ease, transform 0.2s ease;
}

.direction-link:hover {
  border-color: #9dcdef;
  background: #1b3b51;
}

.direction-link:hover .direction-arrow {
  color: #ff996c;
  transform: translate(2px, -2px);
}

.direction-link:focus-visible,
.all-services:focus-visible {
  outline: 3px solid #ff996c;
  outline-offset: 4px;
}

@media (max-width: 980px) {
  .direction-link {
    grid-template-columns: minmax(0, 1fr) 18px;
    gap: 12px;
    padding: 16px;
  }

  .direction-copy {
    grid-column: 1 / -1;
    grid-row: 2;
  }

  .direction-arrow {
    grid-column: 2;
    grid-row: 1;
    width: 18px;
    height: 18px;
  }
}

@media (max-width: 600px) {
  .directions-heading {
    margin-bottom: 10px;
  }

  .directions-heading p {
    font-size: 11px;
    letter-spacing: 0.06em;
  }

  .all-services {
    min-height: 36px;
    font-size: 12px;
  }

  .directions-links {
    gap: 8px;
  }

  .direction-link {
    gap: 12px 4px;
    padding: 14px 10px;
    border-radius: 8px;
  }

  .direction-icon {
    width: 28px;
    height: 28px;
  }

  .direction-title {
    max-width: 9ch;
    font-size: 14px;
    line-height: 1.3;
  }

  .direction-description {
    display: none;
  }

  .direction-arrow {
    width: 15px;
    height: 15px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .direction-link,
  .direction-arrow {
    transition: none;
  }
}
</style>
