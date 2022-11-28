<template>
  <TheLayout :heading="travel.title">
    <template #sidebar>
      <NuxtLink :to="{name: 'travels.edit', params: {travelId: travel.id}}">Редактировать</NuxtLink>
    </template>
    <article class="bg-white p-4 overflow-hidden rounded-md shadow ring-1 ring-slate-200">
      <img v-if="travel.preview.length" :src="travel.preview[0].sizes.default" class="rounded-lg mb-4 w-full" :alt="travel.title">
      <p>{{ travel.text }}</p>
      <div v-if="travel.tags.length" class="space-x-2 mt-4 text-slate-400 text-sm truncate">
        <NuxtLink
            class="hover:text-slate-600"
            v-for="tag in travel.tags"
            :key="tag.id"
            :title="tag.name"
            :to="{name: 'travels', query: {tag_id: tag.id}}">#{{ tag.name }}</NuxtLink>
      </div>
    </article>
    <TravelContentList />
  </TheLayout>
</template>

<script setup>
import { useRoute } from 'nuxt/app'
import { useGql } from '~/uses'
import TheLayout from '~/components/layout/TheLayout'
import { TRAVEL } from '../graphql';
import TravelContentList from '../components/TravelContentList'

const route = useRoute()

const { data: { travel }} = await useGql(`
  query($id: Int!) {
    travel(id: $id) {
      ${TRAVEL}
    }
  }
`, {
  id: parseInt(route.params.travelId)
})
</script>