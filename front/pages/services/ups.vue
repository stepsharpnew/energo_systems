<template>
  <div ref="page" class="ups">
    <UpsHeader :working-hours="isWorkingHours" :scrolled="headerScrolled" />
    <main id="top">
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
    <div class="sticky-cta" :class="{ 'is-visible': stickyVisible }" data-sticky>
      <a class="btn-pill btn-pill--sm" href="#quiz"><span>Рассчитать стоимость</span></a>
    </div>
    <UpsCallbackModal ref="callback" />
  </div>
</template>

<script setup>
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
import UpsCallbackModal from '~/components/ups/UpsCallbackModal.vue'
const page = ref(null)
const callback = ref(null)
const { isWorkingHours, headerScrolled, stickyVisible } = useLandingPage(page, { stickySelectors: '.hero__cta .btn-pill, #quiz, .cfg__cta .btn-pill, .cases__cta .btn-pill, .trust-sec__cta .btn-pill' })
provide('upsCallback', options => callback.value?.open(options))
useHead({
  title: 'ИБП под ключ',
  meta: [{ name: 'viewport', content: 'width=device-width,initial-scale=1,viewport-fit=cover' }, { name: 'description', content: 'ИБП под ключ для частных домов и коттеджных посёлков: аккумуляторы, ДГУ, автоматика. Расчёт, проектирование, монтаж и обслуживание. Москва и область.' }],
  htmlAttrs: { class: 'ups-document service-landing-document', lang: 'ru' },
  link: [
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
    { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=PT+Serif:wght@400;700&display=swap' }
  ]
})
</script>
