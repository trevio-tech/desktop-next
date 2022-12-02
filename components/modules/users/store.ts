import { defineStore } from 'pinia'

export const useUsersStore = defineStore('users', {
  state: () => {
    return {
      bookmarksCategories: []
    }
  },
  getters: {
    sumOfEntriesFromAllCategories: (state) => state.bookmarksCategories.reduce((a, b) => {
      return (a.content_count || 0) + (b.content_count || 0)
    }, 0),
  },
})