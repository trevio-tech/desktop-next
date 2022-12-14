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
import { useGql } from '~/uses'
import ContentCard from '~/components/ContentCard'
import { ref } from 'vue'

const props = defineProps({
  userId: {
    type: Number,
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
  const { data: { feed }} = await useGql(`
    query($user_id: Int, $page: Int, $system_name: String) {
      feed(user_id: $user_id, page: $page, system_name: $system_name) {
        ${TIMELINE}
      }
    }
  `, {
    user_id: props.userId,
    page: page.value++,
    system_name: props.systemName
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