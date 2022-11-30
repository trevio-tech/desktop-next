<template>
  <TheLayout>
    <template #sidebar>
      <div class="bg-green-300/50 w-full h-full"></div>
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
import { useRoute, useRouter } from 'nuxt/app'
import TheLayout from '~/components/layout/TheLayout'
import { FEED } from '~/components/modules/activity/graphql'
import { useAsyncGql } from '~/uses'
import Travel from '~/components/modules/travels/components/Travel'
import Note from '~/components/modules/notes/components/Note'
import Review from '~/components/modules/reviews/components/Review'

const route = useRoute()
const router = useRouter()
const items = ref([])
const isEnd = ref(false)
const nextPage = ref(0)
const page = ref(0)

const fetchFeed = async () => {
  const { data: { value: { feed }} } = await useAsyncGql(`
    query($page: Int) {
      feed(page: $page) {
        ${FEED}
      }
    }
  `, {
    page
  })

  if (page && feed.items.length) {
    feed.items.forEach(item => items.value.push(item))
  } else {
    items.value = feed.items
  }

  if (feed.items.length < 5) {
    isEnd.value = true
  }

  nextPage.value = feed.page

  page.value++
}

await fetchFeed()

const onMore = async () => {
  await fetchFeed()
}

const cards = {
  notes:    Note,
  reviews:  Review,
  travels:  Travel,
}
</script>