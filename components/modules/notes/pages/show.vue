<template>
  <TheLayout :heading="note.title">
    <template #sidebar>1</template>
    <p>{{ note.text }}</p>
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