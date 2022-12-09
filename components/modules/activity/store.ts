import { defineStore } from 'pinia'

export const useActivityStore = defineStore('activity', {
  state: () => {
    return {
      items: [],
      page: 1,
      previousRouteName: null
    }
  },
  actions: {
    async setItems(items) {
      this.items = items
    },
    async addItems(items) {
      items.forEach((item) => this.items.push(item))
    },
    async resetPage() {
      this.page = 1;
    },
    async incrementPage() {
      this.page++;
    }
  },
})