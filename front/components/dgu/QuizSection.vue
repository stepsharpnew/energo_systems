<template>
<section class="section" id="quiz">
  <div class="container">
    <h2 class="section__title">
      <span class="muted">Пять вопросов об объекте —</span>
      и подберём электростанцию под вашу нагрузку
    </h2>

    <div class="quiz" data-quiz :class="{ 'is-done': sent }">
      <div class="quiz__card">
        <div class="quiz__bar" aria-hidden="true"><i data-quiz-bar :style="{ width: progress + '%' }"></i></div>

        <form class="quiz__form" novalidate data-quiz-form @submit.prevent="next" @keydown.enter="enter" ref="form">
          <fieldset class="qstep" data-step="1" :hidden="step !== 0 || sent">
            <legend class="qstep__title">Для какого направления резервируем?</legend>
            <p class="qstep__hint">Выберите один вариант</p>
          <div class="opts">
            <label class="opt"><input type="radio" name="direction" value="Для бизнеса" v-model="fields.direction"><span class="opt__mark" aria-hidden="true"></span><span class="opt__text">Для бизнеса<span class="opt__sub">торговые и бизнес-центры, отели, клиники, склады</span></span></label>
            <label class="opt"><input type="radio" name="direction" value="Для строительства" v-model="fields.direction"><span class="opt__mark" aria-hidden="true"></span><span class="opt__text">Для строительства<span class="opt__sub">площадки, вахтовые городки, строящиеся объекты</span></span></label>
            <label class="opt"><input type="radio" name="direction" value="Для промышленности" v-model="fields.direction"><span class="opt__mark" aria-hidden="true"></span><span class="opt__text">Для промышленности<span class="opt__sub">заводы, цеха, насосные и добывающие площадки</span></span></label>
            <label class="opt"><input type="radio" name="direction" value="Для инфраструктуры" v-model="fields.direction"><span class="opt__mark" aria-hidden="true"></span><span class="opt__text">Для инфраструктуры<span class="opt__sub">АЗС, связь, транспорт, ЖКХ и поселки</span></span></label>
          </div>
          </fieldset>

          <fieldset class="qstep" data-step="2" :hidden="step !== 1 || sent">
            <legend class="qstep__title">Какой именно объект резервируем?</legend>
            <p class="qstep__hint">Выберите один вариант</p>
          <div class="opts" data-dir-group="Для бизнеса" :hidden="fields.direction !== 'Для бизнеса'">
            <label class="opt"><input type="radio" name="object" value="Торговый центр" v-model="fields.object"><span class="opt__mark" aria-hidden="true"></span><span class="opt__text">Торговый центр<span class="opt__sub">магазины, холодильники, лифты, эскалаторы</span></span></label>
            <label class="opt"><input type="radio" name="object" value="Бизнес-центр или офисное здание" v-model="fields.object"><span class="opt__mark" aria-hidden="true"></span><span class="opt__text">Бизнес-центр или офис<span class="opt__sub">серверные, лифты, вентиляция, охрана</span></span></label>
            <label class="opt"><input type="radio" name="object" value="Отель" v-model="fields.object"><span class="opt__mark" aria-hidden="true"></span><span class="opt__text">Отель<span class="opt__sub">номера, кухня, лифты, освещение</span></span></label>
            <label class="opt"><input type="radio" name="object" value="Больница или клиника" v-model="fields.object"><span class="opt__mark" aria-hidden="true"></span><span class="opt__text">Больница или клиника<span class="opt__sub">операционные, реанимация, диагностика</span></span></label>
            <label class="opt"><input type="radio" name="object" value="Склад или логистический комплекс" v-model="fields.object"><span class="opt__mark" aria-hidden="true"></span><span class="opt__text">Склад или логистика<span class="opt__sub">холодильные камеры, ворота, автоматика</span></span></label>
            <label class="opt"><input type="radio" name="object" value="Другой коммерческий объект" v-model="fields.object"><span class="opt__mark" aria-hidden="true"></span><span class="opt__text">Другой объект<span class="opt__sub">опишем в заявке</span></span></label>
          </div>
          <div class="opts" data-dir-group="Для строительства" :hidden="fields.direction !== 'Для строительства'">
            <label class="opt"><input type="radio" name="object" value="Строительная площадка" v-model="fields.object"><span class="opt__mark" aria-hidden="true"></span><span class="opt__text">Строительная площадка<span class="opt__sub">краны, насосы, освещение, бытовки</span></span></label>
            <label class="opt"><input type="radio" name="object" value="Вахтовый городок" v-model="fields.object"><span class="opt__mark" aria-hidden="true"></span><span class="opt__text">Вахтовый городок<span class="opt__sub">жильё, столовая, котельная</span></span></label>
            <label class="opt"><input type="radio" name="object" value="Строящийся объект" v-model="fields.object"><span class="opt__mark" aria-hidden="true"></span><span class="opt__text">Строящийся объект<span class="opt__sub">резерв на время работ и пусконаладки</span></span></label>
            <label class="opt"><input type="radio" name="object" value="Другой объект строительства" v-model="fields.object"><span class="opt__mark" aria-hidden="true"></span><span class="opt__text">Другой объект<span class="opt__sub">опишем в заявке</span></span></label>
          </div>
          <div class="opts" data-dir-group="Для промышленности" :hidden="fields.direction !== 'Для промышленности'">
            <label class="opt"><input type="radio" name="object" value="Завод или производственный цех" v-model="fields.object"><span class="opt__mark" aria-hidden="true"></span><span class="opt__text">Завод или цех<span class="opt__sub">линии, станки, насосы, автоматика</span></span></label>
            <label class="opt"><input type="radio" name="object" value="Насосная или компрессорная станция" v-model="fields.object"><span class="opt__mark" aria-hidden="true"></span><span class="opt__text">Насосная или компрессорная<span class="opt__sub">станции, перекачка, котельные</span></span></label>
            <label class="opt"><input type="radio" name="object" value="Добыча и нефтегаз" v-model="fields.object"><span class="opt__mark" aria-hidden="true"></span><span class="opt__text">Добыча и нефтегаз<span class="opt__sub">промысловые площадки, вахтовые объекты</span></span></label>
            <label class="opt"><input type="radio" name="object" value="Другое производство" v-model="fields.object"><span class="opt__mark" aria-hidden="true"></span><span class="opt__text">Другое производство<span class="opt__sub">опишем в заявке</span></span></label>
          </div>
          <div class="opts" data-dir-group="Для инфраструктуры" :hidden="fields.direction !== 'Для инфраструктуры'">
            <label class="opt"><input type="radio" name="object" value="АЗС" v-model="fields.object"><span class="opt__mark" aria-hidden="true"></span><span class="opt__text">АЗС<span class="opt__sub">колонки, касса, освещение, насосы</span></span></label>
            <label class="opt"><input type="radio" name="object" value="Связь и вышки" v-model="fields.object"><span class="opt__mark" aria-hidden="true"></span><span class="opt__text">Связь и вышки<span class="opt__sub">базовые станции, узлы связи</span></span></label>
            <label class="opt"><input type="radio" name="object" value="Транспорт и дороги" v-model="fields.object"><span class="opt__mark" aria-hidden="true"></span><span class="opt__text">Транспорт и дороги<span class="opt__sub">подстанции, развязки, освещение</span></span></label>
            <label class="opt"><input type="radio" name="object" value="ЖКХ и поселки" v-model="fields.object"><span class="opt__mark" aria-hidden="true"></span><span class="opt__text">ЖКХ и поселки<span class="opt__sub">котельные, водозаборы, насосные</span></span></label>
          </div>
          </fieldset>

          <fieldset class="qstep" data-step="3" :hidden="step !== 2 || sent">
            <legend class="qstep__title">Какие нагрузки резервируем?</legend>
            <p class="qstep__hint">Можно выбрать несколько вариантов</p>
          <div class="opts">
            <label class="opt"><input type="checkbox" name="loads" value="Весь объект целиком" v-model="fields.loads"><span class="opt__mark" aria-hidden="true"></span><span class="opt__text">Весь объект целиком</span></label>
            <label class="opt"><input type="checkbox" name="loads" value="Рабочее и аварийное освещение" v-model="fields.loads"><span class="opt__mark" aria-hidden="true"></span><span class="opt__text">Рабочее и аварийное освещение</span></label>
            <label class="opt"><input type="checkbox" name="loads" value="Холодильное и торговое оборудование" v-model="fields.loads"><span class="opt__mark" aria-hidden="true"></span><span class="opt__text">Холодильное и торговое оборудование</span></label>
            <label class="opt"><input type="checkbox" name="loads" value="Лифты и эскалаторы" v-model="fields.loads"><span class="opt__mark" aria-hidden="true"></span><span class="opt__text">Лифты и эскалаторы</span></label>
            <label class="opt"><input type="checkbox" name="loads" value="Медицинское оборудование и системы жизнеобеспечения" v-model="fields.loads"><span class="opt__mark" aria-hidden="true"></span><span class="opt__text">Медицинское оборудование и системы жизнеобеспечения</span></label>
            <label class="opt"><input type="checkbox" name="loads" value="Вентиляция и кондиционирование" v-model="fields.loads"><span class="opt__mark" aria-hidden="true"></span><span class="opt__text">Вентиляция и кондиционирование</span></label>
            <label class="opt"><input type="checkbox" name="loads" value="Топливораздаточные колонки и насосы" v-model="fields.loads"><span class="opt__mark" aria-hidden="true"></span><span class="opt__text">Топливораздаточные колонки и насосы</span></label>
            <label class="opt"><input type="checkbox" name="loads" value="Пожарные насосы и сигнализация" v-model="fields.loads"><span class="opt__mark" aria-hidden="true"></span><span class="opt__text">Пожарные насосы и сигнализация</span></label>
            <label class="opt"><input type="checkbox" name="loads" value="Серверная, связь и охрана" v-model="fields.loads"><span class="opt__mark" aria-hidden="true"></span><span class="opt__text">Серверная, связь и охрана</span></label>
          </div>
          </fieldset>

          <fieldset class="qstep" data-step="4" :hidden="step !== 3 || sent">
            <legend class="qstep__title">Расчётная мощность нагрузки</legend>
            <p class="qstep__hint">Если нагрузка известна, укажите её. Нет — рассчитаем по перечню потребителей</p>
          <div class="opts">
            <label class="opt"><input type="radio" name="power" value="30–60 кВт" v-model="fields.power" @change="choosePower"><span class="opt__mark" aria-hidden="true"></span><span class="opt__text">30–60 кВт<span class="opt__sub">небольшой объект, часть нагрузок</span></span></label>
            <label class="opt"><input type="radio" name="power" value="60–150 кВт" v-model="fields.power" @change="choosePower"><span class="opt__mark" aria-hidden="true"></span><span class="opt__text">60–150 кВт<span class="opt__sub">клиника, АЗС, малый торговый объект</span></span></label>
            <label class="opt"><input type="radio" name="power" value="150–300 кВт" v-model="fields.power" @change="choosePower"><span class="opt__mark" aria-hidden="true"></span><span class="opt__text">150–300 кВт<span class="opt__sub">средний торговый или медицинский объект</span></span></label>
            <label class="opt"><input type="radio" name="power" value="300–600 кВт" v-model="fields.power" @change="choosePower"><span class="opt__mark" aria-hidden="true"></span><span class="opt__text">300–600 кВт<span class="opt__sub">большой ТЦ, больница</span></span></label>
            <label class="opt"><input type="radio" name="power" value="Больше 600 кВт" v-model="fields.power" @change="choosePower"><span class="opt__mark" aria-hidden="true"></span><span class="opt__text">Больше 600 кВт<span class="opt__sub">крупный комплекс, несколько станций</span></span></label>
            <label class="opt"><input type="radio" name="power" value="Не знаю" v-model="fields.power" @change="choosePower"><span class="opt__mark" aria-hidden="true"></span><span class="opt__text">Не знаю<span class="opt__sub">рассчитайте по перечню</span></span></label>
          </div>
            <label class="field field--kw"><span>Или назовите свою мощность, кВт</span>
              <input id="quiz-kw" type="number" name="kw" min="1" max="5000" inputmode="numeric" placeholder="Например, 250" v-model="fields.kw" @input="chooseKw"></label>
          </fieldset>

          <fieldset class="qstep" data-step="5" :hidden="step !== 4 || sent">
            <legend class="qstep__title">Какая категория надёжности электроснабжения?</legend>
            <p class="qstep__hint">От неё зависят схема АВР и нужен ли ИБП для самых критичных линий. Точную категорию определяем по проекту объекта</p>
          <div class="opts">
            <label class="opt"><input type="radio" name="autonomy" value="I категория, перерыв недопустим" v-model="fields.autonomy"><span class="opt__mark" aria-hidden="true"></span><span class="opt__text">I категория<span class="opt__sub">перерыв недопустим: операционные, реанимация</span></span></label>
            <label class="opt"><input type="radio" name="autonomy" value="II категория, допустим перерыв на ввод резерва" v-model="fields.autonomy"><span class="opt__mark" aria-hidden="true"></span><span class="opt__text">II категория<span class="opt__sub">перерыв на время ввода резерва: ТЦ, АЗС</span></span></label>
            <label class="opt"><input type="radio" name="autonomy" value="III категория, допустим перерыв до суток" v-model="fields.autonomy"><span class="opt__mark" aria-hidden="true"></span><span class="opt__text">III категория<span class="opt__sub">допустим перерыв, запуск вручную</span></span></label>
            <label class="opt"><input type="radio" name="autonomy" value="Не знаю" v-model="fields.autonomy"><span class="opt__mark" aria-hidden="true"></span><span class="opt__text">Не знаю<span class="opt__sub">определим по объекту</span></span></label>
          </div>
          </fieldset>

