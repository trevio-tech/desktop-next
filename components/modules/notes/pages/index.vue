<template>
  <TheLayout heading="Заметки">
    <template #sidebar>1</template>
    <div class="space-y-4">
      <Note v-for="note in notes" :entry="note" :key="note.id" />
    </div>
  </TheLayout>
</template>

<script setup>
import { useAsyncGql } from '~/uses'
import TheLayout from '~/components/layout/TheLayout'
import { NOTES } from '../graphql';
import Note from '../components/Note'

const { data: { value: { notes }}} = await useAsyncGql(`
  query {
    ${NOTES}
  }
`)
</script>