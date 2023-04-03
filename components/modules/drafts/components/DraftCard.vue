<template>
  <NuxtLink :to="urls[content.system_name]" class="hover:bg-slate-500">
    <h2 class="text-lg">{{ content.title }}</h2>
    <div class="text-sm font-medium text-gray-500">Дата создания: {{ content.created_at }}</div>
  </NuxtLink>
</template>

<script setup>
const props = defineProps({
  content: {
    type: Object,
    required: true
  }
})

const urls = {
  albums: {name: 'albums.show', params: {albumId: props.content.id}},
  notes: {name: 'notes.show', params: {noteId: props.content.id}},
  questions: {name: 'questions.show', params: {questionId: props.content.id}},
  reviews: {name: 'reviews.show', params: {reviewId: props.content.id}},
  travels: {name: 'travels.show', params: {travelId: props.content.id}},
}
</script>