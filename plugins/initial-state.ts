import { defineNuxtPlugin } from '#imports'
import { useBookmarksStore } from '~/components/modules/bookmarks/store'
import { useChatsStore } from '~/components/modules/chats/stores/chats'
import { useShotsStore } from '~/components/modules/shots/store'
import { watch } from 'vue'

export default defineNuxtPlugin(async (nuxtApp) => {
  const initialState = async (loggedIn) => {
    try {
      let variablesString = []
      const variables = {}
      const queries = [`
        stories2 {
          id
          user_id
          image(sizes: "resize:fit:80:160")
          user {
            id
            name
            avatar
          }
        }
      `]

      if (loggedIn) {
        variablesString.push('$userId: Int!')
        variables.userId = parseInt(nuxtApp.$auth.user.id)
        queries.push(`
          bookmarksCategories(userId: $userId)  {
            id
            name
            content_count
          }
        `)
      }

      let queryPayload = ''
      if (variablesString.length) {
        queryPayload = `(${variablesString.join(', ')})`
      }

      const query = /* GraphQL */`
        query initialState${queryPayload} {
          ${queries.join(',')}
        }
      `

      const { data } = await useQuery({
        query,
        variables,
      }, {
        key: 'initial-state'
      })

      await useShotsStore().$patch({
        stories: data.stories2
      })

      if (loggedIn) {
        await useBookmarksStore().$patch({
          categories: data.bookmarksCategories
        })
      }

      console.log('Initial state')
    } catch (error) {
      console.log(error)
    }
  }

  watch(() => nuxtApp.$auth.loggedIn, (loggedIn) => {
    initialState(loggedIn)
  }, {
    immediate: true
  })
})