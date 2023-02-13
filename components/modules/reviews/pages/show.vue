<template>
  <TheLayout :heading="review.title">
    <template #sidebar>1</template>
    <ImageViewer>
      <div class="prose-sm" v-html="review.text"></div>
    </ImageViewer>
  </TheLayout>
</template>

<script setup>

import { useAsyncGql } from '~/uses'
import TheLayout from '~/components/layout/TheLayout'

const route = useRoute()

const { data: { value: { review }}} = await useAsyncGql(`
  query($id: Int!) {
    review(id: $id) {
      id
      title
      text
      can
    }
  }
`, {
  id: parseInt(route.params.reviewId)
})
</script>