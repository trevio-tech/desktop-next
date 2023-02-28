<template>
  <article class="flex space-x-2">
    <NuxtLink v-if="entry.cover" :to="to" class="w-28 aspect-square flex-shrink-0">
      <img :src="entry.cover.url.default" :alt="entry.name" class="block object-cover w-full h-full" />
    </NuxtLink>
    <main>
      <h2 class="font-medium">
        <NuxtLink :to="to">
          {{ entry.title }}
        </NuxtLink>
      </h2>
      <p class="text-sm mt-2">
        <NuxtLink :to="to">
          {{ entry.text }}
        </NuxtLink>
      </p>
    </main>
  </article>
</template>

<script setup>
import { computed } from 'vue'

const { entry } = defineProps({
  entry: {
    type: Object,
    required: true,
  }
})

const to = computed(() => {
  const systemName = entry.system_name

  if (systemName === 'notes') {
    return {name: 'notes.show', params: {noteId: entry.id}}
  }
  if (systemName === 'travels') {
    return {name: 'travels.show', params: {travelId: entry.id}}
  }
  if (systemName === 'albums') {
    return {name: 'albums.show', params: {albumId: entry.id}}
  }
})
</script>