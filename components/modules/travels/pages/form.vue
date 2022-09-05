<template>
  <TheLayout :heading="`${isEdit ? 'Редактирование' : 'Создание'} путешествия`">
    <template #sidebar>1</template>
    <form class="space-y-4 bg-white p-4 rounded-md shadow ring-1 ring-slate-200">
      <VField label="Заголовок путшествия" id="title" required>
        <VInput v-model="form.title" id="title" placeholder="Введите заголовок путешествия" />
      </VField>

      <VField label="Страна" id="country" required>
        <VInput v-model="form.title" id="country" placeholder="Введите название страны" />
      </VField>

      <div class="flex items-center gap-4">
        <VField label="Дача начала" id="date-start" class="flex-auto">
          <VInput v-model="form.date_start" type="date" id="date-start" placeholder="Выберите дату начала" />
        </VField>
        <VField label="Дата завершения" id="date-end" class="flex-auto">
          <VInput v-model="form.date_end" type="date" id="date-end" placeholder="Выберите дату завершения" />
        </VField>
      </div>

      <VField label="Бюджет путешествия" id="budget">
        <VInput v-model="form.budget" type="number" id="budget" placeholder="Укажите бюджет путешествия" />
      </VField>

      <div>
        <VButton type="submit">{{ isEdit ? 'Сохранить' : 'Создать' }} путешествие</VButton>
      </div>
    </form>
  </TheLayout>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'nuxt/app'
import { useGql } from '~/uses'
import TheLayout from '~/components/layout/TheLayout'
import { TRAVEL } from '../graphql';
import { VField, VInput, VButton } from 'ui';

const form = ref({
  title: '',
  date_start: '',
  date_end: '',
  budget: null,
})

const route = useRoute()
const isEdit = route.params.travelId > 0

if (isEdit) {
  const {data: {travel}} = await useGql(`
  query($id: Int!) {
    ${TRAVEL}
  }
`, {
    id: parseInt(route.params.travelId)
  })
}
</script>