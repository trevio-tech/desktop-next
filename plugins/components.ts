import { defineNuxtPlugin } from '#imports'
import 'vue3-toastify/dist/index.css'
import Vue3Toasity, { type ToastContainerOptions } from 'vue3-toastify'
import { Button, IsLoggedIn, RippleDirective } from '@trevio/ui'

export default defineNuxtPlugin(async (nuxtApp) => {
  nuxtApp.vueApp.component('Button', Button)
  nuxtApp.vueApp.component('IsLoggedIn', IsLoggedIn)
  nuxtApp.vueApp.directive('ripple', RippleDirective)

  nuxtApp.vueApp.use(Vue3Toasity, {
    autoClose: 3000,
  } as ToastContainerOptions)
})