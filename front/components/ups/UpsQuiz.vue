<template>
<section class="section" id="quiz">
  <div class="container">
    <h2 class="section__title">
      <span class="muted">Четыре вопроса об объекте —</span>
      и подготовим расчёт под вашу нагрузку
    </h2>

    <div class="quiz" :class="{ 'is-done': sent }" data-quiz>
      <div class="quiz__card">
        <div class="quiz__bar" aria-hidden="true"><i data-quiz-bar :style="{ width: `${(step + 1) / 5 * 100}%` }"></i></div>

        <form class="quiz__form" novalidate data-quiz-form @submit.prevent="next" @keydown.enter="enter">
          <fieldset class="qstep" data-step="1" :hidden="sent || step !== 0">
            <legend class="qstep__title">Какой объект резервируем?</legend>
            <p class="qstep__hint">Выберите один вариант</p>
          <div class="opts">
            <label class="opt"><input type="radio" name="object" value="Загородный дом" v-model="form.object"><span class="opt__mark" aria-hidden="true"></span><span class="opt__text">Загородный дом<span class="opt__sub">от 250 м²</span></span></label>
            <label class="opt"><input type="radio" name="object" value="Большой дом с хозяйственными постройками" v-model="form.object"><span class="opt__mark" aria-hidden="true"></span><span class="opt__text">Большой дом с хозяйственными постройками<span class="opt__sub">гостевой дом, баня, гараж</span></span></label>
            <label class="opt"><input type="radio" name="object" value="Коттеджный посёлок" v-model="form.object"><span class="opt__mark" aria-hidden="true"></span><span class="opt__text">Коттеджный посёлок<span class="opt__sub">несколько домов или общие сети</span></span></label>
            <label class="opt"><input type="radio" name="object" value="Коммерческий или промышленный объект" v-model="form.object"><span class="opt__mark" aria-hidden="true"></span><span class="opt__text">Коммерческий или промышленный объект<span class="opt__sub">отель, офис, склад, производство</span></span></label>
          </div>
          </fieldset>

          <fieldset class="qstep" data-step="2" :hidden="sent || step !== 1">
            <legend class="qstep__title">Какие нагрузки резервируем?</legend>
            <p class="qstep__hint">Можно выбрать несколько вариантов</p>
          <div class="opts">
            <label class="opt"><input type="checkbox" name="loads" value="Весь объект целиком" v-model="form.loads"><span class="opt__mark" aria-hidden="true"></span><span class="opt__text">Весь объект целиком</span></label>
            <label class="opt"><input type="checkbox" name="loads" value="Котельная и циркуляционные насосы" v-model="form.loads"><span class="opt__mark" aria-hidden="true"></span><span class="opt__text">Котельная и циркуляционные насосы</span></label>
            <label class="opt"><input type="checkbox" name="loads" value="Скважинный насос, вентиляция" v-model="form.loads"><span class="opt__mark" aria-hidden="true"></span><span class="opt__text">Скважинный насос, вентиляция</span></label>
            <label class="opt"><input type="checkbox" name="loads" value="Климат: кондиционеры, тёплые полы" v-model="form.loads"><span class="opt__mark" aria-hidden="true"></span><span class="opt__text">Климат: кондиционеры, тёплые полы</span></label>
            <label class="opt"><input type="checkbox" name="loads" value="Бассейн и спа" v-model="form.loads"><span class="opt__mark" aria-hidden="true"></span><span class="opt__text">Бассейн и спа</span></label>
            <label class="opt"><input type="checkbox" name="loads" value="Кухня и бытовая техника" v-model="form.loads"><span class="opt__mark" aria-hidden="true"></span><span class="opt__text">Кухня и бытовая техника</span></label>
            <label class="opt"><input type="checkbox" name="loads" value="Слаботочные системы: сервер, охрана, видеонаблюдение" v-model="form.loads"><span class="opt__mark" aria-hidden="true"></span><span class="opt__text">Слаботочные системы: сервер, охрана, видеонаблюдение</span></label>
            <label class="opt"><input type="checkbox" name="loads" value="Зарядка электромобиля" v-model="form.loads"><span class="opt__mark" aria-hidden="true"></span><span class="opt__text">Зарядка электромобиля</span></label>
            <label class="opt"><input type="checkbox" name="loads" value="Производственное оборудование" v-model="form.loads"><span class="opt__mark" aria-hidden="true"></span><span class="opt__text">Производственное оборудование</span></label>
          </div>
          </fieldset>

          <fieldset class="qstep" data-step="3" :hidden="sent || step !== 2">
            <legend class="qstep__title">Расчётная мощность нагрузки</legend>
            <p class="qstep__hint">Если нагрузка известна, укажите её. Нет — рассчитаем по перечню потребителей</p>
          <div class="opts">
            <label class="opt"><input type="radio" name="power" @change="form.kw = ''" value="До 15 кВт" v-model="form.power"><span class="opt__mark" aria-hidden="true"></span><span class="opt__text">До 15 кВт<span class="opt__sub">часть нагрузок</span></span></label>
            <label class="opt"><input type="radio" name="power" @change="form.kw = ''" value="15–30 кВт" v-model="form.power"><span class="opt__mark" aria-hidden="true"></span><span class="opt__text">15–30 кВт<span class="opt__sub">дом целиком</span></span></label>
            <label class="opt"><input type="radio" name="power" @change="form.kw = ''" value="30–100 кВт" v-model="form.power"><span class="opt__mark" aria-hidden="true"></span><span class="opt__text">30–100 кВт<span class="opt__sub">большой дом и хозблоки</span></span></label>
            <label class="opt"><input type="radio" name="power" @change="form.kw = ''" value="100–500 кВт" v-model="form.power"><span class="opt__mark" aria-hidden="true"></span><span class="opt__text">100–500 кВт<span class="opt__sub">посёлок, отель, коммерция</span></span></label>
            <label class="opt"><input type="radio" name="power" @change="form.kw = ''" value="500–1500 кВт" v-model="form.power"><span class="opt__mark" aria-hidden="true"></span><span class="opt__text">500–1500 кВт<span class="opt__sub">производство, крупные объекты</span></span></label>
            <label class="opt"><input type="radio" name="power" @change="form.kw = ''" value="Не знаю" v-model="form.power"><span class="opt__mark" aria-hidden="true"></span><span class="opt__text">Не знаю<span class="opt__sub">рассчитайте по перечню</span></span></label>
          </div>
            <label class="field field--kw"><span>Или назовите свою мощность, кВт</span>
              <input id="quiz-kw" type="number" name="kw" @input="form.power = ''" min="1" max="5000" inputmode="numeric" placeholder="Например, 45" v-model="form.kw"></label>
          </fieldset>

          <fieldset class="qstep" data-step="4" :hidden="sent || step !== 3">
            <legend class="qstep__title">Требуемое время автономной работы</legend>
            <p class="qstep__hint">От него зависит ёмкость АКБ</p>
          <div class="opts">
            <label class="opt"><input type="radio" name="autonomy" value="До 2 часов" v-model="form.autonomy"><span class="opt__mark" aria-hidden="true"></span><span class="opt__text">До 2 часов<span class="opt__sub">короткие отключения</span></span></label>
            <label class="opt"><input type="radio" name="autonomy" value="2–8 часов" v-model="form.autonomy"><span class="opt__mark" aria-hidden="true"></span><span class="opt__text">2–8 часов<span class="opt__sub">вечер и ночь</span></span></label>
            <label class="opt"><input type="radio" name="autonomy" value="8–24 часа" v-model="form.autonomy"><span class="opt__mark" aria-hidden="true"></span><span class="opt__text">8–24 часа<span class="opt__sub">сутки без света</span></span></label>
            <label class="opt"><input type="radio" name="autonomy" value="Больше суток" v-model="form.autonomy"><span class="opt__mark" aria-hidden="true"></span><span class="opt__text">Больше суток<span class="opt__sub">длительная автономная работа</span></span></label>
            <label class="opt"><input type="radio" name="autonomy" value="Не знаю" v-model="form.autonomy"><span class="opt__mark" aria-hidden="true"></span><span class="opt__text">Не знаю<span class="opt__sub">подскажите</span></span></label>
          </div>
          </fieldset>

          <fieldset class="qstep" data-step="5" :hidden="sent || step !== 4">
            <legend class="qstep__title">Куда прислать расчёт?</legend>
            <p class="qstep__hint">Инженер свяжется и уточнит исходные данные по объекту</p>
            <div class="qfields">
              <label class="field"><span>Имя</span><input id="quiz-name" type="text" name="name" autocomplete="name" v-model="form.name"></label>
              <label class="field"><span>Телефон</span><input id="quiz-phone" type="tel" name="phone" autocomplete="tel" inputmode="tel" placeholder="+7 (___) ___-__-__" data-phone :value="form.phone" @input="form.phone = maskLandingPhone($event.target.value)"></label>
    <CallbackPreferences v-model="callbackPreferences" />
            </div>
            <p class="qlabel">Как с вами связаться</p>
          <div class="chips">
            <label class="chip"><input type="radio" name="channel" value="Звонок" v-model="form.channel"><span>Звонок</span></label>
            <label class="chip"><input type="radio" name="channel" value="Max" v-model="form.channel"><span>Max</span></label>
            <label class="chip"><input type="radio" name="channel" value="Telegram" v-model="form.channel"><span>Telegram</span></label>
          </div>
            <p class="qlabel">Когда планируете установку</p>
          <div class="chips">
            <label class="chip"><input type="radio" name="when" value="Срочно" v-model="form.when"><span>Срочно</span></label>
            <label class="chip"><input type="radio" name="when" value="В течение месяца" v-model="form.when"><span>В течение месяца</span></label>
            <label class="chip"><input type="radio" name="when" value="Пока изучаю" v-model="form.when"><span>Пока изучаю</span></label>
          </div>
            <label class="check"><input type="checkbox" name="consent" v-model="form.consent">
              <span>Согласен на <a href="/personal-data-consent" target="_blank" rel="noopener">обработку персональных данных</a></span></label>
            <label class="check"><input type="checkbox" name="policy" v-model="form.policy">
              <span>Ознакомлен с <a href="/privacy" target="_blank" rel="noopener">политикой конфиденциальности</a></span></label>
          </fieldset>

          <div class="quiz__done" data-quiz-done :hidden="!sent" ref="done" tabindex="-1">
            <h3 class="qstep__title">Ваша предварительная конфигурация</h3>
            <dl class="summary">
              <div><dt>Объект</dt><dd data-sum="object">{{ summary.object }}</dd></div>
              <div><dt>Нагрузки</dt><dd data-sum="loads">{{ summary.loads }}</dd></div>
              <div><dt>Мощность</dt><dd data-sum="power">{{ summary.power }}</dd></div>
              <div><dt>Автономная работа</dt><dd data-sum="autonomy">{{ summary.autonomy }}</dd></div>
            </dl>
            <p class="quiz__done-note">Точный состав и стоимость инженер пришлёт после уточнения нагрузки. Заявка отправлена.</p>
          </div>

          <p class="quiz__error" data-quiz-error role="alert" :hidden="!error">{{ error }}</p>

          <div class="quiz__foot" data-quiz-foot :hidden="sent">
            <span class="quiz__step">Шаг: <b data-quiz-n>{{ step + 1 }}</b>/5</span>
            <div class="quiz__nav">
              <button class="quiz__back" type="button" data-quiz-back aria-label="Назад" :hidden="step === 0" :disabled="pending" @click="back">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 12H5M11 6l-6 6 6 6"/></svg>
              </button>
              <button class="btn-pill btn-pill--quiz" type="button" data-quiz-next :disabled="pending || sent || !stepValid" @click="next">
                <span data-quiz-next-text>{{ step === 4 ? 'Получить расчёт' : 'Далее' }}</span>
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
              </button>
            </div>
          </div>
        </form>
      </div>

      <div class="quiz__side">
        <img class="manager__photo" v-bind="imageAttrs('/ups/engineer.jpg', { sizes: '(max-width: 768px) 100vw, 50vw', width: 800 })" alt="Михаил, инженер-проектировщик" loading="lazy">
        <!-- TODO: фото стоковое (placeholder), заменить на фото настоящего сотрудника; имя и должность подтвердить у заказчика -->
        <div class="manager__bubble" aria-live="polite">
          <b>Михаил</b>
          <span class="manager__role">Инженер-проектировщик, Энергосистемы</span>
          <p data-manager-text :key="message" class="is-swap">{{ message }}</p>
        </div>
        <div class="quiz__aside-text">
          <p class="quiz__aside-title">Четыре вопроса — и мы соберём исходные данные для расчёта нагрузки.</p>
          <p class="quiz__aside-sub">Без обязательств: это предварительный подбор по вашему объекту.</p>
          <div class="quiz__msg">
            <a class="msg msg--max" href="https://max.ru/" aria-label="Написать в Max" target="_blank" rel="noopener"><svg viewBox="0 0 100 100" width="18" height="18" fill="#fff" aria-hidden="true"><path fill-rule="evenodd" clip-rule="evenodd" d="M50.76 0.26C78.29 0.26 99.89 22.6 99.89 50.15C99.89 77.7 77.61 99.49 51.02 99.49C41.59 99.49 37.01 98.16 29.65 92.95C29.14 92.59 28.45 92.68 28.02 93.14C22.36 99.18 7.85 103.43 7.19 95.18C7.19 80.79 0 71.45 0 49.88C0 21.55 23.22 0.26 50.76 0.26ZM51.53 24.81C38.46 24.13 28.26 33.2 26.01 47.38C24.15 59.13 27.45 73.45 30.28 74.18C31.48 74.48 34.36 72.28 36.46 70.3C36.85 69.93 37.45 69.86 37.91 70.15C41.18 72.15 44.88 73.65 48.96 73.86C62.37 74.56 74.26 64.06 74.96 50.65C75.66 37.23 64.94 25.5 51.53 24.8V24.81Z"/></svg></a>
            <a class="msg msg--tg" href="https://t.me/+79253932789" aria-label="Написать в Telegram" target="_blank" rel="noopener"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 10l-4 4 6 6 4-16-18 7 4 2 2 6 3-4"/></svg></a>
            <span>или напишите в мессенджер</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
