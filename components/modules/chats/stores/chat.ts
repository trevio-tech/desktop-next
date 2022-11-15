import { defineStore } from 'pinia'

export const useChatStore = defineStore('chat', {
  state: () => {
    return {
      activeChat: {},
      mode: '',
      selectedMessages: {},
    }
  },
  actions: {
    setChat(chat) {
      this.activeChat = chat
    },
    clearSelectedMessages() {
      this.mode = ''
      this.selectedMessages = {}
    },
    selectMessage(message: object, mode = '') {
      this.mode = mode

      if (! this.activeChat.id) {
        throw new Error('Чат не найден')
      }

      // Блок ниже запрещает выбирать сообщения их разных чатов.
      // Перед выбором каждого нового сообщения, проверяем,
      // что его chat_id равен chat_id последниму из выбранных сообщений.
      // Если chat_id разные, значит это попытка выбрать сообщения из разных чатов.
      const keys = Object.keys(this.selectedMessages)

      if (keys.length) {
        const lastMessage = this.selectedMessages[keys.at(-1)]

        if (parseInt(lastMessage.chat_id) !== parseInt(message.chat_id)) {
          return
        }
      }

      // В режиме редактирования или ответа,
      // удаляем из выбранных сообщений все кроме текущего.
      if (this.mode === 'edit' || this.mode === 'reply') {
        for (let selectedMessageId in this.selectedMessages) {
          if (parseInt(selectedMessageId) !== parseInt(message.id)) {
            delete this.selectedMessages[selectedMessageId]
          }
        }
      }

      // При повтором клике, сообщение будет удаленно из выбранных.
      if (Object.hasOwn(this.selectedMessages, message.id)) {
        delete this.selectedMessages[message.id]
      } else {
        this.selectedMessages[message.id] = message
      }
    },
  },
  getters: {
    totalSelected: (state) => Object.keys(state.selectedMessages).length,
  },
})