<template>
  <div>
    <div class="my-4 flex items-center">
      <div class="flex-grow border-t border-gray-300"></div>
      <span class="flex-shrink mx-4 text-gray-400">или</span>
      <div class="flex-grow border-t border-gray-300"></div>
    </div>

    <div class="flex items-center space-x-2 mt-1">
      <div class="border flex-auto rounded-lg cursor-pointer">
        <img src="/images/icons/social/vk.svg" alt="" @click="onSocial('vkontakte')" class="mx-auto" height="40">
      </div>
      <div class="border flex-auto rounded-lg cursor-pointer">
        <img src="/images/icons/social/yandex.svg" alt="" @click="onSocial('yandex')" class="mx-auto" height="40">
      </div>
      <div class="border flex-auto rounded-lg cursor-pointer">
        <img src="/images/icons/social/google.svg" alt="" @click="onSocial('google')" class="mx-auto" height="40">
      </div>
    </div>
  </div>
</template>

<script setup>
import { useNuxtApp } from '#imports'
const { $auth, $overlay } = useNuxtApp()
window.setToken = async (token) => {
  await $auth.setUserToken(token)
  $overlay.hide()
}

const onSocial = async (provider) => {
  const { data: { socialiteProvider } } = await useQuery({
    query: `
      query ($provider: String!) {
        socialiteProvider (provider: $provider)
      }
    `,
    variables: {
      provider
    }
  })

  const popup = usePopup(socialiteProvider, 'oauth', 700, 600)
  const checkPopup = setInterval(() => {
    if (!popup || !popup.closed) return
    clearInterval(checkPopup)
  }, 1000)
}
</script>