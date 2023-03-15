import { defineNuxtPlugin } from '#imports'
import { Button } from '@trevio/ui'

export default defineNuxtPlugin(async (nuxtApp) => {
  nuxtApp.vueApp.component('Button', Button)
})