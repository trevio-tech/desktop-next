<template>
  <div class="min-w-full max-w-[640px] flex flex-col justify-between" :class="{'overflow-y-auto overflow-x-hidden': true}">
    <div class="mb-4 flex-auto">
      <div v-for="(messages, date) in stacks" :key="date">
        <div class="text-center my-2 sticky top-0">
          <span class="inline-block font-medium text-xs py-1 px-2 bg-gray-100 rounded-full">{{ date }}</span>
        </div>
        <div class="space-y-4">
          <ChatMessage v-for="message in messages" :key="message.id" :message="message" />
        </div>
      </div>
    </div>
    <ChatForm />
  </div>
</template>

<script setup>
import ChatForm from './ChatForm.vue'
import ChatMessage from './ChatMessage.vue'
import { onBeforeMount, ref } from 'vue'
import { useGql } from '~/uses'
import { groupBy } from 'lodash'

const props = defineProps({
  chatId: {
    type: [Number, String]
  }
})

const stacks = ref([])

onBeforeMount(async () => {
  const [modelType, modelId] = props.chatId.split('-')

  const { data: { chatMessages }} = await useGql(`
    query($modelType: String, $modelId: Int) {
      chatMessages(modelType: $modelType, modelId: $modelId) {
        id
        chat_id
        text
        stack
        stack_name
        time
        user {
          id
          name
          avatar
        }
      }
    }
  `, {
    modelType,
    modelId: parseInt(modelId)
  })

  if (chatMessages) {
    stacks.value = groupBy(chatMessages, 'stack')
  }
})
</script>