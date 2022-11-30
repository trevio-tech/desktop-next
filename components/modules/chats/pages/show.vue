<template>
  <Chat :chat-id="`${$route.params.chatType}-${$route.params.chatId}`" />
</template>

<script setup>
import Chat from '../components/Chat/Chat'
</script>