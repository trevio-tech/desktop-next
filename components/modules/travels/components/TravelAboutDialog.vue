<template>
  <Dialog title="О путешествие">
    <div class="w-[600px]">
      <div v-if="travel" class="space-y-4">
        <h2 class="text-xl font-medium">
          <NuxtLink :to="{name: 'travels.show', params: {travelId: travel.id}}">{{ travel.title }}</NuxtLink>
        </h2>
        <p>{{ travel.text }}</p>
        <p v-if="travel.place_id">Страна: {{ travel.country?.name }}</p>

        <div class="mt-4">
          <NuxtLink :to="{name: 'travels.show', params: {travelId: travel.id}}" class="underline">Перейти в путешествие</NuxtLink>
        </div>
      </div>
      <Loader v-else />
    </div>
  </Dialog>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Dialog from '~/components/base/Dialog'
import { useQuery, Loader } from '@trevio/ui'

const travel = ref(null)

const props = defineProps({
  id: {
    type: Number,
    required: true,
  }
})

onMounted(async () => {
  try {
    const { data } = await useQuery({
      query: /* GraphQL */`
        query ($id: ID!) {
          travel(id: $id) {
            id
            place_id
            title
            text
            country {
              id
              name
            }
          }
        }
    `,
      variables: {
        id: props.id
      }
    })

    travel.value = data.travel
  } catch (error) {}
})
</script>