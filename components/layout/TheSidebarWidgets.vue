<template>
  <section>
    <h3 class="font-medium mb-2">Случайные заметки</h3>
    <ul class="space-y-4">
      <li v-for="note in notes" :key="note.id" class="text-sm">
        <NuxtLink :to="{name: 'notes.show', params: {noteId: note.id}}" class="font-medium hover:underline">{{ note.title }}</NuxtLink>
        <div v-if="note.text" class="mt-1">
          <NuxtLink :to="{name: 'notes.show', params: {noteId: note.id}}">{{ note.text }}</NuxtLink>
        </div>
      </li>
    </ul>
  </section>
</template>

<script setup>
import { useQuery } from '@trevio/ui'
import { shallowRef } from 'vue'

const notes = shallowRef([])

try {
  const { data } = await useQuery({
    query: `
      query sidebarWidgets {
        notes(random: true, limit: 5) {
          id
          title
          text(words: 10)
        }
      }
    `
  })

  notes.value = data.notes
} catch (error) {
  console.log(error)
}
</script>