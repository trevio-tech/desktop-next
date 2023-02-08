<template>
  <article class="flex items-center space-x-2">
    <NuxtLink :to="{name: 'users.show', params: {userId: entry.id}}" class="w-16">
      <img :src="entry.avatar" :alt="entry.name" class="rounded-full block" />
    </NuxtLink>
    <main>
      <NuxtLink :to="{name: 'users.show', params: {userId: entry.id}}">
        {{ entry.name }}
      </NuxtLink>
    </main>
  </article>
</template>

<script setup>
defineProps({
  entry: {
    type: Object,
    required: true,
  }
})
</script>