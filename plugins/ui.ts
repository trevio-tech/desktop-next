import { defineNuxtPlugin } from '#app'
import { Ripple } from '@trevio/ui'
import { VOverlayPlugin } from '~/components/dev/Overlay'

export default defineNuxtPlugin((nuxtApp) => {

  nuxtApp.vueApp.directive('ripple', Ripple)
  nuxtApp.vueApp.use(VOverlayPlugin)

  return {
    provide: {
      overlay: nuxtApp.vueApp.config.globalProperties.$overlay
    }
  }
})