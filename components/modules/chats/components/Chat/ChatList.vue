<template>
  <div class="w-[280px] bg-white p-4">
    <h3 class="font-medium">Мои чаты</h3>
    <ul class="space-y-2">
      <li v-for="chat in items" :key="chat.id" @click="onSelect(chat)" class="flex space-x-2 cursor-pointer">
        <div class="text-sm">{{ chat.name }}</div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { useChatStore } from '~/components/modules/chats/stores/chat'

defineProps({
  items: {
    type: Array
  }
})

const emit = defineEmits(['select'])

const store = useChatStore()

const onSelect = (chat) => {
  store.setChat(chat)
  emit('select', `${chat.model_type}-${chat.model_id}`)
}
</script>