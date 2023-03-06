const config = {
  extends: [
      process.env.LAYER || '@trevio-tech/ui'
  ],
  vite: {
    server: {
      fs: {
        allow: ['..']
      }
    }
  },
  css: [
    '@/assets/scss/main.scss',
  ],
  modules: [
    '@nuxt-alt/auth',
    '@nuxt-alt/http',
    '@pinia/nuxt',
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
}

export default defineNuxtConfig(config)
