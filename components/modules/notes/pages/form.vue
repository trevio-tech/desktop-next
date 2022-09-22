<template>
  <TheLayout :heading="`${isEdit ? 'Редактирование' : 'Создание'} заметки`">
    <template #sidebar>
      123
    </template>
    <form @submit.prevent="onSubmit" class="bg-white p-4 rounded-md shadow ring-1 ring-slate-200">
        <div class="space-y-4">
          <FormField name="input.title" label="Заголовок" required  v-slot="{ hasError }">
            <Input v-model="form.title" placeholder="Введите заголовок" />
          </FormField>

          <FormField name="input.text" label="Текст">
            <TipTap content-type="notes" v-model="form.text" />
          </FormField>

          <FormField name="input.place_id" label="Место" v-slot="{ hasError }">
            <SearchPlace v-model="form.place" @update:modelValue="form.place_id = $event.id" />
          </FormField>

          <FormField name="input.tags" label="Теги" id="tags">
            <InputTags v-model="form.tags" />
          </FormField>

          <FormField name="input.travel_id" label="Путешествие" id="travel">
            <select v-model="form.travel_id" class="input input-default">
              <option v-for="travel in data.travels" :key="travel.id" :value="travel.id">{{ travel.title }}</option>
            </select>
          </FormField>
        </div>

      <hr class="mt-8 mb-4 -mx-4 border-gray-200">

      <div class="flex space-x-2">
        <VButton type="submit">{{ isEdit ? 'Сохранить' : 'Создать' }}</VButton>
        <VButton @click="form.is_draft = true" type="submit" variant="secondary">Сохранить в черновик</VButton>
      </div>
    </form>
  </TheLayout>
</template>

<script setup>
import '@/node_modules/@trevio/tiptap/dist/style.css'
import TheLayout from '~/components/layout/TheLayout'
import pick from 'lodash.pick'
import { CREATE_NOTE, UPDATE_NOTE, NOTE_FORM } from '../graphql'
import { FormField, Input, VButton, SearchPlace } from '@trevio/ui';
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
const noteId = parseInt(route.params.noteId)
const isEdit = noteId > 0
const danger = ref(false)
const loading = ref(false)

const app = useNuxtApp()

const { data } = await useGql(`
    query(${isEdit ? '$id: Int!, ' : ''}$userId: ID) {
      ${isEdit ? `note(id: $id) { ${NOTE_FORM} }` : ''}
      travels(userId: $userId) {
        id
        title(words: 6)
      }
    }
  `, {
  id: noteId,
  userId: app.$auth.user.id
})

if (isEdit) {
  Object.assign(form.value, data.note)
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
    const { data: { noteForm }} = await useGql(isEdit ? UPDATE_NOTE : CREATE_NOTE, {
      input,
      id: noteId
    })

    if (noteForm > 0) {
      await useRouter().push({name: 'notes.show', params: {noteId: noteForm}})
    }
  } catch (error) {
    setErrors(error[0]['extensions']['validation'])
  } finally {
    loading.value = false
  }
})
</script>