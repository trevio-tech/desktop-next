export default defineNuxtConfig({
  /*experimental: {
    treeshakeClientOnly: false
  },*/
  extends: [
    //'github:trevio-tech/nuxt-base-layer#master',
    //'github:trevio-tech/nuxt-head-layer#master',
    '../nuxt-base-layer',
    '../nuxt-head-layer',
  ],
  vite: {
    server: {
      fs: {
        allow: ['..']
      }
    }
  },
  css: [
    '@/assets/scss/main.scss'
  ],
  modules: [
    '@pinia/nuxt',
    '@nuxtjs-alt/auth',
    '@nuxtjs-alt/http',
    '@nuxtjs/tailwindcss',
    '~/modules/routes',
  ],
  runtimeConfig: {
    public: {
      GRAPHQL_URL: process.env.GRAPHQL_URL,
    }
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
          property: '',
          autoFetch: true
        },
      }
    },
    redirect: {
      home: false,
    }
  },
})
