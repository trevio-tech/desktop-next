<template>
  <NuxtLayout>
    <ShotsHorizontalList v-show="shotsStore.stories.length" :is-story="true" :items="shotsStore.stories" class="mb-2" />

    <div class="space-y-4">
      <div v-for="(item, index) in store.items" :key="item.id">
        <Component :is="item.system_name === 'questions' ? QuestionCard : ContentCard" :entry="item" />

        <PromotedEntries v-if="[4,28,52].includes(index)" class="my-8" />
        <RandomNotes v-if="[12,36,60].includes(index)" class="my-8" />
        <Travels v-if="[20,44,68].includes(index)" class="my-8" />
      </div>
    </div>

    <div ref="more"></div>
  </NuxtLayout>
</template>

<script setup>
import ContentCard from '~/components/ContentCard'
import QuestionCard from '~/components/modules/questions/components/QuestionCard.vue'
import ShotsHorizontalList from '~/components/modules/shots/components/ShotsHorizontalList.vue'
// Belts
import PromotedEntries from '~/components/modules/activity/components/belts/PromotedEntries.vue'
import RandomNotes from '~/components/modules/activity/components/belts/RandomNotes.vue'
import Travels from '~/components/modules/activity/components/belts/Travels.vue'

import { FEED } from '~/components/modules/activity/graphql'
import { ref } from 'vue'
import { useRoute } from '#imports'
import { useActivityStore } from '~/components/modules/activity/store'
import { useShotsStore } from '~/components/modules/shots/store'
import { useIntersectionObserver } from '@vueuse/core'
import { usePageQuery } from '@trevio/ui'

const store = useActivityStore()
const route = useRoute()
const more  = ref(false)
const moreIsEmpty = ref(false)
const shotsStore = useShotsStore()

const fetchFeed = async () => {
  let result = []

  try {
    const { data: { activity } } = await usePageQuery({
      query: `
        query getActivity($page: Int, $is_timeline: Boolean) {
          activity (page: $page, is_timeline: $is_timeline) {
            ${FEED}
          }
        }
      `,
      variables: {
        page: store.page,
        is_timeline: route.name === 'activity.new'
      }
    })

    result = activity
  } catch (errors) {
    console.log(errors)
  }

  return result
}


// При переключении между главной и new, нужно сбросить записи.
if (route.name !== store.previousRouteName) {
  store.$patch({
    previousRouteName: route.name
  })

  const items = await fetchFeed()
  store.resetPage()
  store.setItems(items)
} else if (store.items.length === 0) {
  // Чтобы по возвращению в ленту, она повторно не грузилась.
  const items = await fetchFeed()
  store.addItems(items)
}

useIntersectionObserver(
  more,
  async ([{ isIntersecting }]) => {
    if (isIntersecting) {
      await store.incrementPage()
      const items = await fetchFeed()

      // Если ответ пустой, то в следующий скролл уже ничего не грузим.
      if (items.length === 0) {
        moreIsEmpty.value = true
      } else {
        await store.addItems(items)
      }
    }
  },
)
</script>