<template>
<section class="section section--adv sol" id="solutions" data-sol ref="section">
  <div class="container">
    <h2 class="section__title">
      <span class="muted">Короткое отключение или целые сутки —</span>
      подбираем подходящую систему
    </h2>

    <div class="sol__tabs" role="tablist" aria-label="Сценарии резервного питания">
      <button class="sol__tab" type="button" role="tab" id="soltab-0" :aria-selected="selected === 0" :tabindex="selected === 0 ? 0 : -1" aria-controls="sol-panel" data-sol-tab="0" @click="select(0, true)" @keydown.right.prevent="keyboardSelect($event, 1)" @keydown.left.prevent="keyboardSelect($event, -1)"><span>ИБП и аккумуляторы</span><i class="sol__bar" :key="`${selected}-${cycle}`" :class="{ 'is-run': auto && visible && !reduced }" :style="{ '--dur': `${duration + 900}ms` }" aria-hidden="true"></i></button>
      <button class="sol__tab" type="button" role="tab" id="soltab-1" :aria-selected="selected === 1" :tabindex="selected === 1 ? 0 : -1" aria-controls="sol-panel" data-sol-tab="1" @click="select(1, true)" @keydown.right.prevent="keyboardSelect($event, 1)" @keydown.left.prevent="keyboardSelect($event, -1)"><span>ДГУ и автоматика</span><i class="sol__bar" :key="`${selected}-${cycle}`" :class="{ 'is-run': auto && visible && !reduced }" :style="{ '--dur': `${duration + 900}ms` }" aria-hidden="true"></i></button>
      <button class="sol__tab" type="button" role="tab" id="soltab-2" :aria-selected="selected === 2" :tabindex="selected === 2 ? 0 : -1" aria-controls="sol-panel" data-sol-tab="2" @click="select(2, true)" @keydown.right.prevent="keyboardSelect($event, 1)" @keydown.left.prevent="keyboardSelect($event, -1)"><span>ИБП + АКБ + ДГУ</span><i class="sol__bar" :key="`${selected}-${cycle}`" :class="{ 'is-run': auto && visible && !reduced }" :style="{ '--dur': `${duration + 900}ms` }" aria-hidden="true"></i></button>
    </div>

    <div class="sol__grid" id="sol-panel" role="tabpanel" :aria-labelledby="`soltab-${selected}`">
      <figure class="sol__photo" data-sol-photo>
        <img class="sol__img" :class="{ 'is-on': selected === 0 }" data-sol-img="0" id="img-ups" v-bind="imageAttrs('/ups/solution-ups.webp', { sizes: '(max-width: 768px) 100vw, 50vw', width: 800 })" alt="Система ИБП и аккумуляторов на стене технического помещения" loading="lazy">
        <img class="sol__img" :class="{ 'is-on': selected === 1 }" data-sol-img="1" id="img-dgu" v-bind="imageAttrs('/ups/solution-dgu.webp', { sizes: '(max-width: 768px) 100vw, 50vw', width: 800 })" alt="Дизельная генераторная установка на отдельной площадке у дома" loading="lazy">
        <img class="sol__img" :class="{ 'is-on': selected === 2 }" data-sol-img="2" v-bind="imageAttrs('/ups/solution-hybrid.webp', { sizes: '(max-width: 768px) 100vw, 50vw', width: 800 })" alt="Контейнер с ДГУ, ИБП и аккумуляторами за решёткой на удалении от дома" loading="lazy">
        <i class="sol__sweep is-go" :key="selected" aria-hidden="true"></i>
        <span class="sol__chip" data-sol-chip>{{ current.chip }}</span>
        <div class="hud" :class="{ 'is-off': !state.grid[2] && !state.mode, 'is-backup': state.mode === 'backup', 'is-gen': state.mode === 'gen' }" data-sol-hud role="status" aria-live="off">
          <div class="hud__head">
            <i class="hud__dot" aria-hidden="true"></i>
            <div><b data-hud-title>{{ state.t }}</b><span data-hud-sub>{{ state.s }}</span></div>
          </div>
          <div class="hud__rows">
            <div class="hud__g" :class="{ 'is-off': !state.grid[2] }" data-g="grid"><span>Сеть</span><em>{{ state.grid[0] }}</em><i class="hud__meter"><b :style="{ '--p': `${state.grid[1]}%` }"></b></i></div>
            <div class="hud__g" :class="{ 'is-na': !state.bat }" data-g="bat"><span>АКБ</span><em>{{ state.bat ? `${Math.round(battery)}%` : '—' }}</em><i class="hud__meter"><b :style="{ '--p': `${state.bat?.[0] || 0}%` }"></b></i></div>
            <div class="hud__g" :class="{ 'is-na': !state.gen }" data-g="gen"><span>ДГУ</span><em>{{ state.gen?.[0] || '—' }}</em><i class="hud__meter"><b :style="{ '--p': `${state.gen?.[1] || 0}%` }"></b></i></div>
          </div>
        </div>
        <figcaption class="sol__cap">Визуализация решения</figcaption>
      </figure>

      <div class="sol__content is-swap" :key="selected" data-sol-content>
        <p class="sol__eyebrow" data-sol-eyebrow>{{ current.eyebrow }}</p>
        <h3 class="sol__h" data-sol-title><template v-for="(line, index) in current.title.split('<br>')" :key="index"><br v-if="index">{{ line }}</template></h3>
        <p class="sol__text" data-sol-text>{{ current.text }}</p>
        <ul class="sol__feat" data-sol-feat>
          <li v-for="feature in current.feats" :key="feature[0]"><b>{{ feature[0] }}</b><span>{{ feature[1] }}</span></li>
        </ul>
        <a class="btn-pill" href="#quiz"><span>Подобрать решение</span><span class="btn-pill__icon" aria-hidden="true"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg></span></a>
      </div>
    </div>

    <ol class="sol__flow" data-sol-flow aria-label="Как система работает при отключении сети"><li v-for="(label, index) in current.flow" :key="label" class="fl" :class="{ 'is-done': index < flowPosition, 'is-now': index === flowPosition }"><span class="fl__n">{{ index + 1 }}</span><span class="fl__t">{{ label }}</span><i v-if="index < current.flow.length - 1" class="fl__ln"><b></b></i></li></ol>
    <p class="sol__note" data-sol-note>{{ current.note }}</p>
  </div>
