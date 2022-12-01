<template>
  <div class="w-full overflow-hidden border border-slate-200 rounded-lg h-full relative flex-auto flex bg-white">
    <ChatList class="flex-shrink-0 flex-auto w-full max-w-[260px] border-r border-r-slate-200" :items="chats" @select="onLoad($event)"/>

    <div class="flex flex-col flex-auto overflow-hidden">
      <header class="border-b border-gray-200 rounded-t">
        <div class="m-4 flex justify-between items-center">

          <h3 :title="store.activeChat.name" class="text-lg font-semibold leading-none truncate mr-2 flex-1">
            {{ store.activeChat.name }}
          </h3>

          <button title="Настройки" type="button"
                  class="text-gray-500 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center">
            <MoreHorizontal class="w-6 h-6" />
            <span class="sr-only">Настройки</span>
          </button>
          <button title="Закрыть" @click="$overlay.hide" type="button"
                  class="text-gray-400 bg-transparent hover:bg-red-200 hover:text-red-500 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center">
            <X class="w-6 h-6"/>
            <span class="sr-only">Закрыть</span>
          </button>
        </div>
        <div v-if="store.totalSelected > 0" class="py-2 px-4 flex justify-between items-center bg-gray-50">
          Выбрано сообщений {{ store.totalSelected }}
          <div class="flex space-x-2">
            <Button>Переслать</Button>
            <Button @click="store.clearSelectedMessages">
              <X class="w-6 h-6"/>
            </Button>
          </div>
        </div>
      </header>

      <MessageList class="flex-auto overflow-y-auto h-full" v-if="Object.keys(stacks).length" :stacks="stacks" />
      <div v-else class="flex justify-center items-center h-full">
        Нет сообщений
      </div>

      <ChatForm class="flex-auto flex-shrink-0 p-4 bg-white border-t border-gray-200" :chat-id="chatId"/>
    </div>
  </div>
</template>

<script setup>
import { ChatForm, ChatList, MessageList } from './'
import { Button } from '@trevio/ui'
import { groupBy } from 'lodash'
import { useChatStore } from '~/components/modules/chats/stores/chat'
import { X, MoreHorizontal } from 'lucide-vue-next'

const props = defineProps({
  chatId: {
    type: [Number, String]
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

  const { data: { chatMessages, myChats }} = await useQuery({
    query: `
      query($modelType: String, $modelId: Int) {
        myChats {
          id
          name
          model_type
          model_id
          last_message_id
          last_message_at
          lastMessage {
            id
            chat_id
            text(length: 5)
          }
        }
        chatMessages(modelType: $modelType, modelId: $modelId) {
          id
          chat_id
          parent_id
          text
          stack
          stack_name
          time
          chat {
            id
            name
          }
          user {
            id
            name
            avatar
          }
        }
      }
    `, variables: {
      modelType,
      modelId: parseInt(modelId)
    }
  })

  if (myChats) {
    chats.value = myChats
  }

  if (chatMessages.length) {
    stacks.value = groupBy(chatMessages, 'stack')
    store.$patch({
      activeChat: chatMessages[0].chat
    })
  }
}

await onLoad()
</script>