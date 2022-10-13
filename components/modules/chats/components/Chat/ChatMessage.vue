<template>
  <div class="flex space-x-2">
    <div class="flex-shrink-0">
      <NuxtLink :to="{name: 'users.show', params: {userId: message.user.id}}">
        <img :src="message.user.avatar" :alt="message.user.name" class="w-8 h-8 rounded-full block" />
      </NuxtLink>
    </div>
    <div class="text-sm">
      <div class="mb-1">
        <NuxtLink :to="{name: 'users.show', params: {userId: message.user.id}}">
          <span class="font-medium">{{ message.user.name }}</span> &middot; <span class="text-gray-400">{{ message.time }}</span>
        </NuxtLink>
      </div>
      <div>{{ message.text }}</div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  message: {
    type: Object,
    required: true,
  }
})
</script>