<fieldset class="qstep" data-step="6" :hidden="step !== 5 || sent">
            <legend class="qstep__title">Куда прислать расчёт?</legend>
            <p class="qstep__hint">Инженер свяжется и уточнит исходные данные по объекту</p>
            <div class="qfields">
              <label class="field"><span>Имя</span><input id="quiz-name" type="text" name="name" autocomplete="name" v-model="fields.name"></label>
              <label class="field"><span>Телефон</span><input id="quiz-phone" type="tel" name="phone" autocomplete="tel" inputmode="tel" placeholder="+7 (___) ___-__-__" data-phone :value="fields.phone" @input="fields.phone = maskLandingPhone($event.target.value)"></label>
    <CallbackPreferences v-model="fields.callbackPreferences" />
            </div>
            <p class="qlabel">Как с вами связаться</p>
          <div class="chips">
            <label class="chip"><input type="radio" name="channel" value="Звонок" v-model="fields.channel"><span>Звонок</span></label>
            <label class="chip"><input type="radio" name="channel" value="Max" v-model="fields.channel"><span>Max</span></label>
            <label class="chip"><input type="radio" name="channel" value="Telegram" v-model="fields.channel"><span>Telegram</span></label>
          </div>
            <p class="qlabel">Когда планируете установку</p>
          <div class="chips">
            <label class="chip"><input type="radio" name="when" value="Срочно" v-model="fields.when"><span>Срочно</span></label>
            <label class="chip"><input type="radio" name="when" value="В течение месяца" v-model="fields.when"><span>В течение месяца</span></label>
            <label class="chip"><input type="radio" name="when" value="Пока изучаю" v-model="fields.when"><span>Пока изучаю</span></label>
          </div>
            <label class="check"><input type="checkbox" name="consent" v-model="fields.consent">
              <span>Согласен на <a href="https://e-systems.su/personal-data-consent" target="_blank" rel="noopener">обработку персональных данных</a></span></label>
            <label class="check"><input type="checkbox" name="policy" v-model="fields.policy">
              <span>Ознакомлен с <a href="https://e-systems.su/privacy" target="_blank" rel="noopener">политикой конфиденциальности</a></span></label>
          </fieldset>

          <div class="quiz__done" data-quiz-done :hidden="!sent" tabindex="-1" ref="done">
            <h3 class="qstep__title">Ваша предварительная конфигурация</h3>
            <dl class="summary">
              <div><dt>Направление</dt><dd data-sum="direction">{{ summary.direction }}</dd></div>
              <div><dt>Объект</dt><dd data-sum="object">{{ summary.object }}</dd></div>
              <div><dt>Нагрузки</dt><dd data-sum="loads">{{ summary.loads }}</dd></div>
              <div><dt>Мощность</dt><dd data-sum="power">{{ summary.power }}</dd></div>
              <div><dt>Категория надёжности</dt><dd data-sum="autonomy">{{ summary.autonomy }}</dd></div>
            </dl>
            <p class="quiz__done-note">Состав электростанции и стоимость инженер пришлёт после уточнения нагрузки. Заявка отправлена.</p>
          </div>

          <p class="quiz__error" data-quiz-error role="alert" :hidden="!error">{{ error }}</p>

          <div class="quiz__foot" data-quiz-foot>
            <span class="quiz__step">Шаг: <b data-quiz-n>{{ step + 1 }}</b>/6</span>
            <div class="quiz__nav">
              <button class="quiz__back" type="button" data-quiz-back aria-label="Назад" :hidden="step === 0" :disabled="pending" @click="back">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 12H5M11 6l-6 6 6 6"/></svg>
              </button>
              <button class="btn-pill btn-pill--quiz" type="button" data-quiz-next :disabled="nextDisabled" @click="next">
                <span data-quiz-next-text>{{ step === 5 ? 'Получить расчёт' : 'Далее' }}</span>
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
              </button>
            </div>
          </div>
        </form>
      </div>

      <aside class="quiz__side">
        <img decoding="async" class="manager__photo" src="/dgu/images/f53ba8b923820694.jpg" alt="Михаил, инженер по резервному питанию" width="300" height="300">
        
        <div class="manager__bubble" aria-live="polite">
          <b>Михаил</b>
          <span class="manager__role">Инженер по резервному питанию, Энергосистемы</span>
          <p data-manager-text :key="message" class="is-swap">{{ message }}</p>
        </div>
        <div class="quiz__aside-text">
          <p class="quiz__aside-title">Пять вопросов — и мы соберём исходные данные для подбора электростанции.</p>
          <p class="quiz__aside-sub">Без обязательств: это предварительный подбор по вашему объекту.</p>
          <div class="quiz__msg">
            <a class="msg msg--max" href="https://max.ru/" aria-label="Написать в Max" target="_blank" rel="noopener"><svg viewBox="0 0 100 100" width="18" height="18" fill="#fff" aria-hidden="true"><path fill-rule="evenodd" clip-rule="evenodd" d="M50.76 0.26C78.29 0.26 99.89 22.6 99.89 50.15C99.89 77.7 77.61 99.49 51.02 99.49C41.59 99.49 37.01 98.16 29.65 92.95C29.14 92.59 28.45 92.68 28.02 93.14C22.36 99.18 7.85 103.43 7.19 95.18C7.19 80.79 0 71.45 0 49.88C0 21.55 23.22 0.26 50.76 0.26ZM51.53 24.81C38.46 24.13 28.26 33.2 26.01 47.38C24.15 59.13 27.45 73.45 30.28 74.18C31.48 74.48 34.36 72.28 36.46 70.3C36.85 69.93 37.45 69.86 37.91 70.15C41.18 72.15 44.88 73.65 48.96 73.86C62.37 74.56 74.26 64.06 74.96 50.65C75.66 37.23 64.94 25.5 51.53 24.8V24.81Z"/></svg></a>
            <a class="msg msg--tg" href="https://t.me/" aria-label="Написать в Telegram" target="_blank" rel="noopener"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 10l-4 4 6 6 4-16-18 7 4 2 2 6 3-4"/></svg></a>
            <span>или напишите в мессенджер</span>
          </div>
        </div>
      </aside>
    </div>
  </div>
