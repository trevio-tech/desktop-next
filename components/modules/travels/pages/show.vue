<template>
  <NuxtLayout>
    <Html>
      <Head>
        <Title>{{ travel.title }} - Путешествия</Title>
        <Meta name="description" :content="travel.text"/>
      </Head>
    </Html>

    <template #sidebar>
      <NuxtLink :to="{name: 'travels.edit', params: {travelId: travel.id}}">Редактировать</NuxtLink>
    </template>

    <Article :entry="travel" />

    <div v-if="travel.tags && travel.tags.length" class="space-x-2 mt-4 text-slate-400 text-sm truncate">
      <NuxtLink
          class="hover:text-slate-600"
          v-for="tag in travel.tags"
          :key="tag.id"
          :title="tag.name"
          :to="{name: 'travels', query: {tag_id: tag.id}}">#{{ tag.name }}
      </NuxtLink>
    </div>

<!--    <TravelSiblings v-if="otherTravels.length" class="mt-4" :items="otherTravels"/>-->
    <hr class="my-4">
    <TravelContentList
        v-if="travel.nested_entries_count"
        :nested-entries-count="travel.nested_entries_count"
        class="mt-4"/>
  </NuxtLayout>
</template>

<script setup>
import Article from '~/components/Article.vue'
import TravelContentList from '../components/TravelContentList'
import TravelSiblings from '../components/TravelSiblings.vue'
import { TRAVEL, TRAVEL_CARD_SQUARE } from '../graphql'
import { ref } from 'vue'
import { useQuery, useRoute } from '#imports'


const route = useRoute()
const otherTravels = ref([])
let travel = {}

try {
  const { data } = await useQuery({
    query: /* GraphQL */`
      query($id: ID!) {
        travel(id: $id) {
          ${TRAVEL}
        }
      }
    `,
    variables: {
      id: route.params.travelId,
    },
  })

  travel = data.travel
} catch (error) {
  console.log(error)
}

/*const otherTravelsFromUser = async (travel) => {
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

await otherTravelsFromUser(travel)*/
</script>