<template>
  <article class="p-4 rounded-t-lg bg-white">
    <div class="flex items-center space-x-2 pb-4 px-4 mb-4 -mx-4 border-b">
      <NuxtLink :to="{name: 'users.show', params: {userId: entry.user.id}}" class="w-10 flex-shrink-0">
        <img :src="entry.user.avatar" :alt="entry.user.name" class="rounded-full" />
      </NuxtLink>
      <NuxtLink :to="{name: 'users.show', params: {userId: entry.user.id}}" class="font-medium text-sm">
        {{ entry.user.name }}
      </NuxtLink>
    </div>

    <h2 class="text-xl font-semibold mb-4">{{ entry.title }}</h2>

    <ImageViewer>
      <div v-html="entry.text" class="prose"></div>
    </ImageViewer>
  </article>
</template>

<script setup>
defineProps({
  entry: {
    type:     Object,
    required: true,
  }
})
</script>