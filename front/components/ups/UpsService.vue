<template>
<section class="section section--dark service" id="service" data-svc ref="section" :class="{ 'is-armed': !reduced, 'is-in': revealed, 'is-in-svc': revealed }">
  <div class="container">
    <h2 class="section__title">
      <span class="muted">Вы не остаётесь один на один</span>
      со сложным оборудованием
    </h2>

    <div class="svc" :class="{ 'is-in': revealed }">
      <figure class="svc__photo">
        <img v-bind="imageAttrs('/ups/service-generator.webp', { sizes: '(max-width: 768px) 100vw, 50vw', width: 800 })" alt="Обслуживаемая дизельная электростанция у дома" loading="lazy">
        <i class="svc__shade" aria-hidden="true"></i>
        <div class="svc__hud" aria-hidden="true">
          <p class="svc__hud-h"><i></i>Регламентная проверка</p>
          <ul data-svc-chk>
            <li :class="{ 'is-ok': completed > 0 }">Состояние АКБ<em>норма</em></li>
            <li :class="{ 'is-ok': completed > 1 }">Автоматика и соединения<em>норма</em></li>
            <li :class="{ 'is-ok': completed > 2 }">Тестовый запуск ДГУ<em>выполнен</em></li>
            <li :class="{ 'is-ok': completed > 3 }">Испытание под нагрузкой<em>выполнено</em></li>
          </ul>
        </div>
        <figcaption class="svc__cap">
          <span class="svc__tag">Сопровождение системы</span>
          <h3>Готовность к отключению<br>проверяем заранее</h3>
          <p>Регламентные проверки и тестовые запуски помогают поддерживать резерв в рабочем состоянии.</p>
        </figcaption>
      </figure>

      <ol class="svc__list">
        <li style="--i:0"><span>01</span><div><h3>Регламентное обслуживание</h3><p>Проверка АКБ, автоматики и соединений. Тестовые запуски ДГУ и испытания под нагрузкой.</p></div></li>
        <li style="--i:1"><span>02</span><div><h3>Удалённый мониторинг</h3><p>Контроль сети, заряда и событий системы. Круглосуточный сбор данных — при подключённой услуге и доступном канале связи.</p></div></li>
        <li style="--i:2"><span>03</span><div><h3>Поддержка и выезд</h3><p>Понятный контакт для обращения. Время реакции и условия выезда фиксируем в договоре обслуживания.</p></div></li>
        <li style="--i:3"><span>04</span><div><h3>ДГУ и топливное обеспечение</h3><p>Контроль готовности генератора, обслуживание по регламенту и организация доставки топлива по согласованным условиям.</p></div></li>
      </ol>
    </div>

    <div class="svc__bottom">
      <p>Объём сервиса выбираем вместе.<br><span>Мониторинг 24/7 и круглосуточный выезд — разные условия договора.</span></p>
      <div class="svc__cta">
        <button class="btn-pill" type="button" data-callback-open @click="openCallback({ title: $event.currentTarget.dataset.callbackTitle, text: $event.currentTarget.dataset.callbackText })" data-callback-title="Обслуживание системы" data-callback-text="Оставьте контакт: инженер расскажет, какой объём сервиса подойдёт вашему объекту.">
          <span>Обсудить обслуживание</span>
          <span class="btn-pill__icon" aria-hidden="true"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg></span>
        </button>
      </div>
    </div>
  </div>
</section>
</template>

<script setup>
import { imageAttrs } from '~/utils/responsiveImage.js'
import { useUpsVisibility } from '~/composables/useUpsVisibility.js'
const openCallback = inject('upsCallback')
const section = ref(null)
const revealed = ref(false)
const completed = ref(0)
const { visible, reduced } = useUpsVisibility(section)
let timers = []
function stop() { timers.forEach(clearTimeout); timers = [] }
function play() {
  stop()
  completed.value = 0
  for (let index = 0; index < 4; index++) timers.push(setTimeout(() => { completed.value = index + 1 }, 1100 + index * 900))
  timers.push(setTimeout(() => { if (visible.value) play() }, 7900))
}
watch([visible, reduced], () => {
  stop()
  if (!visible.value) { completed.value = 0; return }
  revealed.value = true
  if (reduced.value) completed.value = 4
  else play()
})
onBeforeUnmount(stop)
</script>
