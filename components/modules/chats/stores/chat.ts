import { defineStore } from 'pinia'

export const useChatStore = defineStore('chat', {
  state: () => {
    return {
      mode: '',
      selectedMessages: {},
    }
  },
  actions: {
    selectMessage(message: object) {
      if (Object.hasOwn(this.selectedMessages, message.id)) {
        delete this.selectedMessages[message.id]
      } else {
        this.selectedMessages[message.id] = message
      }
    },
    onEdit(message: object) {
      // Переходим в режим редактирования.
      this.mode = 'edit'
      // Редактировать можно только одно сообщение за раз
      this.selectedMessages = {}
      // Выбираем сообщение
      this.selectMessage(message)
    },
    onReply(message: object) {
      // Переходим в режим редактирования.
      this.mode = 'reply'
      // Редактировать можно только одно сообщение за раз
      this.selectedMessages = {}
      // Выбираем сообщение
      this.selectMessage(message)
    }
  },
  getters: {
    totalSelected: (state) =>  Object.keys(state.selectedMessages).length,
  },
})