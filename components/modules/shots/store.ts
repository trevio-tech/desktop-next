import { defineStore } from 'pinia'

export const useShotsStore = defineStore('shots', {
  state: () => {
    return {
      stories: []
    }
  },
  actions: {
    add(stories) {
      this.stories = stories
    },
  },
})