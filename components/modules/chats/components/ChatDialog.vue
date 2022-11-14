<template>
  <div tabindex="-1" aria-hidden="true" class="absolute left-0 top-0 w-full h-full">
    <div class="flex items-center justify-start flex-col p-10 h-full">
      <div class="flex h-full rounded-lg overflow-hidden">
        <ChatList :items="chats" @select="onLoad($event)" />

        <div class="relative w-[640px] flex flex-col max-w-2xl bg-white shadow">
          <!-- Modal header -->
          <header class="border-b border-gray-200 rounded-t">
            <div class="m-4 flex justify-between items-center">
              <h3 class="text-xl font-semibold text-gray-900 leading-none truncate mr-2">{{ title }}</h3>
              <button @click="$overlay.hide" type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
                <span class="sr-only">Закрыть</span>
              </button>
            </div>
            <div v-if="store.totalSelected > 0" class="py-2 px-4 flex justify-between items-center bg-gray-50">
              Выбрано сообщений {{ store.totalSelected }}
              <Button>Переслать</Button>
            </div>
          </header>

          <div class="flex flex-col justify-between w-full h-full overflow-hidden">
            <MessageList  v-if="Object.keys(stacks).length" :stacks="stacks" />
            <div v-else class="flex-auto flex justify-center items-center">
              Нет сообщений
            </div>

            <div class="p-4 bg-white border-t border-gray-200">
              <ChatForm :chat-id="chatId" />
            </div>
          </div>
        </div>
        </div>
    </div>
  </div>
</template>

<script setup>
import { ChatForm, ChatList, MessageList } from './Chat'
import { VButton as Button } from '@trevio/ui'
import { onBeforeMount, ref } from 'vue'
import { useGql } from '~/uses'
import { groupBy } from 'lodash'
import { useChatStore } from '~/components/modules/chats/stores/chat'

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
const chats = ref([])

const store = useChatStore()

const onLoad = async (chatId = null) => {
  if (! chatId) {
    chatId = props.chatId
  }

  const [modelType, modelId] = chatId.split('-')

  const { data: { chatMessages, myChats }} = await useGql(`
    query($modelType: String, $modelId: Int) {
      myChats {
        id
        name
        model_type
        model_id
      }
      chatMessages(modelType: $modelType, modelId: $modelId) {
        id
        chat_id
        parent_id
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

  if (myChats) {
    chats.value = myChats
  }

  if (chatMessages) {
    stacks.value = groupBy(chatMessages, 'stack')
  }
}

onBeforeMount(async () => await onLoad())
</script>