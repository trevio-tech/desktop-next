<template>
  <NuxtLink :to="url" class="flex items-center justify-between bg-white p-4 hover:bg-gray-100">
    <div>
      <h2 class="text-lg">{{ content.title }}</h2>
      <div class="text-sm font-medium text-gray-500">
        {{ type }} | Дата создания: {{ content.created_at }}
      </div>
    </div>
    <div class="p-2 border rounded-lg bg-white">
      <Pencil class="w-5 h-5" />
    </div>
  </NuxtLink>
</template>

<script setup>
import { Pencil } from 'lucide-vue-next'

const props = defineProps({
  content: {
    type: Object,
    required: true
  }
})

const url = {
  albums: {name: 'albums.edit', params: {albumId: props.content.id}},
  notes: {name: 'notes.edit', params: {noteId: props.content.id}},
  questions: {name: 'questions.edit', params: {questionId: props.content.id}},
  reviews: {name: 'reviews.edit', params: {reviewId: props.content.id}},
  travels: {name: 'travels.edit', params: {travelId: props.content.id}},
}[props.content.system_name]

const type = {
  albums: 'Фотоальбом',
  notes: 'Заметка',
  questions: 'Вопрос-ответ',
  reviews: 'Отзыв',
  travels: 'Путешествие',
}[props.content.system_name]
</script>