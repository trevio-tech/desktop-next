import { defineStore } from 'pinia'

export const useUsersStore = defineStore('users', {
  state: () => {
    return {
      bookmarksCategories: []
    }
  },
  actions: {
    incrementBookmarksCount(categoryId) {
      this.bookmarksCategories.forEach((bookmarkCategory) => {
        if (parseInt(bookmarkCategory.id) === parseInt(categoryId)) {
          bookmarkCategory.content_count++
        }
      })
    },
    decrementBookmarksCount(categoryId) {
      this.bookmarksCategories.forEach((bookmarkCategory) => {
        if (parseInt(bookmarkCategory.id) === parseInt(categoryId)) {
          bookmarkCategory.content_count--
        }
      })
    },
  },
  getters: {
    sumOfEntriesFromAllCategories: (state) => {
      let result = 0

      state.bookmarksCategories.forEach((category) => result += category.content_count)

      return result
    }
  },
})