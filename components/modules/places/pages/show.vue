<template>
  <NuxtLayout :heading="head.title">
    <template #sidebar>
      1
    </template>
    <PlaceRatingBar :place="place" class="mb-4" />
    <ContentCard v-for="item in items" :key="item.id" :entry="item" />
    <div v-if="items.length === 0">Ничего не найдено.</div>
  </NuxtLayout>
</template>

<script setup>
import ContentCard from '~/components/ContentCard.vue'
import PlaceRatingBar from '~/components/modules/places/components/PlaceRatingBar.vue'
import { PLACE } from '~/components/modules/places/graphql'
import { REVIEW_CARD } from '~/components/modules/reviews/graphql'
import { useRoute } from '#imports'
import { useQuery } from '@trevio/ui'

const route = useRoute()

let place = {}
let items = []
let head = {}

const contentType = route.name === 'places.reviews'
  ? 'reviews'
  : route.params.contentType

try {
  let query = [
    `place(id: $place_id) {
      ${PLACE}
    }`
  ]

  if (contentType === 'reviews') {
    query.push(`
      reviews(
        place_id: $place_id
        ${route.params.stars ? 'filter_by_stars: $filter_by_stars' : ''}
      ) {
        ${REVIEW_CARD}
      }
    `)
  }

  const { data } = await useQuery({
    query: `
      query(
        $place_id: Int!
        ${route.params.stars ? '$filter_by_stars: Int' : ''}
      ) {
        ${query.join('\n')}
      }
    `,
    variables: {
      place_id:        parseInt(route.params.placeId),
      filter_by_stars: parseInt(route.params.stars)
    }
  })

  place = data.place
  items = data[contentType]

  head = usePlaceSeo(route, place)
} catch (error) {}
</script>