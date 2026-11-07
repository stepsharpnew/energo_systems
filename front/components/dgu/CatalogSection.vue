<template>
<section class="section section--dark power" id="power" ref="section">
  <div class="container">
    <h2 class="section__title">
      <span class="muted">Дизельные электростанции —</span>
      выберите двигатель, мощность подберём под объект
    </h2>
    <p class="power__lead">Поставляем ДГУ на двигателях Cummins, Weichai, Deutz, Doosan, MTU, Perkins, Volvo Penta и ММЗ с генераторами Stamford, Mecc-Alte, Marathon и Sincro. Листайте каталог: исполнение и состав подберём под ваш объект.</p>

    <div class="pw-head">
      <ul class="pw-filter" aria-label="Отрасль">
        <li><button type="button" data-solution="all" :aria-pressed="solution === 'all'" @click="select('all')">Все</button></li>
        <li><button type="button" data-solution="village" :aria-pressed="solution === 'village'" @click="select('village')">ЖКХ и поселки</button></li>
        <li><button type="button" data-solution="commerce" :aria-pressed="solution === 'commerce'" @click="select('commerce')">Коммерция</button></li>
        <li><button type="button" data-solution="industry" :aria-pressed="solution === 'industry'" @click="select('industry')">Производство</button></li>
        <li><button type="button" data-solution="construction" :aria-pressed="solution === 'construction'" @click="select('construction')">Строительство</button></li>
        <li><button type="button" data-solution="infra" :aria-pressed="solution === 'infra'" @click="select('infra')">Инфраструктура</button></li>
        <li><button type="button" data-solution="med" :aria-pressed="solution === 'med'" @click="select('med')">Медицина</button></li>
        <li><button type="button" data-solution="logistics" :aria-pressed="solution === 'logistics'" @click="select('logistics')">Логистика</button></li>
      </ul>
      <div class="pw-ctrl">
        <button class="ctrl" type="button" data-pw-move="-1" @click="move(-1)" aria-label="Назад по каталогу"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 12H5M11 6l-6 6 6 6"/></svg></button>
        <button class="ctrl" type="button" data-pw-move="1" @click="move(1)" aria-label="Дальше по каталогу"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg></button>
      </div>
    </div>

    <ul tabindex="0" aria-label="Каталог электростанций, прокручиваемый список" class="pw-grid" data-pw-track ref="track">
      <li class="pw-card" data-seg="commerce industry infra med logistics" :hidden="!matches('commerce industry infra med logistics')"><button class="card-trigger" type="button" aria-label="Подобрать: ДГУ Cummins" @click="requestCallback({&quot;title&quot;: &quot;ДГУ Cummins&quot;, &quot;text&quot;: &quot;Оставьте контакт: инженер предложит решение на базе двигателя Cummins под вашу нагрузку.&quot;})" data-callback-open data-callback-title="ДГУ Cummins" data-callback-text="Оставьте контакт: инженер предложит решение на базе двигателя Cummins под вашу нагрузку."></button>
        <div class="pw-card__img"><img v-bind="imageAttrs('/dgu/images/b88eec6f3486ea2f.webp', { sizes: '(max-width: 768px) 100vw, 50vw', width: 800 })" alt="Дизельная электростанция на двигателе Cummins на раме" loading="lazy"><span class="pw-tag pw-tag--order"><i></i>Под заказ</span></div>
        <div class="pw-card__kw"><b>60–1200</b><span>кВт</span><i>75–1500 кВА</i></div>
        <p class="pw-card__for">Ответственные объекты: ТЦ, больницы, ЦОД, крупное производство</p>
        <dl class="pw-card__spec">
          <div><dt>Двигатель</dt><dd>Cummins</dd></div>
          <div><dt>Генератор</dt><dd>STAMFORD</dd></div>
        </dl>
      </li>
      <li class="pw-card" data-seg="village construction" :hidden="!matches('village construction')"><button class="card-trigger" type="button" aria-label="Подобрать: ДГУ ММЗ" @click="requestCallback({&quot;title&quot;: &quot;ДГУ ММЗ&quot;, &quot;text&quot;: &quot;Оставьте контакт: инженер предложит решение на базе двигателя ММЗ под вашу нагрузку.&quot;})" data-callback-open data-callback-title="ДГУ ММЗ" data-callback-text="Оставьте контакт: инженер предложит решение на базе двигателя ММЗ под вашу нагрузку."></button>
        <div class="pw-card__img"><img v-bind="imageAttrs('/dgu/images/843a0308bd4bc841.webp', { sizes: '(max-width: 768px) 100vw, 50vw', width: 800 })" alt="Дизельная электростанция на двигателе ММЗ на раме" loading="lazy"><span class="pw-tag pw-tag--stock"><i></i>В наличии</span></div>
        <div class="pw-card__kw"><b>50–120</b><span>кВт</span><i>63–150 кВА</i></div>
        <p class="pw-card__for">Небольшие объекты и стройплощадки: магазины, склады, малые котельные</p>
        <dl class="pw-card__spec">
          <div><dt>Двигатель</dt><dd>ММЗ</dd></div>
          <div><dt>Генератор</dt><dd>Mecc-Alte</dd></div>
        </dl>
      </li>
      <li class="pw-card" data-seg="village commerce construction infra logistics" :hidden="!matches('village commerce construction infra logistics')"><button class="card-trigger" type="button" aria-label="Подобрать: ДГУ Weichai" @click="requestCallback({&quot;title&quot;: &quot;ДГУ Weichai&quot;, &quot;text&quot;: &quot;Оставьте контакт: инженер предложит решение на базе двигателя Weichai под вашу нагрузку.&quot;})" data-callback-open data-callback-title="ДГУ Weichai" data-callback-text="Оставьте контакт: инженер предложит решение на базе двигателя Weichai под вашу нагрузку."></button>
        <div class="pw-card__img"><img v-bind="imageAttrs('/dgu/images/350a2e576ade8ce3.webp', { sizes: '(max-width: 768px) 100vw, 50vw', width: 800 })" alt="Дизельная электростанция на двигателе Weichai на раме" loading="lazy"><span class="pw-tag pw-tag--stock"><i></i>В наличии</span></div>
        <div class="pw-card__kw"><b>64–250</b><span>кВт</span><i>80–313 кВА</i></div>
        <p class="pw-card__for">Бизнес и инфраструктура: АЗС, склады, офисные здания, клиники</p>
        <dl class="pw-card__spec">
          <div><dt>Двигатель</dt><dd>Weichai</dd></div>
          <div><dt>Генератор</dt><dd>Marathon</dd></div>
        </dl>
      </li>
      <li class="pw-card" data-seg="village commerce infra logistics" :hidden="!matches('village commerce infra logistics')"><button class="card-trigger" type="button" aria-label="Подобрать: ДГУ Deutz" @click="requestCallback({&quot;title&quot;: &quot;ДГУ Deutz&quot;, &quot;text&quot;: &quot;Оставьте контакт: инженер предложит решение на базе двигателя Deutz под вашу нагрузку.&quot;})" data-callback-open data-callback-title="ДГУ Deutz" data-callback-text="Оставьте контакт: инженер предложит решение на базе двигателя Deutz под вашу нагрузку."></button>
        <div class="pw-card__img"><img v-bind="imageAttrs('/dgu/images/89496c9eb24822d6.webp', { sizes: '(max-width: 768px) 100vw, 50vw', width: 800 })" alt="Дизельная электростанция на двигателе Deutz на раме" loading="lazy"><span class="pw-tag pw-tag--request"><i></i>По запросу</span></div>
        <div class="pw-card__kw"><b>60–400</b><span>кВт</span><i>75–500 кВА</i></div>
        <p class="pw-card__for">Коммерция и логистика: торговые комплексы, склады, холодильные камеры</p>
        <dl class="pw-card__spec">
          <div><dt>Двигатель</dt><dd>Deutz</dd></div>
          <div><dt>Генератор</dt><dd>Mecc-Alte</dd></div>
        </dl>
      </li>
      <li class="pw-card" data-seg="commerce industry construction logistics" :hidden="!matches('commerce industry construction logistics')"><button class="card-trigger" type="button" aria-label="Подобрать: ДГУ Doosan" @click="requestCallback({&quot;title&quot;: &quot;ДГУ Doosan&quot;, &quot;text&quot;: &quot;Оставьте контакт: инженер предложит решение на базе двигателя Doosan под вашу нагрузку.&quot;})" data-callback-open data-callback-title="ДГУ Doosan" data-callback-text="Оставьте контакт: инженер предложит решение на базе двигателя Doosan под вашу нагрузку."></button>
        <div class="pw-card__img"><img v-bind="imageAttrs('/dgu/images/da10e29e518fe230.webp', { sizes: '(max-width: 768px) 100vw, 50vw', width: 800 })" alt="Дизельная электростанция на двигателе Doosan на раме" loading="lazy"><span class="pw-tag pw-tag--request"><i></i>По запросу</span></div>
        <div class="pw-card__kw"><b>95–600</b><span>кВт</span><i>119–750 кВА</i></div>
        <p class="pw-card__for">Производство и крупная коммерция: цеха, ТЦ, насосные станции</p>
        <dl class="pw-card__spec">
          <div><dt>Двигатель</dt><dd>Doosan</dd></div>
          <div><dt>Генератор</dt><dd>Mecc-Alte</dd></div>
        </dl>
      </li>
      <li class="pw-card" data-seg="commerce industry logistics" :hidden="!matches('commerce industry logistics')"><button class="card-trigger" type="button" aria-label="Подобрать: ДГУ MTU" @click="requestCallback({&quot;title&quot;: &quot;ДГУ MTU&quot;, &quot;text&quot;: &quot;Оставьте контакт: инженер предложит решение на базе двигателя MTU под вашу нагрузку.&quot;})" data-callback-open data-callback-title="ДГУ MTU" data-callback-text="Оставьте контакт: инженер предложит решение на базе двигателя MTU под вашу нагрузку."></button>
        <div class="pw-card__img"><img v-bind="imageAttrs('/dgu/images/d2808b9fe0f41289.webp', { sizes: '(max-width: 768px) 100vw, 50vw', width: 800 })" alt="Дизельная электростанция на двигателе MTU на раме" loading="lazy"><span class="pw-tag pw-tag--request"><i></i>По запросу</span></div>
        <div class="pw-card__kw"><b>480–900</b><span>кВт</span><i>600–1125 кВА</i></div>
        <p class="pw-card__for">Крупные объекты: заводы, дата-центры, логистические комплексы</p>
        <dl class="pw-card__spec">
          <div><dt>Двигатель</dt><dd>MTU</dd></div>
          <div><dt>Генератор</dt><dd>Stamford</dd></div>
        </dl>
      </li>
      <li class="pw-card" data-seg="commerce industry med" :hidden="!matches('commerce industry med')"><button class="card-trigger" type="button" aria-label="Подобрать: ДГУ Perkins" @click="requestCallback({&quot;title&quot;: &quot;ДГУ Perkins&quot;, &quot;text&quot;: &quot;Оставьте контакт: инженер предложит решение на базе двигателя Perkins под вашу нагрузку.&quot;})" data-callback-open data-callback-title="ДГУ Perkins" data-callback-text="Оставьте контакт: инженер предложит решение на базе двигателя Perkins под вашу нагрузку."></button>
        <div class="pw-card__img"><img v-bind="imageAttrs('/dgu/images/b8c1eb8e399b5fee.webp', { sizes: '(max-width: 768px) 100vw, 50vw', width: 800 })" alt="Дизельная электростанция на двигателе Perkins на раме" loading="lazy"><span class="pw-tag pw-tag--order"><i></i>Под заказ</span></div>
        <div class="pw-card__kw"><b>48–640</b><span>кВт</span><i>60–800 кВА</i></div>
        <p class="pw-card__for">Медицина и ответственные объекты: клиники, лаборатории, связь</p>
        <dl class="pw-card__spec">
          <div><dt>Двигатель</dt><dd>Perkins</dd></div>
          <div><dt>Генератор</dt><dd>Stamford</dd></div>
        </dl>
      </li>
      <li class="pw-card" data-seg="commerce infra med" :hidden="!matches('commerce infra med')"><button class="card-trigger" type="button" aria-label="Подобрать: ДГУ Volvo Penta" @click="requestCallback({&quot;title&quot;: &quot;ДГУ Volvo Penta&quot;, &quot;text&quot;: &quot;Оставьте контакт: инженер предложит решение на базе двигателя Volvo Penta под вашу нагрузку.&quot;})" data-callback-open data-callback-title="ДГУ Volvo Penta" data-callback-text="Оставьте контакт: инженер предложит решение на базе двигателя Volvo Penta под вашу нагрузку."></button>
        <div class="pw-card__img"><img v-bind="imageAttrs('/dgu/images/2c1bcf67980ade8b.webp', { sizes: '(max-width: 768px) 100vw, 50vw', width: 800 })" alt="Дизельная электростанция на двигателе Volvo Penta на раме" loading="lazy"><span class="pw-tag pw-tag--order"><i></i>Под заказ</span></div>
        <div class="pw-card__kw"><b>104–500</b><span>кВт</span><i>130–625 кВА</i></div>
        <p class="pw-card__for">Премиальные объекты: больницы, бизнес-центры, отели</p>
        <dl class="pw-card__spec">
          <div><dt>Двигатель</dt><dd>Volvo Penta</dd></div>
          <div><dt>Генератор</dt><dd>SINCRO</dd></div>
        </dl>
      </li>
      <li class="pw-card pw-card--ups" data-seg="village commerce industry construction infra med logistics" :hidden="!matches('village commerce industry construction infra med logistics')"><button class="card-trigger" type="button" aria-label="Подобрать: Промышленные ИБП и аккумуляторы" @click="requestCallback({&quot;title&quot;: &quot;Промышленные ИБП и аккумуляторы&quot;, &quot;text&quot;: &quot;Оставьте контакт: инженер подберёт ИБП и аккумуляторы под ваши критичные нагрузки.&quot;})" data-callback-open data-callback-title="Промышленные ИБП и аккумуляторы" data-callback-text="Оставьте контакт: инженер подберёт ИБП и аккумуляторы под ваши критичные нагрузки."></button>
        <div class="pw-card__img"><img v-bind="imageAttrs('/dgu/images/f54461b4a5fcb02a.webp', { sizes: '(max-width: 768px) 100vw, 50vw', width: 800 })" alt="Ряд шкафов промышленных ИБП с аккумуляторными батареями" loading="lazy"><span class="pw-tag"><i></i>Подбор по запросу</span></div>
        <div class="pw-card__kw pw-card__kw--text"><b>ИБП и аккумуляторы</b></div>
        <p class="pw-card__for">Бесперебойное питание критичных нагрузок вместе с ДГУ: серверные, медицина, автоматика</p>
        <dl class="pw-card__spec">
          <div><dt>Состав</dt><dd>шкафы ИБП и батареи под нагрузку и время автономии</dd></div>
        </dl>
      </li>
      <li class="pw-card pw-card--cta" data-seg="all-only"><button class="card-trigger" type="button" aria-label="Подобрать: Подбор электростанции под объект" @click="requestCallback({&quot;title&quot;: &quot;Подбор электростанции под объект&quot;, &quot;text&quot;: &quot;Оставьте контакт: инженер уточнит нагрузку и подберёт двигатель, мощность и исполнение.&quot;})" data-callback-open data-callback-title="Подбор электростанции под объект" data-callback-text="Оставьте контакт: инженер уточнит нагрузку и подберёт двигатель, мощность и исполнение."></button>
        <p class="pw-card--cta__t">Не нашли свою мощность?</p>
        <p class="pw-card--cta__s">В линейке есть и другие значения — от 30 до 2000 кВт. Подберём по вашей нагрузке.</p>
      </li>    </ul>

    <h3 class="power__h3">Чем сложнее объект по энергопотреблению — тем мощнее и премиальнее оборудование</h3>
    <ul class="pw-tiers">
      <li class="pw-tier pw-tier--prem">
        <span class="pw-tier__k">Премиум-сегмент</span>
        <b>Для сложных и ответственных объектов</b>
        <ul class="pw-tier__brands"><li>Cummins</li><li>Volvo Penta</li><li>Perkins</li></ul>
        <p>Больницы, дата-центры, крупные ТЦ и производства, где перерыв в питании недопустим.</p>
      </li>
      <li class="pw-tier">
        <span class="pw-tier__k">Средний сегмент</span>
        <b>Для бизнеса и инфраструктуры</b>
        <ul class="pw-tier__brands"><li>Weichai</li><li>Deutz</li><li>Doosan</li><li>MTU</li><li>ММЗ</li></ul>
        <p>Коммерция, склады, поселки, строительство и инфраструктура: надёжный резерв с разумной стоимостью владения.</p>
      </li>
    </ul>

    <div class="power__cta">
      <a class="btn-pill" href="#quiz">
        <span>Предложить решение</span>
        <span class="btn-pill__icon" aria-hidden="true"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg></span>
      </a>
    </div>
  </div>  
</section>
</template>

<script setup>
import { imageAttrs } from '~/utils/responsiveImage.js'
const emit = defineEmits(['callback', 'solution'])
const requestCallback = payload => emit('callback', payload)
const props = defineProps({ solution: { type: String, default: 'all' }, reduced: Boolean })
const section = ref(null), track = ref(null)
const matches = segments => props.solution === 'all' || segments.split(' ').includes(props.solution)
const select = value => { emit('solution', value) }
watch(() => props.solution, () => { track.value?.scrollTo({ left: 0, behavior: 'auto' }) })
function move(direction) {
  const card = [...(track.value?.children || [])].find(item => !item.hidden)
  track.value?.scrollBy({ left: direction * ((card?.offsetWidth || 300) + 14) * 2, behavior: props.reduced ? 'auto' : 'smooth' })
}
function reveal() { section.value?.scrollIntoView({ behavior: props.reduced ? 'auto' : 'smooth', block: 'start' }) }
defineExpose({ reveal })
</script>
