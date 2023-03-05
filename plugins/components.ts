import { Button, RippleDirective } from '@trevio/ui'
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('ripple', RippleDirective)
  nuxtApp.vueApp.component('Button', Button)
})