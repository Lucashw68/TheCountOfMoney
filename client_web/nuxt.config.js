import colors from 'vuetify/es5/util/colors'
import pages from './config/locales/pages.json'
import en from './config/locales/en.json'
import fr from './config/locales/fr.json'

export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    titleTemplate: '%s',
    title: 'TheCountOfMoney',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ['~/css/main.css', '~/assets/fonts/fonts.css'],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    // https://www.npmjs.com/package/@nuxtjs/moment
    '@nuxtjs/moment',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    // https://auth.nuxtjs.org/
    '@nuxtjs/auth',
    // https://i18n.nuxtjs.org/
    'nuxt-i18n',
    // https://content.nuxtjs.org/fr/
    '@nuxtjs/content',
  ],

  i18n: {
    strategy: 'prefix_except_default',
    locales: ['en', 'fr'],
    defaultLocale: 'en',
    vueI18n: {
      fallbackLocale: 'en',
      messages: { en, fr },
    },
    parsePages: false,
    pages,
  },

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {
    baseURL:
      process.env.NODE_ENV === 'production'
        ? process.env.API_URL
        : 'http://localhost:8081/api',
  },

  // Vuetify module configuration (https://go.nuxtjs.dev/config-vuetify)
  vuetify: {
    treeShake: true,
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: '#424242',
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },

  auth: {
    strategies: {
      local: {
        endpoints: {
          login: { url: '/users/login', method: 'post', propertyName: 'token' },
          user: { url: '/users/profile', method: 'get', propertyName: 'user' },
          logout: { url: '/users/logout', method: 'post' },
        },
      },
    },
  },

  pwa: {
    manifest: {
      name: 'TheCountOfMoney',
      short_name: 'TCOM',
      background_color: '#424242',
      useWebmanifestExtension: false,
    },
  },

  router: {
    middleware: ['auth'],
  },

  loading: {
    color: '#424242',
    height: '5px',
    continuous: true,
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {},
}
