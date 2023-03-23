<template>
  <NuxtLayout :heading="heading">
    <div class="space-y-4">
    <Component
        v-for="entry in search"
        :key="entry.id"
        :is="key === 'users' ? UserSearchCard : SearchCard"
        :entry="entry" />
    </div>
  </NuxtLayout>
</template>

<script setup>
import SearchCard from '~/components/modules/search/components/SearchCard.vue'
import UserSearchCard from '~/components/modules/users/components/UserSearchCard.vue'
import { shallowRef, computed } from 'vue'
import {  useRoute } from '#imports'
import { useSearchHead, usePageQuery } from '@trevio/ui'

const route = useRoute()

const { heading } = useSearchHead(route)

const query = shallowRef(route.params.query)
const search = shallowRef([])
const isSearchBy = computed(() => route.query.searchBy)

const onFetch = async (searchBy = undefined) => {
  const { data } = await usePageQuery({
    query: `
      query ($query: String!, $searchBy: String) {
        search(query: $query, searchBy: $searchBy, limit: 100) {
          ... on Travel {
            id
            title
            text(words: 16)
            system_name
            user {
              id
              name
              avatar
            }
            cover {
              id
              url(presets: "default@resize:fill:640:320")
            }
          }
          ... on Note {
            id
            cover_id
            title
            text(words: 16)
            system_name
            cover {
              id
              url(presets: "default@resize:fill:640:320")
            }
          }
          ... on Album {
            id
            cover_id
            title
            text(words: 16)
            system_name
            cover {
              id
              url(presets: "default@resize:fill:640:320")
            }
          }
          ... on User {
            id
            name
            avatar
            system_name
          }
        }
      }
    `,
    variables: {
      query: route.params.query,
      searchBy,
    }
  })

  search.value = data.search
}

try {
  await onFetch(route.query.searchBy)
} catch (error) {}
</script>