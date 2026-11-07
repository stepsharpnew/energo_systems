<template>
<section class="section section--dark process" id="process" data-process ref="section" @keydown.right.prevent="move(1)" @keydown.left.prevent="move(-1)">
  <div class="container">
    <h2 class="section__title">
      <span class="muted">От аудита до запуска —</span>
      одна команда, один договор
    </h2>
    <div class="process__head">
      <p class="process__lead">Проектирование, поставка, монтаж и сервис — в одном договоре. Состав работ согласуем по итогам обследования объекта.</p>
      <div class="process__ctrl">
        <button class="ctrl" type="button" data-move="-1" @click="move(-1)" aria-label="Предыдущий шаг"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 12H5M11 6l-6 6 6 6"/></svg></button>
        <button class="ctrl" type="button" data-move="1" @click="move(1)" aria-label="Следующий шаг"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg></button>
      </div>
    </div>

    <div class="stage" data-stage ref="stage" @pointerdown="pointerDown" @pointerup="pointerUp" @pointercancel="pointerCancel" @scroll.passive="onStageScroll">
      <article class="chapter" :class="{ 'is-active': chapter === 0 }" data-chapter="0" :ref="element => chapters[0] = element" @click="openChapter(0)" @focus="focusChapter($event, 0)" data-pos="top" tabindex="0" aria-label="Технический аудит и проектирование">
        <img v-bind="imageAttrs('/dgu/images/3ae1688ca73db4de.webp', { sizes: '(max-width: 768px) 100vw, 50vw', width: 800 })" alt="Заказчик и два специалиста Энергосистем обсуждают проект у бизнес-центра" loading="lazy">
        <i class="chapter__shade" aria-hidden="true"></i>
        <div class="chapter__rail" aria-hidden="true"><span class="chapter__no">01–02</span><span class="chapter__vname">Технический аудит и проектирование</span></div>
        <div class="chapter__card">
          <h3 class="chapter__title">Технический аудит и проектирование</h3>
          <ol class="steps">
            <li class="step" :class="{ 'is-current': active === 0 }" data-step="0"><button class="step__trigger" type="button" :aria-pressed="active === 0" aria-label="Открыть этап: Выезд и технический аудит" @click.stop="show(0)">
              <span class="step__no">1</span>
              <div><b class="step__title">Выезд и технический аудит</b><div class="step__more"><div><p class="step__text">Инженер проверяет ввод и главный распределительный щит, выбирает место установки, считает нагрузки и пусковые токи.</p><p class="step__get">Вы получаете: Перечень нагрузок и схема размещения</p></div></div></div>
            </button></li>
            <li class="step" :class="{ 'is-current': active === 1 }" data-step="1"><button class="step__trigger" type="button" :aria-pressed="active === 1" aria-label="Открыть этап: Проектирование и расчёт нагрузок" @click.stop="show(1)">
              <span class="step__no">2</span>
              <div><b class="step__title">Проектирование и расчёт нагрузок</b><div class="step__more"><div><p class="step__text">Рассчитываем мощность электростанции, схему АВР, топливную систему и кабельные линии, согласуем проект.</p><p class="step__get">Вы получаете: Проект и смета</p></div></div></div>
            </button></li>
          </ol>
        </div>
      </article>
      <article class="chapter" :class="{ 'is-active': chapter === 1 }" data-chapter="1" :ref="element => chapters[1] = element" @click="openChapter(1)" @focus="focusChapter($event, 1)" data-pos="top" tabindex="0" aria-label="Комплектация и поставка">
        <img v-bind="imageAttrs('/dgu/images/37faaf8fd8999628.webp', { sizes: '(max-width: 768px) 100vw, 50vw', width: 800 })" alt="Разгрузка ДГУ и оборудования ИБП в деревянных транспортных ящиках у бизнес-центра" loading="lazy">
        <i class="chapter__shade" aria-hidden="true"></i>
        <div class="chapter__rail" aria-hidden="true"><span class="chapter__no">03</span><span class="chapter__vname">Комплектация и поставка</span></div>
        <div class="chapter__card">
          <h3 class="chapter__title">Комплектация и поставка</h3>
          <ol class="steps">
            <li class="step" :class="{ 'is-current': active === 2 }" data-step="2"><button class="step__trigger" type="button" :aria-pressed="active === 2" aria-label="Открыть этап: Поставка оборудования" @click.stop="show(2)">
              <span class="step__no">3</span>
              <div><b class="step__title">Поставка оборудования</b><div class="step__more"><div><p class="step__text">Доставляем электростанцию на объект, проверяем комплектность по спецификации до монтажа.</p><p class="step__get">Вы получаете: Электростанция на объекте по спецификации</p></div></div></div>
            </button></li>
          </ol>
        </div>
      </article>
      <article class="chapter" :class="{ 'is-active': chapter === 2 }" data-chapter="2" :ref="element => chapters[2] = element" @click="openChapter(2)" @focus="focusChapter($event, 2)" data-pos="top" tabindex="0" aria-label="Монтаж и пусконаладочные работы">
        <img v-bind="imageAttrs('/dgu/images/76e878b0ba76e5aa.webp', { sizes: '(max-width: 768px) 100vw, 50vw', width: 800 })" alt="Сервисные инженеры в форме Энергосистем ведут пусконаладку ДГУ и шкафов ИБП" loading="lazy">
        <i class="chapter__shade" aria-hidden="true"></i>
        <div class="chapter__rail" aria-hidden="true"><span class="chapter__no">04–05</span><span class="chapter__vname">Монтаж и пусконаладочные работы</span></div>
        <div class="chapter__card">
          <h3 class="chapter__title">Монтаж и пусконаладочные работы</h3>
          <ol class="steps">
            <li class="step" :class="{ 'is-current': active === 3 }" data-step="3"><button class="step__trigger" type="button" :aria-pressed="active === 3" aria-label="Открыть этап: Монтажные работы" @click.stop="show(3)">
              <span class="step__no">4</span>
              <div><b class="step__title">Монтажные работы</b><div class="step__more"><div><p class="step__text">Готовим площадку или машинный зал, устанавливаем электростанцию, подключаем щит АВР, прокладываем кабельные линии.</p><p class="step__get">Вы получаете: Электростанция, смонтированная по проекту</p></div></div></div>
            </button></li>
            <li class="step" :class="{ 'is-current': active === 4 }" data-step="4"><button class="step__trigger" type="button" :aria-pressed="active === 4" aria-label="Открыть этап: Запуск и сдача объекта" @click.stop="show(4)">
              <span class="step__no">5</span>
              <div><b class="step__title">Запуск и сдача объекта</b><div class="step__more"><div><p class="step__text">Выполняем пусконаладку, проверяем автозапуск и приём нагрузки при имитации отключения сети, обучаем персонал.</p><p class="step__get">Вы получаете: Работающий резерв и комплект документации</p></div></div></div>
            </button></li>
          </ol>
        </div>
      </article>
    </div>

    <div class="track" data-track>
      <i class="track__line" aria-hidden="true"><b data-track-fill :style="{ width: active / 4 * 100 + '%' }"></b></i>
      <ol class="track__list">
        <li><button class="track__btn" type="button" data-go="0" :class="{ 'is-active': active === 0, 'is-done': active > 0 }" @click="show(0)"><i class="track__dot" aria-hidden="true"></i><span>Выезд и технический аудит</span></button></li>
        <li><button class="track__btn" type="button" data-go="1" :class="{ 'is-active': active === 1, 'is-done': active > 1 }" @click="show(1)"><i class="track__dot" aria-hidden="true"></i><span>Проектирование и расчёт нагрузок</span></button></li>
        <li><button class="track__btn" type="button" data-go="2" :class="{ 'is-active': active === 2, 'is-done': active > 2 }" @click="show(2)"><i class="track__dot" aria-hidden="true"></i><span>Поставка оборудования</span></button></li>
        <li><button class="track__btn" type="button" data-go="3" :class="{ 'is-active': active === 3, 'is-done': active > 3 }" @click="show(3)"><i class="track__dot" aria-hidden="true"></i><span>Монтажные работы</span></button></li>
        <li><button class="track__btn" type="button" data-go="4" :class="{ 'is-active': active === 4, 'is-done': active > 4 }" @click="show(4)"><i class="track__dot" aria-hidden="true"></i><span>Запуск и сдача объекта</span></button></li>
      </ol>
    </div>

    <div class="process__cta">
      <button class="btn-pill" type="button" data-callback-open data-callback-title="Выезд инженера на объект" data-callback-text="Оставьте контакт: инженер согласует время выезда и проведёт технический аудит объекта." @click="requestCallback({&quot;title&quot;: &quot;Выезд инженера на объект&quot;, &quot;text&quot;: &quot;Оставьте контакт: инженер согласует время выезда и проведёт технический аудит объекта.&quot;})">
        <span>Вызвать инженера на объект</span>
        <span class="btn-pill__icon" aria-hidden="true"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg></span>
      </button>
    </div>
  </div>
