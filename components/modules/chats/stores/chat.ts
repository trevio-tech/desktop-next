import { defineStore } from 'pinia'

export const useChatStore = defineStore('chat', {
  state: () => {
    return {
      mode: '',
      selectedMessages: {},
    }
  },
  actions: {
    selectMessage(message: object, mode = null) {
      this.mode = mode

      if (mode === 'edit' || mode === 'reply') {
        this.selectedMessages = {}
      }

      if (Object.hasOwn(this.selectedMessages, message.id)) {
        delete this.selectedMessages[message.id]
      } else {
        this.selectedMessages[message.id] = message
      }
    },
  },
  getters: {
    totalSelected: (state) =>  Object.keys(state.selectedMessages).length,
  },
})