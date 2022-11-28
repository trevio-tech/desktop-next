<template>
  <div>
    {{ data }}
  </div>
</template>

<script setup>
import { useFetch } from '~/composables'
import { useRoute } from 'nuxt/app'

const query = `
  query getTravelContentList ($travelId: Int!) {
    travelContentList(travelId: $travelId) {
      ...on Note {
        id
        title
        system_name
      }
      ...on Review {
        id
        title
        system_name
      }
      ...on Album {
        id
        title
        system_name
      }
    }
  }
`

const { data } = await useFetch({
  query,
  variables: {
    travelId: parseInt(useRoute().params.travelId)
  }
})
</script>