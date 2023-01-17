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

    <h2 class="text-2xl font-medium mt-6" id="answers">Ответы на вопрос</h2>

    <AnswerForm :question-id="question.id" class="mt-2" @created="questionAnswers.data.unshift($event)" />

    <ul class="flex items-center space-x-2 mt-6">
      <li @click="onFetch('new', true)"
          :class="[activeTab === 'new' ? 'bg-green-100 text-green-500 ring-green-200' : 'bg-gray-100 ring-gray-200']"
          class="py-2 px-3 cursor-pointer rounded-lg text-sm font-medium ring-1">Все ответы</li>
      <li @click="onFetch('resolve', true)"
          :class="[activeTab === 'resolve' ? 'bg-green-100 text-green-500 ring-green-200' : 'bg-gray-100 ring-gray-200']"
          class="py-2 px-3 cursor-pointer rounded-lg text-sm font-medium flex items-center space-x-2 ring-1">
        <Check class="w-4 h-4 text-green-500" />
        <span>Решения</span>
      </li>
      <li @click="onFetch('likes', true)"
          :class="[activeTab === 'likes' ? 'bg-green-100 text-green-500 ring-green-200' : 'bg-gray-100 ring-gray-200']"
          class="py-2 px-3 cursor-pointer rounded-lg text-sm font-medium ring-1">Лучшие ответы</li>
    </ul>

    <div v-if="answers.data.length" class="space-y-4 mt-6">
      <AnswerCard
          v-for="answer in answers.data"
          :key="answer.id"
          :entry="answer"
          @unpinned="onUnpin(answer.id)" />
    </div>
  </TheLayout>
</template>

<script setup>
import AnswerCard from '~/components/modules/questions/components/AnswerCard.vue'
import AnswerForm from '~/components/modules/questions/components/AnswerForm.vue'
import TheLayout from '~/components/layout/TheLayout'
import { Check } from 'lucide-vue-next'
import { QUESTION_FIELDS, ANSWER_CARD } from '../graphql';
import { useRoute, useHead } from 'nuxt/app'
import { shallowRef } from 'vue'

const route = useRoute()
const question = shallowRef({})
const answers = shallowRef([])
const activeTab = shallowRef('new')

const onFetch = async (tab = 'new', skipQuestion = false) => {
  let query = []

  if (skipQuestion === false) {
    query.push(`
      question(id: $id) {
        ${QUESTION_FIELDS}
      }
    `)
  }

  if (tab === 'new') {
    query.push(`
      questionAnswers(questionId: $id) {
        data {
          ${ANSWER_CARD}
        }
      }
    `)
  } else if (tab === 'resolve') {
    query.push(`
      questionAnswers(questionId: $id, only_pinned: true) {
        data {
          ${ANSWER_CARD}
        }
      }
    `)
  } else if (tab === 'likes') {
    query.push(`
      questionAnswers(questionId: $id, order_by: "likes") {
        data {
          ${ANSWER_CARD}
        }
      }
    `)
  }

  const { data } = await useQuery({
    query: `
      query($id: Int!) {
        ${query.join('\n')}
      }
  `,
    variables: {
      id: parseInt(route.params.questionId)
    }
  })

  activeTab.value = tab

  if (data.question) {
    question.value = data.question
  }

  answers.value = data.questionAnswers
}

try {
  await onFetch()

  useHead({
    title: `${question.value.title} - Вопросы и ответы`,
    description: question.value.text
  })
} catch (error) {}

const onUnpin = (answerId) => {
  if (activeTab.value === 'resolve') {
    answers.value.data.forEach((pinnedAnswer, index) => {
      if (parseInt(pinnedAnswer.id) === parseInt(answerId)) {
        answers.value.data.splice(index, 1)
      }
    })
  }
}
</script>