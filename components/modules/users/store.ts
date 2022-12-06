import { defineStore } from 'pinia'

export const useUsersStore = defineStore('users', {
  state: () => {
    return {
      bookmarksCategories: []
    }
  },
  actions: {
    addCategory(category) {
      this.bookmarksCategories.push(category)
    },
    incrementBookmarksCount(categories: number[]) {
      categories.forEach((category) => {
        this.bookmarksCategories.forEach((bookmarkCategory) => {
          if (parseInt(bookmarkCategory.id) === category) {
            bookmarkCategory.content_count++
          }
        })
      })
    },
    decrementBookmarksCount(categories: number[]) {
      categories.forEach((category) => {
        this.bookmarksCategories.forEach((bookmarkCategory) => {
          if (parseInt(bookmarkCategory.id) === category) {
            bookmarkCategory.content_count--
          }
        })
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