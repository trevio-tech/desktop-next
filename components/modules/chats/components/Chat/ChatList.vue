<template>
  <div class="w-[280px] bg-white p-4">
    <h3 class="font-medium">Мои чаты</h3>
    <ul class="space-y-2">
      <li v-for="chat in items" :key="chat.id" @click="$emit('select', `${chat.model_type}-${chat.model_id}`)">{{ chat.name }}</li>
    </ul>
  </div>
</template>

<script setup>
defineProps({
  items: {
    type: Array
  }
})

defineEmits(['select'])
</script>