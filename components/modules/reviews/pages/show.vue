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
import { useAsyncGql } from '~/uses'

import PlaceRatingBar from '~/components/modules/places/components/PlaceRatingBar.vue'
import { PLACE } from '~/components/modules/places/graphql'

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
        ${PLACE}
      }
    }
  }
`, {
  id: parseInt(route.params.reviewId)
})
</script>