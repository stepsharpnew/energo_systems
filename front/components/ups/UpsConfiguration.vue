<template>
<section class="section section--dark prices" id="prices" data-cfg ref="section">
  <div class="container">
    <h2 class="section__title">
      <span class="muted">Мощность — под нагрузку.</span>
      Запас энергии — под время работы.
    </h2>
    <p class="cfg__lead">Показываем, из чего складывается решение для дома. Окончательные модели и стоимость под ключ фиксируем после обследования.</p>

    <div class="cfg" :class="{ 'is-armed': !reduced, 'is-in': played }">
      <div class="cfg__media">
        <div class="cfg__photo">
          <img id="img-room" v-bind="imageAttrs('/ups/configuration-system.webp', { sizes: '(max-width: 768px) 100vw, 50vw', width: 800 })" alt="Оборудование резервного питания в техническом помещении премиального дома" loading="lazy">
          <span class="cfg__chip">Расчётный пример · без ДГУ</span>
        </div>
        <div class="cfg__comp">
          <ul>
            <li style="--i:0"><i>3×</i><div><b>Инверторный модуль 5 кВт</b><span>Трёхфазная группа · до 5 кВт на фазу</span></div></li>
            <li style="--i:1"><i>4×</i><div><b>АКБ LiFePO₄ 5,12 кВт·ч</b><span>Общий номинальный запас 20,48 кВт·ч</span></div></li>
            <li style="--i:2"><i>1×</i><div><b>Щит подключения и байпас</b><span>Защита и переключение по проекту</span></div></li>
            <li style="--i:3"><i>+</i><div><b>Проект, монтаж и запуск</b><span>Проверка под нагрузкой и обучение</span></div></li>
          </ul>
        </div>
      </div>

      <div class="cfg__body">
        <p class="cfg__h">Система резервного питания дома</p>
        <p class="cfg__power"><span data-cfg-count="15" data-d="0">{{ number(15 * progress, 0) }}</span> <small>кВт</small></p>
        <p class="cfg__desc">Непрерывная мощность проектной группы.<br>Для выбранных нагрузок, с проверкой пусков и фаз.</p>

        <div class="cfg__spec">
          <div><strong><span data-cfg-count="20.48" data-d="2">{{ number(20.48 * progress, 2) }}</span> <small>кВт·ч</small></strong><span>номинальная энергия АКБ</span></div>
          <div><strong>≈ <span data-cfg-count="16.96" data-d="2">{{ number(16.96 * progress, 2) }}</span> <small>кВт·ч</small></strong><span>после разряда и преобразования, до собственных нужд</span></div>
        </div>

        <div class="cfg__rt">
          <div class="cfg__rt-top"><label for="cfg-load">Средняя нагрузка</label><output id="cfg-load-out" for="cfg-load" data-cfg-out>{{ number(load, 1) }} кВт</output></div>
          <input class="cfg__range" id="cfg-load" type="range" min="0.5" max="15" step="0.1" v-model.number="load" @input="touch" :style="{ '--f': `${(load - .5) / 14.5 * 100}%` }" aria-label="Средняя мощность нагрузки" data-cfg-range>
          <div class="cfg__scale"><span>0,5 кВт</span><span>15 кВт</span></div>
          <div class="cfg__batt" aria-hidden="true"><b data-cfg-batt :style="{ '--p': `${Math.min(100, Math.sqrt(runtime / 30) * 100)}%` }"></b></div>
          <div class="cfg__rt-res"><span>Расчётное время от АКБ</span><strong data-cfg-time>≈ {{ number(runtime, 1) }} ч</strong></div>
        </div>

        <details class="cfg__math">
          <summary>Как получено время работы</summary>
          <p>t = 20,48 × 0,90 / (P / 0,92 + 0,09).</p>
          <p>Используем 90% заряда, КПД 92% и отдельные собственные нужды 90 Вт. Батареи заряжены, температура положительная; старение не учтено. Это расчётный сценарий, не результат испытания готового комплекта.</p>
          <p>Для полной мощности от АКБ требуется соответствующий DC-ток инверторной группы и батарей. Конкретные модели и ограничения по фазам проверяются проектом.</p>
        </details>

        <div class="cfg__cost"><b>Стоимость под ключ</b><span>По проекту и спецификации</span></div>
        <div class="cfg__cta">
          <a class="btn-pill" href="#quiz"><span>Рассчитать под мой дом</span><span class="btn-pill__icon" aria-hidden="true"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg></span></a>
        </div>
        <p class="cfg__note">ДГУ, площадка, дополнительные кабельные работы и сервис рассчитываются в согласованном составе.</p>
      </div>
    </div>

    <p class="cfg__h cfg__h--tiers">Другие мощности — считаем под нагрузку объекта</p>
