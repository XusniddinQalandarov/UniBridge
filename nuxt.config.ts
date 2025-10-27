// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  
  modules: [
    '@primevue/nuxt-module',
    '@nuxtjs/i18n',
    '@nuxtjs/tailwindcss',
  ],

  nitro: {
    preset: 'netlify'
  },

  ssr: true,

  i18n: {
    locales: [
      { code: 'uz', name: 'O\'zbekcha', file: 'uz.json' },
      { code: 'ru', name: 'Русский', file: 'ru.json' },
      { code: 'en', name: 'English', file: 'en.json' }
    ],
    defaultLocale: 'uz',
    langDir: './locales',
    strategy: 'prefix_except_default',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root'
    }
  },

  primevue: {
    options: {
      theme: {
        preset: {
          primitive: {
            primary: {
              50: '#e8f4ff',
              100: '#d1e7ff',
              200: '#b3d9ff',
              300: '#85c5ff',
              400: '#56a3ff',
              500: '#1646A2',
              600: '#1446A2',
              700: '#123e91',
              800: '#0f3376',
              900: '#0d2a61',
              950: '#091a3a'
            }
          },
          semantic: {
            primary: {
              50: '{primary.50}',
              100: '{primary.100}',
              200: '{primary.200}',
              300: '{primary.300}',
              400: '{primary.400}',
              500: '{primary.500}',
              600: '{primary.600}',
              700: '{primary.700}',
              800: '{primary.800}',
              900: '{primary.900}',
              950: '{primary.950}'
            }
          }
        }
      }
    },
    components: {
      include: '*'
    }
  },

  css: [
    'primeicons/primeicons.css'
  ],

  app: {
    head: {
      title: 'UniBridge.uz - Koreyada ta\'lim olish bo\'yicha professional yordam',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Koreyaning TOP universitetlarida ta\'lim olishda professional yordam. Bepul konsultatsiya.' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap' }
      ]
    }
  }
})
