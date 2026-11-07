<template>
<section class="section section--dark trust-sec" id="guarantees" data-trust ref="section">
  <div class="container">
    <h2 class="section__title">
      <span class="muted">Отвечаем за результат —</span>
      договором, а не словами
    </h2>

    <div class="tgrid">
      <ol class="fears">
        <li class="fear" :class="{ 'is-done': completed > 0, 'is-hot': active === 0 }" @mouseenter="active = 0" @mouseleave="active = -1" @click="selectKey(0)" data-fear="0">
          <span class="fear__no" aria-hidden="true">1</span>
          <div>
            <p class="fear__q"><span>Подберут не ту мощность</span></p>
            <p class="fear__a">Считаем нагрузку по вашему перечню и замерам. Мощность и ёмкость АКБ закрепляем в спецификации договора.</p>
          </div>
        </li>
        <li class="fear" :class="{ 'is-done': completed > 1, 'is-hot': active === 1 }" @mouseenter="active = 1" @mouseleave="active = -1" @click="selectKey(1)" data-fear="1">
          <span class="fear__no" aria-hidden="true">2</span>
          <div>
            <p class="fear__q"><span>Оборудование не подойдёт к вводу</span></p>
            <p class="fear__a">Схему подключения делает свой отдел проектирования ещё до закупки оборудования.</p>
          </div>
        </li>
        <li class="fear" :class="{ 'is-done': completed > 2, 'is-hot': active === 2 }" @mouseenter="active = 2" @mouseleave="active = -1" @click="selectKey(2)" data-fear="2">
          <span class="fear__no" aria-hidden="true">3</span>
          <div>
            <p class="fear__q"><span>Монтаж сделают без ответственности</span></p>
            <p class="fear__a">Один договор на проектирование, поставку, монтаж и запуск. Ведёт объект одна команда.</p>
          </div>
        </li>
        <li class="fear" :class="{ 'is-done': completed > 3, 'is-hot': active === 3 }" @mouseenter="active = 3" @mouseleave="active = -1" @click="selectKey(3)" data-fear="3">
          <span class="fear__no" aria-hidden="true">4</span>
          <div>
            <p class="fear__q"><span>Цена вырастет по ходу работ</span></p>
            <p class="fear__a">Цена фиксируется в договоре после технического аудита объекта.</p>
          </div>
        </li>
      </ol>

      <div class="doc" :class="{ 'is-in': played, 'is-signed': signed }" data-doc>
        <div class="board">
          <i class="board__clip" aria-hidden="true"></i>
          <div class="doc__paper">
            <div class="doc__scroll" data-doc-scroll ref="sheet" @wheel.passive="userTook = true" @touchstart.passive="userTook = true" @pointerdown="userTook = true" @keydown="userTook = true" tabindex="0" aria-label="Текст договора, прокручивается">
              <!-- TODO: текст договора написан как типовой проект; сроки гарантии, порядок оплаты, реквизиты и фамилию директора подтвердит заказчик/юрист -->
              <h3 class="c-title">Договор № ЭС-______</h3>
              <p class="c-sub">на проектирование, поставку и монтаж системы резервного электроснабжения</p>
              <p class="c-place"><span>г. Москва</span><span>«__» __________ 2026 г.</span></p>
              <p class="c-pre">Общество с ограниченной ответственностью «Энергосистемы», именуемое в дальнейшем «Исполнитель», в лице генерального директора ____________________, действующего на основании Устава, с одной стороны, и ____________________________, именуемый(ое) в дальнейшем «Заказчик», с другой стороны, совместно именуемые «Стороны», заключили настоящий договор о нижеследующем.</p>

              <h4>1. Предмет договора</h4>
              <p>1.1. Исполнитель обязуется выполнить проектирование, поставку оборудования, монтаж и пусконаладку системы бесперебойного (резервного) электроснабжения (далее — «Система») на объекте Заказчика по адресу: ____________________, а Заказчик обязуется принять результат работ и оплатить его.</p>
              <p class="key" :class="{ 'is-done': completed > 0, 'is-hot': active === 0 }" :ref="element => keys[0] = element" data-key="0">1.2. Мощность источника бесперебойного питания, ёмкость аккумуляторных батарей и состав оборудования определяются расчётом нагрузки и фиксируются в Спецификации (Приложение № 1), которая является неотъемлемой частью договора.</p>
              <p>1.3. Результатом работ является Система, автоматически переключающая объект на резервное питание при отключении внешней сети и возвращающая его на сеть после восстановления.</p>

              <h4>2. Обязанности Исполнителя</h4>
              <p>2.1. Провести технический аудит объекта: проверить ввод и вводно-распределительное устройство, определить точку подключения и место установки, получить перечень и фактическую нагрузку резервируемых потребителей.</p>
              <p class="key" :class="{ 'is-done': completed > 1, 'is-hot': active === 1 }" :ref="element => keys[1] = element" data-key="1">2.2. До закупки оборудования разработать проектные решения: расчёт нагрузки, схему подключения Системы к электрической сети объекта и Спецификацию.</p>
              <p>2.3. Поставить оборудование в соответствии со Спецификацией и совместно с Заказчиком проверить комплектность при передаче.</p>
              <p>2.4. Выполнить монтаж и пусконаладку Системы, провести испытания под нагрузкой и обучить Заказчика правилам эксплуатации.</p>
              <p class="key" :class="{ 'is-done': completed > 2, 'is-hot': active === 2 }" :ref="element => keys[2] = element" data-key="2">2.5. Выполнять работы на всех этапах — от технического аудита до сдачи объекта — силами своей команды под руководством назначенного ответственного инженера. Привлечение третьих лиц допускается только с письменного согласия Заказчика.</p>
              <p>2.6. Передать Заказчику паспорта оборудования, схему подключения, протокол испытаний и инструкцию по эксплуатации при подписании акта приёмки.</p>

              <h4>3. Обязанности Заказчика</h4>
              <p>3.1. Обеспечить Исполнителю доступ на объект и в помещение, выделенное под установку Системы, в согласованные сроки.</p>
              <p>3.2. Предоставить имеющуюся документацию на электроснабжение объекта: схемы, технические условия, данные о вводе и щитовом оборудовании.</p>
              <p>3.3. Своевременно принять работы и произвести оплату в порядке, установленном разделом 5.</p>

              <h4>4. Сроки выполнения работ</h4>
              <p>4.1. Начало работ — «__» __________ 20__ г. Окончание работ и сдача объекта — «__» __________ 20__ г.</p>
              <p>4.2. Сроки продлеваются на период задержки, возникшей по вине Заказчика или в результате обстоятельств непреодолимой силы.</p>

              <h4>5. Цена и порядок расчётов</h4>
              <p class="key" :class="{ 'is-done': completed > 3, 'is-hot': active === 3 }" :ref="element => keys[3] = element" data-key="3">5.1. Цена договора определяется по итогам технического аудита, указывается в Спецификации и в течение срока действия договора не изменяется в одностороннем порядке.</p>
              <p>5.2. Оплата производится в следующем порядке: предоплата на закупку оборудования — ___ % от цены договора; оставшаяся часть — после подписания акта приёмки работ.</p>
              <p>5.3. Дополнительные работы, не предусмотренные Спецификацией, выполняются и оплачиваются только на основании письменного дополнительного соглашения.</p>
              <table class="c-table">
                <caption>Приложение № 1. Спецификация (пример заполнения)</caption>
                <tbody>
                  <tr><td>Инвертор 5 кВт — 3 шт.; АКБ LiFePO4 5,12 кВт·ч — 3 шт.; байпасный щит; комплект проводов</td><td>756 900 ₽</td></tr>
                  <tr><td>Монтаж, доставка, пусконаладка</td><td>324 400 ₽</td></tr>
                  <tr class="c-total"><td>Итого</td><td>1 081 300 ₽</td></tr>
                </tbody>
              </table>

              <h4>6. Приёмка работ</h4>
              <p>6.1. О завершении работ Исполнитель уведомляет Заказчика. Заказчик в течение трёх рабочих дней назначает дату приёмки и подписывает акт либо направляет мотивированные замечания.</p>
              <p>6.2. При выявлении недостатков Стороны письменно фиксируют перечень и срок их устранения.</p>

              <h4>7. Гарантийные обязательства</h4>
              <p>7.1. Гарантийный срок на выполненные работы составляет ___ месяцев со дня подписания акта приёмки.</p>
              <p>7.2. На поставленное оборудование действует гарантия его производителя.</p>
              <p>7.3. Гарантия не распространяется на случаи нарушения правил эксплуатации и механические повреждения оборудования.</p>

              <h4>8. Ответственность Сторон и форс-мажор</h4>
              <p>8.1. За неисполнение или ненадлежащее исполнение обязательств Стороны несут ответственность в соответствии с законодательством Российской Федерации.</p>
              <p>8.2. Стороны освобождаются от ответственности, если неисполнение вызвано обстоятельствами непреодолимой силы, возникшими после заключения договора.</p>

              <h4>9. Заключительные положения</h4>
              <p>9.1. Стороны признают действительным обмен подписанными сканированными копиями договора и приложений по электронной почте до получения оригиналов.</p>
              <p>9.2. Споры разрешаются путём переговоров, а при недостижении согласия — в суде по месту нахождения Исполнителя.</p>
              <p>9.3. Договор составлен в двух экземплярах, по одному для каждой из Сторон.</p>

              <h4>10. Реквизиты и подписи Сторон</h4>
              <div class="c-parties">
                <div>
                  <b>Исполнитель</b>
                  ООО «Энергосистемы»<br>ОГРН 1135044003709<br>ИНН 5044089069<br>Солнечногорск, Промышленная ул., с. 5<br>Москва, ул. Руставели, 14с6<br>sales@e-systems.su
                </div>
                <div>
                  <b>Заказчик</b>
                  ФИО ______________<br>Паспорт ___________<br>Адрес ____________<br>Тел. _____________<br>E-mail ___________
                </div>
              </div>

              <div class="doc__sign">
                <div>
                  <p class="doc__who">От Исполнителя, ООО «Энергосистемы»</p>
                  <svg class="sig" viewBox="0 0 220 70" fill="none" stroke="#1B2A5C" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path class="sig__p" pathLength="1" d="M8 46c14-30 24-38 30-30 5 8-14 38-8 40 9 3 24-34 36-30 8 3-4 24 4 26 10 2 18-18 28-18 7 0 2 14 10 14 12 0 20-14 40-20 9-3 28-4 42 6"/><path class="sig__p sig__p--2" pathLength="1" d="M70 60c40-8 90-10 140-4"/></svg>
                </div>
                <svg class="seal" viewBox="0 0 120 120" aria-hidden="true">
                  <defs><path id="sealpath" d="M60 60m-42 0a42 42 0 1 1 84 0a42 42 0 1 1-84 0"/></defs>
                  <circle cx="60" cy="60" r="55" fill="none" stroke="#B3402F" stroke-width="3"/>
                  <circle cx="60" cy="60" r="31" fill="none" stroke="#B3402F" stroke-width="1.6"/>
                  <text font-size="11.5" font-weight="800" letter-spacing="2.2" fill="#B3402F"><textPath href="#sealpath" startOffset="2">ЭНЕРГОСИСТЕМЫ · ЭНЕРГОСИСТЕМЫ · ДОГОВОР ·</textPath></text>
                  <path d="M52 42h14l-6 15h9L52 82l5-19h-8z" fill="#B3402F"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <dl class="req">
      <div><dt>Работаем как юрлицо</dt><dd>ООО «Энергосистемы», договор и оплата по счёту</dd></div>
      <div><dt>Реквизиты для проверки</dt><dd>ОГРН 1135044003709<br>ИНН 5044089069</dd></div>
      <div><dt>Два офиса</dt><dd>Солнечногорск и Москва, выезд инженеров по всей области</dd></div>
    </dl>

    <div class="trust-sec__cta">
      <button class="btn-pill" type="button" data-callback-open @click="openCallback({ title: $event.currentTarget.dataset.callbackTitle, text: $event.currentTarget.dataset.callbackText })" data-callback-title="Запросить договор и реквизиты" data-callback-text="Оставьте контакт: пришлём форму договора и реквизиты для проверки контрагента.">
        <span>Запросить договор и реквизиты</span>
        <span class="btn-pill__icon" aria-hidden="true"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg></span>
      </button>
    </div>
  </div>
