import { defineNuxtPlugin } from '#imports'
import { useBookmarksStore } from '~/components/modules/bookmarks/store'
import { useChatsStore } from '~/components/modules/chats/stores/chats'
import { useShotsStore } from '~/components/modules/shots/store'
import { watch } from 'vue'
import { MY_CHATS } from '~/components/modules/chats/graphql';
import { useQuery } from '@trevio/ui'

export default defineNuxtPlugin(async (nuxtApp) => {
  const initialState = async (loggedIn) => {
    try {
      const queries = [`
        stories {
          id
          user_id
          image
          user {
            id
            name
            avatar
          }
        }
      `]

      if (loggedIn) {
        queries.push(`
          bookmarkCategories(user_id: ${nuxtApp.$auth.user.id})  {
            id
            name
            content_count
          }
        `)
        queries.push(MY_CHATS)
      }

      const query = /* GraphQL */`
        query initialState {
          ${queries.join(',')}
        }
      `

      const { data } = await useQuery({
        query,
      }, {
        key: 'initial-state'
      })

      await useShotsStore().$patch({
        stories: data.stories
      })

      if (loggedIn) {
        await useBookmarksStore().$patch({
          categories: data.bookmarkCategories
        })
        await useChatsStore().$patch({
          chats: data.myChats
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