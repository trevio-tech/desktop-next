<template>
  <TheLayout heading="Заметки">
    <template #sidebar>1</template>
    <div class="space-y-4">
      <Review v-for="review in reviews" :entry="review" :key="review.id" />
    </div>
  </TheLayout>
</template>

<script setup>
import { useAsyncGql } from '~/uses'
import TheLayout from '~/components/layout/TheLayout'
import { REVIEW_CARD } from '../graphql';
import Review from '../components/Review'

const { data: { value: { reviews }}} = await useAsyncGql(`
  query {
    reviews {
      ${REVIEW_CARD}
    }
  }
`)
</script>