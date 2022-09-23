<template>
  <TheLayout>
    <template #top>
      <div class="bg-blue-300/50 w-full h-50"></div>
    </template>
    <template #sidebar>
      <div class="bg-green-300/50 w-full h-full"></div>
    </template>
    <template #top-after>
      <ContentListFilter v-model="contentTypes" />
      {{ contentTypes }}
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
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'nuxt/app'
import TheLayout from '~/components/layout/TheLayout'
import { FEED } from '~/components/modules/activity/graphql'
import { useAsyncGql } from '~/uses'
import Travel from '~/components/modules/travels/components/Travel'
import Note from '~/components/modules/notes/components/Note'
import Review from '~/components/modules/reviews/components/Review'
import ContentListFilter from '~/components/ContentListFilter.vue'

const route = useRoute()
const router = useRouter()
const items = ref([])
const isEnd = ref(false)
const nextPage = ref(0)

const contentTypes = ref(
    route.query?.contentTypes
        ? route.query.contentTypes.split(',')
        : []
)


const fetchFeed = async (offset = 0) => {
  const { data: { value: { feed }} } = await useAsyncGql(`
    query($offset: Int, $page: Int, $contentTypes: [String]) {
      feed(offset: $offset, page: $page, contentTypes: $contentTypes) {
        ${FEED}
      }
    }
  `, {
    offset,
    page: nextPage.value,
    contentTypes: contentTypes.value
  })

  if (offset && feed.items.length) {
    feed.items.forEach(item => items.value.push(item))
  } else {
    items.value = feed.items
  }

  if (feed.items.length < 5) {
    isEnd.value = true
  }

  nextPage.value = feed.page
}

await fetchFeed()

watch(contentTypes, async (newValue) => {
  await router.replace({
    query: {
      contentTypes: newValue.join(',')
    }
  })

  await fetchFeed()
})

const onMore = async () => {
  const offset = items.value.length

  await router.replace({
    query: {
      ...route.query,
      offset,
    }
  })

  await fetchFeed(offset)
}

const cards = {
  notes:    Note,
  reviews:  Review,
  travels:  Travel,
}
</script>