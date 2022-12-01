import { MY_CHATS } from '~/components/modules/chats/graphql'
import { defineNuxtPlugin } from 'nuxt/app'
import { useChatsStore } from '~/components/modules/chats/stores/chats'
import { useQuery } from '~/composables/useQuery'
import { watch } from 'vue'

export default defineNuxtPlugin((nuxtApp) => {
  const initialState = async () => {
    try {
      const query = `
        query {
          ${MY_CHATS}
        }
      `

      const { data } = await useQuery({
        query
      })

      useChatsStore().$patch({
        chats: data.myChats
      })

      console.log('Initial State')
    } catch (error) {}
  }

  nuxtApp.hook('app:created', () => {
    watch(() => nuxtApp.$auth.loggedIn, async () => await initialState(), {
      immediate: true
    })
  })
})