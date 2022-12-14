import { $fetch } from 'ohmyfetch'
import { useNuxtApp } from 'nuxt/app'

export default async (query, variables) => await $fetch(
  'http://127.0.0.1:9000/graphql',
  {
    body: {
      query: query
          .trim()
          .replaceAll(/\s+/ig, ' '),
      variables
    },
    headers: {
      Accept: 'application/json',
      Authorization: useNuxtApp().$auth.strategy.token.get()
    },
    initialCache: false,
    transform: data => data.data,
    method: 'POST',
    async onResponse({ response }) {
      if (response?._data?.errors) {
        return new Promise((resolve, reject) => reject(response._data.errors))
      }
    }
  }
)