<template>
  <div class="flex items-center gap-4 bg-white p-4 rounded-lg">
    <div class="flex-auto rounded-lg overflow-hidden">
      <div class="flex items-center space-x-2">
        <h2 class="text-lg font-semibold truncate underline" :title="place.name">
          <NuxtLink :to="{name: 'places.reviews', params: {placeId: place.id}}">{{ place.name }}</NuxtLink>
        </h2>
        <div class="flex items-center space-x-1">
          <Rating :stars="1" model-value="1" size="16px" />
          <div class="text-sm leading-none">{{ place.rating }}</div>
        </div>
      </div>
      <h3 class="text-gray-dark">{{ place.parent_names }}</h3>
      <div v-if="userRating">
        <hr class="my-4">
        <div class="flex items-center space-x-2 text-sm">
          <div>Оценка от пользователя:</div>
          <Rating :stars="5" :model-value="userRating" size="16px" />
        </div>
      </div>
    </div>
    <div class="text-sm leading-none flex-shrink-0 space-y-2">
      <div class="flex items-center space-x-2">
        <Rating :stars="5" model-value="5" size="16px" />
        <NuxtLink :to="{name: 'places.reviews', params: {placeId: place.id, stars: 5}}" class="underline text-sm">
          {{ place.reviews_count_5 }}
          {{ declOfNum(place.reviews_count_5, 'отзыв', 'отзыва', 'отзывов') }}
        </NuxtLink>
      </div>
      <div class="flex items-center space-x-2">
        <Rating :stars="5" model-value="4" size="16px" />
        <NuxtLink :to="{name: 'places.reviews', params: {placeId: place.id, stars: 4}}" class="underline text-sm">
          {{ place.reviews_count_4 }}
          {{ declOfNum(place.reviews_count_4, 'отзыв', 'отзыва', 'отзывов') }}
        </NuxtLink>
      </div>
      <div class="flex items-center space-x-2">
        <Rating :stars="5" model-value="3" size="16px" />
        <NuxtLink :to="{name: 'places.reviews', params: {placeId: place.id, stars: 3}}" class="underline text-sm">
          {{ place.reviews_count_3 }}
          {{ declOfNum(place.reviews_count_3, 'отзыв', 'отзыва', 'отзывов') }}
        </NuxtLink>
      </div>
      <div class="flex items-center space-x-2">
        <Rating :stars="5" model-value="2" size="16px" />
        <NuxtLink :to="{name: 'places.reviews', params: {placeId: place.id, stars: 2}}" class="underline text-sm">
          {{ place.reviews_count_2 }}
          {{ declOfNum(place.reviews_count_2, 'отзыв', 'отзыва', 'отзывов') }}
        </NuxtLink>
      </div>
      <div class="flex items-center space-x-2">
        <Rating :stars="5" model-value="1" size="16px" />
        <NuxtLink :to="{name: 'places.reviews', params: {placeId: place.id, stars: 1}}" class="underline text-sm">
          {{ place.reviews_count_1 }}
          {{ declOfNum(place.reviews_count_1, 'отзыв', 'отзыва', 'отзывов') }}
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>

defineProps({
  place: {
    type: Object,
    required: true,
  },
  userRating: {
    type: [Number, String],
  }
})
</script>