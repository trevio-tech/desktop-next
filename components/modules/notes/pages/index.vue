<template>
  <NuxtLayout :heading="title">
    <template #sidebar>1</template>
    <div class="space-y-4">
      <ContentCard v-for="note in notes" :entry="note" :key="note.id"/>
    </div>
  </NuxtLayout>
</template>

<script setup>
import ContentCard from '~/components/ContentCard'

import { NOTE_CARD } from '../graphql'
import { useRoute, useHead } from '#imports'
import { ref, watch, computed } from 'vue'

const route = useRoute()

const notes = ref([])
const tag = ref(null)

const title = computed(() => {
  if (tag.value) {
    return `Заметки по тегу ${tag.value.name}`
  }

  return 'Заметки'
})

useHead({
  title
})

const getNotes = async (tagId) => {
  tagId = parseInt(tagId)

  const tagQuery = tagId > 0
    ? `tag(id: $tag_tag_id) {
      id
      name
    }` : ''

  const { data } = await useQuery({
    query: `
      query getNotes {
        notes {
          ${NOTE_CARD}
        }
        ${tagQuery}
      }
    `,
  })

  notes.value = data.notes

  if (data.tag) {
    tag.value = data.tag
  } else {
    tag.value = null
  }
}

await getNotes(route.query.tag_id)

watch(() => route.query.tag_id, async (newTagId) => {
  await getNotes(newTagId)
})
</script>