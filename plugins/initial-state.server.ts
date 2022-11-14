import { defineNuxtPlugin } from '#app'
import { gql, useAsyncQuery } from '#imports'

export default defineNuxtPlugin(async () => {
  /*try {
    const { data } = await useAsyncQuery(gql`
      query {
        myChats {
          id
        }
      }
    `)

    console.log(data)
  } catch (error) {
  }*/
})