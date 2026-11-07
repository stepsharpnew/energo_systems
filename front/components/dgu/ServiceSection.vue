<template>
<section class="section service" id="service" data-svc :class="{ 'is-armed': !reduced, 'is-in': revealed }">
  <div class="container">
    <h2 class="section__title">
      <span class="muted">Запустили станцию —</span>
      и остаёмся на связи
    </h2>

    <div class="svc2">
      <article class="mon" data-mon ref="monitor">
        <div class="mon__bg" aria-hidden="true"><img decoding="async" src="/dgu/images/445ad6fada9570e8.webp" alt="" width="900" height="900" loading="lazy"></div>
        <i class="mon__shade" aria-hidden="true"></i>
        <span class="mon__tag">Отдельная услуга</span>

        <div class="mon__screen" aria-hidden="true">
          <p class="mon__h"><span><i></i>Удалённый мониторинг</span><span data-mon-state>{{ status.text }}</span></p>
          <ul class="mon__flow">
            <li class="mon__node" data-n="grid" :class="status.grid.class">
              <span class="mon__ic"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2 4 14h6l-1 8 9-12h-6z"/></svg></span>
              <b>Сеть</b><em data-v>{{ status.grid.text }}</em>
            </li>
            <li class="mon__node" data-n="ups" :class="status.ups.class">
              <span class="mon__ic"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="8" width="16" height="9" rx="2"/><path d="M21 11v3M7 12h4"/></svg></span>
              <b>ИБП</b><em data-v>{{ status.ups.text }}</em>
            </li>
            <li class="mon__node" data-n="gen" :class="status.gen.class">
              <span class="mon__ic"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1"/></svg></span>
              <b>ДГУ</b><em data-v>{{ status.gen.text }}</em>
            </li>
          </ul>
          <div class="mon__fuel"><span>Топливо</span><div class="mon__bar"><b data-fuel :style="{ width: status.fuel + '%' }"></b></div><strong data-fuel-n>{{ status.fuel }}%</strong></div>
        </div>

        <div class="mon__cap">
          <h3>Удалённый мониторинг</h3>
          <p>Состояние сети, ИБП и станции, уровень топлива и аварии — на одном экране. Подключается отдельной услугой на объектах, где есть связь.</p>
          <ul class="mon__chips"><li>Сеть и фазы</li><li>Заряд ИБП</li><li>Уровень топлива</li><li>Уведомления об авариях</li></ul>
        </div>
      </article>

      <ul class="svc2__list">
        <li class="svc__item">
          <h3 class="svc__t">Гарантийное и послегарантийное обслуживание</h3>
          <p class="svc__d">Регламентные работы, замена расходников и запчастей, чтобы станция запускалась с первой попытки. Условия гарантии фиксируем в договоре и паспорте оборудования.</p>
        </li>
        <li class="svc__item">
          <h3 class="svc__t">Поддержка и выезд</h3>
          <p class="svc__d">Понятный контакт для обращений. Выезд инженера на объект — по согласованию, с учётом региона. Условия записываем в договор обслуживания.</p>
          <span class="svc__flag">По согласованию</span>
        </li>
        <li class="svc__item">
          <h3 class="svc__t">Топливо и расходники</h3>
          <p class="svc__d">Поможем организовать поставку топлива и расходных материалов. Условия зависят от региона объекта и согласуются заранее.</p>
          <span class="svc__flag">По согласованию</span>
        </li>
      </ul>
    </div>

    <p class="svc__geo"><b>Работаем по всей России.</b> Проектирование, поставка и монтаж — на любом объекте. Формат сервиса, выезд и поставки топлива обсуждаем отдельно под регион и задачи объекта.</p>

    <div class="svc__cta">
      <button class="btn-pill" type="button" data-callback-open data-callback-title="Сервис и мониторинг" data-callback-text="Оставьте контакт: расскажем об условиях обслуживания и удалённого мониторинга для вашего объекта." @click="requestCallback({&quot;title&quot;: &quot;Сервис и мониторинг&quot;, &quot;text&quot;: &quot;Оставьте контакт: расскажем об условиях обслуживания и удалённого мониторинга для вашего объекта.&quot;})">
        <span>Обсудить сервис и мониторинг</span>
        <span class="btn-pill__icon" aria-hidden="true"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg></span>
      </button>
    </div>
  </div>
  
</section>
</template>

<script setup>
const emit = defineEmits(['callback'])
const requestCallback = payload => emit('callback', payload)
import { useDguVisibility } from '~/composables/useDguVisibility.js'
const props = defineProps({ reduced: Boolean })
const monitor = ref(null), stage = ref(0), revealed = ref(false)
const visible = useDguVisibility(monitor)
const normal = { grid: { class: 'is-ok', text: 'норма' }, ups: { class: 'is-ok', text: 'заряд 100%' }, gen: { class: 'is-ok', text: 'готова' }, text: 'Все системы в норме', fuel: 82 }
const stages = [
  normal,
  { ...normal, grid: { class: 'is-bad', text: 'нет сети' }, text: 'Событие: пропала сеть' },
  { ...normal, grid: { class: 'is-bad is-link', text: 'нет сети' }, ups: { class: 'is-run', text: 'держит нагрузку' }, text: 'ИБП держит нагрузку' },
  { ...normal, grid: { class: 'is-bad is-link', text: 'нет сети' }, ups: { class: 'is-run is-link', text: 'держит нагрузку' }, gen: { class: 'is-run', text: 'запуск' }, text: 'Автозапуск ДГУ' },
  { ...normal, grid: { class: 'is-bad is-link', text: 'нет сети' }, ups: { class: 'is-ok is-link', text: 'заряд 100%' }, gen: { class: 'is-run', text: 'на нагрузке' }, text: 'Нагрузку принимает ДГУ', fuel: 81 },
  { ...normal, grid: { class: 'is-ok', text: 'вернулась' }, ups: { class: 'is-ok is-link', text: 'заряд 100%' }, gen: { class: 'is-run', text: 'на нагрузке' }, text: 'Сеть восстановлена', fuel: 80 },
  { ...normal, grid: { class: 'is-ok', text: 'вернулась' }, fuel: 80 }
]
const status = computed(() => stages[stage.value])
let timers = []
const stop = () => { timers.forEach(clearTimeout); timers = [] }
function run() {
  stop()
  if (props.reduced || !visible.value) return
  stage.value = 0
  ;[0, 1700, 2900, 4300, 6000, 8200, 9600].forEach((delay, index) => { timers.push(setTimeout(() => { stage.value = index }, delay)) })
  timers.push(setTimeout(run, 12500))
}
watch([visible, () => props.reduced], () => { if (visible.value) revealed.value = true; run() })
onBeforeUnmount(stop)
</script>
