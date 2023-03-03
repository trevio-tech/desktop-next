<template>
  <Chat
    v-slot="{ getMessages, stacks }"
    :chatMessageFields="CHAT_MESSAGE"
    :chatId="chatId"
    class="w-full overflow-hidden border border-slate-200 rounded-lg h-full relative flex-auto flex bg-white">

    <ChatList class="flex-shrink-0 flex-auto w-full max-w-[260px] border-r border-r-slate-200" @select="getMessages" />

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

      <!-- CHAT FORM -->
      <ChatForm v-slot="{ form, reply, loading }" class="flex-auto flex-shrink-0 p-4 bg-white border-t border-gray-200" :chat-id="chatId">
        <div v-if="store.mode === 'reply'">
          {{ reply.text }}
        </div>
        <FormField name="input.text">
          <Textarea v-model="form.text" placeholder="Текст сообщения" class="flex-auto" />
        </FormField>
        <ImageGrid :model-value="form.images"></ImageGrid>
        <footer class="flex space-x-2 justify-end mt-2">
          <Upload :input="{model_type: 'chatMessage'}" :fields="uploadFields" v-model="form.images">
            <Button variant="secondary">
              <ImagePlus class="w-5 h-5" />
            </Button>
          </Upload>
          <Button :loading="loading" type="submit">Отправить</Button>
        </footer>
      </ChatForm>
      <!-- / CHAT FORM -->
    </div>
  </Chat>
</template>

<script setup>
import { ChatList, MessageList } from './'
import { useChatStore } from '~/components/modules/chats/stores/chat'
import { X, MoreHorizontal } from 'lucide-vue-next'
import { CHAT_MESSAGE } from '~/components/modules/chats/graphql'
import { ImagePlus } from 'lucide-vue-next'

const props = defineProps({
  chatId: {
    type: [Number, String]
  }
})

const uploadFields = ['id', 'url(presets: "default@width:120,height:120")']

const store = useChatStore()
</script>