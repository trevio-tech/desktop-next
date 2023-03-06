import {
  defineNuxtRouteMiddleware,
  navigateTo,
  useNuxtApp,
} from '#imports'

export default defineNuxtRouteMiddleware((to, from) => {
  const { $auth } = useNuxtApp()

  if ($auth.loggedIn) {
    return navigateTo('/')
  }
})