<template>
  <div class="space-y-4">
    <div v-for="item in items" :key="item.id">
      <Component :is="cards[item.system_name]" :entry="item" />
      <div v-if="item.whoShared.length">
        {{ item.whoShared }}
      </div>
    </div>
    <div v-if="! isEnd" @click="onMore" class="text-center bg-gray-300/50">Еще</div>
  </div>
</template>

<script setup>
import { TIMELINE } from '~/components/modules/activity/graphql'
import { useGql } from '~/uses'
import Travel from '~/components/modules/travels/components/Travel'
import Note from '~/components/modules/notes/components/Note'
import Review from '~/components/modules/reviews/components/Review'
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

const fetchFeed = async (offset = 0) => {
  const { data: { timeline }} = await useGql(`
    query($user_id: Int) {
      timeline(user_id: $user_id) {
        ${TIMELINE}
      }
    }
  `, {
    user_id: props.userId
  })

  if (timeline.length) {
    timeline.forEach(item => items.value.push(item))
  }

  if (timeline.length < 2) {
    isEnd.value = true
  }

  nextPage.value = Math.round(timeline.length / 2)
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