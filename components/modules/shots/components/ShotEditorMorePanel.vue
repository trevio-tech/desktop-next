<template>
  <div>
    <h3 class="mb-4 text-sm font-medium">К какому путешествию прикрепить?</h3>
    <ul class="space-y-2">
      <li
          v-for="travel in travels"
          :key="travel.id"
          @click="emit('update:modelValue', travel.id)"
          :class="{'font-semibold': modelValue === travel.id}"
          class="truncate text-sm cursor-pointer">{{ travel.title }}</li>
    </ul>
  </div>
</template>

<script setup>
import { useAuth } from '#auth/runtime/composables'
import { useQuery } from '#imports'

const emit = defineEmits(['update:modelValue'])

defineProps({
  modelValue: {
    type: Number
  }
})

const { user } = useAuth()

let travels = []

try {
  const { data } = await useQuery({
    query: `
      query {
        travels(user_id: ${user.id}) {
          id
          title
        }
      }
    `
  })


  travels = data.travels

  console.log(travels)
} catch (error) {}
</script>