</section>
</template>

<script setup>
import { useUpsVisibility } from '~/composables/useUpsVisibility.js'
const openCallback = inject('upsCallback')
const section = ref(null)
const sheet = ref(null)
const keys = []
const completed = ref(0)
const active = ref(-1)
const played = ref(false)
const signed = ref(false)
const userTook = ref(false)
const { visible, reduced } = useUpsVisibility(section)
const timers = []
function scrollKey(index) { if (!userTook.value && sheet.value && keys[index]) sheet.value.scrollTo({ top: Math.max(0, keys[index].offsetTop - 70), behavior: reduced.value ? 'auto' : 'smooth' }) }
function selectKey(index) { if (completed.value > index) { userTook.value = false; scrollKey(index) } }
watch(visible, shown => {
  if (!shown || played.value) return
  played.value = true
  if (reduced.value) { completed.value = 4; signed.value = true; return }
  for (let index = 0; index < 4; index++) {
    timers.push(setTimeout(() => scrollKey(index), 400 + index * 3600), setTimeout(() => { completed.value = index + 1 }, 1400 + index * 3600))
  }
  timers.push(setTimeout(() => { if (!userTook.value) sheet.value?.scrollTo({ top: sheet.value.scrollHeight, behavior: 'smooth' }) }, 14100), setTimeout(() => { signed.value = true }, 15900))
})
onBeforeUnmount(() => timers.forEach(clearTimeout))
</script>
