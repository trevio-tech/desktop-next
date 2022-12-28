<template>
  <TheLayout :heading="travel.title">
    <template #sidebar>
      <NuxtLink :to="{name: 'travels.edit', params: {travelId: travel.id}}">Редактировать</NuxtLink>
    </template>
    <article>
      <ImageViewer>
        <img v-if="travel.preview.length" loading="lazy" :src="travel.preview[0].sizes.default" :data-src="travel.preview[0].url" class="rounded-lg mb-4 w-full" :alt="travel.title">
      </ImageViewer>
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

    <TravelSiblings v-if="otherTravels.length" class="mt-4" :items="otherTravels" />
    <hr class="my-4">
    <TravelContentList v-if="travel.has_nested_entries" class="mt-4" />
  </TheLayout>
</template>

<script setup>
import { useRoute } from 'nuxt/app'
import { useGql } from '~/uses'
import TheLayout from '~/components/layout/TheLayout'
import { TRAVEL, TRAVEL_CARD_SQUARE } from '../graphql'
import TravelContentList from '../components/TravelContentList'
import TravelSiblings from '../components/TravelSiblings.vue'
import { ref } from 'vue'

const route = useRoute()
const otherTravels = ref([])

const { data: { travel }} = await useGql(`
  query($id: Int!) {
    travel(id: $id) {
      ${TRAVEL}
    }
  }
`, {
  id: parseInt(route.params.travelId)
})

const otherTravelsFromUser = async (travel) => {
  const { data: { travels }} = await useGql(`
    query($user_id: ID, $previous: ID, $next: ID) {
      travels(user_id: $user_id, previous: $previous, next: $next) {
        ${TRAVEL_CARD_SQUARE}
      }
    }
    `, {
      user_id:  travel.user_id,
      previous: travel.id,
      next:     travel.id
    })

  otherTravels.value = travels.sort(function(a, b) {
    return a.id - b.id;
  })
}

await otherTravelsFromUser(travel)
</script>