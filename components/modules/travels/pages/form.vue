<template>
  <NuxtLayout :heading="`${isEdit ? 'Редактирование' : 'Создание'} путешествия`">
    <TheForm @submit="onSubmit" @draft="form.is_draft = true" :is-edit="isEdit">
      <div class="grid grid-cols-2 gap-6">
        <FormField name="input.images" label="Обложка">
          <TravelUpload v-model="form.cover" />
        </FormField>

        <div class="space-y-6">
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

          <div class="flex items-center gap-4">
            <div class="flex items-center gap-4 flex-auto">
              <FormField name="input.budget" label="Бюджет путешествия" id="budget" class="flex-auto">
                <Input v-model="form.budget" type="number" id="budget" placeholder="Бюджет путешествия" />
              </FormField>
              <Dropdown class="mt-6">
                <Button>
                  <div class="truncate w-[100px]">{{ getCurrency }}</div>
                  <template #append>
                    <ChevronDown class="w-5 h-5 text-white" />
                  </template>
                </Button>
                <template v-slot:popper="{ hide }">
                  <DropdownItem v-for="currency in currencies" :key="currency.id" :value="currency.id" @click="form.currency_id = currency.id; hide()">
                    {{ currency.name }}
                  </DropdownItem>
                </template>
              </Dropdown>
            </div>
          </div>
        </div>
      </div>
    </TheForm>
    {{ form.date_start }}
  </NuxtLayout>
</template>

<script setup>
import '@vuepic/vue-datepicker/dist/main.css'
import Datepicker from '@vuepic/vue-datepicker';
import TheForm from '~/components/TheForm'
import TravelUpload from '../components/TravelUpload'
import pick from 'lodash.pick'
import { ChevronDown } from 'lucide-vue-next'
import { InputCustomTags } from '~/components/wrappers'
import { ref, computed } from 'vue'
import { useForm } from 'vee-validate';
import { useRoute, useRouter } from '#imports'
import { TRAVEL_FORM, CREATE_TRAVEL, UPDATE_TRAVEL } from '../graphql';
import { definePageMeta, useQuery } from '#imports'
import { format, parseISO, isValid } from 'date-fns'

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
  images: []
})

const route = useRoute()
const { handleSubmit } = useForm()
const isEdit = route.params.travelId > 0
const searchBy = ['countries']
const danger = ref(false)
const loading = ref(false)
const currencies = ref([])

if (isEdit) {
  const { data } = await useQuery2({
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

  currencies.value = data.currencies

  Object.assign(form.value, data.travel)

  if (isValid(form.value.date_start)) {
    form.value.date_start = parseISO(form.value.date_start)
  } else {
    form.value.date_start = ''
  }

  if (isValid(form.value.date_end)) {
    form.value.date_end = parseISO(form.value.date_end)
  } else {
    form.value.date_end = ''
  }
} else {
  const { data } = await useQuery2({
    query: `
      query {
        currencies {
          id
          name
        }
      }
    `
  })
  currencies.value = data.currencies
}

const onDateChange = (dates) => {
  form.value.date_start = dates[0]
  form.value.date_end = dates[1]
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

  input.tags = input.tags.map(tag => tag.id)
  input.images = input.images.map(image => image.id)

  try {
    const {data: { travelForm }} = await useQuery2({
      query: isEdit ? UPDATE_TRAVEL : CREATE_TRAVEL,
      variables: {
        input,
        id: route.params.travelId
      }
    })

    if (travelForm > 0) {
      await useRouter().push({name: 'travels.show', params: {travelId: travelForm}})
    }
  } catch (error) {
    if (error['extensions']['validation']) {
      actions.setErrors(error['extensions']['validation'])
    }
  } finally {
    loading.value = false
  }
})

const getCurrency = computed(() => {
  if (form.value.currency_id > 0) {
    return currencies.value.filter((currency) => currency.id === form.value.currency_id)[0].name
  }

  return [] || currencies.value[0].name
})

const readableDateStartDateEnd = computed(() => {
  let date = ''

  if (form.value.date_start) {
    date += format(form.value.date_start, 'd.L.Y')
  }

  if (form.value.date_end) {
    date += ' - ' +  format(form.value.date_end, 'd.L.Y')
  }

  return date
})
</script>