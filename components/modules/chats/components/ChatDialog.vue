<template>
  <Dialog :title="title" full-height>
    <Chat :chat-id="chatId" />
  </Dialog>
</template>

<script setup>
import { Dialog } from '~/components/dev/Overlay'
import { Chat } from './Chat'

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