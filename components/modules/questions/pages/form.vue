<template>
  <NuxtLayout :heading="`${isEdit ? 'Редактирование' : 'Создание'} вопроса`">
    <template #sidebar>
      123
    </template>
    <TheForm @submit="onSubmit" :is-edit="isEdit">
      <FormField name="input.title" label="Вопрос" required  v-slot="{ hasError }">
        <Input v-model="form.title" placeholder="Введите вопрос" :variant="hasError ? 'danger' : undefined" />
      </FormField>

      <FormField name="input.text" label="Детали вопроса">
        <TipTap model-type="questions" v-model="form.text" />
      </FormField>

      <FormField name="input.place_id" label="Место" v-slot="{ hasError }">
        <SearchPlace :model-value="form.place" @update:modelValue="form.place_id = $event.id" />
      </FormField>

      <FormField name="input.tags" label="Теги" id="tags">
        <InputCustomTags v-model="form.tags" />
      </FormField>

      <FormField v-if="data.travels.length" name="input.travel_id" label="Хотите добавить в путешествие?" id="travel">
        <TravelListField v-model="form.travel_id" :travels="data.travels" />
      </FormField>
    </TheForm>
  </NuxtLayout>
</template>

<script setup>

import TheForm from '~/components/TheForm'
import TravelListField from '~/components/modules/travels/components/TravelListField.vue'
import pick from 'lodash.pick'
import { CREATE_QUESTION, UPDATE_QUESTION, QUESTION_FORM } from '../graphql'
import { InputCustomTags } from '~/components/wrappers'
import { ref } from 'vue'
import { useForm } from 'vee-validate';
import { definePageMeta, useRoute, useRouter, useNuxtApp } from '#imports'
import { TipTap, usePageQuery, SearchPlace, Input, FormField } from '@trevio/ui'

definePageMeta({
  middleware: 'auth'
})

const form = ref({
  place_id: null,
  travel_id: null,
  title: '',
  place: {
    id: null,
    name: ''
  },
  is_draft: false,
  text: '',
  tags: [],
  images: []
})

const route = useRoute()
const { handleSubmit, setErrors } = useForm()
const questionId = parseInt(route.params.questionId)
const isEdit = questionId > 0
const danger = ref(false)
const loading = ref(false)

const { $auth } = useNuxtApp()

const { data } = await usePageQuery({
  query: `
    query(${isEdit ? '$id: ID!, ' : ''}$user_id: ID) {
      ${isEdit ? `question(id: $id) { ${QUESTION_FORM} }` : ''}
      travels(user_id: $user_id) {
        id
        title(words: 10)
        cover {
          id
          url
        }
      }
    }
  `,
  variables: {
    id: questionId,
    user_id: $auth.user.id
  }
})

if (isEdit) {
  Object.assign(form.value, data.question)
}

const onSubmit = async (isDraft = false) => {
  if (loading.value) {
    return
  }

  loading.value = true

  form.value.is_draft = isDraft

  const input = pick(form.value, [
    'place_id',
    'travel_id',
    'title',
    'text',
    'tags',
    'is_draft'
  ])

  input.tags = input.tags.map(tag => parseInt(tag.id))

  try {
    const { data: { questionForm }} = await usePageQuery({
      query: isEdit ? UPDATE_QUESTION : CREATE_QUESTION,
      variables: {
        input,
        id: questionId
      }
    })

    if (questionForm > 0) {
      await useRouter().push({name: 'questions.show', params: {questionId: questionForm}})
    }
  } catch (errors) {
    if (errors[0]?.extensions?.validation) {
      setErrors(errors[0].extensions.validation)
    }
  } finally {
    loading.value = false
  }
}
</script>