<div class="tiers" aria-label="Другие мощности">
      <a class="tier" href="#quiz">
        <img class="tier__bg" v-bind="imageAttrs('/ups/tier-house.jpg', { sizes: '(max-width: 768px) 100vw, 50vw', width: 800 })" alt="" loading="lazy">
        <i class="tier__shade" aria-hidden="true"></i>
        <span class="tier__kw">30–100 кВт</span>
        <b>Большой дом, хозблоки, гостевые дома</b>
        <p class="tier__note">Состав определяем по расчёту нагрузки</p>
        <span class="tier__go">Рассчитать <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg></span>
      </a>
      <a class="tier" href="#quiz">
        <img class="tier__bg" v-bind="imageAttrs('/ups/tier-commercial.jpg', { sizes: '(max-width: 768px) 100vw, 50vw', width: 800 })" alt="" loading="lazy">
        <i class="tier__shade" aria-hidden="true"></i>
        <span class="tier__kw">100–500 кВт</span>
        <b>Посёлки, отели, коммерческие объекты</b>
        <p class="tier__note">Проектируем после технического аудита объекта</p>
        <span class="tier__go">Рассчитать <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg></span>
      </a>
      <a class="tier" href="#quiz">
        <img class="tier__bg" v-bind="imageAttrs('/ups/tier-industrial.jpg', { sizes: '(max-width: 768px) 100vw, 50vw', width: 800 })" alt="" loading="lazy">
        <i class="tier__shade" aria-hidden="true"></i>
        <span class="tier__kw">500–1500 кВт</span>
        <b>Производство и крупные объекты</b>
        <p class="tier__note">Индивидуальный проект и поставка</p>
        <span class="tier__go">Рассчитать <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg></span>
      </a>
    </div>
  </div>
</section>
</template>

<script setup>
import { imageAttrs } from '~/utils/responsiveImage.js'
import { useUpsVisibility } from '~/composables/useUpsVisibility.js'
const section = ref(null)
const load = ref(1.5)
const progress = ref(1)
const played = ref(false)
const { visible, reduced } = useUpsVisibility(section)
const runtime = computed(() => 20.48 * .9 / (load.value / .92 + .09))
const number = (value, decimals) => Number(value).toLocaleString('ru-RU', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
let timer, touched = false
function touch() { touched = true; clearTimeout(timer); stopLoad?.() }
function tween(duration, update, done) {
  const start = performance.now()
  let frame
  function step(now) {
    const fraction = Math.min(1, (now - start) / duration)
    update(1 - (1 - fraction) ** 3.2)
    if (fraction < 1) frame = requestAnimationFrame(step)
    else done?.()
  }
  frame = requestAnimationFrame(step)
  return () => cancelAnimationFrame(frame)
}
let stopCount, stopLoad
watch(visible, shown => {
  if (!shown || played.value) return
  played.value = true
  if (reduced.value) return
  progress.value = 0
  stopCount = tween(1700, value => { progress.value = value })
  timer = setTimeout(() => {
    if (touched) return
    stopLoad = tween(1900, value => { if (!touched) load.value = 12 - 10.5 * value }, () => { if (!touched) load.value = 1.5 })
  }, 1500)
})
onBeforeUnmount(() => { clearTimeout(timer); stopCount?.(); stopLoad?.() })
</script>
