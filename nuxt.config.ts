import { createResolver } from '@nuxt/kit'

const { resolve } = createResolver(import.meta.url)

const config = {
  extends: [
    process.env.LAYER || '@trevio-tech/ui'
  ],
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
  runtimeConfig: {
    public: {
      GRAPHQL_URL: process.env.GRAPHQL_URL,
      WEBSOCKETS_HOST: process.env.WEBSOCKETS_HOST,
    }
  },
  auth: {
    strategies: {
      graphql: {
        scheme: '~/schemes/graphql.ts',
      }
    }
  },
}

if (process.env.ENV !== 'development') {
  config.css.push(resolve('./node_modules/@trevio/ui/src/assets/style.css'))
} else {
  config.css.push(resolve('../ui/src/assets/style.css'))
  config.alias = {
    "@trevio/ui": resolve('../ui/src/index.ts'),
  }
  config.vite = {
    server: {
      fs: {
        allow: ['..']
      }
    }
  }
}

export default defineNuxtConfig(config)