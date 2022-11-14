<template>
  <div class="overflow-y-auto" id="stacks">
    <div v-for="(messages, date) in stacks" :key="date">
      <div class="text-center py-4 sticky top-0">
        <span class="inline-block font-medium text-xs py-1 px-2 bg-gray-100 rounded-full">{{ date }}</span>
      </div>
      <ChatMessage v-for="message in messages" :key="message.id" :message="message" />
    </div>
  </div>
</template>

<script setup>
import { onMounted, watch, nextTick } from 'vue'
import { ChatMessage } from './'

const props = defineProps({
  stacks: {
    type:     Object,
    required: true
  }
})

const scrollBottom = () => {
  const stacks = document
      .getElementById('stacks')

  stacks.scrollTop = stacks.scrollHeight
}

onMounted(() => {
  scrollBottom()
})

watch(() => props.stacks, async () => {
  await nextTick()
  scrollBottom()
})
</script>