</section>
</template>

<script setup>
import { imageAttrs } from '~/utils/responsiveImage.js'
const emit = defineEmits(['callback'])
const requestCallback = payload => emit('callback', payload)
import { useDguVisibility } from '~/composables/useDguVisibility.js'
const props = defineProps({ reduced: Boolean })
const section = ref(null), stage = ref(null), chapters = []
const visible = useDguVisibility(section)
const active = ref(0), wide = ref(true)
const chapterOf = [0, 0, 1, 2, 2]
const chapter = computed(() => chapterOf[active.value])
let timer, scrolling, media, downX = null, dragAt = 0
const stop = () => clearInterval(timer)
const play = () => { stop(); if (visible.value && !props.reduced) timer = setInterval(() => move(1), 4000) }
function scrollChapter(index) {
  const element = chapters[index]
  if (element && stage.value) stage.value.scrollTo({ left: element.offsetLeft - (stage.value.clientWidth - element.offsetWidth) / 2, behavior: props.reduced ? 'auto' : 'smooth' })
}
function show(index) { active.value = index; if (!wide.value) scrollChapter(chapter.value); play() }
function move(direction) {
  show(wide.value ? (active.value + direction + 5) % 5 : chapterOf.indexOf((chapter.value + direction + 3) % 3))
}
function openChapter(index) { if (Date.now() - dragAt >= 400 && chapter.value !== index) show(chapterOf.indexOf(index)) }
function focusChapter(event, index) { if (event.target.matches(':focus-visible')) openChapter(index) }
function pointerDown(event) { downX = event.clientX; stop() }
function pointerUp(event) {
  if (downX !== null && wide.value && Math.abs(event.clientX - downX) > 60) { dragAt = Date.now(); move(event.clientX < downX ? 1 : -1) }
  downX = null; play()
}
function pointerCancel() { downX = null; play() }
function onStageScroll() {
  if (wide.value) return
  clearTimeout(scrolling)
  scrolling = setTimeout(() => {
    const middle = stage.value.scrollLeft + stage.value.clientWidth / 2
    const index = chapters.reduce((best, element, i) => Math.abs(element.offsetLeft + element.offsetWidth / 2 - middle) < Math.abs(chapters[best].offsetLeft + chapters[best].offsetWidth / 2 - middle) ? i : best, 0)
    active.value = chapterOf.indexOf(index)
  }, 120)
}
function resize() { wide.value = media.matches; if (wide.value) stage.value?.scrollTo({ left: 0 }); play() }
onMounted(() => { media = window.matchMedia('(min-width: 901px)'); resize(); media.addEventListener('change', resize) })
watch([visible, () => props.reduced], play)
onBeforeUnmount(() => { stop(); clearTimeout(scrolling); media?.removeEventListener('change', resize) })
</script>
