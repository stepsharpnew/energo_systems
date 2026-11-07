<template>
<section class="section section--dark process" id="process" data-process ref="section" @keydown.right.prevent="move(1)" @keydown.left.prevent="move(-1)">
  <div class="container">
    <h2 class="section__title">
      <span class="muted">Шесть этапов от выезда инженера —</span>
      до работающего резерва на объекте
    </h2>
    <div class="process__head">
      <p class="process__lead">Проектирование, поставка, монтаж и обслуживание — одна команда. Состав работ согласуем по итогам технического аудита объекта.</p>
      <div class="process__ctrl">
        <button class="ctrl" type="button" data-move="-1" @click="move(-1)" aria-label="Предыдущий шаг"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 12H5M11 6l-6 6 6 6"/></svg></button>
        <button class="ctrl" type="button" data-move="1" @click="move(1)" aria-label="Следующий шаг"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg></button>
      </div>
    </div>

    <div class="stage" data-stage ref="stage" @pointerdown="pointerDown" @pointerup="pointerUp" @pointercancel="pointerCancel" @scroll.passive="onStageScroll">
      <article class="chapter" :class="{ 'is-active': chapter === 0, 'is-open': opened === 0 }" data-chapter="0" @click="selectChapter(0)" @focus="focusChapter($event, 0)" data-pos="top" tabindex="0" aria-label="Технический аудит и проектирование">
        <img v-bind="imageAttrs('/ups/process-audit.webp', { sizes: '(max-width: 768px) 100vw, 50vw', width: 800 })" alt="Инженеры с чертежами у дома" loading="lazy">
        <i class="chapter__shade" aria-hidden="true"></i>
        <div class="chapter__rail" aria-hidden="true"><span class="chapter__no">01–02</span><span class="chapter__vname">Технический аудит и проектирование</span></div>
        <div class="chapter__card">
          <div class="chapter__bar" @click.stop="toggleChapter(0)"><h3 class="chapter__title">Технический аудит и проектирование</h3><button class="chapter__tg" type="button" :aria-expanded="opened === 0"><span class="chapter__tg-t">{{ opened === 0 ? 'Свернуть' : 'Что внутри' }}</span><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg></button></div>
          <ol class="steps">
            <li class="step" :class="{ 'is-current': current === 0 }" data-step="0"><button class="step__trigger" type="button" :aria-pressed="current === 0" aria-label="Открыть этап: Выезд и технический аудит" @click.stop="selectStep(0, true)">
              <span class="step__no">1</span>
              <div><b class="step__title">Выезд и технический аудит</b><div class="step__more"><div><p class="step__text">Инженер проверяет ввод и ВРУ, определяет точку подключения и место установки, замеряет фактическую нагрузку.</p><p class="step__get">Вы получаете: Перечень нагрузок и схема размещения</p></div></div></div>
            </button></li>
            <li class="step" :class="{ 'is-current': current === 1 }" data-step="1"><button class="step__trigger" type="button" :aria-pressed="current === 1" aria-label="Открыть этап: Проектирование и расчёт нагрузок" @click.stop="selectStep(1, true)">
              <span class="step__no">2</span>
              <div><b class="step__title">Проектирование и расчёт нагрузок</b><div class="step__more"><div><p class="step__text">Рассчитываем мощность ИБП и ёмкость АКБ, разрабатываем схему подключения.</p><p class="step__get">Вы получаете: Проект и смета</p></div></div></div>
            </button></li>
          </ol>
        </div>
      </article>
      <article class="chapter" :class="{ 'is-active': chapter === 1, 'is-open': opened === 1 }" data-chapter="1" @click="selectChapter(1)" @focus="focusChapter($event, 1)" tabindex="0" aria-label="Комплектация и поставка">
        <img v-bind="imageAttrs('/ups/process-delivery.webp', { sizes: '(max-width: 768px) 100vw, 50vw', width: 800 })" alt="Бригада несёт оборудование в дом" loading="lazy">
        <i class="chapter__shade" aria-hidden="true"></i>
        <div class="chapter__rail" aria-hidden="true"><span class="chapter__no">03</span><span class="chapter__vname">Комплектация и поставка</span></div>
        <div class="chapter__card">
          <div class="chapter__bar" @click.stop="toggleChapter(1)"><h3 class="chapter__title">Комплектация и поставка</h3><button class="chapter__tg" type="button" :aria-expanded="opened === 1"><span class="chapter__tg-t">{{ opened === 1 ? 'Свернуть' : 'Что внутри' }}</span><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg></button></div>
          <ol class="steps">
            <li class="step" :class="{ 'is-current': current === 2 }" data-step="2"><button class="step__trigger" type="button" :aria-pressed="current === 2" aria-label="Открыть этап: Поставка оборудования" @click.stop="selectStep(2, true)">
              <span class="step__no">3</span>
              <div><b class="step__title">Поставка оборудования</b><div class="step__more"><div><p class="step__text">Доставляем оборудование на объект, проверяем комплектность по спецификации до монтажа.</p><p class="step__get">Вы получаете: Оборудование на объекте по спецификации</p></div></div></div>
            </button></li>
          </ol>
        </div>
      </article>
      <article class="chapter" :class="{ 'is-active': chapter === 2, 'is-open': opened === 2 }" data-chapter="2" @click="selectChapter(2)" @focus="focusChapter($event, 2)" tabindex="0" aria-label="Монтаж и пусконаладочные работы">
        <img v-bind="imageAttrs('/ups/process-installation.webp', { sizes: '(max-width: 768px) 100vw, 50vw', width: 800 })" alt="Монтажники устанавливают систему ИБП на стене" loading="lazy">
        <i class="chapter__shade" aria-hidden="true"></i>
        <div class="chapter__rail" aria-hidden="true"><span class="chapter__no">04–05</span><span class="chapter__vname">Монтаж и пусконаладочные работы</span></div>
        <div class="chapter__card">
          <div class="chapter__bar" @click.stop="toggleChapter(2)"><h3 class="chapter__title">Монтаж и пусконаладочные работы</h3><button class="chapter__tg" type="button" :aria-expanded="opened === 2"><span class="chapter__tg-t">{{ opened === 2 ? 'Свернуть' : 'Что внутри' }}</span><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg></button></div>
          <ol class="steps">
            <li class="step" :class="{ 'is-current': current === 3 }" data-step="3"><button class="step__trigger" type="button" :aria-pressed="current === 3" aria-label="Открыть этап: Монтажные работы" @click.stop="selectStep(3, true)">
              <span class="step__no">4</span>
              <div><b class="step__title">Монтажные работы</b><div class="step__more"><div><p class="step__text">Монтируем инверторы, АКБ и байпасный щит, прокладываем кабельные линии.</p><p class="step__get">Вы получаете: Система, смонтированная по проекту</p></div></div></div>
            </button></li>
            <li class="step" :class="{ 'is-current': current === 4 }" data-step="4"><button class="step__trigger" type="button" :aria-pressed="current === 4" aria-label="Открыть этап: Запуск и сдача объекта" @click.stop="selectStep(4, true)">
              <span class="step__no">5</span>
              <div><b class="step__title">Запуск и сдача объекта</b><div class="step__more"><div><p class="step__text">Выполняем пусконаладку, испытываем под нагрузкой, обучаем эксплуатации.</p><p class="step__get">Вы получаете: Работающий резерв и комплект документации</p></div></div></div>
            </button></li>
          </ol>
        </div>
      </article>
    
      <article class="chapter" :class="{ 'is-active': chapter === 3, 'is-open': opened === 3 }" data-chapter="3" @click="selectChapter(3)" @focus="focusChapter($event, 3)" tabindex="0" aria-label="Обслуживание">
        <img data-same="img-room" v-bind="imageAttrs('/ups/configuration-system.webp', { sizes: '(max-width: 768px) 100vw, 50vw', width: 800 })" alt="Оборудование резервного питания в техническом помещении дома" loading="lazy">
        <i class="chapter__shade" aria-hidden="true"></i>
        <div class="chapter__rail" aria-hidden="true"><span class="chapter__no">06</span><span class="chapter__vname">Обслуживание</span></div>
        <div class="chapter__card">
          <div class="chapter__bar" @click.stop="toggleChapter(3)"><h3 class="chapter__title">Обслуживание</h3><button class="chapter__tg" type="button" :aria-expanded="opened === 3"><span class="chapter__tg-t">{{ opened === 3 ? 'Свернуть' : 'Что внутри' }}</span><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg></button></div>
          <ol class="steps">
            <li class="step" :class="{ 'is-current': current === 5 }" data-step="5"><button class="step__trigger" type="button" :aria-pressed="current === 5" aria-label="Открыть этап: Сервисное обслуживание" @click.stop="selectStep(5, true)">
              <span class="step__no">6</span>
              <div><b class="step__title">Сервисное обслуживание</b><div class="step__more"><div><p class="step__text">Проверяем состояние батарей, тестируем автоматику, при наличии ДГУ — его готовность. Поддержка и мониторинг — по регламенту.</p><p class="step__get">Вы получаете: План обслуживания и порядок обращения</p></div></div></div>
            </button></li>
          </ol>
        </div>
      </article>    </div>

    <div class="track" data-track>
      <i class="track__line" aria-hidden="true"><b data-track-fill :style="{ width: `${current / 5 * 100}%` }"></b></i>
      <ol class="track__list">
        <li><button class="track__btn" :class="{ 'is-active': current === 0, 'is-done': current > 0 }" type="button" data-go="0" @click="selectStep(0, true)"><i class="track__dot" aria-hidden="true"></i><span>Выезд и технический аудит</span></button></li>
        <li><button class="track__btn" :class="{ 'is-active': current === 1, 'is-done': current > 1 }" type="button" data-go="1" @click="selectStep(1, true)"><i class="track__dot" aria-hidden="true"></i><span>Проектирование и расчёт нагрузок</span></button></li>
        <li><button class="track__btn" :class="{ 'is-active': current === 2, 'is-done': current > 2 }" type="button" data-go="2" @click="selectStep(2, true)"><i class="track__dot" aria-hidden="true"></i><span>Поставка оборудования</span></button></li>
        <li><button class="track__btn" :class="{ 'is-active': current === 3, 'is-done': current > 3 }" type="button" data-go="3" @click="selectStep(3, true)"><i class="track__dot" aria-hidden="true"></i><span>Монтажные работы</span></button></li>
        <li><button class="track__btn" :class="{ 'is-active': current === 4, 'is-done': current > 4 }" type="button" data-go="4" @click="selectStep(4, true)"><i class="track__dot" aria-hidden="true"></i><span>Запуск и сдача объекта</span></button></li>
        <li><button class="track__btn" :class="{ 'is-active': current === 5, 'is-done': current > 5 }" type="button" data-go="5" @click="selectStep(5, true)"><i class="track__dot" aria-hidden="true"></i><span>Обслуживание</span></button></li>
      </ol>
    </div>

    <div class="process__cta">
      <button class="btn-pill" type="button" data-callback-open @click="openCallback({ title: $event.currentTarget.dataset.callbackTitle, text: $event.currentTarget.dataset.callbackText })" data-callback-title="Выезд инженера на объект" data-callback-text="Оставьте контакт: инженер согласует время выезда и проведёт технический аудит объекта.">
        <span>Вызвать инженера на объект</span>
        <span class="btn-pill__icon" aria-hidden="true"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg></span>
      </button>
    </div>
  </div>