</section>
</template>

<script setup>
import { maskLandingPhone, validLandingPhone, submitLandingLead, landingSubmitError } from '~/utils/landingLead.js'
import { emptyCallbackPreferences, getCallbackPreferences } from '~/lib/browser/callbackPreferences.js'
const fields = reactive({ direction: '', object: '', loads: [], power: '', kw: '', autonomy: '', name: '', phone: '', channel: '', when: '', consent: false, policy: false, callbackPreferences: emptyCallbackPreferences() })
const step = ref(0), pending = ref(false), sent = ref(false), error = ref(''), form = ref(null), done = ref(null)
const replies = [
  'Выберите направление: от него зависят схема резервирования, мощность и тип исполнения станции.',
  'Расскажите об объекте: от его типа зависят нагрузки и схема резервирования.',
  'Отметьте, что должна держать электростанция. По перечню рассчитаем суммарную мощность и пусковые токи.',
  'Мощность — главный параметр. Если точных данных нет, выберите «Не знаю»: рассчитаем по перечню потребителей.',
  'От категории надёжности зависят схема АВР и то, нужен ли ИБП для самых критичных линий. Если не уверены, подскажу.',
  'Остался контакт. Расчёт отправлю тем способом связи, который вы выберете.'
]
const kw = computed(() => parseFloat(String(fields.kw).replace(',', '.')) || 0)
const validStep = computed(() => [Boolean(fields.direction), Boolean(fields.object), fields.loads.length > 0, Boolean(fields.power) || kw.value > 0, Boolean(fields.autonomy), true][step.value])
const nextDisabled = computed(() => pending.value || sent.value || !validStep.value)
const progress = computed(() => sent.value ? 100 : (step.value + 1) / 6 * 100)
const message = computed(() => sent.value ? 'Заявка принята. Свяжусь выбранным способом и уточню исходные данные по объекту.' : step.value === 3 && kw.value > 0 && kw.value < 30 ? 'Мы специализируемся на электростанциях от 30 кВт — это наш профиль. Заявку всё равно приму и подскажу решение.' : replies[step.value])
const summary = computed(() => ({ direction: fields.direction, object: fields.object, loads: fields.loads.join(', '), power: kw.value > 0 ? String(kw.value).replace('.', ',') + ' кВт' : fields.power, autonomy: fields.autonomy }))
watch(() => fields.direction, () => { fields.object = '' })
// Radio presets and a custom kW value are alternative answers.
const choosePower = () => { fields.kw = '' }
const chooseKw = () => { if (fields.kw !== '') fields.power = '' }
const back = () => { if (!pending.value && step.value > 0) { step.value--; error.value = '' } }
const enter = event => {
  if (event.target.tagName === 'INPUT' && event.target.type !== 'checkbox') { event.preventDefault(); next() }
}
async function next() {
  if (nextDisabled.value) return
  error.value = ''
  if (step.value < 5) { step.value++; return }
  const name = fields.name.trim()
  if (name.length < 2 || name.length > 80) error.value = 'Укажите имя от 2 до 80 символов'
  else if (!validLandingPhone(fields.phone)) error.value = 'Введите телефон полностью'
  else if (!fields.consent || !fields.policy) error.value = 'Отметьте обе галочки — без них заявку не отправить'
  if (error.value) return
  pending.value = true
  try {
    const value = summary.value
    await submitLandingLead({ type: 'service', name, contact: fields.phone, service: 'Опрос по ДГУ', callbackPreferences: getCallbackPreferences(fields.phone, fields.callbackPreferences), consent: true,
      answers: [
        { label: 'Направление', value: value.direction }, { label: 'Объект', value: value.object }, { label: 'Нагрузки', value: value.loads },
        { label: 'Мощность', value: value.power }, { label: 'Категория надёжности', value: value.autonomy },
        { label: 'Способ связи', value: fields.channel || 'не указан' }, { label: 'Срок установки', value: fields.when || 'не указан' }
      ] })
    sent.value = true
    await nextTick()
    done.value?.focus({ preventScroll: true })
  } catch (failure) { error.value = landingSubmitError(failure) }
  finally { pending.value = false }
}
</script>
