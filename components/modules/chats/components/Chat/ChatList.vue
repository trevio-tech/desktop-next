<template>
  <div class="bg-white overflow-hidden">
    <h3 class="font-medium">Мои чаты</h3>
    <ul>
      <li v-for="chat in items" :key="chat.id" @click="onSelect(chat)" :class="{'bg-blue-100': parseInt(store.activeChat.id) === parseInt(chat.id)}"
          class="p-2 flex space-x-2 cursor-pointer">
        <div class="text-sm font-medium truncate">{{ chat.name }}</div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { useChatStore } from '~/components/modules/chats/stores/chat'
import { useRoute, useRouter } from 'nuxt/app'

defineProps({
  items: {
    type: Array
  }
})

const emit = defineEmits(['select'])

const store = useChatStore()
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