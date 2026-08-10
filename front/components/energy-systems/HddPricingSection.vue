<template>
  <section class="pricing-section" aria-labelledby="hdd-pricing-title">
    <div class="pricing-heading">
      <div>
        <p class="pricing-kicker">Расценки ГНБ · 2026</p>
        <h3 id="hdd-pricing-title">Ориентир по стоимости прокладки</h3>
        <p class="pricing-lead">
          Цены указаны за один погонный метр работ, без стоимости трубы.
          Итоговая смета зависит от трассы, грунта и условий на объекте.
        </p>
      </div>
      <div class="pricing-unit" aria-label="Цены указаны в рублях за погонный метр">
        <strong>₽</strong>
        <span>за 1 п. м.</span>
      </div>
    </div>

    <div class="pricing-tabs" role="tablist" aria-label="Тип прокладки">
      <button
        v-for="tab in tabs"
        :id="`pricing-tab-${tab.id}`"
        :key="tab.id"
        type="button"
        role="tab"
        :aria-selected="activeTab === tab.id"
        :aria-controls="`pricing-panel-${tab.id}`"
        :class="{ active: activeTab === tab.id }"
        @click="activeTab = tab.id"
      >
        <span>{{ tab.label }}</span>
        <small>{{ tab.hint }}</small>
      </button>
    </div>

    <div
      v-if="activeTab === 'single'"
      id="pricing-panel-single"
      class="pricing-panel"
      role="tabpanel"
      aria-labelledby="pricing-tab-single"
    >
      <p class="scroll-hint">Проведите по таблице влево, чтобы увидеть все цены</p>
      <div class="table-scroll" tabindex="0" aria-label="Таблица расценок для одной трубы">
        <table>
          <caption>Стоимость прокладки одной трубы методом ГНБ</caption>
          <thead>
            <tr>
              <th scope="col">Диаметр трубы</th>
              <th scope="col">До 250 м</th>
              <th scope="col">Свыше 250 м</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in singlePipeRates" :key="row.diameter">
              <th scope="row"><strong>{{ row.diameter }}</strong> мм</th>
              <td>{{ formatPrice(row.upTo250) }}</td>
              <td>{{ formatPrice(row.over250) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div
      v-else
      id="pricing-panel-bundle"
      class="pricing-panel"
      role="tabpanel"
      aria-labelledby="pricing-tab-bundle"
    >
      <p class="scroll-hint">Проведите по таблице влево, чтобы увидеть все цены</p>
      <div class="table-scroll" tabindex="0" aria-label="Таблица расценок для пучка труб">
        <table class="bundle-table">
          <caption>Стоимость прокладки пучка труб методом ГНБ</caption>
          <thead>
            <tr>
              <th scope="col">Количество труб</th>
              <th v-for="diameter in bundleDiameters" :key="diameter" scope="col">
                Ø {{ diameter }} мм
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in bundleRates" :key="row.count">
              <th scope="row">{{ row.count }} шт.</th>
              <td v-for="diameter in bundleDiameters" :key="diameter">
                <span v-if="typeof row.rates[diameter] === 'number'">
                  {{ formatPrice(row.rates[diameter]) }}
                </span>
                <button
                  v-else-if="row.rates[diameter] === 'Уточнить'"
                  class="clarify-rate"
                  type="button"
                  @click="$emit('request-estimate')"
                >
                  Уточнить
                </button>
                <span v-else class="empty-rate" aria-label="Расценка не указана">—</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p class="pricing-data-note">
        Для 7 труб Ø 110 мм значение в исходном прайсе требует проверки, поэтому точную цену подтвердит инженер.
      </p>
    </div>

    <div class="pricing-footer">
      <div class="pricing-conditions">
        <p>В стоимость не входят</p>
        <ul>
          <li v-for="condition in exclusions" :key="condition">{{ condition }}</li>
        </ul>
      </div>

      <div class="pricing-action">
        <p>
          <strong>Минимальный заказ уточняется.</strong>
          Пришлите диаметр, длину и адрес объекта — подготовим расчет.
        </p>
        <button type="button" @click="$emit('request-estimate')">
          Рассчитать по объекту
        </button>
      </div>
    </div>

    <p class="vat-note">Все указанные цены включают НДС 22%.</p>
  </section>
</template>

<script setup>
defineEmits(['request-estimate'])

const activeTab = ref('single')

const tabs = [
  { id: 'single', label: 'Одна труба', hint: 'по диаметру и длине' },
  { id: 'bundle', label: 'Пучок труб', hint: 'от 2 до 10 труб' },
]

const singlePipeRates = [
  { diameter: 110, upTo250: 2900, over250: 2700 },
  { diameter: 160, upTo250: 3500, over250: 3100 },
  { diameter: 225, upTo250: 4500, over250: 3950 },
  { diameter: 315, upTo250: 5500, over250: 5100 },
  { diameter: 400, upTo250: 8850, over250: 8000 },
  { diameter: 500, upTo250: 11350, over250: 10300 },
  { diameter: 630, upTo250: 14000, over250: 12900 },
  { diameter: 710, upTo250: 20300, over250: 19200 },
  { diameter: 800, upTo250: 24000, over250: 22400 },
]

const bundleDiameters = [63, 110, 160, 225]

const bundleRates = [
  { count: 2, rates: { 63: 3400, 110: 4700, 160: 5500, 225: 9800 } },
  { count: 3, rates: { 63: 4200, 110: 5400, 160: 6600, 225: 12600 } },
  { count: 4, rates: { 63: 4900, 110: 7800, 160: 9500, 225: 15000 } },
  { count: 5, rates: { 63: 5700, 110: 9100, 160: 11350, 225: 17400 } },
  { count: 6, rates: { 63: 6700, 110: 10700, 160: 14400, 225: 19300 } },
  { count: 7, rates: { 63: 7300, 110: 'Уточнить', 160: 15200, 225: null } },
  { count: 8, rates: { 63: 8200, 110: 14400, 160: 17400, 225: null } },
  { count: 9, rates: { 63: 9000, 110: 15000, 160: null, 225: null } },
  { count: 10, rates: { 63: 10600, 110: 16100, 160: null, 225: null } },
]

const exclusions = [
  'перебазировка техники',
  'подвоз воды и утилизация бурового раствора',
  'обеспечение электроэнергией',
  'трубы и их сварка',
  'ПОДД, временные дороги и площадки',
]

const priceFormatter = new Intl.NumberFormat('ru-RU', {
  style: 'currency',
  currency: 'RUB',
  maximumFractionDigits: 0,
})

const formatPrice = (value) => priceFormatter.format(value)
</script>

<style scoped>
.pricing-section {
  margin: 8px 0 40px;
  overflow: hidden;
  border: 1px solid #d8e4ed;
  border-radius: 8px;
  background: #ffffff;
  box-shadow: 0 18px 42px rgba(16, 34, 52, 0.1);
}

.pricing-heading {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 24px;
  align-items: center;
  padding: 30px;
  color: #ffffff;
  background: #102234;
}

.pricing-kicker {
  margin: 0 0 10px;
  color: #f05a28;
  font-size: 12px;
  font-weight: 850;
  letter-spacing: 0.08em;
  line-height: 1.2;
  text-transform: uppercase;
}

.pricing-heading h3 {
  margin: 0;
  color: #ffffff;
  font-size: 28px;
  font-weight: 800;
  line-height: 1.18;
}

.pricing-lead {
  max-width: 650px;
  margin: 12px 0 0;
  color: rgba(255, 255, 255, 0.72);
  font-size: 15px;
  line-height: 1.6;
}

.pricing-unit {
  min-width: 116px;
  display: grid;
  justify-items: center;
  padding: 18px 20px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.08);
}

.pricing-unit strong {
  color: #f05a28;
  font-size: 42px;
  line-height: 0.9;
}

.pricing-unit span {
  margin-top: 8px;
  color: rgba(255, 255, 255, 0.78);
  font-size: 12px;
  font-weight: 700;
  white-space: nowrap;
}

.pricing-tabs {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1px;
  padding: 1px;
  background: #d8e4ed;
}

.pricing-tabs button {
  min-height: 74px;
  display: grid;
  align-content: center;
  gap: 4px;
  padding: 14px 22px;
  border: 0;
  border-bottom: 3px solid transparent;
  background: #f5f8fa;
  color: #40566a;
  text-align: left;
  cursor: pointer;
  transition: background-color 0.18s ease, color 0.18s ease, border-color 0.18s ease;
}

.pricing-tabs button:hover {
  background: #ffffff;
  color: #102234;
}

.pricing-tabs button.active {
  border-bottom-color: #f05a28;
  background: #ffffff;
  color: #102234;
}

.pricing-tabs span {
  font-size: 17px;
  font-weight: 800;
}

.pricing-tabs small {
  font-size: 12px;
  font-weight: 600;
  opacity: 0.7;
}

.pricing-tabs button:focus-visible,
.table-scroll:focus-visible,
.pricing-action button:focus-visible,
.clarify-rate:focus-visible {
  outline: 3px solid rgba(240, 90, 40, 0.34);
  outline-offset: -3px;
}

.pricing-panel {
  padding: 24px 30px 8px;
}

.scroll-hint {
  display: none;
}

.table-scroll {
  overflow-x: auto;
  border: 1px solid #d8e4ed;
  border-radius: 8px;
  scrollbar-color: #9db0bf #eef3f6;
}

table {
  width: 100%;
  min-width: 560px;
  border-collapse: collapse;
  color: #1f3447;
  font-size: 14px;
}

caption {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
}

th,
td {
  padding: 13px 16px;
  border-bottom: 1px solid #e2eaf0;
  text-align: right;
  white-space: nowrap;
}

thead th {
  background: #edf3f7;
  color: #40566a;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.02em;
  text-transform: uppercase;
}

thead th:first-child,
tbody th {
  text-align: left;
}

tbody th {
  color: #40566a;
  font-weight: 600;
}

tbody th strong {
  color: #102234;
  font-size: 16px;
}

tbody td {
  color: #102234;
  font-weight: 750;
}

tbody tr:last-child th,
tbody tr:last-child td {
  border-bottom: 0;
}

tbody tr:hover {
  background: #fff7f3;
}

.bundle-table {
  min-width: 710px;
}

.clarify-rate {
  padding: 4px 7px;
  border: 1px solid rgba(240, 90, 40, 0.42);
  border-radius: 4px;
  background: #fff7f3;
  color: #c4451c;
  font: inherit;
  font-size: 12px;
  font-weight: 800;
  cursor: pointer;
}

.empty-rate {
  color: #9aabb8;
  font-weight: 500;
}

.pricing-data-note {
  margin: 12px 2px 0;
  color: #6b7f90;
  font-size: 12px;
  line-height: 1.5;
}

.pricing-footer {
  display: grid;
  grid-template-columns: minmax(0, 1.12fr) minmax(260px, 0.88fr);
  gap: 20px;
  padding: 22px 30px 28px;
}

.pricing-conditions,
.pricing-action {
  padding: 22px;
  border-radius: 8px;
}

.pricing-conditions {
  background: #f5f8fa;
  border: 1px solid #e0e8ee;
}

.pricing-conditions p {
  margin: 0 0 12px;
  color: #102234;
  font-size: 14px;
  font-weight: 800;
}

.pricing-conditions ul {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px 18px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.pricing-conditions li {
  position: relative;
  padding-left: 14px;
  color: #5f7384;
  font-size: 13px;
  line-height: 1.45;
}

.pricing-conditions li::before {
  content: '';
  position: absolute;
  top: 0.62em;
  left: 0;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: #f05a28;
}

.pricing-action {
  display: grid;
  align-content: space-between;
  gap: 18px;
  background: #102234;
}

.pricing-action p {
  margin: 0;
  color: rgba(255, 255, 255, 0.72);
  font-size: 13px;
  line-height: 1.55;
}

.pricing-action strong {
  display: block;
  margin-bottom: 4px;
  color: #ffffff;
  font-size: 15px;
}

.pricing-action button {
  min-height: 46px;
  padding: 12px 18px;
  border: 0;
  border-radius: 8px;
  background: #f05a28;
  color: #ffffff;
  font-size: 14px;
  font-weight: 800;
  cursor: pointer;
  transition: background-color 0.18s ease, transform 0.18s ease;
}

.pricing-action button:hover {
  background: #d84618;
  transform: translateY(-1px);
}

.vat-note {
  margin: -12px 30px 26px;
  color: #6b7f90;
  font-size: 12px;
  line-height: 1.5;
}

@media (max-width: 720px) {
  .pricing-heading {
    grid-template-columns: 1fr;
    padding: 24px 20px;
  }

  .pricing-heading h3 {
    font-size: 24px;
  }

  .pricing-unit {
    min-width: 0;
    grid-template-columns: auto auto;
    justify-content: start;
    justify-items: start;
    align-items: baseline;
    gap: 10px;
    padding: 12px 14px;
  }

  .pricing-unit strong {
    font-size: 28px;
  }

  .pricing-unit span {
    margin: 0;
  }

  .pricing-tabs button {
    min-height: 68px;
    padding: 12px 14px;
  }

  .pricing-tabs span {
    font-size: 15px;
  }

  .pricing-panel {
    padding: 18px 14px 6px;
  }

  .scroll-hint {
    display: block;
    margin: 0 0 9px;
    color: #6b7f90;
    font-size: 12px;
    line-height: 1.4;
  }

  thead th:first-child,
  tbody th {
    position: sticky;
    left: 0;
    z-index: 1;
  }

  thead th:first-child {
    z-index: 2;
  }

  tbody th {
    background: #ffffff;
  }

  .pricing-footer {
    grid-template-columns: 1fr;
    padding: 18px 14px 24px;
  }

  .pricing-conditions ul {
    grid-template-columns: 1fr;
  }

  .vat-note {
    margin: -8px 14px 22px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .pricing-tabs button,
  .pricing-action button {
    transition: none;
  }
}
</style>
