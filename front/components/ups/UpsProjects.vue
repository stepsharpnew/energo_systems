<template>
<section class="section section--cases" id="projects" data-cases data-examples ref="section" style="--case-ms:6000ms" @keydown.right.prevent="move(1)" @keydown.left.prevent="move(-1)">
  <div class="container">
    <h2 class="section__title">
      <span class="muted">Разные задачи.</span>
      Прозрачные параметры резерва.
    </h2>
    <p class="ex__lead">Примеры помогают оценить масштаб системы. Площадь дома сама по себе не определяет мощность и время автономии.</p>

    <div class="cases">
      <ul class="ctabs" @mouseenter="paused = true" @mouseleave="paused = false" role="tablist" aria-label="Расчётные сценарии">
        <li><button class="ctab" :class="{ 'is-active': current === 0 }" type="button" role="tab" :aria-selected="current === 0" data-case="0" @click="select(0)">
          <span class="ctab__place">Частный дом</span>
          <b>Тепло, вода и связь</b>
          <span class="ctab__spec">15 кВт · 20,48 кВт·ч</span>
          <i class="ctab__bar" aria-hidden="true"></i>
        </button></li>
        <li><button class="ctab" :class="{ 'is-active': current === 1 }" type="button" role="tab" :aria-selected="current === 1" data-case="1" @click="select(1)">
          <span class="ctab__place">Дом с постройками</span>
          <b>Больше нагрузок и ДГУ</b>
          <span class="ctab__spec">30 кВт · 40,96 кВт·ч · ДГУ 32 кВт</span>
          <i class="ctab__bar" aria-hidden="true"></i>
        </button></li>
        <li><button class="ctab" :class="{ 'is-active': current === 2 }" type="button" role="tab" :aria-selected="current === 2" data-case="2" @click="select(2)">
          <span class="ctab__place">Коттеджный посёлок</span>
          <b>Общая инфраструктура</b>
          <span class="ctab__spec">40 кВт · 61,44 кВт·ч · ДГУ 64 кВт</span>
          <i class="ctab__bar" aria-hidden="true"></i>
        </button></li>
      </ul>
      <div class="cstage" @mouseenter="paused = true" @mouseleave="paused = false" data-cstage>
        <article class="case" :class="{ 'is-active': current === 0, 'is-prev': previous === 0 }" data-case-view="0" :aria-hidden="current !== 0">
          <img src="/ups/example-home.webp" alt="Резервное питание инженерных систем дома: инвертор, аккумуляторы и щит в техническом помещении" width="860" height="860" loading="lazy">
          <i class="case__shade" aria-hidden="true"></i>
          <div class="case__panel">
            <p class="case__place"><span class="ex__tag">Расчётный сценарий</span> Критические нагрузки дома</p>
            <dl class="case__nums">
              <div><dt>Мощность</dt><dd><span data-ex-kw>15</span><small>кВт</small></dd></div>
              <div><dt>От АКБ при 1,5 кВт</dt><dd>≈ <span data-ex-time>10</span><small>ч</small></dd></div>
              <div><dt>Источник</dt><dd>АКБ<small>без ДГУ</small></dd></div>
            </dl>
            <div class="case__txt">
              <p><b>Что резервируем</b>Автоматика газового котла, насосы, холодильник, выбранное освещение, связь и охрана.</p>
              <p><b>Что не входит</b>Электроотопление, плита и нагрев воды в этот сценарий не включены.</p>
            </div>
          </div>
        </article>
        <article class="case" :class="{ 'is-active': current === 1, 'is-prev': previous === 1 }" data-case-view="1" :aria-hidden="current !== 1">
          <img src="/ups/example-estate.webp" alt="Резервное питание дома с постройками: инверторы, аккумуляторный шкаф и щит в гараже" width="860" height="860" loading="lazy">
          <i class="case__shade" aria-hidden="true"></i>
          <div class="case__panel">
            <p class="case__place"><span class="ex__tag">Расчётный сценарий</span> Дом с постройками и ДГУ</p>
            <dl class="case__nums">
              <div><dt>Мощность</dt><dd><span data-ex-kw>30</span><small>кВт</small></dd></div>
              <div><dt>От АКБ при 4 кВт</dt><dd>≈ <span data-ex-time>8</span><small>ч</small></dd></div>
              <div><dt>Источник</dt><dd>АКБ<small>+ ДГУ</small></dd></div>
            </dl>
            <div class="case__txt">
              <p><b>Что резервируем</b>Инженерные системы дома, выбранные бытовые нагрузки и постройки. ДГУ поддерживает питание при длительном отключении.</p>
              <p><b>Ограничения</b>Зарядка автомобиля и электронагрев на АКБ ограничиваются. При работе ДГУ включаются по доступной мощности.</p>
            </div>
          </div>
        </article>
        <article class="case" :class="{ 'is-active': current === 2, 'is-prev': previous === 2 }" data-case-view="2" :aria-hidden="current !== 2">
          <img src="/ups/example-village.webp" alt="Дизельная генераторная установка у дома: резерв общих сетей посёлка" width="1100" height="520" loading="lazy">
          <i class="case__shade" aria-hidden="true"></i>
          <div class="case__panel">
            <p class="case__place"><span class="ex__tag">Расчётный сценарий</span> Общие сети коттеджного посёлка</p>
            <dl class="case__nums">
              <div><dt>Мощность</dt><dd><span data-ex-kw>40</span><small>кВт</small></dd></div>
              <div><dt>От АКБ при 10 кВт</dt><dd>≈ <span data-ex-time>5</span><small>ч</small></dd></div>
              <div><dt>Источник</dt><dd>АКБ<small>+ ДГУ</small></dd></div>
            </dl>
            <div class="case__txt">
              <p><b>Что резервируем</b>Насосные, очистные, освещение общих зон, ворота, охрана и связь. Запуск насосов — последовательно.</p>
              <p><b>Ограничения</b>Расчёт относится к общей инфраструктуре. Питание частных домов посёлка в этот сценарий не входит.</p>
            </div>
          </div>
        </article>
        <div class="cstage__ctrl">
          <button class="ctrl ctrl--light" type="button" data-cmove="-1" @click="move(-1)" aria-label="Предыдущий сценарий"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 12H5M11 6l-6 6 6 6"/></svg></button>
          <button class="ctrl ctrl--light" type="button" data-cmove="1" @click="move(1)" aria-label="Следующий сценарий"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg></button>
        </div>
      </div>
    </div>

    <div class="ex__detail is-swap" :key="current" data-ex-detail>
      <div><span>Одновременная рабочая нагрузка</span><b data-ex-w>{{ details.w[current] }}</b></div>
      <div><span>Условная нагрузка при пуске</span><b data-ex-s>{{ details.s[current] }}</b></div>
      <div><span>Источник на долгие отключения</span><b data-ex-d>{{ details.d[current] }}</b></div>
    </div>

    <details class="ex__assume">
      <summary>Условия примеров и проверка мощности</summary>
      <p>Для всех сценариев приняты используемый заряд 90%, КПД 92% и отдельное собственное потребление: 90 / 180 / 250 Вт. Расчёт даёт 10,7 / 8,1 / 5,0 часа; в карточках время округлено вниз. Реальное время зависит от нагрузки, температуры и состояния АКБ.</p>
      <p>15 кВт: группа 3 × 5 кВт с АКБ 20,48 кВт·ч. 30 и 40 кВт: трёхфазные инверторные системы с совместимыми высоковольтными батарейными блоками 40,96 и 61,44 кВт·ч. Для ДГУ 32 кВт / 40 кВА ограничиваем заряд по AC до 6 кВт; для ДГУ 64 кВт / 80 кВА — до 10 кВт. На пусковых переходах заряд ограничивается.</p>
      <p>Рабочая нагрузка с зарядом: около 24,2 кВт для большого дома и 38,3 кВт для инфраструктуры посёлка. Проверяются кВА, распределение по фазам, батарейные токи и пуски насосов. Пусковые значения здесь — условия сценария, не подтверждение работы любого двигателя.</p>
    </details>

    <div class="cases__cta">
      <a class="btn-pill" href="#quiz"><span>Рассчитать для похожего объекта</span><span class="btn-pill__icon" aria-hidden="true"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg></span></a>
    </div>
  </div>
</section>
</template>

<script setup>
import { useUpsVisibility } from '~/composables/useUpsVisibility.js'
const section = ref(null)
const current = ref(0)
const details = {"w": ["до 7,5 кВт / 9 кВА", "до 18 кВт / 22 кВА", "до 28 кВт / 32 кВА"], "s": ["до 11 кВт / 13,5 кВА", "до 24 кВт / 28 кВА", "до 34 кВт / 38 кВА"], "d": ["ДГУ — по дополнительному расчёту", "ДГУ 32 кВт / 40 кВА · заряд до 6 кВт", "ДГУ 64 кВт / 80 кВА · заряд до 10 кВт"]}
const previous = ref(-1)
const paused = ref(false)
const { visible, reduced } = useUpsVisibility(section)
let timer
function play() { clearInterval(timer); if (visible.value && !reduced.value && !paused.value) timer = setInterval(() => move(1), 6000) }
function select(index) { if (current.value !== index) { previous.value = current.value; current.value = index } play() }
function move(direction) { select((current.value + direction + 3) % 3) }
watch([visible, reduced, paused], play)
onBeforeUnmount(() => clearInterval(timer))
</script>
