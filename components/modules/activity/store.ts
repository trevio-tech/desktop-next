import { defineStore } from 'pinia'

export const useActivityStore = defineStore('activity', {
  state: () => {
    return {
      items: [],
      page: 1,
      isTimeline: false
    }
  },
  actions: {
    async addItems(newItems) {
      newItems.forEach((item) => this.items.push(item))
      this.page++
    },
    resetItems() {
      this.page = 1;
      this.items = []
    }
  },
})