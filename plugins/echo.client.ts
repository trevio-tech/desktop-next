import { defineNuxtPlugin } from '#imports'
import { echo } from '@trevio/ui'

export default defineNuxtPlugin(async (nuxtApp) => {
  return {
    provide: {
      echo: await echo(nuxtApp),
    }
  }
})