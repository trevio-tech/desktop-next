<template>
  <NuxtLayout heading="Путешествия">
    <template #sidebar>1</template>
    <div class="space-y-4">
      <ContentCard v-for="travel in travels" :entry="travel" :key="travel.id"/>
    </div>
    <Button v-if="travels.length" :loading="isFetching" @click="fetchTravels" variant="secondary" class="w-full my-4">Показать еще</Button>
  </NuxtLayout>
</template>

<script setup>
import ContentCard from '~/components/ContentCard'
import { TRAVEL_CARD } from '../graphql'
import { shallowRef } from 'vue'
import { usePageQuery, Button } from '@trevio/ui'

const isFetching = shallowRef(false)
const page = shallowRef(0)
const travels = shallowRef([])

const fetchTravels = async () => {
  if (isFetching.value) return

  isFetching.value = true

  page.value++

  try {
    const { data } = await usePageQuery({
      query: `
        query getTravels($page: Int) {
          travels(page: $page) {
            ${TRAVEL_CARD}
          }
        }
      `,
      variables: {
        page: page.value
      }
    })

    travels.value = [...travels.value, ...data.travels]
  } catch (error) {
    console.log(error)
  } finally {
    isFetching.value = false
  }
}

await fetchTravels()
</script>