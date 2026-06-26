export default defineNuxtPlugin(async (nuxtApp) => {
  try {
    const [
      { gsap },
      { ScrollSmoother },
      { ScrollToPlugin },
      { ScrollTrigger },
    ] = await Promise.all([
      import("gsap"),
      import("gsap/ScrollSmoother"),
      import("gsap/ScrollToPlugin"),
      import("gsap/ScrollTrigger"),
    ]);

    gsap.registerPlugin(ScrollTrigger, ScrollSmoother, ScrollToPlugin);

    nuxtApp.vueApp.config.globalProperties.$gsap = gsap;
    nuxtApp.vueApp.config.globalProperties.$ScrollTrigger = ScrollTrigger;
    nuxtApp.vueApp.config.globalProperties.$ScrollSmoother = ScrollSmoother;

    nuxtApp.provide("gsap", gsap);
    nuxtApp.provide("ScrollTrigger", ScrollTrigger);
    nuxtApp.provide("ScrollSmoother", ScrollSmoother);
  } catch (error) {
    console.warn("[gsap] animations disabled", error);

    nuxtApp.vueApp.config.globalProperties.$gsap = null;
    nuxtApp.vueApp.config.globalProperties.$ScrollTrigger = null;
    nuxtApp.vueApp.config.globalProperties.$ScrollSmoother = null;

    nuxtApp.provide("gsap", null);
    nuxtApp.provide("ScrollTrigger", null);
    nuxtApp.provide("ScrollSmoother", null);
  }
});
