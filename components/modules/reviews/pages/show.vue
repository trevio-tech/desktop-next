<template>
  <TheLayout :heading="review.title">
    <template #sidebar>1</template>
    <p>{{ review.text }}</p>
  </TheLayout>
</template>

<script setup>
import { useRoute } from 'nuxt/app'
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