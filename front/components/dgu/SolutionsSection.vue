<template>
<section class="section section--cases" id="projects" data-cases ref="section" :style="{ '--case-ms': '6000ms' }" @keydown.right.prevent="move(1)" @keydown.left.prevent="move(-1)">
  <div class="container">
    <h2 class="section__title">
      <span class="muted">Типовые решения —</span>
      для вашей отрасли
    </h2>
    <p class="cases__note">Чем сложнее объект по энергопотреблению, тем мощнее и премиальнее оборудование. Диапазоны ориентировочные: мощность, схему и двигатель считаем под ваш объект.</p>

    <div class="cases">
      <ul class="ctabs" ref="tabs" @mouseenter="paused = true" @mouseleave="paused = false" @focusin="paused = true" @focusout="paused = false" role="tablist" aria-label="Отрасли">
        <li><button class="ctab" :class="{ 'is-active': active === 0 }" type="button" role="tab" data-case="0" :aria-selected="active === 0" @click="show(0)" :ref="element => tabButtons[0] = element">
          <span class="ctab__place">ЖКХ и поселки</span>
          <b>ЖКХ и поселки</b>
          <span class="ctab__spec">50–400 кВт · II категория</span>
          <i class="ctab__bar" aria-hidden="true"></i>
        </button></li>
        <li><button class="ctab" :class="{ 'is-active': active === 1 }" type="button" role="tab" data-case="1" :aria-selected="active === 1" @click="show(1)" :ref="element => tabButtons[1] = element">
          <span class="ctab__place">Торговые центры, бизнес-центры, отели</span>
          <b>Коммерция</b>
          <span class="ctab__spec">200–1000 кВт · II категория</span>
          <i class="ctab__bar" aria-hidden="true"></i>
        </button></li>
        <li><button class="ctab" :class="{ 'is-active': active === 2 }" type="button" role="tab" data-case="2" :aria-selected="active === 2" @click="show(2)" :ref="element => tabButtons[2] = element">
          <span class="ctab__place">Заводы и цеха</span>
          <b>Производство</b>
          <span class="ctab__spec">300–1200 кВт · I–II категория</span>
          <i class="ctab__bar" aria-hidden="true"></i>
        </button></li>
        <li><button class="ctab" :class="{ 'is-active': active === 3 }" type="button" role="tab" data-case="3" :aria-selected="active === 3" @click="show(3)" :ref="element => tabButtons[3] = element">
          <span class="ctab__place">Площадки и вахтовые городки</span>
          <b>Строительство</b>
          <span class="ctab__spec">50–250 кВт · III категория</span>
          <i class="ctab__bar" aria-hidden="true"></i>
        </button></li>
        <li><button class="ctab" :class="{ 'is-active': active === 4 }" type="button" role="tab" data-case="4" :aria-selected="active === 4" @click="show(4)" :ref="element => tabButtons[4] = element">
          <span class="ctab__place">АЗС, связь, транспорт</span>
          <b>Инфраструктура</b>
          <span class="ctab__spec">50–300 кВт · II категория</span>
          <i class="ctab__bar" aria-hidden="true"></i>
        </button></li>
        <li><button class="ctab" :class="{ 'is-active': active === 5 }" type="button" role="tab" data-case="5" :aria-selected="active === 5" @click="show(5)" :ref="element => tabButtons[5] = element">
          <span class="ctab__place">Больницы и клиники</span>
          <b>Медицина</b>
          <span class="ctab__spec">150–500 кВт · I категория</span>
          <i class="ctab__bar" aria-hidden="true"></i>
        </button></li>
        <li><button class="ctab" :class="{ 'is-active': active === 6 }" type="button" role="tab" data-case="6" :aria-selected="active === 6" @click="show(6)" :ref="element => tabButtons[6] = element">
          <span class="ctab__place">Склады и холодильные комплексы</span>
          <b>Логистика</b>
          <span class="ctab__spec">100–600 кВт · II категория</span>
          <i class="ctab__bar" aria-hidden="true"></i>
        </button></li>
      </ul>
      <div class="cstage" data-cstage @mouseenter="paused = true" @mouseleave="paused = false">
        <article class="case" :class="{ 'is-active': active === 0, 'is-prev': previous === 0 }" data-case-view="0" :aria-hidden="active !== 0">
          <img decoding="async" src="/dgu/images/c995dea8d81aea53.webp" alt="Дизельная электростанция в техническом помещении для коммунального объекта" width="860" height="860" loading="lazy">
          <i class="case__shade" aria-hidden="true"></i>
          <div class="case__panel">
            <p class="case__place">ЖКХ и поселки</p>
            <dl class="case__nums">
              <div><dt>Мощность</dt><dd>50–400<small>кВт</small></dd></div>
              <div><dt>Надёжность</dt><dd>II<small>категория</small></dd></div>
              <div><dt>Оборудование</dt><dd>Средний<small>сегмент</small></dd></div>
            </dl>
            <div class="case__txt">
              <p><b>Задача</b>Котельные, водозаборы, насосные и общие сети поселка не должны останавливаться при аварии на подстанции.</p>
              <p><b>Решение</b>ДГУ с автозапуском и АВР на основные линии, запас топлива на нужное время работы. Двигатели Weichai, Deutz или ММЗ.</p>
            </div>
          </div>
        </article>
        <article class="case" :class="{ 'is-active': active === 1, 'is-prev': previous === 1 }" data-case-view="1" :aria-hidden="active !== 1">
          <img decoding="async" src="/dgu/images/86988b8ff84f3e3e.webp" alt="Мощная дизельная электростанция в машинном зале торгового центра" width="860" height="860" loading="lazy">
          <i class="case__shade" aria-hidden="true"></i>
          <div class="case__panel">
            <p class="case__place">Торговые центры, бизнес-центры, отели</p>
            <dl class="case__nums">
              <div><dt>Мощность</dt><dd>200–1000<small>кВт</small></dd></div>
              <div><dt>Надёжность</dt><dd>II<small>категория</small></dd></div>
              <div><dt>Оборудование</dt><dd>Premium<small>сегмент</small></dd></div>
            </dl>
            <div class="case__txt">
              <p><b>Задача</b>Лифты, эскалаторы, холод, освещение и пожарные системы должны работать при отключении сети без дежурного.</p>
              <p><b>Решение</b>Станция в машинном зале или контейнере, щит АВР, запас топлива на длительное отключение, шумоизоляция. Двигатели Cummins, Perkins, Volvo Penta.</p>
            </div>
          </div>
        </article>
        <article class="case" :class="{ 'is-active': active === 2, 'is-prev': previous === 2 }" data-case-view="2" :aria-hidden="active !== 2">
          <img decoding="async" src="/dgu/images/7c5a23b39515fd0a.webp" alt="Несколько крупных дизельных электростанций в цеховом машинном зале" width="860" height="860" loading="lazy">
          <i class="case__shade" aria-hidden="true"></i>
          <div class="case__panel">
            <p class="case__place">Заводы и цеха</p>
            <dl class="case__nums">
              <div><dt>Мощность</dt><dd>300–1200<small>кВт</small></dd></div>
              <div><dt>Надёжность</dt><dd>I–II<small>категория</small></dd></div>
              <div><dt>Оборудование</dt><dd>Premium<small>сегмент</small></dd></div>
            </dl>
            <div class="case__txt">
              <p><b>Задача</b>Линии, насосы и автоматика не должны останавливаться: простой цеха стоит дороже самой станции.</p>
              <p><b>Решение</b>Одна или несколько станций в параллельной работе, АВР по группам потребителей, ИБП на чувствительную автоматику. Двигатели Cummins, MTU, Doosan.</p>
            </div>
          </div>
        </article>
        <article class="case" :class="{ 'is-active': active === 3, 'is-prev': previous === 3 }" data-case-view="3" :aria-hidden="active !== 3">
          <img decoding="async" src="/dgu/images/1373118089178785.webp" alt="Дизельная электростанция на раме для строительной площадки" width="860" height="860" loading="lazy">
          <i class="case__shade" aria-hidden="true"></i>
          <div class="case__panel">
            <p class="case__place">Площадки и вахтовые городки</p>
            <dl class="case__nums">
              <div><dt>Мощность</dt><dd>50–250<small>кВт</small></dd></div>
              <div><dt>Надёжность</dt><dd>III<small>категория</small></dd></div>
              <div><dt>Оборудование</dt><dd>Средний<small>сегмент</small></dd></div>
            </dl>
            <div class="case__txt">
              <p><b>Задача</b>Питание площадки, бытовых городков и оборудования на время строительства, а также резерв при отключениях сети.</p>
              <p><b>Решение</b>Станция на раме или в контейнере, подключение по временной схеме, топливо на смену. Двигатели Weichai, Doosan, ММЗ.</p>
            </div>
          </div>
        </article>
        <article class="case" :class="{ 'is-active': active === 4, 'is-prev': previous === 4 }" data-case-view="4" :aria-hidden="active !== 4">
          <img decoding="async" src="/dgu/images/4abc731b11f6b3e5.webp" alt="Контейнерная дизельная электростанция на площадке АЗС" width="860" height="860" loading="lazy">
          <i class="case__shade" aria-hidden="true"></i>
          <div class="case__panel">
            <p class="case__place">АЗС, связь, транспорт</p>
            <dl class="case__nums">
              <div><dt>Мощность</dt><dd>50–300<small>кВт</small></dd></div>
              <div><dt>Надёжность</dt><dd>II<small>категория</small></dd></div>
              <div><dt>Оборудование</dt><dd>Средний<small>сегмент</small></dd></div>
            </dl>
            <div class="case__txt">
              <p><b>Задача</b>Колонки, касса, освещение площадки, узлы связи и насосы работают при отключениях, а станция не требует дежурного.</p>
              <p><b>Решение</b>Станция в контейнере или кожухе с автозапуском, место размещения согласуем с требованиями безопасности. Двигатели Weichai, Deutz.</p>
            </div>
          </div>
        </article>
        <article class="case" :class="{ 'is-active': active === 5, 'is-prev': previous === 5 }" data-case-view="5" :aria-hidden="active !== 5">
          <img decoding="async" src="/dgu/images/746f96dceb7674d6.webp" alt="Дизельная электростанция и шкафы ИБП в техническом помещении больницы" width="860" height="860" loading="lazy">
          <i class="case__shade" aria-hidden="true"></i>
          <div class="case__panel">
            <p class="case__place">Больницы и клиники</p>
            <dl class="case__nums">
              <div><dt>Мощность</dt><dd>150–500<small>кВт</small></dd></div>
              <div><dt>Надёжность</dt><dd>I<small>категория</small></dd></div>
              <div><dt>Оборудование</dt><dd>Premium<small>сегмент</small></dd></div>
            </dl>
            <div class="case__txt">
              <p><b>Задача</b>Операционные, реанимация и диагностика не должны терять питание: для них перерыв недопустим.</p>
              <p><b>Решение</b>Станция с автозапуском, АВР по группам потребителей и ИБП на самые чувствительные линии. Двигатели Cummins, Volvo Penta, Perkins.</p>
            </div>
          </div>
        </article>
        <article class="case" :class="{ 'is-active': active === 6, 'is-prev': previous === 6 }" data-case-view="6" :aria-hidden="active !== 6">
          <img decoding="async" src="/dgu/images/21a6c54661c45c14.webp" alt="Дизельная электростанция в машинном зале логистического комплекса" width="860" height="860" loading="lazy">
          <i class="case__shade" aria-hidden="true"></i>
          <div class="case__panel">
            <p class="case__place">Склады и холодильные комплексы</p>
            <dl class="case__nums">
              <div><dt>Мощность</dt><dd>100–600<small>кВт</small></dd></div>
              <div><dt>Надёжность</dt><dd>II<small>категория</small></dd></div>
              <div><dt>Оборудование</dt><dd>Средний<small>сегмент</small></dd></div>
            </dl>
            <div class="case__txt">
              <p><b>Задача</b>Холодильные камеры, ворота, освещение и складская автоматика: потеря питания — это потеря товара.</p>
              <p><b>Решение</b>Станция с автозапуском, АВР на холод и автоматику, запас топлива на длительное отключение. Двигатели Deutz, Doosan, Weichai.</p>
            </div>
          </div>
        </article>
        <div class="cstage__ctrl">
          <button class="ctrl ctrl--light" type="button" data-cmove="-1" @click="move(-1)" aria-label="Предыдущая отрасль"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 12H5M11 6l-6 6 6 6"/></svg></button>
          <button class="ctrl ctrl--light" type="button" data-cmove="1" @click="move(1)" aria-label="Следующая отрасль"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg></button>
        </div>
      </div>
    </div>

    <div class="cases__cta">
      <a class="btn-pill" href="#quiz"><span>Рассчитать для похожего объекта</span><span class="btn-pill__icon" aria-hidden="true"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg></span></a>
    </div>
  </div>
</section>
</template>

<script setup>
import { useDguVisibility } from '~/composables/useDguVisibility.js'
const props = defineProps({ reduced: Boolean })
const section = ref(null), tabs = ref(null), tabButtons = []
const visible = useDguVisibility(section)
const active = ref(0), previous = ref(-1), paused = ref(false)
let timer
const stop = () => clearInterval(timer)
const play = () => { stop(); if (visible.value && !props.reduced && !paused.value) timer = setInterval(() => show((active.value + 1) % 7), 6000) }
function show(index) {
  if (active.value !== index) { previous.value = active.value; active.value = index }
  const button = tabButtons[index]
  if (button && tabs.value?.scrollWidth > tabs.value?.clientWidth) tabs.value.scrollTo({ left: Math.max(0, button.parentNode.offsetLeft - tabs.value.offsetLeft - 16), behavior: props.reduced ? 'auto' : 'smooth' })
  play()
}
const move = direction => show((active.value + direction + 7) % 7)
watch([visible, paused, () => props.reduced], play)
onBeforeUnmount(stop)
</script>
