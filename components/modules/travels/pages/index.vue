<template>
  <NuxtLayout heading="Путешествия">
    <template #sidebar>1</template>
    <div class="space-y-4">
      <ContentCard v-for="travel in travels" :entry="travel" :key="travel.id" />
    </div>
  </NuxtLayout>
</template>

<script setup>
import ContentCard from '~/components/ContentCard'
import { TRAVEL_CARD } from '../graphql';
import { usePageQuery } from '@trevio/ui'

const { data: { travels }, refresh } = await usePageQuery({
  query: `
    query {
      travels {
        ${TRAVEL_CARD}
      }
    }
  `,
})
</script>