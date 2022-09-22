<template>
  <TheLayout>
    <template #top>
      <div class="bg-blue-300/50 w-full h-50"></div>
    </template>
    <template #sidebar>
      <div class="bg-green-300/50 w-full h-full"></div>
    </template>
    <template #top-after>
      <ContentListFilter />
    </template>

    <div class="space-y-4">
      <div v-for="item in items" :key="item.id">
        <Component :is="cards[item.system_name]" :entry="item" />
        <div v-if="item.whoShared.length">
          {{ item.whoShared }}
        </div>
      </div>
      <div v-if="! isEnd" @click="onMore" class="text-center bg-gray-300/50">Еще</div>
    </div>
  </TheLayout>
</template>

<script setup>
import { ref } from 'vue'
import TheLayout from '~/components/layout/TheLayout'
import { FEED } from '~/components/modules/activity/graphql'
import { useAsyncGql } from '~/uses'
import Travel from '~/components/modules/travels/components/Travel'
import Note from '~/components/modules/notes/components/Note'
import Review from '~/components/modules/reviews/components/Review'
import ContentListFilter from '~/components/ContentListFilter.vue'

const items = ref([])
const isEnd = ref(false)
const nextPage = ref(0)

const fetchFeed = async (offset = 0) => {
  const { data: { value: { feed }} } = await useAsyncGql(`
    query($offset: Int, $page: Int) {
      feed(offset: $offset, page: $page) {
        ${FEED}
      }
    }
  `, {
    offset,
    page: nextPage.value
  })

  if (feed.items.length) {
    feed.items.forEach(item => items.value.push(item))
  }

  if (feed.items.length < 5) {
    isEnd.value = true
  }

  nextPage.value = feed.page
}

await fetchFeed()

const onMore = async () => {
  await fetchFeed(items.value.length)
}

const cards = {
  notes:    Note,
  reviews:  Review,
  travels:  Travel,
}
</script>