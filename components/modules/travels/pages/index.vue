<template>
  <TheLayout heading="Путешествия">
    <template #sidebar>1</template>
    <div class="space-y-4">
      <ContentCard v-for="travel in travels" :entry="travel" :key="travel.id" />
    </div>
  </TheLayout>
</template>

<script setup>
import ContentCard from '~/components/ContentCard'
import { TRAVEL_CARD } from '../graphql';
import { useQuery } from '#imports'
import { useRoute, useRouter } from 'nuxt/app'
import { watch } from 'vue'

const route = useRoute()
const router = useRouter()

const { data: { travels }, refresh } = await useQuery({
  query: `
    query($filter_by: String, $tag_id: Int) {
      travels(filter_by: $filter_by, tag_id: $tag_id) {
        ${TRAVEL_CARD}
      }
    }
  `,
  variables: {
    tag_id: parseInt(route.query.tag_id),
    filter_by: !!route.query.timeline ? undefined : 'subscriptions'
  }
})

watch(() => route.query.tag_id, () => {
  refresh()
})
watch(() => route.query.timeline, () => {
  refresh()
})
</script>