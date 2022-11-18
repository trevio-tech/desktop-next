<template>
  <TheLayout :heading="note.title">
    <template #sidebar>
      <NuxtLink :to="`/notes/${note.id}/edit`">Редактировать</NuxtLink>
    </template>
    <article class="bg-white p-4 overflow-hidden rounded-md shadow ring-1 ring-slate-200">
      <Text :text="note.text" />
    </article>
  </TheLayout>
</template>

<script setup>
import { useRoute } from 'nuxt/app'
import { useAsyncGql } from '~/uses'
import TheLayout from '~/components/layout/TheLayout'
import { NOTE } from '../graphql'
import { Text } from '@trevio/ui'

const route = useRoute()

const { data: { value: { note }}} = await useAsyncGql(`
  query($id: Int!) {
    ${NOTE}
  }
`, {
  id: parseInt(route.params.noteId)
})
</script>