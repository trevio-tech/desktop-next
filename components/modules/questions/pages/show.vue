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
  </TheLayout>
</template>

<script setup>
import { useRoute } from 'nuxt/app'
import { useAsyncGql } from '~/uses'
import TheLayout from '~/components/layout/TheLayout'
import { QUESTION_FIELDS } from '../graphql';

const route = useRoute()

const { data: { value: { question }}} = await useAsyncGql(`
  query($id: Int!) {
    question(id: $id) {
    ${QUESTION_FIELDS}
    }
  }
`, {
  id: parseInt(route.params.questionId)
})
</script>