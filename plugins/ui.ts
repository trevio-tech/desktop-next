import { Ripple } from 'ui'
import { useNuxtApp } from '#app';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('ripple', Ripple)
})