<template>
  <TheLayout :heading="`${isEdit ? 'Редактирование' : 'Создание'} путешествия`">
    <template #sidebar>1</template>

    <form @submit.prevent="onSubmit" class="space-y-4 bg-white p-4 rounded-md shadow ring-1 ring-slate-200">
      <FormField name="input.title" label="Заголовок путешествия" help="Вспомогательный текст" required  v-slot="{ hasError }">
        <VInput v-model="form.title" :variant="hasError ? 'danger' : 'default'" placeholder="Введите заголовок путешествия" />
      </FormField>

      <FormField name="input.place_id" label="Страна" required  v-slot="{ hasError }">
        <SearchPlace v-model="form.place" :search-by="searchBy" @update:modelValue="form.place_id = $event.id" />
      </FormField>

      <div class="flex items-center gap-4">

        <div class="flex items-center gap-4 flex-auto">
          <VField label="Бюджет путешествия" id="budget" class="flex-auto">
            <VInput v-model="form.budget" type="number" id="budget" placeholder="Укажите бюджет путешествия" />
          </VField>
          <div class="flex items-center gap-4 mt-7">
            <CurrencyDollarIcon class="w-10 h-10" />
            <CurrencyEuroIcon class="w-10 h-10" />
            <CurrencyRupeeIcon class="w-10 h-10" />
          </div>
        </div>
      </div>

      <VField label="Теги" id="tags">
        <VInputTags v-model="form.tags" />
      </VField>


      <VField label="Дата начала и завершения" id="date">
        <Datepicker v-model="form.date" range multiCalendars inline :enableTimePicker="false" autoApply />
      </VField>
<!--

      <div class="flex items-center gap-4">
        <VField label="Дача начала" id="date-start" class="flex-auto">
          <VInput v-model="form.date_start" type="date" id="date-start" placeholder="Выберите дату начала" />
        </VField>
        <VField label="Дата завершения" id="date-end" class="flex-auto">
          <VInput v-model="form.date_end" type="date" id="date-end" placeholder="Выберите дату завершения" />
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
import { VField, VInput, VButton, VInputTags, SearchPlace } from 'ui';
import { ref } from 'vue'
import { useGql } from '~/uses'
import { useRoute } from 'nuxt/app'
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import { CurrencyDollarIcon, CurrencyEuroIcon, CurrencyRupeeIcon } from '@heroicons/vue/24/solid'
import { useForm } from 'vee-validate';
const { handleSubmit, errors } = useForm();
import pick from 'lodash.pick'
import FormField from '~/components/FormField'

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

if (isEdit) {
  const {data: { travel }} = await useGql(`
  query($id: Int!) {
    ${TRAVEL}
  }
`, {
    id: parseInt(route.params.travelId)
  })
}

const items = ref([])
const callback = async (event) => {
  await fetch('https://dummyjson.com/todos')
      .then((response) => response.json())
      .then((json) => {
        items.value = json.todos

        if (event.target.value.length > 0) {
          items.value.unshift({
            id: null,
            todo: event.target.value
          })
        }
      });
}

const onSubmit = handleSubmit(async (values, actions) => {
  if (loading.value) {
    return
  }

  loading.value = true

  try {
    const {data: { travelForm }} = await useGql(CREATE_TRAVEL, {
      input: pick(form.value, ['title', 'place_id', 'budget'])
    })
  } catch (error) {
    actions.setErrors(error[0]['extensions']['validation']);
  } finally {
    loading.value = false
  }
})
</script>