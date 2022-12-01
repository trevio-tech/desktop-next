import { defineStore } from 'pinia'
import { useQuery } from '~/composables/useQuery'

export const useChatsStore = defineStore('chats', {
  state: () => {
    return {
      chats: []
    }
  },
})