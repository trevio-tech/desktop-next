<template>
  <ImageViewer id="stacks" selector="[data-image]">
    <div v-for="(messages, date) in stacks" :key="date">
      <div class="text-center py-4 sticky top-0">
        <span class="inline-block font-medium text-xs py-1 px-2 bg-gray-100 rounded-full">{{ date }}</span>
      </div>
      <ChatMessage v-for="message in messages" :key="message.id" :message="message" />
    </div>
  </ImageViewer>
</template>

<script setup>
import { watch, nextTick } from 'vue'
import { ChatMessage } from './'
import { useChat } from '@trevio/core'

const { stacks } = useChat()

const scrollBottom = () => {
  const stacks1 = document
      .getElementById('stacks')

  stacks1.scrollTop = stacks1.scrollHeight
}

const last = stacks.value[Object.keys(stacks.value).at(-1)]

watch(() => last.length, async () => {
  await nextTick()
  scrollBottom()
}, {
  immediate: true
})
</script>