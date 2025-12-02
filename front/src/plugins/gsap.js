import { gsap } from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Регистрируем плагины
gsap.registerPlugin(ScrollTrigger, ScrollSmoother, ScrollToPlugin);

export default {
  install(app) {
    // Делаем GSAP доступным глобально через this.$gsap
    app.config.globalProperties.$gsap = gsap;

    // Делаем ScrollTrigger доступным глобально через this.$ScrollTrigger
    app.config.globalProperties.$ScrollTrigger = ScrollTrigger;

    // Делаем ScrollSmoother доступным глобально через this.$ScrollSmoother
    app.config.globalProperties.$ScrollSmoother = ScrollSmoother;

    // Также предоставляем через provide для использования в Composition API
    app.provide("gsap", gsap);
    app.provide("ScrollTrigger", ScrollTrigger);
    app.provide("ScrollSmoother", ScrollSmoother);
  },
};

// Экспортируем для прямого использования
export { gsap, ScrollSmoother, ScrollTrigger };
