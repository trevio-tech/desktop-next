import { defineNuxtPlugin } from '#imports'
import { Echo } from '@trevio/ui'

export default defineNuxtPlugin(async (nuxtApp) => {
  const echo = await Echo(nuxtApp)

  return {
    provide: {
      echo,
    }
  }
})
