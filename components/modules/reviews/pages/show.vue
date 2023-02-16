<template>
  <TheLayout :heading="review.title">
    <template #sidebar>1</template>
    <ImageViewer>
      <PlaceRatingBar v-if="review.place" :place="review.place" :user-rating="review.stars" class="mb-4" />
      <div class="prose-sm" v-html="review.text"></div>
    </ImageViewer>
  </TheLayout>
</template>

<script setup>

import { useAsyncGql } from '~/uses'
import TheLayout from '~/components/layout/TheLayout'
import PlaceRatingBar from '~/components/modules/places/components/PlaceRatingBar.vue'

const route = useRoute()

const { data: { value: { review }}} = await useAsyncGql(`
  query($id: Int!) {
    review(id: $id) {
      id
      place_id
      title
      text
      can
      stars
      place {
        id
        parent_id
        parent_names
        full_name
        name
        rating
        reviews_count
        reviews_count_1
        reviews_count_2
        reviews_count_3
        reviews_count_4
        reviews_count_5
        parent {
          id
          parent_id
          name
          parent {
            id
            parent_id
            name
          }
        }
      }
    }
  }
`, {
  id: parseInt(route.params.reviewId)
})
</script>