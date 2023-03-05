<template>
  <NuxtLayout :heading="`${isEdit ? 'Редактирование' : 'Создание'} заметки`">
    <template #sidebar>
      1
    </template>
    <TheForm @submit="onSubmit" @draft="form.is_draft = true" :is-edit="isEdit">
      <FormField name="input.title" label="Заголовок" required v-slot="{ hasError }">
        <Input v-model="form.title" placeholder="Введите заголовок" :variant="hasError ? 'danger' : undefined" />
      </FormField>

      <FormField name="input.text" label="Текст" required v-slot="{ hasError }">
        <TipTap v-model="form.text" :variant="hasError ? 'danger' : undefined" model-type="notes" @error="onEror" v-model:cover-id="form.cover_id" />
      </FormField>

      <FormField name="input.place_id" label="Место" v-slot="{ hasError }">
        <SearchPlace :model-value="form.place" @update:modelValue="form.place_id = $event.id" />
      </FormField>

      <FormField name="input.tags" label="Теги" id="tags">
        <InputCustomTags v-model="form.tags" :set-errors="setErrors" />
      </FormField>

      <FormField v-if="data.travels.length" name="input.travel_id" label="Хотите добавить в путешествие?" id="travel">
        <TravelListField v-model="form.travel_id" :travels="data.travels" />
      </FormField>
    </TheForm>
  </NuxtLayout>
</template>

<script setup>

import TheForm from '~/components/TheForm'
import pick from 'lodash.pick'
import { CREATE_NOTE, UPDATE_NOTE, NOTE_FORM } from '../graphql'
import { InputCustomTags } from '~/components/wrappers'
import { ref } from 'vue'
import { useForm } from 'vee-validate';
import { definePageMeta, useRoute, useRouter, useNuxtApp } from '#imports'
import TravelListField from '~/components/modules/travels/components/TravelListField.vue'
import { useQuery, TipTap } from '@trevio/ui'

definePageMeta({
  middleware: 'auth'
})

const route = useRoute()

const form = ref({
  place_id: null,
  travel_id: null,
  cover_id: null,
  title: '',
  place: {
    id: null,
    name: ''
  },
  is_draft: false,
  text: '',
  tags: [],
})

const { handleSubmit, setErrors } = useForm()
const noteId = parseInt(route.params.noteId)
const isEdit = noteId > 0
const danger = ref(false)
const loading = ref(false)

const app = useNuxtApp()

const { data } = await useQuery({
  query: `
    query(${isEdit ? '$id: ID!, ' : ''}$user_id: ID) {
      ${isEdit ? `note(id: $id) { ${NOTE_FORM} }` : ''}
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
    id: noteId,
    user_id: app.$auth.user.id
  }
})

if (isEdit) {
  Object.assign(form.value, data.note)
}

const onEror = (e) => setErrors(e)

const onSubmit = handleSubmit(async () => {
  if (loading.value) {
    return
  }

  loading.value = true

  const input = pick(form.value, [
    'place_id',
    'travel_id',
    'cover_id',
    'title',
    'text',
    'tags',
    'is_draft',
  ])

  input.tags = input.tags.map(tag => parseInt(tag.id))

  try {
    const { data } = await useQuery({
      query: isEdit ? UPDATE_NOTE : CREATE_NOTE,
      variables: {
        input,
        id: noteId
      }
    })

    if (data.noteForm > 0) {
      await useRouter().push({name: 'notes.show', params: {noteId: data.noteForm }})
    }
  } catch (error) {
    if (error?.extensions?.validation) {
      setErrors(error.extensions.validation)
    }
  } finally {
    loading.value = false
  }
})
</script>