<template>
<section class="section realized" id="realized" data-realized ref="section" :class="{ 'is-armed': !reduced, 'is-in': revealed }">
  <div class="container">
    <h2 class="section__title">
      <span class="muted">Кейсы —</span>
      реализованные проекты электроснабжения
    </h2>
    <p class="rp__lead">Станции, которые мы поставляем заказчикам по всей России. Откройте кейс: внутри больше фото и подробности.</p>
    <ul class="rp__grid">
      <li class="rp__card" style="--i:0" data-case-open="1" @click="open(0)" @keydown.enter.prevent="open(0)" @keydown.space.prevent="open(0)" tabindex="0" role="button" aria-label="Открыть кейс: Татнефть: капотные ДЭС для АЗС">
        <figure class="rp__ph"><img decoding="async" data-cs-cover="1" :src="projects[0].photos[0].src" alt="Татнефть: капотные ДЭС для АЗС" width="1200" height="900" loading="lazy"><span class="rp__no">01</span><span class="rp__more" aria-hidden="true">Открыть кейс</span></figure>
        <div class="rp__body"><p class="rp__tag">АЗС и площадки</p><h3 class="rp__t">Татнефть: капотные ДЭС для АЗС</h3><p class="rp__d">Шумозащитные капотные станции в фирменной окраске заказчика.</p><span class="rp__go" aria-hidden="true">Подробнее<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg></span></div>
      </li>
      <li class="rp__card" style="--i:1" data-case-open="2" @click="open(1)" @keydown.enter.prevent="open(1)" @keydown.space.prevent="open(1)" tabindex="0" role="button" aria-label="Открыть кейс: Роснефть: контейнерные и капотные ДЭС">
        <figure class="rp__ph"><img decoding="async" data-cs-cover="2" :src="projects[1].photos[0].src" alt="Роснефть: контейнерные и капотные ДЭС" width="1200" height="900" loading="lazy"><span class="rp__no">02</span><span class="rp__more" aria-hidden="true">Открыть кейс</span></figure>
        <div class="rp__body"><p class="rp__tag">Контейнеры в цветах заказчика</p><h3 class="rp__t">Роснефть: контейнерные и капотные ДЭС</h3><p class="rp__d">Блок-контейнеры и капотные станции с фирменной символикой.</p><span class="rp__go" aria-hidden="true">Подробнее<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg></span></div>
      </li>
      <li class="rp__card" style="--i:2" data-case-open="3" @click="open(2)" @keydown.enter.prevent="open(2)" @keydown.space.prevent="open(2)" tabindex="0" role="button" aria-label="Открыть кейс: Блок-контейнер в фирменных цветах заказчика">
        <figure class="rp__ph"><img decoding="async" data-cs-cover="3" :src="projects[2].photos[0].src" alt="Блок-контейнер в фирменных цветах заказчика" width="1200" height="900" loading="lazy"><span class="rp__no">03</span><span class="rp__more" aria-hidden="true">Открыть кейс</span></figure>
        <div class="rp__body"><p class="rp__tag">Блок-контейнеры</p><h3 class="rp__t">Блок-контейнер в фирменных цветах заказчика</h3><p class="rp__d">Машинный зал в контейнере: вентиляция, щит управления, отгрузка на полуприцепе.</p><span class="rp__go" aria-hidden="true">Подробнее<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg></span></div>
      </li>
      <li class="rp__card" style="--i:3" data-case-open="4" @click="open(3)" @keydown.enter.prevent="open(3)" @keydown.space.prevent="open(3)" tabindex="0" role="button" aria-label="Открыть кейс: Мобильные ДЭС на прицепах и шасси">
        <figure class="rp__ph"><img decoding="async" data-cs-cover="4" :src="projects[3].photos[0].src" alt="Мобильные ДЭС на прицепах и шасси" width="1200" height="900" loading="lazy"><span class="rp__no">04</span><span class="rp__more" aria-hidden="true">Открыть кейс</span></figure>
        <div class="rp__body"><p class="rp__tag">Мобильные станции</p><h3 class="rp__t">Мобильные ДЭС на прицепах и шасси</h3><p class="rp__d">Контейнерные и капотные станции, которые можно перевозить между площадками.</p><span class="rp__go" aria-hidden="true">Подробнее<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg></span></div>
      </li>
      <li class="rp__card" style="--i:4" data-case-open="5" @click="open(4)" @keydown.enter.prevent="open(4)" @keydown.space.prevent="open(4)" tabindex="0" role="button" aria-label="Открыть кейс: Гибридные станции: ДГУ, солнечные панели и АКБ">
        <figure class="rp__ph"><img decoding="async" data-cs-cover="5" :src="projects[4].photos[0].src" alt="Гибридные станции: ДГУ, солнечные панели и АКБ" width="1200" height="900" loading="lazy"><span class="rp__no">05</span><span class="rp__more" aria-hidden="true">Открыть кейс</span></figure>
        <div class="rp__body"><p class="rp__tag">Автономные объекты</p><h3 class="rp__t">Гибридные станции: ДГУ, солнечные панели и АКБ</h3><p class="rp__d">Контейнерные станции, где генератор работает вместе с солнечными панелями и накопителем.</p><span class="rp__go" aria-hidden="true">Подробнее<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg></span></div>
      </li>
      <li class="rp__card" style="--i:5" data-case-open="6" @click="open(5)" @keydown.enter.prevent="open(5)" @keydown.space.prevent="open(5)" tabindex="0" role="button" aria-label="Открыть кейс: Контейнерные ДЭС на Cummins и Weichai">
        <figure class="rp__ph"><img decoding="async" data-cs-cover="6" :src="projects[5].photos[0].src" alt="Контейнерные ДЭС на Cummins и Weichai" width="1200" height="900" loading="lazy"><span class="rp__no">06</span><span class="rp__more" aria-hidden="true">Открыть кейс</span></figure>
        <div class="rp__body"><p class="rp__tag">Внутри контейнера</p><h3 class="rp__t">Контейнерные ДЭС на Cummins и Weichai</h3><p class="rp__d">Машинный зал внутри: двигатель, генератор, шкаф управления, топливная система и вентиляция.</p><span class="rp__go" aria-hidden="true">Подробнее<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg></span></div>
      </li>
    </ul>
  </div>

  <dialog ref="dialog" class="cs-modal" :class="{ 'is-open': opened }" data-cs-modal aria-labelledby="cs-title"
    @click="backdrop" @cancel.prevent="close" @close="closed" @keydown.left.prevent="show(photoIndex - 1)" @keydown.right.prevent="show(photoIndex + 1)">
    <div v-if="project" class="cs">
      <button class="cs__close" type="button" aria-label="Закрыть" data-cs-close @click="close"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg></button>
      <div class="cs__gal">
        <div class="cs__stage" data-cs-stage @touchstart.passive="touchStart" @touchend.passive="touchEnd">
          <img :key="photo.src" class="cs__img is-in" :src="photo.src" :alt="photo.caption" data-cs-img>
          <button class="cs__nav cs__nav--prev" type="button" aria-label="Предыдущее фото" data-cs-prev @click="show(photoIndex - 1)"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M11 6l-6 6 6 6"/></svg></button>
          <button class="cs__nav cs__nav--next" type="button" aria-label="Следующее фото" data-cs-next @click="show(photoIndex + 1)"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg></button>
          <p class="cs__cap" data-cs-cap>{{ photo.caption }}</p>
          <span class="cs__count" data-cs-count>{{ photoIndex + 1 }} / {{ project.photos.length }}</span>
        </div>
        <div ref="thumbnails" class="cs__thumbs" data-cs-thumbs>
          <button v-for="(image, index) in project.photos" :key="image.src" :ref="element => thumbnailButtons[index] = element" type="button" class="cs__th" :class="{ 'is-on': photoIndex === index }" :aria-label="'Фото ' + (index + 1)" :aria-current="photoIndex === index" @click="show(index)"><img :src="image.src" alt="" loading="lazy"></button>
        </div>
      </div>
      <div class="cs__info">
        <span class="cs__no" data-cs-no>{{ project.number }}</span>
        <p class="cs__tag" data-cs-tag>{{ project.tag }}</p>
        <h3 class="cs__title" id="cs-title" data-cs-title>{{ project.title }}</h3>
        <div class="cs__block"><b>Задача</b><p data-cs-task>{{ project.task }}</p></div>
        <div class="cs__block"><b>Решение</b><p data-cs-sol>{{ project.solution }}</p></div>
        <dl class="cs__facts" data-cs-facts><div v-for="fact in project.facts" :key="fact.label"><dt>{{ fact.label }}</dt><dd>{{ fact.value }}</dd></div></dl>
        <button class="btn-pill cs__cta" type="button" data-callback-open data-callback-title="Похожий проект" @click="requestCallback">
          <span>Обсудить похожий проект</span>
          <span class="btn-pill__icon" aria-hidden="true"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg></span>
        </button>
      </div>
    </div>
  </dialog>
