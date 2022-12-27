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

    <div v-if="otherTravels.length" class="mt-4 flex items-center space-x-4">
      <div>
        <div class="mb-2 font-semibold">Предыдущие путешествие</div>
        <NuxtLink :to="{name: 'travels.show', params: {travelId: otherTravels[0].id}}">{{ otherTravels[0].title }}</NuxtLink>
      </div>
      <div v-if="otherTravels[1]">
        <div class="mb-2 font-semibold">Следующие путешествие</div>
        <NuxtLink :to="{name: 'travels.show', params: {travelId: otherTravels[1].id}}">{{ otherTravels[1].title }}</NuxtLink>
      </div>
    </div>

    <TravelContentList class="mt-4" />
  </TheLayout>
</template>

<script setup>
import { useRoute } from 'nuxt/app'
import { useGql } from '~/uses'
import TheLayout from '~/components/layout/TheLayout'
import { TRAVEL } from '../graphql';
import TravelContentList from '../components/TravelContentList'
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
    query($limit: Int, $user_id: ID, $previous: ID, $next: ID) {
      travels(limit: $limit, user_id: $user_id, previous: $previous, next: $next) {
        id
        title
      }
    }
    `, {
      user_id:  travel.user_id,
      previous: travel.id,
      next:     travel.id,
      limit:    2
    })

  otherTravels.value = travels.sort(function(a, b) {
    return a.id - b.id;
  })
}

await otherTravelsFromUser(travel)
</script>