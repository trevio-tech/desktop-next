<template>
  <TheLayout heading="Вопросы">
    <template #sidebar>1</template>
    <div class="space-y-4">
      <ContentCard v-for="question in questions" :key="question.id" :entry="question "/>
    </div>
  </TheLayout>
</template>

<script setup>
import { QUESTION_CARD } from '../graphql';
import { useQuery } from '#imports'
import { shallowRef } from 'vue'
import ContentCard from '~/components/ContentCard'

const questions = shallowRef([])

try {
  const { data } = await useQuery({
    query: `
      query {
        questions {
          ${QUESTION_CARD}
        }
      }
    `
  })

  questions.value = data.questions
} catch (error) {
  console.log(error)
}
</script>