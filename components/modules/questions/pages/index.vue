<template>
  <TheLayout heading="Вопросы">
    <template #sidebar>1</template>
    <div class="space-y-4">
      <QuestionCard v-for="question in questions" :key="question.id" :entry="question "/>
    </div>
  </TheLayout>
</template>

<script setup>
import { QUESTION_CARD } from '../graphql';
import { useQuery } from '#imports'
import QuestionCard from '~/components/modules/questions/components/QuestionCard.vue'
import { useHead } from 'nuxt/app'

useHead({
  title: 'Вопросы и ответы'
})

let questions = []

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

  questions = data.questions
} catch (error) {
  console.log(error)
}
</script>