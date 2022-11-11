<template>
  <TheLayout heading="Вопросы">
    <template #sidebar>1</template>
    <div class="space-y-4">
      <div v-for="question in questions" :key="question.id">
        <NuxtLink :to="`/questions/${question.id}`">{{ question.title }}</NuxtLink>
      </div>
    </div>
  </TheLayout>
</template>

<script setup>
import TheLayout from '~/components/layout/TheLayout'
import { QUESTION_FIELDS } from '../graphql';
import { useAsyncGql } from '~/uses'

const { data: { value: { questions }}} = await useAsyncGql(`
  query {
    questions {
      ${QUESTION_FIELDS}
    }
  }
`)
</script>