<template>
  <NuxtLayout heading="Отзывы">
    <template #sidebar>1</template>
    <div class="space-y-4">
      <ContentCard v-for="review in reviews" :entry="review" :key="review.id" />
    </div>
  </NuxtLayout>
</template>

<script setup>
import { useQuery } from '#imports'
import { REVIEW_CARD } from '../graphql';
import ContentCard from '~/components/ContentCard'

import { shallowRef } from 'vue'

const reviews = shallowRef([])

try {
  const { data } = await useQuery({
    query: `
      query {
        reviews {
          ${REVIEW_CARD}
        }
      }
    `
  })

  reviews.value = data.reviews
} catch (error) {}
</script>