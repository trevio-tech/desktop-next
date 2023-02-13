import { defineNuxtPlugin } from '#imports'
import TheLayout from '~/components/layout/TheLayout.vue'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('TheLayout', TheLayout)
})