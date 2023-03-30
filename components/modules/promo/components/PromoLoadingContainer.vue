<template>
  <div ref="root">
    <div v-if="item?.system_name">
      <slot :item="item"></slot>
    </div>
    <div class="text-sm text-gray-400 mt-1">Продвигаемая запись</div>
  </div>
</template>

<script setup>
import { ALBUM_CARD } from '~/components/modules/albums/graphql'
import { NOTE_CARD } from '~/components/modules/notes/graphql'
import { QUESTION_CARD } from '~/components/modules/questions/graphql'
import { REVIEW_CARD } from '~/components/modules/reviews/graphql'
import { TRAVEL_CARD } from '~/components/modules/travels/graphql'
import { ref } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'
import { useQuery } from '@trevio/ui'


const root = ref()
const item = ref()
const isLoaded = ref(false)

useIntersectionObserver(
  root,
  async ([{ isIntersecting }]) => {
    if (isIntersecting && isLoaded.value === false) {
      const { data } = await useQuery({
        query: `{
          promo {
            id
            model {
              ... on Album {
                ${ALBUM_CARD}
              }
              ... on Note {
                ${NOTE_CARD}
              }
              ... on Question {
                ${QUESTION_CARD}
              }
              ... on Review {
                ${REVIEW_CARD}
              }
              ... on Travel {
                ${TRAVEL_CARD}
              }
            }
          }
        }`
      })

      if (data.promo) {
        item.value = data.promo[0].model
      }

      isLoaded.value = true
    }
  },
)
</script>