</section>
</template>

<script setup>
import { imageAttrs } from '~/utils/responsiveImage.js'
import { useUpsVisibility } from '~/composables/useUpsVisibility.js'
const openCallback = inject('upsCallback')
const section = ref(null)
const stage = ref(null)
const current = ref(0)
const opened = ref(-1)
const chapterOf = [0, 0, 1, 2, 2, 3]
const chapter = computed(() => chapterOf[current.value])
const { visible, reduced } = useUpsVisibility(section)
let timer, scrollTimer, downX = null, dragAt = 0
function wide() { return window.innerWidth >= 901 }
function stop() { clearInterval(timer) }
function play() { stop(); if (visible.value && !reduced.value) timer = setInterval(() => move(1), 4000) }
function scrollChapter(index) {
  const card = stage.value?.children[index]
  if (card) stage.value.scrollTo({ left: card.offsetLeft - (stage.value.clientWidth - card.offsetWidth) / 2, behavior: reduced.value ? 'auto' : 'smooth' })
}
function toggleChapter(index) { opened.value = opened.value === index ? -1 : index }
function selectStep(index, expand = false) { if (chapterOf[index] !== chapter.value) opened.value = -1; current.value = index; if (expand) opened.value = chapter.value; if (!wide()) scrollChapter(chapter.value); play() }
function selectChapter(index) { if (Date.now() - dragAt < 400) return; selectStep(chapterOf.indexOf(index)) }
function focusChapter(event, index) { if (event.currentTarget.matches(':focus-visible')) selectChapter(index) }
function move(direction) {
  if (wide()) selectStep((current.value + direction + 6) % 6)
  else selectStep(chapterOf.indexOf((chapter.value + direction + 4) % 4))
}
function pointerDown(event) { downX = event.clientX; stop() }
function pointerCancel() { downX = null; play() }
function pointerUp(event) {
  if (downX !== null && wide() && Math.abs(event.clientX - downX) > 60) { dragAt = Date.now(); move(event.clientX < downX ? 1 : -1) }
  pointerCancel()
}
function onStageScroll() {
  if (wide()) return
  clearTimeout(scrollTimer)
  scrollTimer = setTimeout(() => {
    if (!stage.value) return
    const mid = stage.value.scrollLeft + stage.value.clientWidth / 2
    const cards = [...stage.value.children]
    let best = 0
    cards.forEach((card, index) => { if (Math.abs(card.offsetLeft + card.offsetWidth / 2 - mid) < Math.abs(cards[best].offsetLeft + cards[best].offsetWidth / 2 - mid)) best = index })
    current.value = chapterOf.indexOf(best)
  }, 120)
}
function resize() { if (wide()) stage.value?.scrollTo({ left: 0 }); play() }
watch([visible, reduced], () => { if (visible.value) { current.value = 0; if (stage.value) stage.value.scrollTo({ left: 0 }) } play() })
onMounted(() => window.addEventListener('resize', resize))
onBeforeUnmount(() => { stop(); clearTimeout(scrollTimer); window.removeEventListener('resize', resize) })
</script>
