<template>
  <TheLayout heading="Заметки">
    <template #sidebar>1</template>
    <div class="space-y-4">
      <Note v-for="note in notes" :entry="note" :key="note.id" />
    </div>
  </TheLayout>
</template>

<script setup>
import Note from '../components/Note'
import TheLayout from '~/components/layout/TheLayout'
import { NOTES } from '../graphql';
import { useAsyncGql } from '~/uses'

const { data: { value: { notes }}} = await useAsyncGql(`
  query {
    ${NOTES}
  }
`)
</script>