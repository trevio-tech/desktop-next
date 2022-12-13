<template>
  <div class="space-y-4">
    <div v-for="(item, index) in items" :key="item.id">
      <slot :entry="item" :index="index">
        <ContentCard :entry="item" />
      </slot>
    </div>
    <div v-if="! isEnd" @click="onMore" class="text-center bg-gray-300/50">Еще</div>
  </div>
</template>

<script setup>
import { TIMELINE } from '~/components/modules/activity/graphql'
import { useGql } from '~/uses'
import ContentCard from '~/components/ContentCard'
import { ref } from 'vue'

const props = defineProps({
  userId: {
    type: Number,
    required: true
  }
})

const items = ref([])
const isEnd = ref(false)
const nextPage = ref(0)
const page = ref(1)

const fetchFeed = async () => {
  const { data: { feed }} = await useGql(`
    query($user_id: Int, $page: Int) {
      feed(user_id: $user_id, page: $page) {
        ${TIMELINE}
      }
    }
  `, {
    user_id: props.userId,
    page: page.value++
  })

  if (feed.length) {
    feed.forEach(item => items.value.push(item))
  }

  if (feed.length < 2) {
    isEnd.value = true
  }

  nextPage.value = Math.round(feed.length / 2)
}

await fetchFeed()

const onMore = async () => {
  await fetchFeed(items.value.length)
}
</script>