<template>
  <Chat :chat-id="`${$route.params.chatType}-${$route.params.chatId}`" />
</template>

<script>
export default {
  layout: 'chats'
}
</script>

<script setup>
import { useChatStore } from '../stores/chat'
import { useHead } from '#imports'
import { definePageMeta } from '#imports'

definePageMeta({
  layout: 'chats',
})

const store = useChatStore()

useHead({
  title: store.activeChat.name,
})
</script>