<template>
  <article class="flex bg-white h-[256px] overflow-hidden rounded-md shadow ring-1 ring-slate-200">
    <NuxtLink class="flex-shrink-0 w-[256px] h-[256px] bg-gray-300/50" :to="{name: 'travels.show', params: {travelId: entry.id}}">
      <img v-if="entry.cover" :src="entry.cover.sizes.default" class="object-cover block w-full h-full" alt="">
    </NuxtLink>
    <div class="p-6 flex flex-col justify-between overflow-hidden">
      <div>
        <h2 class="text-lg font-semibold">
          <NuxtLink :to="{name: 'travels.show', params: {travelId: entry.id}}">{{ entry.title }}</NuxtLink>
        </h2>

        <div v-if="entry.tags.length" class="space-x-2 mt-2 text-slate-400 text-sm">
          <NuxtLink
              class="hover:text-slate-600"
              v-for="tag in entry.tags"
              :key="tag.id"
              :to="{name: 'travels', query: {tag_id: tag.id}}">#{{ tag.name }}</NuxtLink>
        </div>

        <p v-if="entry.text" class="text-sm mt-2">
          <NuxtLink :to="{name: 'travels.show', params: {travelId: entry.id}}">{{ entry.text }}</NuxtLink>
        </p>
      </div>

      <footer class="text-sm mt-4">
        лайки: {{ entry.likes_count }}
      </footer>
    </div>
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