<template>
  <article class="flex">
    <NuxtLink :to="{name: 'users.show', params: {userId: entry.user_id}}" class="w-10 h-10 flex-shrink-0 mr-4">
      <img :src="entry.user.avatar" :alt="entry.user.name" class="block rounded-full">
    </NuxtLink>
    <div class="text-sm w-full">
      <div class="mb-2 flex items-center">
        <div>
          <NuxtLink class="font-medium" :to="{name: 'users.show', params: {userId: entry.user_id}}">{{ entry.user.name }}</NuxtLink>
          <div class="text-slate-500">{{ entry.created_at }}</div>
        </div>
        <div class="ml-auto">
          <MoreHorizontal @click="onPin"  class="w-5 h-5" />
        </div>
      </div>
      {{ entry.text }}
    </div>
  </article>
</template>

<script setup>
import { MoreHorizontal } from 'lucide-vue-next'

const emit = defineEmits(['pinned', 'unpinned'])

const props = defineProps({
  entry: {
    type:     Object,
    required: true
  }
})

const onPin = async () => {
  try {
    const { data: { pinUnpinAnswer }} = await useQuery({
      query: `
        mutation ($id: Int!) {
          pinUnpinAnswer(id: $id)
        }
      `,
      variables: {
        id: props.entry.id
      }
    })

    props.entry.is_pinned = pinUnpinAnswer === 'pinned'

    if (props.entry.is_pinned) {
      emit('pinned')
    } else {
      emit('unpinned')
    }
  } catch (error) {}
}
</script>