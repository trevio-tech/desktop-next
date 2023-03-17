<template>
  <div class="space-y-4">
    <div v-for="(item, index) in items" :key="item.id">
      <slot :entry="item" :index="index">
        <ContentCard :entry="item" />
      </slot>
    </div>
    <div v-show="items.length === 0">Ничего не найдено</div>
    <div v-if="! isEnd" @click="onMore" class="text-center bg-gray-300/50">Еще</div>
  </div>
</template>

<script setup>
import { TIMELINE } from '~/components/modules/activity/graphql'
import ContentCard from '~/components/ContentCard'
import { ref } from 'vue'
import { useQuery } from '@trevio/ui'

const props = defineProps({
  userId: {
    type: [Number, String],
    required: true
  },
  systemName: {
    type: String
  }
})

const items = ref([])
const isEnd = ref(false)
const nextPage = ref(0)
const page = ref(1)

const fetchFeed = async () => {
  try {
    const { data: { activity }} = await useQuery({
      query: `
        query($user_id: ID, $page: Int, $system_name: String) {
          activity(user_id: $user_id, page: $page, system_name: $system_name) {
            ${TIMELINE}
          }
        }
      `,
      variables: {
        user_id: props.userId,
        page: page.value++,
        system_name: props.systemName
      }
    })

    if (activity.length) {
      activity.forEach(item => items.value.push(item))
    }

    if (activity.length < 2) {
      isEnd.value = true
    }

    nextPage.value = Math.round(activity.length / 2)
  } catch (error) {
    console.log(error)
  }
}

await fetchFeed()

const onMore = async () => {
  await fetchFeed(items.value.length)
}
</script>