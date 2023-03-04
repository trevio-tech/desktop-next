<template>
  <NuxtLayout>
    <template #sidebar>
      <div class="bg-emerald-100 w-full h-full"></div>
    </template>

    <ShotsHorizontalList :is-story="true" :items="shotsStore.stories" class="mb-2" />

    <div class="space-y-4">
      <div v-for="(item, index) in store.items" :key="item.id">
        <Component :is="item.system_name === 'questions' ? QuestionCard : ContentCard" :entry="item" />
        <UsersBelt
          v-if="index === 1"
          :items="store.getBelt(index)"
          @loaded="store.addBelt(index, $event)"
          class="mt-4" />

        <PromoLoadingContainer v-if="index % 4 === 3" class="mt-4">
          <template v-slot:default="{ item }">
            <Component :is="item.system_name === 'questions' ? QuestionCard : ContentCard" :entry="item" />
          </template>
        </PromoLoadingContainer>
      </div>
    </div>

    <div ref="more"></div>
  </NuxtLayout>
</template>

<script setup>
import ContentCard from '~/components/ContentCard'
import QuestionCard from '~/components/modules/questions/components/QuestionCard.vue'
import UsersBelt from '~/components/modules/users/components/UsersBelt.vue'
import ShotsHorizontalList from '~/components/modules/shots/components/ShotsHorizontalList.vue'
import PromoLoadingContainer from '~/components/modules/promo/components/PromoLoadingContainer.vue'
import { FEED } from '~/components/modules/activity/graphql'
import { ref } from 'vue'
import { useActivityStore } from '~/components/modules/activity/store'
import { useShotsStore } from '~/components/modules/shots/store'
import { useIntersectionObserver } from '@vueuse/core'
import { useQuery } from '@trevio/ui'

const store = useActivityStore()
const route = useRoute()
const more  = ref(false)
const moreIsEmpty = ref(false)
const shotsStore = useShotsStore()

const fetchFeed = async () => {
  const { data: { activity } } = await useQuery({
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

  return activity
}

// При переключение между главной и new, нужно сбросить записи.
if (route.name !== store.previousRouteName) {
  store.$patch({
    previousRouteName: route.name
  })

  await store.resetPage()
  await store.setItems(await fetchFeed())
} else if (store.items.length === 0) {
  // Чтобы по возвращению в ленту, она повторно не грузилась.
  await store.addItems(await fetchFeed())
}

useIntersectionObserver(
  more,
  async ([{ isIntersecting }]) => {
    if (isIntersecting && moreIsEmpty.value === false) {
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