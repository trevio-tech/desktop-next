<template>
  <section ref="target" class="bg-orange-100 p-6 rounded-lg">
    <h3 class="font-medium mb-4 text-lg">Продвигаемые записи</h3>
    <ul class="space-y-4">
      <li v-for="item in items" :key="item.id" class="text-sm">
        <NuxtLink :to="{
          name: routes[item.system_name].name,
          params: {[routes[item.system_name].param]: item.id}
        }" class="font-medium hover:underline">{{ item.title }}</NuxtLink>
        <div v-if="item.text" class="mt-1">
          <NuxtLink :to="{
            name: routes[item.system_name].name,
            params: {[routes[item.system_name].param]: item.id}
          }">{{ item.text }}</NuxtLink>
        </div>
      </li>
    </ul>
  </section>
</template>

<script setup>
import { Skeleton, useQuery } from '@trevio/ui'
import { shallowRef, ref } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'

const target = shallowRef()
const items = ref([])
const fields = `
  id
  title
  text(words: 10)
  system_name
`
const routes = {
  albums: {
    name:  'albums.show',
    param: 'albumId',
  },
  notes: {
    name:  'notes.show',
    param: 'noteId',
  },
  questions: {
    name:  'questions.show',
    param: 'questionId',
  },
  reviews: {
    name:  'reviews.show',
    param: 'reviewId',
  },
  travels: {
    name:  'travels.show',
    param: 'travelId',
  },
}

const getPromotedEntries = async () => {
  try {
    const { data } = await useQuery({
      query: `
        query {
          promotedEntries {
            id
            model {
              ... on Album {
                ${fields}
              }
              ... on Note {
                ${fields}
              }
              ... on Question {
                ${fields}
              }
              ... on Review {
                ${fields}
              }
              ... on Travel {
                ${fields}
              }
            }
          }
        }
      `
    })

    data.promotedEntries.forEach((promo) => items.value.push(promo.model))
  } catch (error) {
    console.log(error)
  }
}

useIntersectionObserver(
  target,
  async ([{ isIntersecting }]) => {
    if (isIntersecting && items.value.length === 0) {
      await getPromotedEntries()
    }
  },
)
</script>