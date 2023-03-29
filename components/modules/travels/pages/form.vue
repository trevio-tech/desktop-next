<template>
  <NuxtLayout :heading="`${isEdit ? 'Редактирование' : 'Создание'} путешествия`">
    <template #sidebar>
      1
    </template>
    <TheForm @submit="onSubmit" :is-edit="isEdit">
      <FormField name="input.images">
        <TravelUpload v-model="form.cover" />
      </FormField>

      <div class="space-y-4">
        <FormField name="input.title" label="Заголовок" required v-slot="{ hasError }">
          <Input v-model="form.title" placeholder="Введите заголовок" :has-error="hasError" />
        </FormField>

        <FormField name="input.place_id" label="Страна" required v-slot="{ hasError }">
          <SearchPlace v-model="form.place" :search-by="searchBy" :has-error="hasError" @update:modelValue="form.place_id = $event.id" />
        </FormField>

        <FormField name="input.text" label="Анонс" v-slot="{ hasError }">
          <Textarea v-model="form.text" rows="3" placeholder="Краткое описание" :has-error="hasError" />
        </FormField>

        <FormField name="input.tags" label="Теги" id="tags" v-slot="{ hasError }">
          <InputCustomTags v-model="form.tags" />
        </FormField>

        <FormField name="input.date_start" label="Дата начала и завершения" id="date" v-slot="{ hasError }">
          <Datepicker
            :model-value="[form.date_start, form.date_end]"
            :enable-time-picker="false"
            range
            multi-calendars
            multi-calendars-solo
            position="right"
            auto-apply
            @update:modelValue="onDateChange"
          >
            <template #trigger>
              <Input :model-value="readableDateStartDateEnd" placeholder="Дата начала и завершения" :has-error="hasError" />
            </template>
          </Datepicker>
        </FormField>

        <div class="gap-4">
          <FormField name="input.budget" label="Бюджет путешествия" id="budget">
            <Input v-model="form.budget" type="number" id="budget" placeholder="Бюджет путешествия" />
          </FormField>

          <div class="space-y-1 mt-2">
            <div v-for="currency in currencies" :key="currency.id">
              <label :for="`currency-${currency.id}`" class="flex items-center space-x-1">
                <input v-model="form.currency_id" :value="currency.id" type="radio" name="currency" :id="`currency-${currency.id}`" />
                <span class="text-sm">{{ currency.name }}</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </TheForm>
  </NuxtLayout>
</template>

<script setup>
import '@vuepic/vue-datepicker/dist/main.css'
import Datepicker from '@vuepic/vue-datepicker';
import TheForm from '~/components/TheForm'
import TravelUpload from '../components/TravelUpload'
import pick from 'lodash.pick'
import { InputCustomTags } from '~/components/wrappers'
import { TRAVEL_FORM, CREATE_TRAVEL, UPDATE_TRAVEL } from '../graphql'
import { format, parseISO, isValid } from 'date-fns'
import { ref, computed } from 'vue'
import { useForm } from 'vee-validate';
import { usePageQuery, SearchPlace, Input } from '@trevio/ui'
import { useRoute, useRouter, definePageMeta } from '#imports'

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
  is_draft: false,
  place: {
    id: null,
    name: ''
  },
  text: '',
  tags: [],
  cover: {}
})

const route = useRoute()
const { setErrors } = useForm()
const isEdit = route.params.travelId > 0
const searchBy = ['countries']
const danger = ref(false)
const loading = ref(false)

const currencies = ref([{
  id: null,
  name: 'Другая валюта',
}])

if (isEdit) {
  const { data } = await usePageQuery({
    query: `
      query($travel_id: ID!) {
        travel(id: $travel_id) {
          ${TRAVEL_FORM}
        }
        currencies {
          id
          name
        }
      }
    `,
    variables: {
      travel_id: route.params.travelId
    }
  })

  data.currencies.forEach((currency) => {
    currencies.value.push(currency)
  })

  Object.assign(form.value, data.travel)

  if (!isValid(form.value.date_start)) {
    form.value.date_start = parseISO(form.value.date_start)
  }

  if (!isValid(form.value.date_end)) {
    form.value.date_end = parseISO(form.value.date_end)
  }
} else {
  const { data } = await usePageQuery({
    query: `
      query {
        currencies {
          id
          name
        }
      }
    `
  })

  data.currencies.forEach((currency) => {
    currencies.value.push(currency)
  })
}

const onDateChange = (dates) => {
  form.value.date_start = dates[0]
  form.value.date_end = dates[1]
}

const onSubmit = async (isDraft) => {
  form.value.is_draft = isDraft

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
    'date_start',
    'date_end',
    'tags',
    'is_draft',
  ])

  input.tags = input.tags.map(tag => tag.id)
  input.images = [form.value.cover.id]

  try {
    const {data: { travelForm }} = await usePageQuery({
      query: isEdit ? UPDATE_TRAVEL : CREATE_TRAVEL,
      variables: {
        input,
        id: route.params.travelId
      }
    })

    if (travelForm > 0) {
      await useRouter().push({name: 'travels.show', params: {travelId: travelForm}})
    }
  } catch (errors) {
    if (errors[0]?.extensions?.validation) {
      setErrors(errors[0].extensions.validation)
    }
  } finally {
    loading.value = false
  }
}

const readableDateStartDateEnd = computed(() => {
  let date = ''

  if (form.value.date_start) {
    date += format(form.value.date_start, 'dd.LL.Y')
  }

  if (form.value.date_end) {
    date += ' - ' +  format(form.value.date_end, 'dd.LL.Y')
  }

  return date
})
</script>