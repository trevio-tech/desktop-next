<template>
  <TheLayout heading="Редактирование путешествия">
    <template #sidebar>1</template>
    <form class="space-y-4">
      <VInput placeholder="Введите заголовок путешествия" />

      <div>
        <VButton type="submit">Создать путешествие</VButton>
      </div>
    </form>
  </TheLayout>
</template>

<script setup>
import { useRoute } from 'nuxt/app'
import { useGql } from '~/uses'
import TheLayout from '~/components/layout/TheLayout'
import { TRAVEL } from '../graphql';
import { VInput, VButton } from 'ui';

const route = useRoute()

if (route.params.travelId) {
  const {data: {travel}} = await useGql(`
  query($id: Int!) {
    ${TRAVEL}
  }
`, {
    id: parseInt(route.params.travelId)
  })
}
</script>