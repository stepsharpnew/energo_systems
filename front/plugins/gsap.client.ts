import { gsap } from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Регистрируем плагины
gsap.registerPlugin(ScrollTrigger, ScrollSmoother, ScrollToPlugin);

export default defineNuxtPlugin((nuxtApp) => {
  // Делаем GSAP доступным глобально через this.$gsap
  nuxtApp.vueApp.config.globalProperties.$gsap = gsap;

  // Делаем ScrollTrigger доступным глобально через this.$ScrollTrigger
  nuxtApp.vueApp.config.globalProperties.$ScrollTrigger = ScrollTrigger;

  // Делаем ScrollSmoother доступным глобально через this.$ScrollSmoother
  nuxtApp.vueApp.config.globalProperties.$ScrollSmoother = ScrollSmoother;

  // Также предоставляем через provide для использования в Composition API
  nuxtApp.provide("gsap", gsap);
  nuxtApp.provide("ScrollTrigger", ScrollTrigger);
  nuxtApp.provide("ScrollSmoother", ScrollSmoother);
});

// Экспортируем для прямого использования
export { gsap, ScrollSmoother, ScrollTrigger };

