import { defineStore } from 'pinia'
import { useNuxtApp } from '#app'

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
    updateStory(shot) {
      const { $auth } = useNuxtApp()

      this.stories.forEach((story, index) => {
        if (parseInt(story.user_id) === parseInt($auth.user.id)) {
          this.stories[index] = shot
        }
      })
    }
  },
})