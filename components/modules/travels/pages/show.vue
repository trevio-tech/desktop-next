<template>
  <TheLayout :heading="travel.title">
    <template #sidebar>
      <NuxtLink :to="{name: 'travels.edit', params: {travelId: travel.id}}">Редактировать</NuxtLink>
    </template>
    <p>{{ travel.text }}</p>
  </TheLayout>
</template>

<script setup>
import { useRoute } from 'nuxt/app'
import { useGql } from '~/uses'
import TheLayout from '~/components/layout/TheLayout'
import { TRAVEL } from '../graphql';

const route = useRoute()

const { data: { travel }} = await useGql(`
  query($id: Int!) {
    ${TRAVEL}
  }
`, {
  id: parseInt(route.params.travelId)
})
</script>