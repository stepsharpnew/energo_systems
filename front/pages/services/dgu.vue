<template>
  <div ref="root" class="dgu" id="top">
    <DguHeader :working="isWorkingHours" :scrolled="headerScrolled" @callback="openCallback" />
    <main>
      <DguHeroSection @solution="chooseSolution" />
      <DguQuizSection />
      <DguClientsSection :reduced="reducedMotion" />
      <DguServiceSection :reduced="reducedMotion" @callback="openCallback" />
      <DguProcessSection :reduced="reducedMotion" @callback="openCallback" />
      <DguRealizedSection :reduced="reducedMotion" @callback="openCallback" />
      <DguCatalogSection ref="catalog" :solution="solution" :reduced="reducedMotion" @solution="solution = $event" @callback="openCallback" />
      <DguSolutionsSection :reduced="reducedMotion" />
      <DguOffersSection :reduced="reducedMotion" @callback="openCallback" />
      <DguFaqSection />
      <DguContactsSection />
    </main>
    <DguFooter />
    <div class="sticky-cta" :class="{ 'is-visible': stickyVisible }" data-sticky>
      <a class="btn-pill btn-pill--sm" href="#quiz"><span>Рассчитать стоимость</span></a>
    </div>
    <DguCallbackModal :request="callback" @close="callback = null" />
  </div>
</template>

<script setup>
import DguHeader from '~/components/dgu/Header.vue'
import DguHeroSection from '~/components/dgu/HeroSection.vue'
import DguQuizSection from '~/components/dgu/QuizSection.vue'
import DguClientsSection from '~/components/dgu/ClientsSection.vue'
import DguServiceSection from '~/components/dgu/ServiceSection.vue'
import DguProcessSection from '~/components/dgu/ProcessSection.vue'
import DguRealizedSection from '~/components/dgu/RealizedSection.vue'
import DguCatalogSection from '~/components/dgu/CatalogSection.vue'
import DguSolutionsSection from '~/components/dgu/SolutionsSection.vue'
import DguOffersSection from '~/components/dgu/OffersSection.vue'
import DguFaqSection from '~/components/dgu/FaqSection.vue'
import DguContactsSection from '~/components/dgu/ContactsSection.vue'
import DguFooter from '~/components/dgu/Footer.vue'
import DguCallbackModal from '~/components/dgu/CallbackModal.vue'
import { useLandingPage } from '~/composables/useLandingPage.js'
import '~/assets/styles/dgu.css'
import '~/assets/styles/service-landing.css'

const root = ref(null), catalog = ref(null), callback = ref(null), solution = ref('all')
const { isWorkingHours, headerScrolled, stickyVisible, reducedMotion } = useLandingPage(root, {
  stickySelectors: '.hero__cta .btn-pill, #quiz, .cases__cta .btn-pill, #contacts, .footer',
})
const openCallback = (request = {}) => { callback.value = request }
async function chooseSolution(value) { solution.value = value; await nextTick(); catalog.value?.reveal() }
useHead({
  title: 'Дизельные электростанции под ключ',
  htmlAttrs: { lang: 'ru', class: 'service-landing-document' },
  meta: [{ name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover' }, { name: 'description', content: 'Резервное энергоснабжение под ключ: ДГУ от 30 кВт с АВР и промышленные ИБП для ТЦ, БЦ, АЗС, складов, отелей, больниц и коттеджных поселков. Проектирование, поставка, монтаж и сервис по всей России.' }],
  link: [{ rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=PT+Serif:wght@400;700&display=swap' }],
})
</script>
