import { defineStore } from 'pinia'

export const useBookmarksStore = defineStore('bookmarks', {
  state: () => {
    return {
      categories: []
    }
  },
  actions: {
    addCategory(category) {
      this.categories.push(category)
    },
    incrementBookmarksCount(categories: number[]) {
      categories.forEach((category) => {
        this.categories.forEach((bookmarkCategory) => {
          if (parseInt(bookmarkCategory.id) === category) {
            bookmarkCategory.content_count++
          }
        })
      })
    },
    decrementBookmarksCount(categories: number[]) {
      categories.forEach((category) => {
        this.categories.forEach((bookmarkCategory) => {
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

      state.categories.forEach((category) => result += category.content_count)

      return result
    }
  },
})