</section>
</template>

<script setup>
import { createDguDialogLock } from '~/utils/dguDialogLock.js'
import { dguProjects as projects } from '~/data/dguProjects.js'
import { useDguVisibility } from '~/composables/useDguVisibility.js'
const { lock, unlock } = createDguDialogLock()
const props = defineProps({ reduced: Boolean })
const emit = defineEmits(['callback'])
const section = ref(null), dialog = ref(null), thumbnails = ref(null), thumbnailButtons = []
const selected = ref(-1), photoIndex = ref(0), opened = ref(false), revealed = ref(false)
const visible = useDguVisibility(section)
const project = computed(() => projects[selected.value])
const photo = computed(() => project.value?.photos[photoIndex.value])
let lastFocus, touchX = 0
watch(visible, value => { if (value) revealed.value = true })
async function open(index) {
  lastFocus = document.activeElement
  selected.value = index
  photoIndex.value = 0
  await nextTick()
  dialog.value.showModal()
  opened.value = true
  lock()
}
function close() { opened.value = false; dialog.value?.close() }
function closed() { opened.value = false; unlock(); lastFocus?.focus?.() }
function backdrop(event) { if (event.target === dialog.value) close() }
function show(index) {
  if (!project.value) return
  photoIndex.value = (index + project.value.photos.length) % project.value.photos.length
  const button = thumbnailButtons[photoIndex.value]
  if (button && thumbnails.value?.scrollWidth > thumbnails.value?.clientWidth) thumbnails.value.scrollTo({ left: button.offsetLeft - 16, behavior: props.reduced ? 'auto' : 'smooth' })
}
function requestCallback() {
  close()
  emit('callback', { title: 'Похожий проект', text: 'Оставьте контакт: инженер расскажет, как реализовать похожее решение на вашем объекте.' })
}
const touchStart = event => { touchX = event.touches[0].clientX }
const touchEnd = event => { const delta = event.changedTouches[0].clientX - touchX; if (Math.abs(delta) > 40) show(photoIndex.value + (delta < 0 ? 1 : -1)) }
onBeforeUnmount(() => { dialog.value?.close(); unlock() })
</script>
