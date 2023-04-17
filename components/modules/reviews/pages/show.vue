<template>
  <NuxtLayout>
    <template #sidebar>1</template>
    <PlaceRatingBar v-if="review.place" :place="review.place" :user-rating="review.stars" class="mb-4" />
    <Content :entry="review" />
  </NuxtLayout>
</template>

<script setup>
import PlaceRatingBar from '~/components/modules/places/components/PlaceRatingBar.vue'
import { useRoute } from '#imports'
import { usePageQuery } from '@trevio/ui'
import { REVIEW } from '~/components/modules/reviews/graphql'

const route = useRoute()

let review = []

try {
  const { data } = await usePageQuery({
    query: `
      query($id: ID!) {
        review(id: $id) {
          ${REVIEW}
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