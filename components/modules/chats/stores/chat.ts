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