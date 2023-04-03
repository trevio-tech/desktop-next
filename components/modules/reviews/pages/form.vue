<template>
  <NuxtLayout :heading="`${isEdit ? 'Редактирование' : 'Создание'} отзыва`">
    <template #sidebar>
      123
    </template>
    <TheForm @submit="onSubmit" :is-edit="isEdit">
      <FormField name="input.title" label="Заголовок" required v-slot="{ hasError }">
        <Input v-model="form.title" placeholder="Введите заголовок" :variant="hasError ? 'danger' : undefined" />
      </FormField>

      <FormField name="input.place_id" label="Место" required v-slot="{ hasError }">
        <SearchPlace :model-value="form.place" @update:modelValue="form.place_id = $event.id" :variant="hasError ? 'danger' : undefined" />
      </FormField>

      <FormField name="input.text" required label="Текст">
        <TipTap model-type="reviews" v-model="form.text" v-model:cover-id="form.cover_id" />
      </FormField>

      <FormField name="input.stars" required label="Оценка">
        <Rating v-model="form.stars" />
      </FormField>

      <FormField name="input.tags" label="Теги" id="tags">
        <InputCustomTags v-model="form.tags" />
      </FormField>

      <FormField v-if="travels.length" name="input.travel_id" label="Хотите добавить в путешествие?" id="travel">
        <TravelListField v-model="form.travel_id" :travels="travels" />
      </FormField>
    </TheForm>
  </NuxtLayout>
</template>

<script setup>
import TheForm from '~/components/TheForm'

import pick from 'lodash.pick'
import { CREATE_REVIEW, UPDATE_REVIEW, REVIEW_FORM } from '../graphql'
import { InputCustomTags } from '~/components/wrappers'
import { ref } from 'vue'
import { useForm } from 'vee-validate';
import { definePageMeta, useRoute, useRouter, useNuxtApp } from '#imports'
import TravelListField from '~/components/modules/travels/components/TravelListField.vue'
import { TipTap, usePageQuery, SearchPlace, Input } from '@trevio/ui'

definePageMeta({
  middleware: 'auth'
})

const form = ref({
  cover_id: null,
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
const travels = ref([])

const app = useNuxtApp()

try {
  const { data } = await usePageQuery({
    query: `
      query(${isEdit ? '$id: ID!, ' : ''}$user_id: ID) {
        ${isEdit ? `review(id: $id) { ${REVIEW_FORM} }` : ''}
        travels(user_id: $user_id) {
          id
          title(words: 10)
          cover {
            id
            url(presets: "default@resize:fill:240:160")
          }
        }
      }
    `,
    variables: {
      id: reviewId,
      user_id: app.$auth.user.id
    }
  })

  travels.value = data.travels

  if (isEdit) {
    Object.assign(form.value, data.review)
  }
} catch (error) {
  console.log(error)
}

const onSubmit = async (isDraft = false) => {
  if (loading.value) {
    return
  }

  loading.value = true

  form.value.is_draft = isDraft

  const input = pick(form.value, [
    'cover_id',
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
    const { data: { reviewForm }} = await usePageQuery({
      query: isEdit ? UPDATE_REVIEW : CREATE_REVIEW,
      variables: {
        input,
        id: reviewId
      }
    })

    if (reviewForm > 0) {
      await useRouter().push({name: 'reviews.show', params: {reviewId: reviewForm}})
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