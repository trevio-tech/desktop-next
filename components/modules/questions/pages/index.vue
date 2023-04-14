<template>
  <NuxtLayout heading="Вопросы">
    <template #sidebar>1</template>
    <div class="space-y-4">
      <QuestionCard v-for="question in questions" :key="question.id" :entry="question "/>
    </div>
    <Button v-if="questions.length" :loading="isFetching" @click="fetchQuestions" variant="secondary" class="w-full my-4">Показать еще</Button>
  </NuxtLayout>
</template>

<script setup>
import QuestionCard from '~/components/modules/questions/components/QuestionCard.vue'
import { QUESTION_CARD } from '../graphql'
import { shallowRef } from 'vue'
import { useHead } from '#imports'
import { usePageQuery, Button } from '@trevio/ui'

useHead({
  title: 'Вопросы и ответы'
})

const isFetching = shallowRef(false)
const page = shallowRef(0)
const questions = shallowRef([])

const fetchQuestions = async () => {
  if (isFetching.value) return

  isFetching.value = true

  page.value++

  try {
    const { data } = await usePageQuery({
      query: `
        query getQuestions($page: Int) {
          questions(page: $page) {
            ${QUESTION_CARD}
          }
        }
      `,
      variables: {
        page: page.value
      }
    })

    questions.value = [...questions.value, ...data.questions]
  } catch (error) {
    console.log(error)
  } finally {
    isFetching.value = false
  }
}

await fetchQuestions()
</script>