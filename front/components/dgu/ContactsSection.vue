<template>
<section class="section" id="contacts">
  <div class="container">
    <h2 class="section__title"><span class="muted">Остались вопросы по объекту —</span> позвоните или напишите</h2>

    <div class="contacts">
      <form class="contacts__form" data-contact-form novalidate @submit.prevent="submit" :class="{ 'is-sent': sent }">
        <label class="cfield" for="ct-name"><span class="cfield__label">Имя</span>
          <input class="cfield__input" id="ct-name" type="text" name="ctname" :aria-invalid="invalid.name || undefined" @input="invalid.name = false" autocomplete="given-name" placeholder="Как к вам обращаться" v-model="fields.name">
          <span class="cfield__err">Укажите имя</span></label>
        <label class="cfield" for="ct-phone"><span class="cfield__label">Телефон</span>
          <input class="cfield__input" id="ct-phone" type="tel" name="ctphone" :aria-invalid="invalid.phone || undefined" autocomplete="tel" inputmode="tel" placeholder="+7 (___) ___-__-__" data-phone :value="fields.phone" @input="fields.phone = maskLandingPhone($event.target.value)">
          <span class="cfield__err">Проверьте номер телефона</span></label>
    <CallbackPreferences v-model="fields.callbackPreferences" />
        <label class="cfield" for="ct-task"><span class="cfield__label">Коротко об объекте <i class="cfield__opt">по желанию</i></span>
          <textarea class="cfield__input cfield__input--area" id="ct-task" name="cttask" rows="3" placeholder="Например: торговый центр, 400 кВт, нужен автозапуск" v-model="fields.task"></textarea></label>
        <div class="cconsents">
          <label class="cconsent"><input type="checkbox" id="ct-consent" name="ctconsent" v-model="fields.consent"><span class="cconsent__ind"></span><span>Даю <a href="https://e-systems.su/personal-data-consent" target="_blank" rel="noopener">согласие на обработку персональных данных</a></span></label>
          <label class="cconsent"><input type="checkbox" id="ct-privacy" name="ctprivacy" v-model="fields.privacy"><span class="cconsent__ind"></span><span>Ознакомлен с <a href="https://e-systems.su/privacy" target="_blank" rel="noopener">политикой конфиденциальности</a></span></label>
        </div>
        <span class="cfield__err" data-contact-consent-err :class="{ 'is-shown': invalid.consent }">Отметьте оба пункта — без них не сможем принять заявку</span>
        <p class="cfield__err is-shown" data-contact-error role="alert" :hidden="!error">{{ error }}</p>
        <button class="contacts__submit" type="submit" :disabled="pending || sent">Отправить заявку</button>
        <p class="contacts__note">Не хотите отвечать на вопросы опроса — напишите пару строк, остальное спросим сами.</p>
        <div class="contacts__done" data-contact-done :hidden="!sent">
          <b>Спасибо за обращение!</b>
          <span>Мы получили вашу заявку. Учтём ваши пожелания по времени звонка.</span>
          <span>Будем рады помочь и по телефону: <PhoneLink class="calltracking-dgu" /></span>
        </div>
      </form>

      <div class="contacts__side">
        <div class="cnt"><span class="cnt__label">Телефон</span><PhoneLink class="cnt__value calltracking-dgu" /></div>
        <div class="cnt"><span class="cnt__label">Дополнительный телефон</span><a class="cnt__value cnt__value--secondary" href="tel:+74951780118">+7 (495) 178-01-18</a></div>
        <div class="cnt"><span class="cnt__label">Мобильный телефон</span><a class="cnt__value cnt__value--secondary" href="tel:+79253932789">+7 (925) 393-27-89</a></div>
        <div class="cnt"><span class="cnt__label">Почта</span><a class="cnt__value" href="mailto:sales@e-systems.su">sales@e-systems.su <i>по заявкам и расчётам</i></a></div>
        <div class="cnt"><span class="cnt__label">Мессенджеры</span>
          <div class="cnt__msgrs">
            <a class="cnt__msg" href="https://max.ru/u/f9LHodD0cOJCw4fN9Gj-ycqkpHsw_5xGMut54TdCKqJKGmxkmJn9m-bpd58" target="_blank" rel="noopener"><i class="msg msg--max" aria-hidden="true"><svg viewBox="0 0 100 100" width="16" height="16" fill="#fff"><path fill-rule="evenodd" clip-rule="evenodd" d="M50.76 0.26C78.29 0.26 99.89 22.6 99.89 50.15C99.89 77.7 77.61 99.49 51.02 99.49C41.59 99.49 37.01 98.16 29.65 92.95C29.14 92.59 28.45 92.68 28.02 93.14C22.36 99.18 7.85 103.43 7.19 95.18C7.19 80.79 0 71.45 0 49.88C0 21.55 23.22 0.26 50.76 0.26ZM51.53 24.81C38.46 24.13 28.26 33.2 26.01 47.38C24.15 59.13 27.45 73.45 30.28 74.18C31.48 74.48 34.36 72.28 36.46 70.3C36.85 69.93 37.45 69.86 37.91 70.15C41.18 72.15 44.88 73.65 48.96 73.86C62.37 74.56 74.26 64.06 74.96 50.65C75.66 37.23 64.94 25.5 51.53 24.8V24.81Z"/></svg></i> Max</a>
            <a class="cnt__msg" href="https://t.me/energosystems" target="_blank" rel="noopener"><i class="msg msg--tg" aria-hidden="true"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M15 10l-4 4 6 6 4-16-18 7 4 2 2 6 3-4"/></svg></i> Telegram</a>
          </div>
        </div>
        <div class="cnt"><span class="cnt__label">Время работы</span><b class="cnt__plain">Пн–Пт, с 9:00 до 18:00</b></div>
      </div>
    </div>

    <div class="maps">
      <figure class="map"><iframe class="map__frame" src="https://yandex.ru/map-widget/v1/?text=Солнечногорск%2C%20Промышленная%20улица%2C%20строение%205&amp;z=16" title="Офис в Солнечногорске на Яндекс.Картах" loading="lazy" allowfullscreen></iframe>
        <figcaption class="map__cap"><b>Солнечногорск</b><a href="https://yandex.ru/maps/?text=Солнечногорск%2C%20Промышленная%20улица%2C%20строение%205" target="_blank" rel="noopener">Промышленная ул., с. 5</a></figcaption>
      </figure>
      <figure class="map"><iframe class="map__frame" src="https://yandex.ru/map-widget/v1/?text=Москва%2C%20улица%20Руставели%2C%2014с6&amp;z=16" title="Офис в Москве на Яндекс.Картах" loading="lazy" allowfullscreen></iframe>
        <figcaption class="map__cap"><b>Москва</b><a href="https://yandex.ru/maps/?text=Москва%2C%20улица%20Руставели%2C%2014с6" target="_blank" rel="noopener">ул. Руставели, 14с6</a></figcaption>
      </figure>
    </div>
  </div>
  
