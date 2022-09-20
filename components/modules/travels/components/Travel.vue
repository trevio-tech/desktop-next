<template>
  <article class="flex bg-white h-[256px] overflow-hidden rounded-md shadow ring-1 ring-slate-200">
    <NuxtLink class="flex-shrink-0 w-[256px] h-[256px] bg-gray-300/50" :to="{name: 'travels.show', params: {travelId: entry.id}}">
      <img v-if="entry.preview.length" :src="entry.preview[0].sizes.default" class="block w-full h-full" alt="">
    </NuxtLink>
    <div class="p-4 flex flex-col justify-between overflow-hidden">
      <div>
        <h2 class="text-lg font-semibold">
          <NuxtLink :to="{name: 'travels.show', params: {travelId: entry.id}}">{{ entry.title }}</NuxtLink>
        </h2>

        <div v-if="entry.tags.length" class="space-x-2 mt-2 text-slate-400 text-sm truncate">
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
      </div>

      <footer class="flex items-center space-x-4 text-sm mt-4">
        <div class="flex items-center cursor-pointer flex-auto">
          <div class="text-gray-700 font-medium">{{ entry.user.name }}</div>
        </div>
        <div class="flex items-center cursor-pointer">
          <FireIcon class="w-4 h-4 text-orange-500" />
          <div class="text-gray-700 font-medium ml-1">191</div>
        </div>
        <div class="flex items-center cursor-pointer">
          <HeartIcon class="w-4 h-4 text-red-500" />
          <div class="text-gray-700 font-medium ml-1">25</div>
        </div>
        <div class="flex items-center cursor-pointer">
          <ShareIcon class="w-4 h-4 text-blue-500" />
          <div class="text-gray-700 font-medium ml-1">25</div>
        </div>
      </footer>
    </div>
  </article>
</template>]

<script setup>
import { FireIcon, HeartIcon, ShareIcon } from '@heroicons/vue/20/solid'

defineProps({
  entry: {
    type: Object,
    required: true
  }
})
</script>