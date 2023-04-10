import { defineStore } from 'pinia'

export const useWidgetsStore = defineStore('widgets', {
  state: () => {
    return {
      sidebar: {
        randomNotes: []
      }
    }
  }
})