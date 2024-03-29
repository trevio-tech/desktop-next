import { defineNuxtPlugin } from '#imports'
import { useBookmarksStore } from '~/components/modules/bookmarks/store'
import { useChatsStore } from '~/components/modules/chats/stores/chats'
import { useShotsStore } from '~/components/modules/shots/store'
import { watch } from 'vue'
import { MY_CHATS } from '~/components/modules/chats/graphql'
import { useSubscriptionsStore, usePageQuery } from '@trevio/ui'

export default defineNuxtPlugin(async (nuxtApp) => {
  const subStore = useSubscriptionsStore()

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
            is_private
          }
          subscriptions(user_id: ${nuxtApp.$auth.user.id}) {
            model_type
            model_id
          }
        `)
        queries.push(MY_CHATS)
      }

      const query = /* GraphQL */`
        query initialState {
          ${queries.join(',')}
        }
      `

      const { data } = await usePageQuery({
        query,
      }, {
        key: 'initial-state'
      })

      useShotsStore().$patch({
        stories: data.stories
      })

      if (loggedIn) {
        useBookmarksStore().$patch({
          categories: data.bookmarkCategories
        })
        useChatsStore().$patch({
          chats: data.myChats
        })

        if (data.subscriptions.length) {
          subStore.$patch({
            subscriptions: data.subscriptions
                .reduce((accumulator, currentValue) => ({ ...accumulator, [currentValue.model_type + currentValue.model_id]: true}), {})
          })
        }
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