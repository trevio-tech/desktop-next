import { defineNuxtPlugin } from '#imports'
import { websockets } from '@trevio/ui'

export default defineNuxtPlugin((nuxtApp) => {
  return {
    provide: {
      echo: websockets(nuxtApp),
    }
  }
})
