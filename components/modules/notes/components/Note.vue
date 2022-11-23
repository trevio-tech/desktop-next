<template>
  <article class="bg-white overflow-hidden shadow ring-1 ring-slate-200 rounded-lg">
    <div class="relative overflow-hidden">
      <NuxtLink
          :to="{name: 'notes.show', params: {noteId: entry.id}}"
          class="h-80 block"
          style="background-image: url('/images/no-image.png')"
      >
        <div class="absolute top-0 left-0 p-2">
          <div class="bg-black/20 py-1 px-3 text-white font-medium text-sm rounded-lg">Заметка</div>
        </div>
        <img v-if="entry.cover" :src="entry.cover.url" :alt="entry.title" class="object-cover w-full h-full">
      </NuxtLink>
      <div v-if="entry.travel_id > 0"
           @click="$overlay.show(defineAsyncComponent(() => import('~/components/modules/travels/components/TravelAboutDialog.vue')), {
             props: {
               id: entry.travel_id
             }
           })"
           class="absolute bottom-0 left-0 right-0 flex justify-center cursor-pointer"
           :title="`Из путешествия: ${entry.travel?.title}`">
        <div class="bg-blue-500 py-1 px-3 text-white font-medium text-sm rounded-t-lg">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
          </svg>

        </div>
      </div>
    </div>

    <div class="m-4">
      <Profile :user="entry.user" />
    </div>

    <h2 class="text-xl font-semibold m-4">
      <NuxtLink :to="{name: 'notes.show', params: {noteId: entry.id}}">{{ entry.title }}</NuxtLink>
    </h2>

    <p v-if="entry.text" class="m-4">
      <NuxtLink :to="{name: 'notes.show', params: {noteId: entry.id}}">{{ entry.text }}</NuxtLink>
    </p>

    <div v-if="entry.tags.length" class="space-x-2 m-4 text-slate-400 text-sm">
      <NuxtLink
          class="hover:text-slate-600"
          v-for="tag in entry.tags"
          :key="tag.id"
          :to="{name: 'notes', query: {tag_id: tag.id}}">#{{ tag.name }}</NuxtLink>
    </div>

    <footer class="flex items-center space-x-4 m-4">
      <Like model-type="notes" :model-id="entry.id" />

      <div @click="$overlay.show(defineAsyncComponent(() => import('~/components/modules/chats/components/ChatDialog.vue')), {
        props: {
          chatId: `notes-${entry.id}`,
          title: entry.title
        }
      })">chat</div>
    </footer>
  </article>
</template>

<script setup>
import { defineAsyncComponent } from 'vue'
import Like from '~/components/Like'
import Profile from '~/components/modules/users/components/Profile'

defineProps({
  entry: {
    type: Object,
    required: true
  }
})
</script>