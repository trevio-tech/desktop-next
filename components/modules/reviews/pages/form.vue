<template>
  <TheLayout :heading="`${isEdit ? 'Редактирование' : 'Создание'} отзыва`">
    <template #sidebar>
      123
    </template>
    <TheForm @submit="onSubmit" @draft="form.is_draft = true" :is-edit="isEdit">
      <FormField name="input.title" label="Заголовок" required v-slot="{ hasError }">
        <Input v-model="form.title" placeholder="Введите заголовок" :variant="hasError ? 'danger' : undefined" />
      </FormField>

      <FormField name="input.place_id" label="Место" required v-slot="{ hasError }">
        <SearchPlace :model-value="form.place" @update:modelValue="form.place_id = $event.id" :variant="hasError ? 'danger' : undefined" />
      </FormField>

      <FormField name="input.text" required label="Текст">
        <TipTap model-type="reviews" v-model="form.text" />
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
  </TheLayout>
</template>

<script setup>
import TheForm from '~/components/TheForm'
import TheLayout from '~/components/layout/TheLayout'
import pick from 'lodash.pick'
import { CREATE_REVIEW, UPDATE_REVIEW, REVIEW_FORM } from '../graphql'
import { InputCustomTags } from '~/components/wrappers'
import { definePageMeta } from '#imports'
import { ref } from 'vue'
import { useForm } from 'vee-validate';
import { useRoute, useRouter, useNuxtApp } from 'nuxt/app'
import TravelListField from '~/components/modules/travels/components/TravelListField.vue'

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
const travels = ref([])

const app = useNuxtApp()

try {
  const { data } = await useQuery({
    query: `
      query(${isEdit ? '$id: Int!, ' : ''}$userId: ID) {
        ${isEdit ? `review(id: $id) { ${REVIEW_FORM} }` : ''}
        travels(userId: $userId) {
          id
          title(words: 10)
          cover(sizes: "default@resize:fill:240:160") {
            id
            model_id
            url
            sizes
          }
        }
      }
    `,
    variables: {
      id: reviewId,
      userId: app.$auth.user.id
    }
  })

  travels.value = data.travels

  if (isEdit) {
    Object.assign(form.value, data.review)
  }
} catch (error) {
  console.log(error)
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
    const { data: { reviewForm }} = await useQuery({
      query: isEdit ? UPDATE_REVIEW : CREATE_REVIEW,
      variables: {
        input,
        id: reviewId
      }
    })

    if (reviewForm > 0) {
      await useRouter().push({name: 'reviews.show', params: {reviewId: reviewForm}})
    }
  } catch (error) {
    if (error['message'] === 'validation') {
      setErrors(error['extensions']['validation'])
    }
  } finally {
    loading.value = false
  }
})
</script>