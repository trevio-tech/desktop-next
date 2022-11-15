<template>
  <article class="bg-white p-4 rounded-md shadow ring-1 ring-slate-200">
    <h2 class="text-lg font-semibold mb-4">
      <NuxtLink :to="{name: 'notes.show', params: {noteId: entry.id}}">{{ entry.title }}</NuxtLink>
    </h2>

    <NuxtLink v-if="entry.cover" :to="{name: 'notes.show', params: {noteId: entry.id}}" class="block -mx-4">
      <img :src="entry.cover.url" :alt="entry.title">
    </NuxtLink>

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

    <div v-if="entry.travel_id > 0" class="mt-4 text-sm font-medium truncate p-2 rounded-lg border border-gray-100">
      {{ entry.travel?.title }}
      <div class="text-gray-500 text-xs">{{ entry.travel?.place?.name }}</div>
    </div>

    <footer class="flex items-center space-x-4 mt-4">
      <Like model-type="notes" :model-id="entry.id" />

      <div @click="$overlay.show(defineAsyncComponent(() => import('~/components/modules/chats/components/ChatDialog.vue')), {
        props: {
          chatId: `notes-${entry.id}`,
          title: entry.title
        }
      })">chat</div>
    </footer>
  </article>
</template>]

<script setup>
import { defineAsyncComponent } from 'vue'
import Like from '~/components/Like'

defineProps({
  entry: {
    type: Object,
    required: true
  }
})
</script>