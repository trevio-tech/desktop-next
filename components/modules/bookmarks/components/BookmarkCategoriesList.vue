<template>
  <ul>
    <li :class="{'bg-blue-100': !categoryId}">
      <NuxtLink :to="{name: 'bookmarks', params: {userId}}">Все {{ store.sumOfEntriesFromAllCategories }}</NuxtLink>
    </li>
    <li v-for="category in store.categories" :key="category.id" :class="{'bg-blue-100': categoryId === category.id}">
      <NuxtLink :to="{name: 'bookmarks.category', params: {userId, categoryId: category.id}}">{{ category.name }} - {{ category.content_count }}</NuxtLink>
    </li>
  </ul>
</template>

<script setup>
import { useRoute } from 'nuxt/app'
import { useBookmarksStore } from '~/components/modules/bookmarks/store'

const store = useBookmarksStore()
const params = useRoute().params
const userId = parseInt(params.userId)
const categoryId = parseInt(params.categoryId)
</script>