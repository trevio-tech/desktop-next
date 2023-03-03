export default defineNuxtConfig({
  extends: [
    // 'github:trevio-tech/nuxt-base-layer#master',
    // 'github:trevio-tech/nuxt-head-layer#master',
    '../nuxt-base-layer',
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
      GRAPHQL_URL_V2: process.env.GRAPHQL_URL_V2,
    }
  },
  auth: {
    strategies: {
      graphql: {
        scheme: '~/schemes/graphql.ts',
      }
    }
  }
})
