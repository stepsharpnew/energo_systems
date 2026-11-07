import { fileURLToPath } from 'node:url'
import { METRIKA_BOOTSTRAP } from './lib/browser/analytics.js'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-07-17',
  telemetry: false,
  // Route styles are cached independently instead of repeated in every HTML.
  features: { inlineStyles: false },
  experimental: {
    defaults: { nuxtLink: { prefetchOn: { visibility: false, interaction: true } } }
  },
  hooks: {
    'build:manifest'(manifest) {
      // Async dialogs should load when opened. Keep current-route preloads,
      // while NuxtLink handles neighboring routes on hover or keyboard focus.
      for (const resource of Object.values(manifest)) resource.prefetch = false
    }
  },
  
  devtools: { enabled: true },
  
  // Настройка приложения
  app: {
    head: {
      htmlAttrs: { lang: 'ru' },
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
          innerHTML: METRIKA_BOOTSTRAP
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

  // короткий адрес лендинга ГНБ ведёт на саму страницу услуги
  routeRules: {
    '/hdd': { redirect: { to: '/services/hdd', statusCode: 301 } }
  },

  nitro: {
    publicAssets: [
      { dir: fileURLToPath(new URL('./lib/browser', import.meta.url)), baseURL: '/scripts', maxAge: 0 }
    ],
    prerender: {
      routes: [
        '/services',
        '/services/hdd',
        '/services/ups',
        '/services/dgu',
        '/services/road',
        '/services/water',
        '/services/sewer',
        '/services/power',
        '/services/gas',
        '/services/design',
        '/services/support',
        '/services/heating',
        '/services/monitoring',
        '/equipment',
        '/equipment/mtp',
        '/equipment/ktp',
        '/equipment/bktp',
        '/equipment/krun',
        '/equipment/krun-cells',
        '/equipment/kso',
        '/equipment/kru',
        '/equipment/yakno',
        '/equipment/pku',
        '/equipment/power-transformers',
        '/equipment/vru-shcho',
        '/privacy',
        '/requisites',
        '/personal-data-consent'
      ]
    }
  },

  // Включение CSS
  css: [
    '~/assets/styles/site-base.css',
    '~/public/styles/callback-preferences.css'
  ],

  // Настройка Vite
  vite: {
    build: {
      rollupOptions: {
        output: {
          // Keep the shared lock out of the page chunk imported by its lazy
          // dialog. A circular page chunk loses its SSR CSS manifest entry.
          manualChunks(id) {
            if (id.endsWith('/utils/dguDialogLock.js')) return 'dgu-dialog-lock'
          }
        }
      }
    },
    ssr: {
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
