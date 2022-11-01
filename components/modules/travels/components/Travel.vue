<template>
  <article class="bg-white overflow-hidden rounded-md shadow ring-1 ring-slate-200">
    <NuxtLink v-if="entry.cover" :to="{name: 'travels.show', params: {travelId: entry.id}}" class="block">
      <img :src="entry.cover.sizes.default" :alt="entry.title">
    </NuxtLink>

    <div class="p-4">
      <h2 class="text-lg font-semibold mb-2">
        <NuxtLink :to="{name: 'travels.show', params: {travelId: entry.id}}">{{ entry.title }}</NuxtLink>
      </h2>

      <div v-if="entry.tags.length" class="space-x-2 mt-2 text-slate-400 text-sm">
        <NuxtLink
            class="hover:text-slate-600"
            v-for="tag in entry.tags"
            :key="tag.id"
            :title="tag.name"
            :to="{name: 'travels', query: {tag_id: tag.id}}">#{{ tag.name }}</NuxtLink>
      </div>

      <p v-if="entry.text" class="text-sm mt-2">
        <NuxtLink :to="{name: 'travels.show', params: {travelId: entry.id}}">{{ entry.text }}</NuxtLink>
      </p>

      <div v-if="entry.entry_id > 0" class="mt-4 text-sm font-medium truncate p-2 rounded-lg border border-gray-100">
        {{ entry.entry?.title }}
        <div class="text-gray-500 text-xs">{{ entry.entry?.place?.name }}</div>
      </div>

      <footer class="text-sm mt-4">
        лайки: {{ entry.likes_count }}
        <div @click="$overlay.show(defineAsyncComponent(() => import('~/components/modules/chats/components/ChatDialog.vue')), {
        props: {
          chatId: `notes-${entry.id}`,
          title: entry.title
        }
      })">chat</div>
      </footer>
    </div>
  </article>
</template>

<script setup>
import { defineAsyncComponent } from 'vue'

defineProps({
  entry: {
    type: Object,
    required: true
  }
})
</script>