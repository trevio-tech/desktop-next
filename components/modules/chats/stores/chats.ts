import { defineStore } from 'pinia'

export const useChatsStore = defineStore('chats', {
  state: () => {
    return {
      chats: []
    }
  },
})