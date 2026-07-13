import vuetify from 'vite-plugin-vuetify'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-07-17',
  telemetry: false,
  
  devtools: { enabled: true },
  
  // Настройка приложения
  app: {
    head: {
      title: 'Энергосистемы',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Энергосистемы - ГНБ под ключ, электромонтажные работы, проектирование и инженерные сети в Москве и Московской области.' },
        { name: 'yandex-verification', content: 'ce77c5421bfe46c7' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico?v=2' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/img/image.png?v=3' },
        { rel: 'apple-touch-icon', href: '/img/image.png?v=3' }
      ]
    }
  },
  
  // Настройка dev сервера
  devServer: {
    port: 5173,
    host: '0.0.0.0'
  },

  nitro: {
    prerender: {
      routes: [
        '/services/hdd',
        '/privacy',
        '/requisites',
        '/personal-data-consent'
      ]
    }
  },

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
    optimizeDeps: {
      exclude: ['gsap']
    },
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
