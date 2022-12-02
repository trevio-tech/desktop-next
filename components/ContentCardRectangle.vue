<template>
  <article class="bg-white overflow-hidden ring-1 ring-slate-200 rounded-lg">
    {{ entry.title }}
  </article>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  entry: {
    type:     Object,
    required: true,
  },
})

const to = computed(() => {
  const systemName = props.entry.system_name
  const id = props.entry.id

  if (systemName === 'notes') {
    return {name: 'notes.show', params: {noteId: id}}
  } else if (systemName === 'travels') {
    return {name: 'travels.show', params: {travelId: id}}
  }
})

const label = {
  notes: 'Заметка',
  posts: 'Блог компании',
  questions: 'Вопрос',
  reviews: 'Отзыв',
  travels: 'Путешествие',
}
</script>