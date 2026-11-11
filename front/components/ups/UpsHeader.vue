<template>
<header class="header" :class="{ 'is-scrolled': scrolled }" data-header>
  <div class="header__inner">
    <a class="logo" href="#top" aria-label="Энергосистемы — на главную">
      <img v-bind="imageAttrs('/ups/logo.png', { sizes: '258px', width: 480 })" alt="Энергосистемы — эксперты в сфере энергетики">
    </a>

    <!-- пункты ведут к блокам, которые появятся по одному; пока якоря без цели -->
    <nav class="nav" aria-label="Основное меню">
      <a href="#audience">Преимущества</a>
      <a href="#process">Как работаем</a>
      <a href="#prices">Цены</a>
      <a href="#projects">Объекты</a>
      <a href="#guarantees">Гарантии</a>
      <a href="#contacts">Контакты</a>
      <div class="nav__more" data-more>
        <button class="nav__more-btn" type="button" :aria-expanded="moreOpen" aria-controls="more-menu" data-more-btn @click.stop="moreOpen = !moreOpen">
          Ещё
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>
        </button>
        <div class="nav__more-list" id="more-menu" :hidden="!moreOpen">
          <a href="#service">Сервис и обслуживание</a>
        </div>
      </div>
    </nav>

    <div class="contact">
      <a class="msg msg--max" href="https://max.ru/u/f9LHodD0cOJCw4fN9Gj-ycqkpHsw_5xGMut54TdCKqJKGmxkmJn9m-bpd58" aria-label="Написать в Max" target="_blank" rel="noopener">
        <svg viewBox="0 0 100 100" width="16" height="16" fill="#fff" aria-hidden="true"><path fill-rule="evenodd" clip-rule="evenodd" d="M50.76 0.26C78.29 0.26 99.89 22.6 99.89 50.15C99.89 77.7 77.61 99.49 51.02 99.49C41.59 99.49 37.01 98.16 29.65 92.95C29.14 92.59 28.45 92.68 28.02 93.14C22.36 99.18 7.85 103.43 7.19 95.18C7.19 80.79 0 71.45 0 49.88C0 21.55 23.22 0.26 50.76 0.26ZM51.53 24.81C38.46 24.13 28.26 33.2 26.01 47.38C24.15 59.13 27.45 73.45 30.28 74.18C31.48 74.48 34.36 72.28 36.46 70.3C36.85 69.93 37.45 69.86 37.91 70.15C41.18 72.15 44.88 73.65 48.96 73.86C62.37 74.56 74.26 64.06 74.96 50.65C75.66 37.23 64.94 25.5 51.53 24.8V24.81Z"/></svg>
      </a>
      <a class="msg msg--tg" href="https://t.me/+79253932789" aria-label="Написать в Telegram" target="_blank" rel="noopener">
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 10l-4 4 6 6 4-16-18 7 4 2 2 6 3-4"/></svg>
      </a>
      <div class="phone">
        <PhoneLink class="phone__num calltracking-ups" />
        <a class="phone__num" href="tel:+79253932789">+7 (925) 393-27-89</a>
        <span class="phone__note" data-status-box :class="{ 'is-off': !workingHours }"><i class="phone__dot" aria-hidden="true"></i><span data-status>{{ workingHours ? 'На связи, ответим за 30 минут' : 'Ответим утром, с 9:00' }}</span></span>
      </div>
    </div>

    <button class="btn-cta" type="button" data-callback-open @click="openCallback({ title: $event.currentTarget.dataset.callbackTitle, text: $event.currentTarget.dataset.callbackText })">Заказать звонок</button>

    <button class="burger" type="button" aria-label="Открыть меню" :aria-expanded="drawerOpen" aria-controls="drawer" data-burger @click="drawerOpen = !drawerOpen">
      <span></span><span></span><span></span>
    </button>
  </div>

  <!-- меню на узких экранах: все разделы целиком -->
  <div class="drawer" id="drawer" :hidden="!drawerOpen" data-drawer @click="drawerOpen = false">
    <nav aria-label="Меню для телефона">
      <a href="#audience">Преимущества</a>
      <a href="#process">Как работаем</a>
      <a href="#prices">Цены</a>
      <a href="#projects">Объекты</a>
      <a href="#service">Сервис и обслуживание</a>
      <a href="#guarantees">Гарантии</a>
      <a href="#contacts">Контакты</a>
    </nav>
    <div class="drawer__contacts">
      <PhoneLink class="calltracking-ups" />
      <a href="tel:+79253932789">+7 (925) 393-27-89</a>
      <a href="mailto:sales@e-systems.su">sales@e-systems.su</a>
    </div>
  </div>
</header>
</template>

<script setup>
import { imageAttrs } from '~/utils/responsiveImage.js'
const props = defineProps({ workingHours: Boolean, scrolled: Boolean })
const launchCallback = inject('upsCallback')
const moreOpen = ref(false)
const drawerOpen = ref(false)
function openCallback(options) { moreOpen.value = false; drawerOpen.value = false; launchCallback(options) }
function closeMenus(event) {
  if (event.type === 'keydown' && event.key !== 'Escape') return
  if (event.type === 'click' && event.target.closest('[data-more]')) return
  moreOpen.value = false
  if (event.type !== 'click') drawerOpen.value = false
}
function resize() { if (window.innerWidth > 1240) drawerOpen.value = false }
onMounted(() => { document.addEventListener('click', closeMenus); document.addEventListener('keydown', closeMenus); window.addEventListener('resize', resize) })
onBeforeUnmount(() => { document.removeEventListener('click', closeMenus); document.removeEventListener('keydown', closeMenus); window.removeEventListener('resize', resize) })
</script>
