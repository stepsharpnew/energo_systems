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
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico?v=4' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/img/icons/favicon-32x32.png?v=4' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/img/icons/apple-touch-icon.png?v=4' }
      ],
      script: [
        {
          type: 'text/javascript',
          innerHTML: `(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
ym(110919120, "init", {defer:true, clickmap:true, trackLinks:true, accurateTrackBounce:true});`
        }
      ],
      noscript: [
        {
          innerHTML: '<div><img src="https://mc.yandex.ru/watch/110919120" style="position:absolute; left:-9999px;" alt="" /></div>',
          tagPosition: 'bodyClose'
        }
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
        '/services',
        '/services/hdd',
        '/services/road',
        '/services/water',
        '/services/sewer',
        '/services/power',
        '/services/gas',
        '/services/design',
        '/services/support',
        '/services/heating',
        '/services/monitoring',
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
