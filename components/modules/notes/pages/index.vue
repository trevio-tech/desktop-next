<template>
  <TheLayout :heading="title">
    <template #sidebar>1</template>
    <div class="space-y-4">
      <Note v-for="note in notes" :entry="note" :key="note.id"/>
    </div>
  </TheLayout>
</template>

<script setup>
import Note from '../components/Note'
import TheLayout from '~/components/layout/TheLayout'
import { NOTE_CARD } from '../graphql'
import { gql, useAsyncQuery } from '#imports'
import { useRoute, useHead } from 'nuxt/app'
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

  const { data } = await useAsyncQuery(gql`
    query getNotes ($tag_id: Int${tagId > 0 ? `, $tag_tag_id: Int!` : ''}) {
      notes(tag_id: $tag_id) {
        ${NOTE_CARD}
      }
      ${tagQuery}
    }
  `, {
    tag_id: tagId || undefined,
    tag_tag_id: tagId || undefined,
  })

  notes.value = data.value.notes

  if (data.value.tag) {
    tag.value = data.value.tag
  } else {
    tag.value = null
  }
}

await getNotes(route.query.tag_id)

watch(() => route.query.tag_id, async (newTagId) => {
  await getNotes(newTagId)
})
</script>