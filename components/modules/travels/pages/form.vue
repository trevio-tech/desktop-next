<template>
  <TheLayout :heading="`${isEdit ? 'Редактирование' : 'Создание'} путешествия`">
    <TheForm @submit="onSubmit" @draft="form.is_draft = true" :is-edit="isEdit">
      <div class="grid grid-cols-2 gap-6">
        <FormField name="input.images" label="Обложка">
          <TravelUpload v-model="form.images" />
        </FormField>

        <div class="space-y-6">
          <FormField name="input.title" label="Заголовок" required v-slot="{ hasError }">
            <Input v-model="form.title" placeholder="Введите заголовок" />
          </FormField>

          <FormField name="input.place_id" label="Страна" required  v-slot="{ hasError }">
            <SearchPlace v-model="form.place" :search-by="searchBy" @update:modelValue="form.place_id = $event.id" />
          </FormField>

          <FormField name="input.text" label="Анонс">
            <Textarea v-model="form.text" rows="3" placeholder="Краткое описание" />
          </FormField>

          <FormField name="input.tags" label="Теги" id="tags">
            <InputTags v-model="form.tags" />
          </FormField>

          <FormField name="input.date_start" label="Дата начала и завершения" id="date">
            <Datepicker
              :model-value="[form.date_start, form.date_end]"
              :enableTimePicker="false"
              range
              multiCalendars
              position="right"
              autoApply
              @update:modelValue="onDateChange"
            >
              <template #trigger>
                ---
                {{ form.date_start }}
                {{ form.date_end }}
              </template>
            </Datepicker>
          </FormField>

          <div class="flex items-center gap-4">
            <div class="flex items-center gap-4 flex-auto">
              <FormField name="input.budget" label="Бюджет путешествия" :help="getCurrency" id="budget" class="flex-auto">
                <Input v-model="form.budget" type="number" id="budget" placeholder="Бюджет путешествия" />
              </FormField>
              <Dropdown class="mt-1">
                <Button>
                  Валюта
                  <template #append>
                    <ChevronDownIcon class="w-5 h-5 text-white" />
                  </template>
                </Button>
                <template v-slot:popper="{ hide }">
                  <DropdownItem v-for="currency in currencies" :key="currency.id" :value="currency.id" v-model="content" @click="form.currency_id = currency.id; hide()">
                    {{ currency.name }}
                  </DropdownItem>
                </template>
              </Dropdown>
            </div>
          </div>
        </div>
      </div>
    </TheForm>
  </TheLayout>
</template>

<script setup>
import '@vuepic/vue-datepicker/dist/main.css'
import Datepicker from '@vuepic/vue-datepicker';
import TheForm from '~/components/TheForm'
import TheLayout from '~/components/layout/TheLayout'
import TravelUpload from '../components/TravelUpload'
import pick from 'lodash.pick'
import { ChevronDownIcon } from '@heroicons/vue/24/outline'
import { FormField, Textarea, Input, Button, SearchPlace, Dropdown, DropdownItem } from '@trevio/ui';
import { InputTags } from '~/components/wrappers'
import { ref, computed } from 'vue'
import { useForm } from 'vee-validate';
import { useQuery } from '#imports'
import { useRoute, useRouter } from 'nuxt/app'
import { TRAVEL_FORM, CREATE_TRAVEL, UPDATE_TRAVEL } from '../graphql';

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
  const { data } = await useQuery({
    query: `
      query($id: Int!) {
        ${TRAVEL_FORM}
        currencies {
          id
          name
        }
      }
    `,
    variables: {
      id: parseInt(route.params.travelId)
    }
  })

  currencies.value = data.currencies
  Object.assign(form.value, data.travel)
} else {
  const { data } = await useQuery({
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

// In case of a range picker, you'll receive [Date, Date]
const format = (dates) => {
  if (dates && dates.length) {
    const day = dates[0].getDate();
    const month = dates[0].getMonth() + 1;
    const year = dates[0].getFullYear();

    return `Selected date is ${day}.${month}.${year}`;
  }
  return 'Нажмите, чтобы выбрать даты';
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

  input.tags = input.tags.map(tag => parseInt(tag.id))
  input.images = input.images.map(image => parseInt(image.id))

  try {
    const {data: { travelForm }} = await useQuery({
      query: isEdit ? UPDATE_TRAVEL : CREATE_TRAVEL,
      variables: {
        input,
        id: parseInt(route.params.travelId)
      }
    })

    if (travelForm > 0) {
      await useRouter().push({name: 'travels.show', params: {travelId: travelForm}})
    }
  } catch (error) {
    if (error[0]['message'] === 'validation') {
      actions.setErrors(error[0]['extensions']['validation'])
    }
  } finally {
    loading.value = false
  }
})

const getCurrency = computed(() => {
  if (form.value.currency_id > 0) {
    return currencies.value.filter((currency) => currency.id === form.value.currency_id)[0].name
  }

  return currencies.value[0].name
})
</script>