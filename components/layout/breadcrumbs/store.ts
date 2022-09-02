import { defineStore } from 'pinia'

export const useBreadcrumbsStore = defineStore('breadcrumbs', {
  state: () => {
    return {
      breadcrumb: {
        name: null,
        text: ''
      },
    }
  }
})