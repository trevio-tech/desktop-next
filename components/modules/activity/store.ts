import { defineStore } from 'pinia'

export const useActivityStore = defineStore('activity', {
  state: () => {
    return {
      items: [],
      page: 1,
      previousRouteName: null,
      loadedBelts: {}
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
    },
    addBelt(index, data) {
      this.loadedBelts[index] = data
    },
    refreshMyFeed() {
      this.items = []
    }
  },
  getters: {
    getBelt: (state) => {
      return (index) => state.loadedBelts[index] || []
    },
  },
})