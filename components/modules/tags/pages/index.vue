<template>
  <TheLayout :heading="title">
  </TheLayout>
</template>

<script setup>
import TheLayout from '~/components/layout/TheLayout.vue'
import { useRoute } from 'nuxt/app'

const route = useRoute()

const contentTypes = {
  albums: 'фотоальбомов',
  notes: 'заметок',
  questions: 'вопросов',
  reviews: 'отзывов',
  travels: 'путешествий',
}

let titleContentType = ''

if (Object.hasOwn(contentTypes, route.params?.content)) {
  titleContentType = contentTypes[route.params?.content]
}

const title = route.params?.tag
    ? `Поиск ${titleContentType} по тегу ${route.params.tag}`
    : 'Теги'
</script>