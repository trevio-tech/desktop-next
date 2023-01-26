import { defineStore } from 'pinia'
import { useAuth } from '#auth/runtime/composables';

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
      this.stories.forEach((story, index) => {
        if (parseInt(story.user_id) === parseInt(useAuth().user.id)) {
          this.stories[index] = shot
        }
      })
    }
  },
})