</section>
</template>

<script setup>
import { imageAttrs } from '~/utils/responsiveImage.js'
import { upsSolutions } from '~/data/upsSolutions.js'
import { useUpsVisibility } from '~/composables/useUpsVisibility.js'
const section = ref(null)
const selected = ref(0)
const phase = ref(0)
const cycle = ref(0)
const auto = ref(true)
const battery = ref(100)
const { visible, reduced } = useUpsVisibility(section)
const current = computed(() => upsSolutions[selected.value])
const state = computed(() => current.value.steps[phase.value] || current.value.steps[0])
const duration = computed(() => current.value.steps.reduce((total, step) => total + step.d, 0))
const flowPosition = computed(() => reduced.value ? current.value.flow.length : state.value.f)
let timers = [], frame
function stop() { timers.forEach(clearTimeout); timers = []; cancelAnimationFrame(frame) }
function run() {
  stop()
  cycle.value++
  if (reduced.value) { phase.value = current.value.steps.length - 1; return }
  phase.value = 0
  let time = 0
  current.value.steps.forEach((step, index) => { timers.push(setTimeout(() => { phase.value = index }, time)); time += step.d })
  timers.push(setTimeout(() => { if (visible.value) { if (auto.value) select((selected.value + 1) % upsSolutions.length); else run() } }, time + 900))
}
function select(index, byUser = false) {
  if (byUser) auto.value = false
  selected.value = index
  phase.value = 0
  if (visible.value || byUser) run(); else stop()
}
async function keyboardSelect(event, direction) {
  const tablist = event.currentTarget.parentElement
  const next = (selected.value + direction + upsSolutions.length) % upsSolutions.length
  select(next, true)
  await nextTick()
  tablist.children[next]?.focus()
}
watch(state, value => {
  cancelAnimationFrame(frame)
  const target = value.bat?.[0] ?? 100
  if (reduced.value) { battery.value = target; return }
  const from = battery.value
  const start = performance.now()
  function animate(now) {
    const fraction = Math.min(1, (now - start) / 900)
    battery.value = from + (target - from) * (1 - (1 - fraction) ** 3.2)
    if (fraction < 1) frame = requestAnimationFrame(animate)
  }
  frame = requestAnimationFrame(animate)
})
watch([visible, reduced], () => { if (visible.value) run(); else stop() })
onBeforeUnmount(stop)
</script>
