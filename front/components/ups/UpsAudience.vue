<template>
<section class="section aud" id="audience" data-aud ref="section" :class="{ 'is-armed': !reduced, 'is-in': revealed }">
  <div class="container">
    <h2 class="section__title">
      <span class="muted">Сохраняем работу того,</span>
      что важно вашему дому
    </h2>

    <div class="needs">
      <article class="need" style="--i:0" :style="pointerStyles[0]" @pointermove="movePointer($event, 0)">
        <i class="need__line" aria-hidden="true"></i>
        <span class="need__no"><svg viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="24" r="22.5" pathLength="1"/></svg><b>01</b></span>
        <h3 class="need__t">Свет, тепло и вода</h3>
        <p class="need__p">Автоматика котла, циркуляционные и скважинные насосы, выбранное освещение и холодильник.</p>
        <span class="need__note">Электроотопление рассчитываем отдельно</span>
      </article>
      <article class="need" style="--i:1" :style="pointerStyles[1]" @pointermove="movePointer($event, 1)">
        <i class="need__line" aria-hidden="true"></i>
        <span class="need__no"><svg viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="24" r="22.5" pathLength="1"/></svg><b>02</b></span>
        <h3 class="need__t">Связь и безопасность</h3>
        <p class="need__p">Интернет, видеонаблюдение, сигнализация и автоматика ворот продолжают работать от резерва.</p>
        <span class="need__note">Включаем питание оборудования связи</span>
      </article>
      <article class="need" style="--i:2" :style="pointerStyles[2]" @pointermove="movePointer($event, 2)">
        <i class="need__line" aria-hidden="true"></i>
        <span class="need__no"><svg viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="24" r="22.5" pathLength="1"/></svg><b>03</b></span>
        <h3 class="need__t">Инфраструктура посёлка</h3>
        <p class="need__p">Насосные, очистные, охрана и общие сети. Определяем приоритеты и порядок включения нагрузок.</p>
        <span class="need__note">Резерв домов — отдельная часть проекта</span>
      </article>
    </div>

    <div class="exp">
      <p class="exp__label">Опыт компании<br><b>в электроснабжении</b></p>
      <ul class="exp__logos" aria-label="Корпоративные заказчики">
        <li style="--i:0"><img v-bind="imageAttrs('/ups/client-rosseti.png', { sizes: '(max-width: 768px) 100vw, 50vw', width: 800 })" alt="Россети" loading="lazy"></li>
        <li style="--i:1"><img v-bind="imageAttrs('/ups/client-gazprom.png', { sizes: '(max-width: 768px) 100vw, 50vw', width: 800 })" alt="Газпром" loading="lazy"></li>
        <li style="--i:2"><img v-bind="imageAttrs('/ups/client-rzd.png', { sizes: '(max-width: 768px) 100vw, 50vw', width: 800 })" alt="РЖД" loading="lazy"></li>
        <li style="--i:3"><img v-bind="imageAttrs('/ups/client-oek.png', { sizes: '(max-width: 768px) 100vw, 50vw', width: 800 })" alt="ОЭК" loading="lazy"></li>
        <li style="--i:4"><img v-bind="imageAttrs('/ups/client-mosoblenergo.png', { sizes: '(max-width: 768px) 100vw, 50vw', width: 800 })" alt="Мособлэнерго" loading="lazy"></li>
        <li style="--i:5"><img v-bind="imageAttrs('/ups/client-rostelecom.png', { sizes: '(max-width: 768px) 100vw, 50vw', width: 800 })" alt="Ростелеком" loading="lazy"></li>
        <li style="--i:6"><img v-bind="imageAttrs('/ups/client-avtodor.png', { sizes: '(max-width: 768px) 100vw, 50vw', width: 800 })" alt="Автодор" loading="lazy"></li>
      </ul>
    </div>
  </div>
</section>
</template>

<script setup>
import { imageAttrs } from '~/utils/responsiveImage.js'
import { useUpsVisibility } from '~/composables/useUpsVisibility.js'
const section = ref(null)
const revealed = ref(false)
const pointerStyles = reactive([{}, {}, {}])
const { visible, reduced } = useUpsVisibility(section)
watch(visible, shown => { if (shown) revealed.value = true })
function movePointer(event, index) {
  const box = event.currentTarget.getBoundingClientRect()
  pointerStyles[index] = { '--mx': `${event.clientX - box.left}px`, '--my': `${event.clientY - box.top}px` }
}
</script>
