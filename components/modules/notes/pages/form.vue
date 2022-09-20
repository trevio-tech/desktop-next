<template>
  <TheLayout :heading="`${isEdit ? 'Редактирование' : 'Создание'} заметки`">
    <form @submit.prevent="onSubmit" class="bg-white p-6 rounded-md shadow ring-1 ring-slate-200">
        <div class="space-y-6">
          <FormField name="input.title" label="Заголовок" required  v-slot="{ hasError }">
            <Input v-model="form.title" placeholder="Введите заголовок путешествия" />
          </FormField>

          <FormField name="input.text" label="Анонс">
            <Textarea v-model="form.text" rows="3" placeholder="Краткое описание" />
          </FormField>

          <FormField name="input.place_id" label="Место" required  v-slot="{ hasError }">
            <SearchPlace v-model="form.place" @update:modelValue="form.place_id = $event.id" />
          </FormField>

          <FormField name="input.tags" label="Теги" id="tags">
            <InputTags v-model="form.tags" />
          </FormField>
        </div>

      <div class="mt-10">
        <VButton type="submit">{{ isEdit ? 'Сохранить' : 'Создать' }} путешествие</VButton>
      </div>
    </form>
  </TheLayout>
</template>

<script setup>
import TheLayout from '~/components/layout/TheLayout'
import pick from 'lodash.pick'
import { FormField, Textarea, Input, VButton, SearchPlace } from '@trevio/ui';
import {TRAVEL_FORM, CREATE_TRAVEL, UPDATE_TRAVEL} from '../../travels/graphql';
import { ref } from 'vue'
import { useForm } from 'vee-validate';
import { useGql } from '~/uses'
import { useRoute, useRouter } from 'nuxt/app'
import { InputTags } from '~/components/wrappers'

definePageMeta({
  middleware: 'auth'
})

const form = ref({
  place_id: null,
  currency_id: null,
  title: '',
  budget: 0,
  date_start: '',
  date_end: '',
  place: {
    id: null,
    name: ''
  },
  text: '',
  tags: [],
  images: []
})

const route = useRoute()
const { handleSubmit } = useForm()
const isEdit = route.params.noteId > 0
const danger = ref(false)
const loading = ref(false)
const currencies = ref([])

if (isEdit) {
  const { data } = await useGql(`
    query($id: Int!) {
      ${TRAVEL_FORM}
      currencies {
        id
        name
      }
    }
  `, {
    id: parseInt(route.params.travelId)
  })

  currencies.value = data.currencies
  Object.assign(form.value, data.travel)
} else {
  const { data } = await useGql(`
    query {
      currencies {
        id
        name
      }
    }
  `)
  currencies.value = data.currencies
}

const onSubmit = handleSubmit(async (values, actions) => {
  if (loading.value) {
    return
  }

  loading.value = true

  const input = pick(form.value, [
    'title',
    'currency_id',
    'place_id',
    'budget',
    'text',
    'tags',
    'images',
    'date_start',
    'date_end',
  ])

  input.tags = input.tags.map(tag => parseInt(tag.id))
  input.images = input.images.map(image => parseInt(image.id))

  try {
    const {data: { travelForm }} = await useGql(isEdit ? UPDATE_TRAVEL : CREATE_TRAVEL, {
      input,
      id: parseInt(route.params.travelId)
    })

    if (travelForm > 0) {
      await useRouter().push({name: 'travels.show', params: {travelId: travelForm}})
    }
  } catch (error) {
    actions.setErrors(error[0]['extensions']['validation']);
  } finally {
    loading.value = false
  }
})
</script>