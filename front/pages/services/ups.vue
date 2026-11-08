<template>
  <div ref="page" class="ups" id="top">
    <a class="landing-skip-link" href="#ups-main-content">Перейти к содержанию</a>
    <UpsHeader :working-hours="isWorkingHours" :scrolled="headerScrolled" />
    <main id="ups-main-content" tabindex="-1">
      <UpsHero />
      <UpsQuiz />
      <UpsAudience />
      <UpsProcess />
      <UpsSolutions />
      <UpsConfiguration />
      <UpsProjects />
      <UpsService />
      <UpsGuarantees />
      <UpsContacts />
    </main>
    <div role="region" aria-label="Быстрый расчёт стоимости" class="sticky-cta" :class="{ 'is-visible': stickyVisible }" data-sticky>
      <a class="btn-pill btn-pill--sm" href="#quiz"><span>Рассчитать стоимость</span></a>
    </div>
    <UpsCallbackModal v-if="callbackRequested" :request="callback" @close="callback = null" />
  </div>
</template>

<script setup>
import '~/assets/styles/landing-fonts.css'
import { landingFontPreloads } from '~/utils/landingFonts.js'
import { createPageSeo } from '~/utils/pageSeo.js'
import '~/assets/styles/ups.css'
import '~/assets/styles/service-landing.css'
import UpsHeader from '~/components/ups/UpsHeader.vue'
import UpsHero from '~/components/ups/UpsHero.vue'
import UpsQuiz from '~/components/ups/UpsQuiz.vue'
import UpsAudience from '~/components/ups/UpsAudience.vue'
import UpsProcess from '~/components/ups/UpsProcess.vue'
import UpsSolutions from '~/components/ups/UpsSolutions.vue'
import UpsConfiguration from '~/components/ups/UpsConfiguration.vue'
import UpsProjects from '~/components/ups/UpsProjects.vue'
import UpsService from '~/components/ups/UpsService.vue'
import UpsGuarantees from '~/components/ups/UpsGuarantees.vue'
import UpsContacts from '~/components/ups/UpsContacts.vue'
import { defineAsyncComponent } from 'vue'
const UpsCallbackModal = defineAsyncComponent(() => import('~/components/ups/UpsCallbackModal.vue'))
const page = ref(null)
const callback = shallowRef(null)
const callbackRequested = ref(false)
const { isWorkingHours, headerScrolled, stickyVisible } = useLandingPage(page, { stickySelectors: '.hero__cta .btn-pill, #quiz, .cfg__cta .btn-pill, .cases__cta .btn-pill, .trust-sec__cta .btn-pill' })
provide('upsCallback', (options = {}) => {
  callbackRequested.value = true
  callback.value = { ...options, opener: document.activeElement }
})
useHead(createPageSeo({
  path: '/services/ups',
  title: 'ИБП под ключ для дома и посёлка | Энергосистемы',
  description: 'ИБП под ключ для частных домов и коттеджных посёлков: аккумуляторы, ДГУ, автоматика. Расчёт, проектирование, монтаж и обслуживание. Москва и область.',
  image: '/ups/hero-house.jpg',
  imageAlt: 'Частный дом с системой резервного электроснабжения',
  serviceType: 'Резервное и бесперебойное электроснабжение под ключ',
  areaServed: ['Москва', 'Московская область'],
}, {
  meta: [{ name: 'viewport', content: 'width=device-width,initial-scale=1,viewport-fit=cover' }],
  htmlAttrs: { class: 'ups-document service-landing-document', lang: 'ru' },
  link: landingFontPreloads,
}))
</script>
