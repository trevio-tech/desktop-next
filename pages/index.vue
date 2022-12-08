<template>
  <TheLayout>
    <template #sidebar>
      <div class="bg-green-300/50 w-full h-full"></div>
    </template>

    <div @click="store.isTimeline = !store.isTimeline">В хронологии: {{ store.isTimeline }}</div>
    <div class="space-y-4">
      <div v-for="item in store.items" :key="item.id">
        <ContentCard :entry="item" />
      </div>
      <div @click="onMore" class="text-center bg-gray-300/50">Еще</div>
    </div>
  </TheLayout>
</template>

<script setup>
import ContentCard from '~/components/ContentCard'
import { FEED } from '~/components/modules/activity/graphql'
import { useActivityStore } from '~/components/modules/activity/store'
import { useQuery } from '#imports'
import { watch } from 'vue'

const store = useActivityStore()

const fetchFeed = async () => {
  const { data: { feed } } = await useQuery({
    query: `
      query ($page: Int, $is_timeline: Boolean) {
        feed (page: $page, is_timeline: $is_timeline) {
          ${FEED}
        }
      }
    `,
    variables: {
      page: store.page,
      is_timeline: store.isTimeline
    }
  })

  if (feed.length) {
    await store.addItems(feed)
  }
}

// Чтобы по возвращению в ленту, она повторно не грузилась.
if (store.items.length === 0) {
  await fetchFeed()
}

watch(() => store.isTimeline, async () => {
  store.resetItems()
  await fetchFeed()
})

const onMore = async () => await fetchFeed()
</script>