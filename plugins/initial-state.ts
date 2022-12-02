import { MY_CHATS } from '~/components/modules/chats/graphql'
import { defineNuxtPlugin } from 'nuxt/app'
import { useUsersStore } from '~/components/modules/users/store'
import { useChatsStore } from '~/components/modules/chats/stores/chats'
import { useQuery } from '~/composables/useQuery'
import { watch } from 'vue'

export default defineNuxtPlugin(async (nuxtApp) => {
  const initialState = async (loggedIn) => {
    try {
      const variablesString = []
      const variables = {}
      const queries = []

      if (loggedIn) {
        variablesString.push('$userId: Int!')
        variables.userId = parseInt(nuxtApp.$auth.user.id)
        queries.push(`
          ${MY_CHATS},
          bookmarksCategories(userId: $userId)  {
            id
            name
            content_count
          }
        `)
      }

      const query = `
        query initialState(${variablesString.join(', ')}) {
          ${queries.join(',')}
        }
      `

      const { data } = await useQuery({
        query,
        variables,
      }, {
        key: 'initial-state'
      })

      if (loggedIn) {
        await useChatsStore().$patch({
          chats: data.myChats
        })
        await useUsersStore().$patch({
          bookmarksCategories: data.bookmarksCategories
        })
      }

      console.log('Initial state')
    } catch (error) {
      console.log(error)
    }
  }

  watch(() => nuxtApp.$auth.loggedIn, initialState, {
    immediate: true
  })
})