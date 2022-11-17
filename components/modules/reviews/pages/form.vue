<template>
  <TheLayout :heading="`${isEdit ? 'Редактирование' : 'Создание'} отзыва`">
    <template #sidebar>
      123
    </template>
    <TheForm @submit="onSubmit" @draft="form.is_draft = true" :is-edit="isEdit">
          <FormField name="input.title" label="Заголовок" required  v-slot="{ hasError }">
            <Input v-model="form.title" placeholder="Введите заголовок" />
          </FormField>

          <FormField name="input.place_id" label="Место" required v-slot="{ hasError }">
            <SearchPlace :model-value="form.place" @update:modelValue="form.place_id = $event.id" />
          </FormField>

          <FormField name="input.text" required label="Текст">
            <TipTap content-type="notes" v-model="form.text" />
          </FormField>

          <FormField name="input.stars" required label="Оценка">
            <Rating v-model="form.stars" />
          </FormField>

          <FormField name="input.tags" label="Теги" id="tags">
            <InputTags v-model="form.tags" />
          </FormField>

          <FormField v-if="data.travels.length" name="input.travel_id" label="Путешествие" id="travel">
            <Select v-model="form.travel_id" :items="data.travels" key-name="title" />
          </FormField>
    </TheForm>
  </TheLayout>
</template>

<script setup>
import TheLayout from '~/components/layout/TheLayout'
import pick from 'lodash.pick'
import { CREATE_REVIEW, UPDATE_REVIEW, REVIEW_FORM } from '../graphql'
import { FormField, Rating, Select, Input, SearchPlace } from '@trevio/ui';
import TheForm from '~/components/TheForm'
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
  stars: 0,
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
const reviewId = parseInt(route.params.reviewId)
const isEdit = reviewId > 0
const danger = ref(false)
const loading = ref(false)

const app = useNuxtApp()

const { data } = await useGql(`
    query(${isEdit ? '$id: Int!, ' : ''}$userId: ID) {
      ${isEdit ? `review(id: $id) { ${REVIEW_FORM} }` : ''}
      travels(userId: $userId) {
        id
        title(words: 6)
      }
    }
  `, {
  id: reviewId,
  userId: app.$auth.user.id
})

if (isEdit) {
  Object.assign(form.value, data.review)
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
    'is_draft',
    'stars'
  ])

  input.tags = input.tags.map(tag => parseInt(tag.id))

  try {
    const { data: { reviewForm }} = await useGql(isEdit ? UPDATE_REVIEW : CREATE_REVIEW, {
      input,
      id: reviewId
    })

    if (reviewForm > 0) {
      await useRouter().push({name: 'reviews.show', params: {reviewId: reviewForm}})
    }
  } catch (error) {
    if (error[0]['message'] === 'validation') {
      setErrors(error[0]['extensions']['validation'])
    }
  } finally {
    loading.value = false
  }
})
</script>