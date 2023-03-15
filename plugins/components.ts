import { defineNuxtPlugin } from '#imports'
import { Button, IsLoggedIn, RippleDirective } from '@trevio/ui'

export default defineNuxtPlugin(async (nuxtApp) => {
  nuxtApp.vueApp.component('Button', Button)
  nuxtApp.vueApp.component('IsLoggedIn', IsLoggedIn)
  nuxtApp.vueApp.directive('ripple', RippleDirective)
})