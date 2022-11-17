export default {
  vite: {
    server: {
      fs: {
        allow: ['..']
      }
    }
  },
  app: {
    head: {
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'msapplication-TileColor', content: '#da532c' },
        { name: 'theme-color', content: '#ffffff' }
      ],
      link: [
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/favicon/apple-touch-icon.png' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon/favicon-16x16.png' },
        { rel: 'manifest', href: '/favicon/site.webmanifest' },
        { rel: 'mask-icon', href: '/favicon/safari-pinned-tab.svg', color: "#5bbad5" },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Montserrat:400,500,600&display=swap' }
      ],
    },
  },
  css: [
    '@/assets/scss/main.scss'
  ],
  modules: [
    '~/modules/routes',
    '@nuxtjs-alt/auth',
    '@nuxtjs-alt/http',
    '@nuxtjs/apollo',
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
  ],
  build: {
    transpile: ['ui', '@heroicons/vue', '@vuepic/vue-datepicker']
  },
  publicRuntimeConfig: {
    GRAPHQL_URL: process.env.GRAPHQL_URL
  },
  apollo: {
    clients: {
      default: {
        tokenStorage: 'cookie',
        authType: 'Bearer',
        tokenName: 'auth._token.local',
        authHeader: 'Authorization',
        httpEndpoint: process.env.GRAPHQL_URL
      }
    },
  },
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: {
            url: process.env.API_URL + '/users/login',
            method: 'post',
          },
          logout: {
            url: process.env.API_URL + '/users/logout',
            method: 'post'
          },
          user: {
            url: process.env.API_URL + '/users/me',
            method: 'post',
            propertyName: false
          }
        },
        token: {
          property: 'token',
          maxAge: 60 * 60
        },
        user: {
          property: false,
          autoFetch: true
        },
      }
    },
    redirect: {
      home: false,
    }
  },
}
