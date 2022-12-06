<template>
  <ul>
    <li :class="{'bg-blue-100': !categoryId}">
      <NuxtLink :to="{name: 'users.bookmarks'}">Все {{ store.sumOfEntriesFromAllCategories }}</NuxtLink>
    </li>
    <li v-for="category in store.bookmarksCategories" :key="category.id" :class="{'bg-blue-100': categoryId === category.id}">
      <NuxtLink :to="{name: 'users.bookmarks.category', params: {userId, categoryId: category.id}}">{{ category.name }}</NuxtLink>
    </li>
  </ul>
</template>

<script setup>
import { useRoute } from 'nuxt/app'
import { useUsersStore } from '~/components/modules/users/store'

const store = useUsersStore()
const params = useRoute().params
const userId = parseInt(params.userId)
const categoryId = parseInt(params.categoryId)
</script>