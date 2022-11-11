<template>
  <TheLayout :heading="`${isEdit ? 'Редактирование' : 'Создание'} вопроса`">
    <template #sidebar>
      123
    </template>
    <form @submit.prevent="onSubmit" class="min-h-full flex flex-col justify-between bg-white p-4 rounded-md shadow ring-1 ring-slate-200">
      <div class="flex flex-col space-y-4">
        <FormField name="input.title" label="Вопрос" required  v-slot="{ hasError }">
          <Input v-model="form.title" placeholder="Введите вопрос" />
        </FormField>

        <FormField name="input.text" label="Детали вопроса">
          <TipTap content-type="questions" v-model="form.text" />
        </FormField>

        <FormField name="input.place_id" label="Место" v-slot="{ hasError }">
          <SearchPlace :model-value="form.place" @update:modelValue="form.place_id = $event.id" />
        </FormField>

        <FormField name="input.tags" label="Теги" id="tags">
          <InputTags v-model="form.tags" />
        </FormField>

        <FormField v-if="data.travels.length" name="input.travel_id" label="Путешествие" id="travel">
          <Select :model-value="form.travel_id" @update:modelValue="form.travel_id = $event.id" :items="data.travels" key-name="title" />
        </FormField>
      </div>

      <footer class="mt-8">
        <hr class="mb-4 -mx-4 border-gray-200">

        <div class="flex space-x-2">
          <VButton type="submit">{{ isEdit ? 'Сохранить' : 'Создать' }}</VButton>
          <VButton @click="form.is_draft = true" type="submit" variant="secondary">Сохранить в черновик</VButton>
        </div>
      </footer>
    </form>
  </TheLayout>
</template>

<script setup>
import '@/node_modules/@trevio/tiptap/dist/style.css'
import TheLayout from '~/components/layout/TheLayout'
import pick from 'lodash.pick'
import { CREATE_QUESTION, UPDATE_QUESTION, QUESTION_FORM } from '../graphql'
import { FormField, Input, Select, VButton, SearchPlace } from '@trevio/ui';
import { InputTags } from '~/components/wrappers'
import { TipTap } from '@trevio/tiptap'
import { ref } from 'vue'
import { useForm } from 'vee-validate';
import { useGql } from '~/uses'
import { useRoute, useRouter, useNuxtApp } from 'nuxt/app'

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

const app = useNuxtApp()

const { data } = await useGql(`
    query(${isEdit ? '$id: Int!, ' : ''}$userId: ID) {
      ${isEdit ? `question(id: $id) { ${QUESTION_FORM} }` : ''}
      travels(userId: $userId) {
        id
        title(words: 6)
      }
    }
  `, {
  id: questionId,
  userId: app.$auth.user.id
})

if (isEdit) {
  Object.assign(form.value, data.question)
}

const onSubmit = handleSubmit(async () => {
  if (loading.value) {
    return
  }

  loading.value = true

  const input = pick(form.value, [
    'place_id',
    'travel_id',
    'title',
    'text',
    'tags',
  ])

  input.tags = input.tags.map(tag => parseInt(tag.id))

  try {
    const { data: { questionForm }} = await useGql(isEdit ? UPDATE_QUESTION : CREATE_QUESTION, {
      input,
      id: questionId
    })

    if (questionForm > 0) {
      await useRouter().push({name: 'questions.show', params: {questionId: questionForm}})
    }
  } catch (error) {
    setErrors(error[0]['extensions']['validation'])
  } finally {
    loading.value = false
  }
})
</script>