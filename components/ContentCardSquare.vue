<template>
  <article class="bg-white overflow-hidden ring-1 ring-slate-200 rounded-lg w-[200px]">
    <NuxtLink :to="to" class="block">
      <img :src="entry.cover?.sizes?.default" :alt="entry.title" width="200" height="150" loading="lazy">
    </NuxtLink>
    <div class="p-4">
      <h2 class="mb-2 overflow-hidden">
        <NuxtLink :to="to">{{ entry.title }}</NuxtLink>
      </h2>
      <NuxtLink :to="to" class="text-sm">{{ entry.text }}</NuxtLink>
    </div>
  </article>
</template>

<script setup>
import { computed, ref } from 'vue'

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
  } else if (systemName === 'albums') {
    return {name: 'albums.show', params: {albumId: id}}
  }
})

const bookmarks = ref(props.entry.bookmarks?.map((bookmark) => bookmark.category_id))

const label = {
  notes: 'Заметка',
  posts: 'Блог компании',
  questions: 'Вопрос',
  reviews: 'Отзыв',
  travels: 'Путешествие',
}
</script>