<template>
  <article @click="onPin" class="flex">
    <NuxtLink :to="{name: 'users.show', params: {userId: entry.user_id}}" class="w-10 h-10 flex-shrink-0 mr-4">
      <img :src="entry.user.avatar" :alt="entry.user.name" class="block rounded-full">
    </NuxtLink>
    <div class="text-sm">
      <div class="mb-2">
        <NuxtLink class="font-medium" :to="{name: 'users.show', params: {userId: entry.user_id}}">{{ entry.user.name }}</NuxtLink>,
        <div class="text-slate-500">{{ entry.created_at }}</div>
      </div>
      {{ entry.text }}
      {{ entry.is_pinned }}
    </div>
  </article>
</template>

<script setup>
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