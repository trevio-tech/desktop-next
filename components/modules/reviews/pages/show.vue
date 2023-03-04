<template>
  <NuxtLayout :heading="review.title">
    <template #sidebar>1</template>
    <ImageViewer>
      <PlaceRatingBar v-if="review.place" :place="review.place" :user-rating="review.stars" class="mb-4" />
      <div class="prose-sm" v-html="review.text"></div>
    </ImageViewer>
  </NuxtLayout>
</template>

<script setup>
import PlaceRatingBar from '~/components/modules/places/components/PlaceRatingBar.vue'
import { PLACE } from '~/components/modules/places/graphql'
import { useQuery } from '@trevio/ui'

const route = useRoute()

let review = []

try {
  const { data } = await useQuery({
    query: `
      query($id: ID!) {
        review(id: $id) {
          id
          place_id
          title
          text
          can
          stars
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