<template>
<section class="section offers" id="offers" data-offers ref="section" :class="{ 'is-armed': !reduced, 'is-in': revealed }">
  <div class="container">
    <h2 class="section__title">
      <span class="muted">Наши предложения —</span>
      чтобы старт был проще и выгоднее
    </h2>

    <div class="of">
      <div class="of__cards">
        <article class="of__card of__card--hot" style="--i:0">
          <span class="of__badge">Акция</span>
          <svg class="of__ic" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path class="of__draw" d="M10 14h20l8 8v18H10z"/><path class="of__draw" d="M30 14v8h8M17 30l5 5 9-10"/></svg>
          <h3 class="of__t">Проект — в подарок</h3>
          <p class="of__d">При заказе ДГУ под ключ разрабатываем проект электроснабжения и схему АВР без отдельной оплаты.</p>
          <button class="of__btn" type="button" data-callback-open data-callback-title="Предложение: проект в подарок" data-callback-text="Оставьте контакт: инженер расскажет, на каких условиях проект электроснабжения входит в заказ под ключ." @click="requestCallback({&quot;title&quot;: &quot;Предложение: проект в подарок&quot;, &quot;text&quot;: &quot;Оставьте контакт: инженер расскажет, на каких условиях проект электроснабжения входит в заказ под ключ.&quot;})">Выбрать предложение<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg></button>
        </article>

        <article class="of__card" style="--i:1">
          <span class="of__badge of__badge--dark">Постоянным клиентам</span>
          <svg class="of__ic" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path class="of__draw" d="M24 8l4.8 10 10.7 1.3-7.9 7.4 2.1 10.6L24 31.9 14.3 37.3l2.1-10.6-7.9-7.4L19.2 18z"/></svg>
          <h3 class="of__t">Для своих — особые условия</h3>
          <p class="of__d">Повторные заказы, расширение системы и сервис для действующих клиентов — на выгодных условиях.</p>
          <button class="of__btn" type="button" data-callback-open data-callback-title="Предложение: условия для постоянных клиентов" data-callback-text="Оставьте контакт: расскажем об особых условиях для постоянных клиентов." @click="requestCallback({&quot;title&quot;: &quot;Предложение: условия для постоянных клиентов&quot;, &quot;text&quot;: &quot;Оставьте контакт: расскажем об особых условиях для постоянных клиентов.&quot;})">Узнать условия<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg></button>
        </article>

        <article class="of__card of__card--wide" style="--i:2">
          <span class="of__badge of__badge--dark">Всё под ключ</span>
          <div class="of__wide">
            <div>
              <h3 class="of__t">All inclusive</h3>
              <p class="of__d">Проектирование, поставка, монтаж, пусконаладка и сервис в одном договоре — удобнее и выгоднее, чем заказывать по частям. Одна команда отвечает за результат.</p>
            </div>
            <ul class="of__steps" aria-label="Что входит">
              <li>Проект</li><li>Поставка</li><li>Монтаж</li><li>Запуск</li><li>Сервис</li>
            </ul>
          </div>
          <button class="of__btn" type="button" data-callback-open data-callback-title="Предложение: All inclusive" data-callback-text="Оставьте контакт: рассчитаем решение под ключ и назовём условия." @click="requestCallback({&quot;title&quot;: &quot;Предложение: All inclusive&quot;, &quot;text&quot;: &quot;Оставьте контакт: рассчитаем решение под ключ и назовём условия.&quot;})">Рассчитать под ключ<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg></button>
        </article>
      </div>

      <figure class="of__photo">
        <img decoding="async" src="/dgu/images/76e878b0ba76e5aa.webp" alt="Сервисные инженеры в форме Энергосистем ведут пусконаладку ДГУ и шкафов ИБП" width="960" height="960" loading="lazy">
        <i class="of__glow" aria-hidden="true"></i>
        <span class="of__chip of__chip--1"><i></i>Под ключ</span>
        <span class="of__chip of__chip--2">Проект в подарок</span>
        <span class="of__chip of__chip--3">Один договор</span>
      </figure>
    </div>
  </div>
  
</section>
</template>

<script setup>
const emit = defineEmits(['callback'])
const requestCallback = payload => emit('callback', payload)
import { useDguVisibility } from '~/composables/useDguVisibility.js'
const props = defineProps({ reduced: Boolean })
const section = ref(null), revealed = ref(false)
const visible = useDguVisibility(section)
watch(visible, value => { if (value) revealed.value = true })
</script>
