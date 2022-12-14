<template>
  <TheLayout :heading="travel.title">
    <Html>
    <Head>
      <Title>{{ travel.title }} - Путешествия</Title>
      <Meta name="description" :content="travel.text"/>
    </Head>
    </Html>

    <template #sidebar>
      <NuxtLink :to="{name: 'travels.edit', params: {travelId: travel.id}}">Редактировать</NuxtLink>
    </template>
    <article>
      <ImageViewer>
        <img v-if="travel.preview.length" loading="lazy" :src="travel.preview[0].sizes.default"
             :data-src="travel.preview[0].url" class="rounded-lg mb-4 w-full" :alt="travel.title">
      </ImageViewer>
      <p>{{ travel.text }}</p>
      <div v-if="travel.tags.length" class="space-x-2 mt-4 text-slate-400 text-sm truncate">
        <NuxtLink
            class="hover:text-slate-600"
            v-for="tag in travel.tags"
            :key="tag.id"
            :title="tag.name"
            :to="{name: 'travels', query: {tag_id: tag.id}}">#{{ tag.name }}
        </NuxtLink>
      </div>
    </article>

    <TravelSiblings v-if="otherTravels.length" class="mt-4" :items="otherTravels"/>
    <hr class="my-4">
    <TravelContentList
        v-if="travel.nested_entries_count"
        :nested-entries-count="travel.nested_entries_count"
        class="mt-4"/>
  </TheLayout>
</template>

<script setup>
import TheLayout from '~/components/layout/TheLayout'
import TravelContentList from '../components/TravelContentList'
import TravelSiblings from '../components/TravelSiblings.vue'
import { TRAVEL, TRAVEL_CARD_SQUARE } from '../graphql'
import { ref } from 'vue'
import { useRoute } from 'nuxt/app'

const route = useRoute()
const otherTravels = ref([])

const { data: { travel } } = await useQuery({
  query: `
    query($id: Int!) {
      travel(id: $id) {
        ${TRAVEL}
      }
    }
  `,
  variables: {
    id: parseInt(route.params.travelId),
  },
})

const otherTravelsFromUser = async (travel) => {
  const { data: { travels } } = await useQuery({
    query: `
      query($user_id: ID, $previous: ID, $next: ID) {
        travels(user_id: $user_id, previous: $previous, next: $next) {
          ${TRAVEL_CARD_SQUARE}
        }
      }
    `,
    variables: {
      user_id: travel.user_id,
      previous: travel.id,
      next: travel.id,
    }
  })

  otherTravels.value = travels.sort(function (a, b) {
    return a.id - b.id
  })
}

await otherTravelsFromUser(travel)
</script>