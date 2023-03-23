<template>
  <NuxtLayout>
    <template #sidebar>1</template>
    <Content :entry="review" />
    <PlaceRatingBar v-if="review.place" :place="review.place" :user-rating="review.stars" class="mb-4" />
  </NuxtLayout>
</template>

<script setup>
import PlaceRatingBar from '~/components/modules/places/components/PlaceRatingBar.vue'
import { PLACE } from '~/components/modules/places/graphql'
import { useRoute } from '#imports'
import { usePageQuery } from '@trevio/ui'

const route = useRoute()

let review = []

try {
  const { data } = await usePageQuery({
    query: `
      query($id: ID!) {
        review(id: $id) {
          id
          user_id
          place_id
          title
          text
          can
          stars
          user {
            id
            name
            avatar
          }
          place {
            ${PLACE}
          }
        }
      }
    `,
    variables: {
      id: parseInt(route.params.reviewId)
    }
  })

  review = data.review
} catch (error) {
  console.log(error)
}
</script>