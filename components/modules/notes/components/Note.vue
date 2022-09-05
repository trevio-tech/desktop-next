<template>
  <article class="bg-white p-4 rounded-md shadow ring-1 ring-slate-200">
    <h2 class="text-lg font-semibold">
      <NuxtLink :to="{name: 'notes.show', params: {noteId: entry.id}}">{{ entry.title }}</NuxtLink>
    </h2>

    <div v-if="entry.tags.length" class="space-x-2 mt-2 text-slate-400 text-sm">
      <NuxtLink
          class="hover:text-slate-600"
          v-for="tag in entry.tags"
          :key="tag.id"
          :to="{name: 'notes.show', params: {noteId: entry.id}}">#{{ tag.name }}</NuxtLink>
    </div>

    <p v-if="entry.text" class="text-sm mt-2">
      <NuxtLink :to="{name: 'notes.show', params: {noteId: entry.id}}">{{ entry.text }}</NuxtLink>
    </p>

    <footer class="text-sm mt-4">
      лайки: {{ entry.likes_count }}
    </footer>
  </article>
</template>]

<script setup>
defineProps({
  entry: {
    type: Object,
    required: true
  }
})
</script>