<template>
  <TheLayout :heading="question.title">
    <template #sidebar>
      <NuxtLink :to="`/questions/${question.id}/edit`">Редактировать</NuxtLink>
    </template>
    <article>
      <ImageViewer>
        <div v-html="question.text" class="prose"></div>
      </ImageViewer>
    </article>

    <h2 class="text-2xl font-medium mt-6" id="answers">Ответы</h2>
    <AnswerForm :question-id="question.id" class="mt-2" @created="questionAnswers.data.unshift($event)" />

    <div v-if="pinnedAnswers.data.length" class="space-y-4 mt-6">
      <h3>Решения</h3>
      <AnswerCard
          v-for="pinnedAnswer in pinnedAnswers.data"
          :key="pinnedAnswer.id"
          :entry="pinnedAnswer"
          @unpinned="onUnpin(pinnedAnswer.id)" />
      <hr class="my-4">
    </div>

    <div v-if="questionAnswers.data.length" class="space-y-4 mt-6">
      <AnswerCard
          v-for="answer in questionAnswers.data"
          :key="answer.id"
          :entry="answer"
          @pinned="pinnedAnswers.data.push(answer)"
          @unpinned="onUnpin(answer.id)" />
    </div>
  </TheLayout>
</template>

<script setup>
import AnswerCard from '~/components/modules/questions/components/AnswerCard.vue'
import AnswerForm from '~/components/modules/questions/components/AnswerForm.vue'
import TheLayout from '~/components/layout/TheLayout'
import { QUESTION_FIELDS, ANSWER_CARD } from '../graphql';
import { useRoute } from 'nuxt/app'
import { shallowRef } from 'vue'

const route = useRoute()
let question = {}
let questionAnswers = []
let pinnedAnswers = []

try {
  const { data } = await useQuery({
    query: `
    query($id: Int!) {
      question(id: $id) {
        ${QUESTION_FIELDS}
      }
      questionAnswers(questionId: $id) {
        data {
          ${ANSWER_CARD}
        }
      }
      pinnedAnswers: questionAnswers(questionId: $id, only_pinned: true) {
        data {
          ${ANSWER_CARD}
        }
      }
    }
  `,
    variables: {
      id: parseInt(route.params.questionId)
    }
  })

  question = data.question
  questionAnswers = data.questionAnswers
  pinnedAnswers = data.pinnedAnswers
} catch (error) {}

const onUnpin = (answerId) => {
  pinnedAnswers.data.forEach((pinnedAnswer, index) => {
    if (parseInt(pinnedAnswer.id) === parseInt(answerId)) {
      pinnedAnswers.data.splice(index, 1)
    }
  })
}
</script>