import { createVuetify } from 'vuetify'

export default defineNuxtPlugin((nuxtApp) => {
  // Components are imported on demand by vite-plugin-vuetify in nuxt.config.ts.
  const vuetify = createVuetify({
    theme: {
      defaultTheme: 'light'
    },
    ssr: true
  })

  nuxtApp.vueApp.use(vuetify)
})
