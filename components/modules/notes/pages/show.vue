<template>
  <TheLayout :heading="note.title">
    <template #sidebar>
      <NuxtLink :to="`/notes/${note.id}/edit`">Редактировать</NuxtLink>
    </template>
    <article class="bg-white p-4 overflow-hidden rounded-md shadow ring-1 ring-slate-200">
      <ImageViewer>
        <div v-html="note.text" class="prose-sm"></div>
      </ImageViewer>
    </article>
  </TheLayout>
</template>

<script setup>
import { useRoute } from 'nuxt/app'
import { useAsyncQuery } from '~/uses'
import TheLayout from '~/components/layout/TheLayout'
import { NOTE } from '../graphql'
import { ImageViewer } from '@trevio/ui'
import { ref } from 'vue'

const route = useRoute()
const note = ref()

try {
  const { data } = await useAsyncQuery({
    query: `
      query($id: Int!) {
        ${NOTE}
      }
    `,
    variables: {
      id: parseInt(route.params.noteId)
    }
  })

  note.value = data.note
} catch (error) {
  console.log(error)
}
</script>