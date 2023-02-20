<template>
  <NuxtLayout :heading="heading">
    <template #sidebar-before>
      <ul class="space-y-2">
        <li><NuxtLink :to="{name: 'search', params: {query: route.params.query}}">Все</NuxtLink></li>
        <li v-for="(item, key) in groupNames" :key="item">
          <NuxtLink :to="{name: 'search', params: {query: route.params.query}, query: {searchBy: key}}">{{ item }}</NuxtLink>
        </li>
      </ul>
    </template>
    <div class="space-y-10">
      <div v-for="(group, key) in search" :key="key">
        <header class="mb-2 flex items-center leading-loose justify-between border-b pb-1">
          <h3 class="font-semibold text-lg">{{ groupNames[key] }}</h3>
          <NuxtLink
            v-show="!isSearchBy"
            class="text-sm"
            :to="{name: 'search', params: {query: route.params.query}, query: {searchBy: key}}">
            Показать все
          </NuxtLink>
        </header>
        <div class="space-y-4">
          <Component
            v-for="entry in group"
            :key="entry.id"
            :is="key === 'users' ? UserSearchCard : SearchCard"
            :entry="entry" />
        </div>
        <div v-if="group.length === 0">Ничего не найдено</div>
      </div>
      <div v-if="search.length === 0">Ничего не найдено</div>
    </div>
  </NuxtLayout>
</template>

<script setup>
import SearchCard from '~/components/modules/search/components/SearchCard.vue'
import UserSearchCard from '~/components/modules/users/components/UserSearchCard.vue'
import { groupBy } from 'lodash'
import { useQuery, useSearchHead } from '#imports'

import { watch, shallowRef, computed } from 'vue'

const route = useRoute()

const { heading } = useSearchHead(route)

const query = route.params.query
const search = shallowRef([])
const isSearchBy = computed(() => route.query.searchBy)

const groupNames = {
  travels: 'Путешествия',
  notes: 'Заметки',
  questions: 'Вопросы',
  albums: 'Фотоальбомы',
  users: 'Пользователи',
}

const onFetch = async (searchBy = undefined) => {
  const { data } = await useQuery({
    query: `
      query ($query: String!, $searchBy: String) {
        search(query: $query, searchBy: $searchBy) {
          ... on Travel {
            id
            title
            text(words: 16)
            system_name
            cover(sizes: "default@resize:fill:640:320") {
              id
              model_id
              url
              sizes
            }
          }
          ... on Note {
            id
            cover_id
            title
            text(words: 16)
            system_name
            cover(sizes: "default@resize:fill:640:320") {
              id
              model_id
              url
              sizes
            }
          }
          ... on Album {
            id
            cover_id
            title
            text(words: 16)
            system_name
            cover(sizes: "default@resize:fill:640:320") {
              id
              model_id
              url
              sizes
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

  search.value = groupBy(data.search, 'system_name')
}

watch(() => route.query.searchBy, async (newValue) => await onFetch(newValue))

try {
  if (query.length) {
    await onFetch(route.query.searchBy)
  }
} catch (error) {}
</script>