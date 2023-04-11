<template>
  <section ref="target" class="bg-orange-100 p-6 rounded-lg">
    <h3 class="font-medium mb-4 text-lg">Читайте также</h3>
    <div v-if="items.length === 0">
      <Skeleton class="w-1/2 h-2" />
      <Skeleton class="w-full h-2 mt-1" />

      <Skeleton class="w-full h-3 mt-3" />
      <Skeleton class="w-1/2 h-3 mt-1" />
      <Skeleton class="w-full h-3 mt-1" />
    </div>
    <ul v-else class="space-y-4">
      <li v-for="note in items" :key="note.id" class="text-sm">
        <NuxtLink :to="{name: 'notes.show', params: {noteId: note.id}}" class="font-medium hover:underline">{{ note.title }}</NuxtLink>
        <div v-if="note.text" class="mt-1">
          <NuxtLink :to="{name: 'notes.show', params: {noteId: note.id}}">{{ note.text }}</NuxtLink>
        </div>
      </li>
    </ul>
  </section>
</template>

<script setup>
import { Skeleton, useQuery } from '@trevio/ui'
import { shallowRef, ref } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'

const target = shallowRef()
const items = ref([])

const getRandomNotes = async () => {
  try {
    const { data } = await useQuery({
      query: `
        query getRandomNotes {
          notes(random: true, limit: 5) {
            id
            title
            text(words: 10)
          }
        }
      `
    })

    items.value = data.notes
  } catch (error) {
    console.log(error)
  }
}

useIntersectionObserver(
  target,
  async ([{ isIntersecting }]) => {
    if (isIntersecting && items.value.length === 0) {
      await getRandomNotes()
    }
  },
)
</script>