</section>
</template>

<script setup>
import { maskLandingPhone, validLandingPhone, submitLandingLead, landingSubmitError } from '~/utils/landingLead.js'
import { emptyCallbackPreferences, getCallbackPreferences } from '~/lib/browser/callbackPreferences.js'
const fields = reactive({ name: '', phone: '', task: '', consent: false, privacy: false, callbackPreferences: emptyCallbackPreferences() })
const invalid = reactive({ name: false, phone: false, consent: false })
const pending = ref(false), sent = ref(false), error = ref('')
watch(() => fields.phone, () => { invalid.phone = false })
watch(() => [fields.consent, fields.privacy], () => { invalid.consent = false })
async function submit() {
  if (pending.value || sent.value) return
  error.value = ''
  const name = fields.name.trim()
  invalid.name = name.length < 2 || name.length > 80
  invalid.phone = !validLandingPhone(fields.phone)
  invalid.consent = !fields.consent || !fields.privacy
  if (Object.values(invalid).some(Boolean)) return
  pending.value = true
  try {
    await submitLandingLead({ type: 'service', name, contact: fields.phone, callbackPreferences: getCallbackPreferences(fields.phone, fields.callbackPreferences), service: 'ДГУ — форма в контактах', comment: fields.task.trim(), consent: true })
    sent.value = true
  } catch (failure) { error.value = landingSubmitError(failure) }
  finally { pending.value = false }
}
</script>
