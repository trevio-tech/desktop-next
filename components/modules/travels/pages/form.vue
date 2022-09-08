<template>
  <TheLayout :heading="`${isEdit ? 'Редактирование' : 'Создание'} путешествия`">
    <template #sidebar>1</template>

    <form @submit.prevent="onSubmit" class="space-y-4 bg-white p-4 rounded-md shadow ring-1 ring-slate-200">
      <FormField name="input.title" label="Заголовок путешествия" required  v-slot="{ hasError }">
        <Input v-model="form.title" placeholder="Введите заголовок путешествия" />
        {{ hasError }}
      </FormField>

      <FormField name="input.place_id" label="Страна" required  v-slot="{ hasError }">
        <SearchPlace v-model="form.place" :search-by="searchBy" @update:modelValue="form.place_id = $event.id" />
      </FormField>

      <FormField name="input.text" label="Анонс">
        <Textarea v-model="form.text" rows="3" placeholder="Краткое описание путешествия" />
      </FormField>

      <Upload model-type="travels" :fields="['id', 'path']" @uploaded="onUploaded" />

      <div class="flex items-center gap-4">

        <div class="flex items-center gap-4 flex-auto">
          <FormField name="input.budget" label="Бюджет путешествия" id="budget" class="flex-auto">
            <Input v-model="form.budget" type="number" id="budget" placeholder="Укажите бюджет путешествия" number />
          </FormField>
          <div class="flex items-center gap-4 mt-7">
            <CurrencyDollarIcon class="w-10 h-10" />
            <CurrencyEuroIcon class="w-10 h-10" />
            <CurrencyRupeeIcon class="w-10 h-10" />
          </div>
        </div>
      </div>

      <FormField name="input.tags" label="Теги" id="tags">
        <InputTags v-model="form.tags" />
      </FormField>


      <FormField name="input.date_start" label="Дата начала и завершения" id="date">
        <Datepicker v-model="form.date" range multiCalendars inline :enableTimePicker="false" autoApply />
      </FormField>
<!--

      <div class="flex items-center gap-4">
        <VField label="Дача начала" id="date-start" class="flex-auto">
          <Input v-model="form.date_start" type="date" id="date-start" placeholder="Выберите дату начала" />
        </VField>
        <VField label="Дата завершения" id="date-end" class="flex-auto">
          <Input v-model="form.date_end" type="date" id="date-end" placeholder="Выберите дату завершения" />
        </VField>
      </div>
-->

      <div>
        <VButton type="submit">{{ isEdit ? 'Сохранить' : 'Создать' }} путешествие</VButton>
      </div>
    </form>
  </TheLayout>
</template>

<script setup>
import TheLayout from '~/components/layout/TheLayout'
import { TRAVEL, CREATE_TRAVEL } from '../graphql';
import { FormField, Textarea, Input, VButton, InputTags, SearchPlace } from 'ui';
import { ref } from 'vue'
import { useGql } from '~/uses'
import { useRoute } from 'nuxt/app'
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import { CurrencyDollarIcon, CurrencyEuroIcon, CurrencyRupeeIcon } from '@heroicons/vue/24/solid'
import { useForm } from 'vee-validate';
import pick from 'lodash.pick'
import Upload from '~/components/Upload'

definePageMeta({
  middleware: 'auth'
})

const form = ref({
  place_id: null,
  title: '',
  date: [],
  budget: null,
  place: {
    id: null,
    name: ''
  },
  tags: []
})

const route = useRoute()
const isEdit = route.params.travelId > 0
const searchBy = ['countries']
const danger = ref(false)
const loading = ref(false)
const { handleSubmit } = useForm();

if (isEdit) {
  const {data: { travel }} = await useGql(`
  query($id: Int!) {
    ${TRAVEL}
  }
`, {
    id: parseInt(route.params.travelId)
  })
}

const onUploaded = (files) => {
  console.log(files)
}

const onSubmit = handleSubmit(async (values, actions) => {
  if (loading.value) {
    return
  }

  loading.value = true

  try {
    const {data: { travelForm }} = await useGql(CREATE_TRAVEL, {
      input: pick(form.value, ['title', 'place_id', 'budget', 'text'])
    })

    console.log(travelForm)
  } catch (error) {
    actions.setErrors(error[0]['extensions']['validation']);
  } finally {
    loading.value = false
  }
})
</script>