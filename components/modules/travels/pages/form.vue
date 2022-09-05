<template>
  <TheLayout :heading="`${isEdit ? 'Редактирование' : 'Создание'} путешествия`">
    <template #sidebar>1</template>
    <form @submit.prevent="onSubmit" class="space-y-4 bg-white p-4 rounded-md shadow ring-1 ring-slate-200">
      <VField label="Заголовок путшествия" id="title" required>
        <VInput v-model="form.title" id="title" placeholder="Введите заголовок путешествия" />
      </VField>

      <VField label="Страна" id="country" required>
        <VInput v-model="form.title" id="country" placeholder="Введите название страны" />
      </VField>
      <div class="flex items-center gap-4">
        <VField label="Дата начала и завершения" id="country" class="flex-auto">
          <Datepicker v-model="form.date" range multiCalendars>
            <template #trigger>
              <VInput disabled :placeholder="form.date.join('-')" />
            </template>
          </Datepicker>
        </VField>

        <div class="flex items-center gap-4 flex-auto">
          <VField label="Бюджет путешествия" id="budget" class="flex-auto">
            <VInput v-model="form.budget" type="number" id="budget" placeholder="Укажите бюджет путешествия" />
          </VField>
          <div class="flex items-center gap-4 mt-6">
            <CurrencyDollarIcon class="w-6 h-6" />
            <CurrencyEuroIcon class="w-6 h-6" />
            <CurrencyRupeeIcon class="w-6 h-6" />
          </div>
        </div>
      </div>
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
import { VField, VInput, VButton } from 'ui';
import { ref } from 'vue'
import { useGql } from '~/uses'
import { useRoute } from 'nuxt/app'
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import { CurrencyDollarIcon, CurrencyEuroIcon, CurrencyRupeeIcon } from '@heroicons/vue/24/solid'

definePageMeta({
  middleware: 'auth'
})

const form = ref({
  title: '',
  date: [],
  budget: null,
})

const route = useRoute()
const isEdit = route.params.travelId > 0

if (isEdit) {
  const {data: { travel }} = await useGql(`
  query($id: Int!) {
    ${TRAVEL}
  }
`, {
    id: parseInt(route.params.travelId)
  })
}

const onSubmit = async () => {
  try {
    const {data: { travelForm }} = await useGql(CREATE_TRAVEL, {
      input: form.value
    })
  } catch (error) {
    console.log(error)
  }
}
</script>