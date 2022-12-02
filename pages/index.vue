<template>
  <TheLayout>
    <template #sidebar>
      <div class="bg-green-300/50 w-full h-full"></div>
    </template>

    <div class="space-y-4">
      <div v-for="item in items" :key="item.id">
        <ContentCard :entry="item" />
        <div v-if="item.whoShared.length">
          {{ item.whoShared }}
        </div>
      </div>
      <div v-if="! isEnd" @click="onMore" class="text-center bg-gray-300/50">Еще</div>
    </div>
  </TheLayout>
</template>

<script setup>
import ContentCard from '~/components/ContentCard'
import { FEED } from '~/components/modules/activity/graphql'
import { ref } from 'vue'
import { useQuery } from '#imports'
import { useRoute, useRouter } from 'nuxt/app'

const route = useRoute()
const router = useRouter()
const items = ref([])
const isEnd = ref(false)
const nextPage = ref(0)
const page = ref(0)

const fetchFeed = async () => {
  const { data: { feed }} = await useQuery({
    query: `
      query($page: Int) {
        feed(page: $page) {
          ${FEED}
        }
      }
    `,
    variables: {
      page: page.value
    }
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
</script>