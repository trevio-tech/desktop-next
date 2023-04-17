<template>
  <article class="bg-white overflow-hidden ring-1 ring-slate-100 rounded-lg">
    <NuxtLink v-if="entry.cover" :to="to" class="block h-[280px]">
      <img :src="entry.cover?.url?.default" :alt="entry.title" class="object-cover w-full h-full" loading="lazy">
    </NuxtLink>

    <div class="m-4 flex items-center justify-between">
      <Profile :user="entry.user"></Profile>
      <button
        type="button"
        v-if="entry.travel_id > 0"
        @click="openTravelModal"
        :title="`Из путешествия: ${entry.travel?.title}`"
        class="bg-blue-500 p-2 rounded-full"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
             stroke="currentColor" class="w-6 h-6 text-white">
          <path stroke-linecap="round" stroke-linejoin="round"
              d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"/>
        </svg>
      </button>
    </div>

    <div class="m-4">
      <h2 class="text-xl font-semibold mb-2">
        <NuxtLink :to="to">{{ entry.title }}</NuxtLink>
      </h2>

      <div class="text-slate-400 text-sm mb-2">{{ entry.published_at }}</div>

      <NuxtLink v-if="entry.text" :to="to">{{ entry.text }}</NuxtLink>
    </div>

    <div v-if="entry.tags.length" class="space-x-2 m-4 text-slate-400 text-sm">
      <NuxtLink
          class="hover:text-slate-600"
          v-for="tag in entry.tags"
          :key="tag.id"
          :to="{name: 'tags.tag', params: {tag: tag.name}}">#{{ tag.name }}
      </NuxtLink>
    </div>

    <ContentFooter :entry="entry"/>
  </article>
</template>

<script setup>
import ContentFooter from '~/components/ContentFooter.vue'
import Profile from '~/components/modules/users/components/Profile'
import useContentCard from '~/components/ContentCard/useContentCard'
import { defineAsyncComponent } from 'vue'
import { useOverlay } from '@trevio/ui'

const overlay = useOverlay()

const props = defineProps({
  entry: {
    type: Object,
    required: true,
  },
  hasChat: {
    type: Boolean,
    default: true,
  },
})

const { to, label, bookmarks } = useContentCard(props)

const openTravelModal = () => {
  overlay.show(defineAsyncComponent(() => import('~/components/modules/travels/components/TravelAboutDialog.vue')), {
    props: {
      id: props.entry.travel_id
    }
  })
}
</script>