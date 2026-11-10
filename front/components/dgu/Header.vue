<template>
<header class="header" :class="{ 'is-scrolled': scrolled }" data-header>
  <div class="header__inner">
    <a class="logo" href="#top" aria-label="Энергосистемы — на главную">
      <img v-bind="imageAttrs('/dgu/images/989cb57ad44591a6.png', { sizes: '258px', width: 480 })" alt="Энергосистемы — эксперты в сфере энергетики">
    </a>

    <nav class="nav" aria-label="Основное меню">
      <a href="#hero">Станции</a>
      <a href="#quiz">Расчёт</a>
      
      <a href="#process">Как работаем</a>
      
      <a href="#realized">Кейсы</a>
      <a href="#power">Каталог</a>
      <a href="#projects">Решения</a>
      
      <a href="#faq">Вопросы</a>
      <a href="#contacts">Контакты</a>
    </nav>

    <div class="contact">
      
      <a class="msg msg--max" href="https://max.ru/" aria-label="Написать в Max" target="_blank" rel="noopener">
        <svg viewBox="0 0 100 100" width="16" height="16" fill="#fff" aria-hidden="true"><path fill-rule="evenodd" clip-rule="evenodd" d="M50.76 0.26C78.29 0.26 99.89 22.6 99.89 50.15C99.89 77.7 77.61 99.49 51.02 99.49C41.59 99.49 37.01 98.16 29.65 92.95C29.14 92.59 28.45 92.68 28.02 93.14C22.36 99.18 7.85 103.43 7.19 95.18C7.19 80.79 0 71.45 0 49.88C0 21.55 23.22 0.26 50.76 0.26ZM51.53 24.81C38.46 24.13 28.26 33.2 26.01 47.38C24.15 59.13 27.45 73.45 30.28 74.18C31.48 74.48 34.36 72.28 36.46 70.3C36.85 69.93 37.45 69.86 37.91 70.15C41.18 72.15 44.88 73.65 48.96 73.86C62.37 74.56 74.26 64.06 74.96 50.65C75.66 37.23 64.94 25.5 51.53 24.8V24.81Z"/></svg>
      </a>
      <a class="msg msg--tg" href="https://t.me/" aria-label="Написать в Telegram" target="_blank" rel="noopener">
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 10l-4 4 6 6 4-16-18 7 4 2 2 6 3-4"/></svg>
      </a>
      <div class="phone">
        <PhoneLink class="phone__num calltracking-dgu" />
        <a class="phone__num" href="tel:+79253932789">+7 (925) 393-27-89</a>
        <span class="phone__note" data-status-box :class="{ 'is-off': !working }"><i class="phone__dot" aria-hidden="true"></i><span data-status>{{ working ? 'На связи, ответим за 30 минут' : 'Ответим утром, с 9:00' }}</span></span>
      </div>
    </div>

    <button class="btn-cta" type="button" data-callback-open @click="drawerOpen = false; requestCallback({})">Заказать звонок</button>

    <button class="burger" type="button" aria-label="Открыть меню"  :aria-expanded="drawerOpen" aria-controls="dgu-drawer" data-burger @click="drawerOpen = !drawerOpen">
      <span></span><span></span><span></span>
    </button>
  </div>

  <div class="drawer" id="dgu-drawer" :hidden="!drawerOpen" data-drawer @click="closeDrawerOnLink">
    <nav aria-label="Меню для телефона">
      <a href="#hero">Станции</a>
      <a href="#quiz">Расчёт</a>
      
      <a href="#process">Как работаем</a>
      
      <a href="#realized">Кейсы</a>
      <a href="#power">Каталог</a>
      <a href="#projects">Решения</a>
      
      <a href="#faq">Вопросы</a>
      <a href="#contacts">Контакты</a>
    </nav>
    <div class="drawer__contacts">
      <PhoneLink class="calltracking-dgu" />
      <a href="tel:+79253932789">+7 (925) 393-27-89</a>
      <a href="mailto:sales@e-systems.su">sales@e-systems.su</a>
    </div>
  </div>
</header>
</template>

<script setup>
import { imageAttrs } from '~/utils/responsiveImage.js'
const emit = defineEmits(['callback'])
const requestCallback = payload => emit('callback', payload)

defineProps({ working: Boolean, scrolled: Boolean })
const drawerOpen = ref(false)
const closeDrawerOnLink = event => { if (event.target.closest('a')) drawerOpen.value = false }
const onKey = event => { if (event.key === 'Escape') drawerOpen.value = false }
const onResize = () => { if (window.innerWidth > 1240) drawerOpen.value = false }
onMounted(() => { document.addEventListener('keydown', onKey); window.addEventListener('resize', onResize) })
onBeforeUnmount(() => { document.removeEventListener('keydown', onKey); window.removeEventListener('resize', onResize) })
</script>
