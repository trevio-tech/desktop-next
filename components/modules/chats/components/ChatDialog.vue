<template>
  <div tabindex="-1" aria-hidden="true" class="absolute left-0 top-0 w-full h-full">
    <div class="flex items-center justify-start flex-col p-10 h-full">
      <div class="relative w-[640px] flex flex-col max-w-2xl bg-white rounded-lg shadow h-full overflow-hidden">
        <!-- Modal header -->
        <header class="p-4 flex justify-between items-center p-4 rounded-t border-b border-gray-200">
          <h3 class="text-xl font-semibold text-gray-900 leading-none">
            {{ title }}
          </h3>
          <button @click="$overlay.hide" type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center" data-modal-toggle="defaultModal">
            <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
            <span class="sr-only">Закрыть</span>
          </button>
        </header>

        <div class="flex flex-col justify-between w-full h-full overflow-hidden">
          <div class="overflow-y-auto p-4" v-if="Object.keys(stacks).length">
            <div v-for="(messages, date) in stacks" :key="date">
              <div class="text-center my-2 sticky top-0">
                <span class="inline-block font-medium text-xs py-1 px-2 bg-gray-100 rounded-full">{{ date }}</span>
              </div>
              <div class="space-y-4">
                <ChatMessage v-for="message in messages" :key="message.id" :message="message" />
              </div>
            </div>
          </div>
          <div v-else class="flex-auto flex justify-center items-center">
            Нет сообщений
          </div>

          <div class="p-4 bg-white border-t border-gray-200">
            <ChatForm />
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ChatForm, ChatMessage } from './Chat'
import { onBeforeMount, ref } from 'vue'
import { useGql } from '~/uses'
import { groupBy } from 'lodash'

const props = defineProps({
  chatId: {
    type: [Number, String]
  },
  title: {
    type: String,
    required: true
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