<template>
  <Chat :chat-id="`${$route.params.chatType}-${$route.params.chatId}`" />
</template>

<script>
export default {
  layout: 'chats'
}
</script>

<script setup>
import Chat from '../components/Chat/Chat'
import { useChatStore } from '../stores/chat'
import { useHead } from 'nuxt/app'
import { definePageMeta } from '#imports'

definePageMeta({
  layout: 'chats',
})

const store = useChatStore()

useHead({
  title: store.activeChat.name,
})
</script>