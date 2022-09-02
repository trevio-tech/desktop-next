import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  app: {
    head: {
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ],
      link: [
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Montserrat:400,500,600&display=swap' }
      ],
    },
  },
  css: [
    '@/assets/scss/main.scss'
  ],
  modules: [
    'nuxt-windicss',
    '~/modules/routes'
  ],
  build: {
    transpile: ['ui', '@heroicons/vue']
  },
})
