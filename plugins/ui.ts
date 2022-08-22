import { Ripple } from 'ui'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('ripple', Ripple)
})