import { createResolver } from '@nuxt/kit'

const { resolve } = createResolver(import.meta.url)

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
    '@nuxt-alt/auth',
    '@nuxt-alt/http',
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
    '~/modules/routes',
  ],
  alias: {
    '@trevio/ui': resolve('../ui')
  },
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
