import vuetify from 'vite-plugin-vuetify'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-07-17',
  
  devtools: { enabled: true },

  // Включение CSS
  css: [
    'vuetify/styles'
  ],

  // Настройка сборки
  build: {
    transpile: ['vuetify']
  },

  // Конфигурация модулей
  modules: [
    async (options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        config.plugins?.push(vuetify())
      })
    }
  ],

  // Настройка Vite
  vite: {
    ssr: {
      noExternal: ['vuetify'],
      resolve: {
        conditions: ['node']
      }
    },
    define: {
      'process.env.DEBUG': false
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "~/assets/styles/variables.scss" as *;'
        }
      }
    }
  }
})

