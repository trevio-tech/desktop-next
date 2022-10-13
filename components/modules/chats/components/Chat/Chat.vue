<template>
  <div class="flex-auto w-[640px] flex flex-col justify-between">
    <div class="mb-4">
      <div v-for="(stack, date) in stacks" :key="date">
        {{ date }}
        <ChatMessage v-for="message in stack.messages" :key="message.id" :message="message" />
      </div>
    </div>
    <ChatForm />
  </div>
</template>

<script setup>
import ChatForm from './ChatForm.vue'
import ChatMessage from './ChatMessage.vue'
import { onBeforeMount, ref } from 'vue'
import { useFetch } from 'nuxt/app'

const props = defineProps({
  chatId: {
    type: [Number, String]
  }
})

const stacks = ref([])

onBeforeMount(async () => {
  const { data } = await useFetch(`http://api.localhost/api/chats/${props.chatId}`, {
    initialCache: false
  })

  if (data.value) {
    stacks.value = data.value.stacks
  }
})
</script>