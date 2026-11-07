<template>
<section class="hero-wrap" id="hero">
  <div class="hero" :class="{ 'is-blackout': phase === 'blackout', 'is-backup': phase === 'backup' }" data-hero>

    <div class="hero__bg" aria-hidden="true">
      <img v-bind="imageAttrs('/ups/hero-house.jpg', { sizes: '100vw', width: 1600 })" alt="" fetchpriority="high">
      <i class="hero__shade"></i>
    </div>

    <div class="hero__visual">
      <img class="hero__ibp" v-bind="imageAttrs('/ups/hero-system.jpg', { sizes: '100vw', width: 1600 })" alt="Система бесперебойного питания: инверторы, аккумуляторные модули и щит на стене" fetchpriority="high">
    </div>

    <!-- «живая» плашка: показывает, что делает система при отключении сети.
         TODO: время переключения на батарею не называем, пока заказчик не подтвердит -->
    <div class="hero__status" data-status-card role="status" aria-live="polite">
      <span class="hero__status-dot" aria-hidden="true"></span>
      <div><b data-status-title>{{ status.title }}</b><span data-status-text>{{ status.text }}</span></div>
    </div>

    <div class="hero__content">
      <ul class="hero__badges" aria-label="Коротко о нас">
        <li><b>с 2013 года</b> на рынке</li>
        <li><b>5000+</b> объектов</li>
        <li><b>Свой</b> отдел проектирования</li>
      </ul>

      <!-- TODO: «свет не гаснет» — подтвердить у заказчика время переключения на батарею для поставляемых моделей -->
      <h1 class="hero__title">
        <span class="h1-line">При отключении электричества дом продолжает жить в обычном режиме.</span>
        <span class="h1-line h1-line--mark"><span>Бесперебойное питание частного дома под ключ</span></span>
        <span class="h1-line">от расчёта до обслуживания</span>
      </h1>

      <p class="hero__lead">Рассчитаем нагрузку, подберём мощность ИБП и ёмкость АКБ под ваш объект. Москва и область.</p>

      <!-- TODO: подтвердить у заказчика, что состав «проект, поставка, монтаж, пусконаладка» относится к ИБП -->
      <ol class="usp">
        <li>Свой отдел проектирования: расчёт нагрузки и схема электроснабжения</li>
        <li>Один договор: проектирование, поставка, монтаж, запуск</li>
        <li>Цена фиксируется в договоре — без доплат по ходу</li>
      </ol>

      <div class="hero__cta">
        <a class="btn-pill" href="#quiz">
          <span>Рассчитать стоимость</span>
          <span class="btn-pill__icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>
          </span>
        </a>
        <!-- TODO: подтвердить «30 минут» и «выезд в течение суток» для ИБП (формулы взяты с e-systems.su) -->
        <p class="hero__offer"><b>Расчёт за 30 минут.</b> Выезд инженера — в течение суток</p>
      </div>
    </div>

    <div class="trust">
      <div class="trust__inner">
        <div class="trust__label">Нам доверяют:</div>
        <!-- TODO: заменить отрасли на реальные объекты по ИБП, когда заказчик подтвердит -->
        <div class="trust__item">
          <span class="trust__logo"><img v-bind="imageAttrs('/ups/hero-rosseti.png', { sizes: '160px', width: 480 })" alt=""></span>
          <div class="trust__text"><b>Россети</b><span>Электросетевой комплекс</span></div>
        </div>
        <div class="trust__item">
          <span class="trust__logo"><img v-bind="imageAttrs('/ups/hero-gazprom.png', { sizes: '160px', width: 480 })" alt=""></span>
          <div class="trust__text"><b>Газпром</b><span>Нефть и газ</span></div>
        </div>
        <div class="trust__item">
          <span class="trust__logo"><img v-bind="imageAttrs('/ups/hero-rzd.png', { sizes: '160px', width: 480 })" alt=""></span>
          <div class="trust__text"><b>РЖД</b><span>Железнодорожный транспорт</span></div>
        </div>
      </div>
    </div>
  </div>
</section>
</template>

<script setup>
import { imageAttrs } from '~/utils/responsiveImage.js'
const phase = ref('normal')
const statuses = { normal: { title: 'Сеть 220 В в норме', text: 'Дом питается от сети' }, blackout: { title: 'Сеть пропала', text: 'Внешнее питание отключено' }, backup: { title: 'Дом на резерве', text: 'Свет и розетки работают' } }
const status = computed(() => statuses[phase.value])
const timers = []
onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  timers.push(setTimeout(() => { phase.value = 'blackout' }, 1400), setTimeout(() => { phase.value = 'backup' }, 3400))
})
onBeforeUnmount(() => timers.forEach(clearTimeout))
</script>
