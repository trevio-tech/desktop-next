<template>
  <div class="bg-white overflow-hidden">
    <ul>
      <li v-for="chat in chats.chats" :key="chat.id" @click="onSelect(chat)" :class="{'bg-blue-100': parseInt(store.activeChat.id) === parseInt(chat.id)}"
          class="p-2 cursor-pointer">
        <div class="text-sm font-medium truncate">{{ chat.name }}</div>
        <div v-if="chat.lastMessage" class="text-sm truncate flex items-center space-x-1">
          <img :src="chat.lastMessage.user.avatar" :alt="chat.lastMessage.user.name" width="16" height="16"
               class="flex-shrink-0 rounded-full">
          <div class="text-sm">{{ chat.lastMessage?.text }} - {{ chat.last_message_at }}</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { useChatStore } from '~/components/modules/chats/stores/chat'
import { useChatsStore } from '~/components/modules/chats/stores/chats'
import { useRouter } from 'nuxt/app'

defineProps({
  items: {
    type: Array
  }
})

const emit = defineEmits(['select'])

const store = useChatStore()
const chats = useChatsStore()
const router = useRouter()

const onSelect = async (chat) => {
  await store.setChat(chat)

  if (router.currentRoute.value.name === 'chats.show') {
    await router.push({name: 'chats.show', params: {chatType: chat.model_type, chatId: chat.model_id}})
  } else {
    emit('select', `${chat.model_type}-${chat.model_id}`)
  }
}
</script>