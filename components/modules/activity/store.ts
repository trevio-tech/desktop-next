import { defineStore } from 'pinia'

export const useActivityStore = defineStore('activity', {
  state: () => {
    return {
      items: [],
      page: 1,
    }
  },
  actions: {
    async incrementPage() {
      this.page++
    },
    async addItems(newItems) {
      newItems.forEach((item) => this.items.push(item))
      this.page++
    },
  },
})