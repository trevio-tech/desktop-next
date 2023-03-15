import { defineNuxtPlugin } from '#imports'
import { Button, IsLoggedIn } from '@trevio/ui'

export default defineNuxtPlugin(async (nuxtApp) => {
  nuxtApp.vueApp.component('Button', Button)
  nuxtApp.vueApp.component('IsLoggedIn', IsLoggedIn)
})