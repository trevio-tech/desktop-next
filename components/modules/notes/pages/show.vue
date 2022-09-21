<template>
  <TheLayout :heading="note.title">
    <template #sidebar>
      <NuxtLink :to="`/notes/${note.id}/edit`">Редактировать</NuxtLink>
    </template>
    <div v-html="note.text" class="prose prose-sm"></div>
  </TheLayout>
</template>

<script setup>
import { useRoute } from 'nuxt/app'
import { useAsyncGql } from '~/uses'
import TheLayout from '~/components/layout/TheLayout'
import { NOTE } from '../graphql';

const route = useRoute()

const { data: { value: { note }}} = await useAsyncGql(`
  query($id: Int!) {
    ${NOTE}
  }
`, {
  id: parseInt(route.params.noteId)
})
</script>