import { defineNuxtPlugin } from '#imports'
import { websockets } from '@trevio/ui'

export default defineNuxtPlugin((nuxtApp) => {
  return {
    provide: {
      websockets: websockets(nuxtApp),
    }
  }
})
