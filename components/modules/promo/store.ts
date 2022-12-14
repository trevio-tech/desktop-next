import { defineStore } from 'pinia'

export const usePromoStore = defineStore('promo', {
  state: () => {
    return {
      selectedTariff: null,
      selectedItems: {
        albums: {name: 'Фотоальбомы', items: []},
        notes: {name: 'Заметки', items: []},
        questions: {name: 'Вопросы', items: []},
        reviews: {name: 'Отзывы', items: []},
        travels: {name: 'Путешествия', items: []},
      },
    }
  },
  actions: {
    delete(type, index) {
      this.selectedItems[type].items.splice(index, 1)
    },
  },
  getters: {
    readyToPromotion: (state) => {
      return state.totalSelected > 0 && state.selectedTariff?.id > 0
    },
    totalPrice: (state) => {
      return state.totalSelected * state.selectedTariff?.totalPrice
    },
    totalSelected: (state) => {
      let result = 0

      for (let item in state.selectedItems) {
        result += state.selectedItems[item].items.length
      }

      return result
    },
  },
})