</template>

<script setup>
import { imageAttrs } from '~/utils/responsiveImage.js'
import { emptyCallbackPreferences, getCallbackPreferences } from '~/lib/browser/callbackPreferences.js'
import { maskLandingPhone, validLandingPhone, submitLandingLead, landingSubmitError } from '~/utils/landingLead.js'
const form = reactive({ object: '', loads: [], power: '', kw: '', autonomy: '', name: '', phone: '', channel: '', when: '', consent: false, policy: false })
const callbackPreferences = ref(emptyCallbackPreferences())
const step = ref(0)
const pending = ref(false)
const sent = ref(false)
const error = ref('')
const done = ref(null)
const replies = [
  'Расскажите об объекте: от него зависят мощность ИБП и схема подключения.',
  'Отметьте нагрузки, которые резервируем. По перечню рассчитаем суммарную мощность и ёмкость АКБ.',
  'Мощность — главный параметр. Если точных данных нет, выберите «Не знаю»: рассчитаем по перечню потребителей.',
  'Чем больше время автономной работы, тем выше ёмкость АКБ. Подберём оптимум под вашу нагрузку.',
  'Остался контакт. Расчёт отправлю тем способом связи, который вы выберете.'
]
const kw = computed(() => Number.parseFloat(String(form.kw).replace(',', '.')) || 0)
const smallPower = computed(() => form.power === 'До 15 кВт' || (kw.value > 0 && kw.value < 15))
const message = computed(() => sent.value ? 'Заявка принята. Свяжусь выбранным способом и уточню исходные данные по нагрузке.' : step.value === 2 && smallPower.value ? 'Мы специализируемся на системах от 15 кВт — это наш профиль. Заявку всё равно приму и подскажу решение.' : replies[step.value])
const stepValid = computed(() => [Boolean(form.object), form.loads.length > 0, Boolean(form.power) || (kw.value > 0 && kw.value <= 5000), Boolean(form.autonomy), true][step.value])
const summary = computed(() => ({ object: form.object, loads: form.loads.join(', '), power: kw.value > 0 ? `${String(kw.value).replace('.', ',')} кВт` : form.power, autonomy: form.autonomy }))
function back() { if (!pending.value && step.value > 0) { step.value--; error.value = '' } }
function enter(event) {
  if (event.target.tagName !== 'INPUT' || event.target.type === 'checkbox') return
  event.preventDefault()
  if (stepValid.value && !pending.value) next()
}
async function next() {
  if (pending.value || sent.value || !stepValid.value) return
  error.value = ''
  if (step.value < 4) { step.value++; return }
  if (form.name.trim().length < 2 || form.name.trim().length > 80) { error.value = 'Укажите имя от 2 до 80 символов'; return }
  if (!validLandingPhone(form.phone)) { error.value = 'Введите телефон полностью'; return }
  if (!form.consent || !form.policy) { error.value = 'Отметьте обе галочки — без них заявку не отправить'; return }
  pending.value = true
  try {
    await submitLandingLead({ type: 'service', name: form.name.trim(), contact: form.phone, service: 'Опрос по ИБП', callbackPreferences: getCallbackPreferences(form.phone, callbackPreferences.value), consent: true, answers: [
      { label: 'Объект', value: summary.value.object }, { label: 'Нагрузки', value: summary.value.loads }, { label: 'Мощность', value: summary.value.power }, { label: 'Автономная работа', value: summary.value.autonomy }, { label: 'Способ связи', value: form.channel || 'не указан' }, { label: 'Срок установки', value: form.when || 'не указан' }
    ] })
    sent.value = true
    await nextTick()
    done.value?.focus({ preventScroll: true })
  } catch (problem) { error.value = landingSubmitError(problem) }
  finally { pending.value = false }
}
</script>
