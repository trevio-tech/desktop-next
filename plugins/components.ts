import { defineNuxtPlugin } from '#imports'
import { Button, RippleDirective, OverlayPlugin } from '@trevio/ui'
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('ripple', RippleDirective)
  nuxtApp.vueApp.component('Button', Button)
  nuxtApp.vueApp.use(OverlayPlugin)

  return {
    provide: {
      overlay: nuxtApp.vueApp.config.globalProperties.$overlay,
    }
  }
})