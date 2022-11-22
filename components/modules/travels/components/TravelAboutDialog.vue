<template>
  <Dialog title="О путешествие">
    <div class="w-[600px]">
      <div v-if="travel" class="space-y-4">
        <h2 class="text-xl font-medium">
          <NuxtLink :to="{name: 'travels.show', params: {travelId: travel.id}}">{{ travel.title }}</NuxtLink>
        </h2>
        <p>{{ travel.text }}</p>
        <p v-if="travel.place_id">Страна: {{ travel.country?.name }}</p>
      </div>
    </div>
  </Dialog>
</template>

<script setup>
import { gql, useAsyncQuery } from '#imports'
import { ref } from 'vue'
import { Dialog } from '../../../dev/Overlay'

const travel = ref(null)

const props = defineProps({
  id: {
    type: Number,
    required: true,
  }
})

try {
  const { data } = await useAsyncQuery(gql`
    query ($id: Int!) {
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
  `, {
    id: props.id
  })

  travel.value = data.value.travel
} catch (error) {}
</script>