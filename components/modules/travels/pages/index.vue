<template>
  <TheLayout heading="Путешествия">
    <template #sidebar>1</template>
    <div class="space-y-4">
      <Travel v-for="travel in travels" :entry="travel" :key="travel.id" />
    </div>
  </TheLayout>
</template>

<script setup>
import { useAsyncGql } from '~/uses'
import TheLayout from '~/components/layout/TheLayout'
import { TRAVELS } from '../graphql';
import Travel from '../components/Travel'

const { data: { value: { travels }}} = await useAsyncGql(`
  query {
    ${TRAVELS}
  }
`)
</script>