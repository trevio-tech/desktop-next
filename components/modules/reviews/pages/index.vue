<template>
  <NuxtLayout heading="Отзывы">
    <template #sidebar>1</template>
    <div class="space-y-4">
      <ContentCard v-for="review in reviews" :entry="review" :key="review.id" />
    </div>
    <Button :loading="isFetching" @click="fetchReviews" variant="secondary" class="w-full my-4">Показать еще</Button>
  </NuxtLayout>
</template>

<script setup>
import { usePageQuery, Button } from '@trevio/ui'
import { REVIEW_CARD } from '../graphql';
import ContentCard from '~/components/ContentCard'

import { shallowRef } from 'vue'

const isFetching = shallowRef(false)
const page = shallowRef(0)
const reviews = shallowRef([])

const fetchReviews = async () => {
  if (isFetching.value) return

  isFetching.value = true

  page.value++

  try {
    const { data } = await usePageQuery({
      query: `
        query getReviews($page: Int) {
          reviews(page: $page) {
            ${REVIEW_CARD}
          }
        }
      `,
      variables: {
        page: page.value
      }
    })

    reviews.value = [...reviews.value, ... data.reviews]
  } catch (error) {
    console.log(error)
  } finally {
    isFetching.value = false
  }
}

await fetchReviews()
</script>