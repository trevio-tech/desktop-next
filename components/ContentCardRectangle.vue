<template>
  <article class="bg-white overflow-hidden ring-1 ring-slate-200 rounded-lg flex">
    <NuxtLink :to="to" class="flex-shrink-0">
      <img :src="entry.cover?.sizes?.default" :alt="entry.title" width="160" height="160">
    </NuxtLink>
    <div class="py-2 px-4 flex flex-col justify-between flex-auto overflow-hidden">
      <div>
        <h2 class="text-lg font-medium mb-2">
          <NuxtLink :to="to">{{ entry.title }}</NuxtLink>
        </h2>
        <NuxtLink :to="to" class="text-sm">{{ entry.text }}</NuxtLink>
      </div>
      <BookmarkButton
        v-model="bookmarks"
        :model-type="entry.system_name"
        :model-id="entry.id" />
    </div>
  </article>
</template>

<script setup>
import { ref } from 'vue'
import BookmarkButton from '~/components/modules/bookmarks/components/BookmarkButton'
import useContentCard from '~/components/ContentCard/useContentCard'

const props = defineProps({
  entry: {
    type:     Object,
    required: true,
  },
})

const { to } = useContentCard(props)
const bookmarks = ref(props.entry.bookmarks?.map((bookmark) => bookmark.category_id))
</script>