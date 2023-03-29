<template>
  <div tabindex="-1" aria-hidden="true" class="absolute left-0 top-0 w-full h-full">
    <div class="flex items-center justify-start flex-col p-10 h-full">
      <ChatD1 class="max-w-[804px]" :chat-id="chatId" :title="title" />
    </div>
  </div>
</template>

<script setup>
import ChatD1 from './Chat/ChatD1.vue'

const props = defineProps({
  chatId: {
    type: [Number, String]
  },
  title: {
    type: String,
    required: true
  }
})
</script>