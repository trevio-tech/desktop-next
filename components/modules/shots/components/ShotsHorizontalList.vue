<template>
  <div class="flex space-x-2">
    <div v-for="item in items" :key="item.id" class="relative">
      <img :src="item.image" :alt="item.user.name" width="80" class="rounded-lg" />
      <NuxtLink :to="{name: 'users.show', params: {userId: item.user_id}}" class="absolute bottom-2 left-2">
        <img :src="item.user.avatar" :alt="item.user.name" width="24" class="rounded-full block" />
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
defineProps({
  items: {
    type: Array
  }
})
</script>