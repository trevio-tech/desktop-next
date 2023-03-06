import { createResolver } from '@nuxt/kit'

const { resolve } = createResolver(import.meta.url)

const conf = {
  /*imports: {
    autoImport: false
  },*/
  vite: {
    optimizeDeps: {
      exclude: ['fabric']
    },
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
  build: {
    transpile: ['@headlessui/vue']
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
}

if (process.env.ENV === 'development') {
  console.log(conf)
  if (! Object.hasOwn(conf, 'alias')) {
    conf.alias = {}
  }

  conf.alias['@trevio/ui'] = resolve('../ui')

  if (! conf.vite?.server) {
    conf.vite.server = {
      fs: {
        allow: ['..']
      }
    }
  }
}

export default defineNuxtConfig(conf)
