<template>
  <NuxtLayout heading="Заметки">
    <template #sidebar>1</template>
    <div class="space-y-4">
      <ContentCard v-for="note in notes" :entry="note" :key="note.id"/>
    </div>
    <Button :loading="isFetching" @click="fetchNotes" variant="secondary" class="w-full my-4">Показать еще</Button>
  </NuxtLayout>
</template>

<script setup>
import ContentCard from '~/components/ContentCard'
import { NOTE_CARD } from '../graphql'
import { shallowRef } from 'vue'
import { useHead } from '#imports'
import { usePageQuery, Button } from '@trevio/ui'

useHead({
  title: 'Заметки'
})

const isFetching = shallowRef(false)
const page = shallowRef(0)
const notes = shallowRef([])

const fetchNotes = async () => {
  if (isFetching.value) return

  isFetching.value = true

  page.value++

  try {
    const { data } = await usePageQuery({
      query: `
        query getNotes($page: Int) {
          notes(page: $page) {
            ${NOTE_CARD}
          }
        }
      `,
      variables: {
        page: page.value
      },
    })

    notes.value = [...notes.value, ...data.notes]
  } catch (error) {
    console.log(error)
  } finally {
    isFetching.value = false
  }
}

await fetchNotes()
</script>