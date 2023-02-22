<template>
  <article class="bg-white overflow-hidden ring-1 ring-slate-200 rounded-lg">
    <div class="relative overflow-hidden">
      <NuxtLink
        :to="to"
        class="h-80 block"
        style="background-image: url('/images/no-image.png')"
      >
        <div class="absolute top-0 left-0 p-2">
          <div class="bg-slate-500/40 py-1 px-3 text-white font-medium text-sm rounded-lg">{{ label }}</div>
        </div>
        <img v-if="entry.cover" :src="entry.cover?.url?.default" :alt="entry.title" class="object-cover w-full h-full" loading="lazy">
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
      <Profile :user="entry.user">
        <template #footer>
          {{ entry.published_at }}
        </template>
      </Profile>
    </div>

    <div class="m-4">
      <h2 class="text-xl font-semibold mb-2">
        <NuxtLink :to="to">{{ entry.title }}</NuxtLink>
      </h2>

      <NuxtLink v-if="entry.text" :to="to">{{ entry.text }}</NuxtLink>
    </div>

    <div v-if="entry.tags.length" class="space-x-2 m-4 text-slate-400 text-sm">
      <NuxtLink
          class="hover:text-slate-600"
          v-for="tag in entry.tags"
          :key="tag.id"
          :to="{name: 'tags.tag.content', params: {tag: tag.name.trim(), content: entry.system_name}}">#{{ tag.name }}</NuxtLink>
    </div>

    <footer class="flex items-center p-4 border-t border-t-stone-100">
      <IsLoggedIn>
        <Like
          :model-type="entry.system_name"
          :model-id="entry.id"
          :is-liked="entry.like?.is_liked"
          :count="entry.likes_count"
          class="mr-2"
        />
      </IsLoggedIn>
      <ChatButton
          v-if="hasChat"
          @click="$overlay.show(defineAsyncComponent(() => import('~/components/modules/chats/components/ChatDialog.vue')), {
        props: {
          chatId: `${entry.system_name}-${entry.id}`,
          title: entry.title
        }
      })" :messages-count="entry.messages_count" />

      <BookmarkButton
        class="ml-auto"
        v-model="bookmarks"
        :model-type="entry.system_name"
        :model-id="entry.id" />
    </footer>
  </article>
</template>

<script setup>
import { defineAsyncComponent, shallowRef } from 'vue'
import BookmarkButton from '~/components/modules/bookmarks/components/BookmarkButton'
import Profile from '~/components/modules/users/components/Profile'
import useContentCard from '~/components/ContentCard/useContentCard'

const props = defineProps({
  entry: {
    type: Object,
    required: true
  },
  hasChat: {
    type: Boolean,
    default: true
  }
})

const testClick = () => {
  console.log('testClick')
}

const { to, label, bookmarks } = useContentCard(props)
</script>