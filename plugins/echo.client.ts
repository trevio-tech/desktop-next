import { defineNuxtPlugin } from '#imports'
import { Echo } from '@trevio/ui'

export default defineNuxtPlugin(async (nuxtApp) => {
  return {
    provide: {
      echo: await Echo(nuxtApp),
    }
  }
})
