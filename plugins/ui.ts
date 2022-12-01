import { defineNuxtPlugin } from '#app'
import { Ripple, GraphQLPlugin } from '@trevio/ui'
import { VOverlayPlugin } from '~/components/dev/Overlay'
import TheLayout from '../components/layout/TheLayout.vue'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('ripple', Ripple)
  nuxtApp.vueApp.use(VOverlayPlugin)

  nuxtApp.vueApp.use(GraphQLPlugin, {
    baseUrl: 'http://127.0.0.1:9000/graphql',
    token: nuxtApp.$auth.strategy.token.get()
  })

  nuxtApp.vueApp.component('TheLayout', TheLayout)

  return {
    provide: {
      overlay: nuxtApp.vueApp.config.globalProperties.$overlay,
    }
  }
})