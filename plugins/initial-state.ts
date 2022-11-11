import { defineNuxtPlugin, useCookie } from '#app'
import { gql, useAsyncQuery } from '#imports'

export default defineNuxtPlugin(async (nuxtApp) => {
  const cookie = useCookie('auth._token.local')

  nuxtApp.hook('apollo:auth', async ({ client, token }) => {
    token.value = cookie

    try {
      const {data} = await useAsyncQuery(gql`
          query {
              chats: myChats {
                  id
              }
          }
      `)

      console.log(data)
    } catch (error) {
    }
  })
})