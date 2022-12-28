<template>
  <div>
    <div class="mb-2 font-semibold">Цепочка путешествий:</div>
    <div class="grid grid-cols-2 gap-4">
      <ContentCardSquare v-for="item in items" :key="item.id" :entry="item" />
      <div v-if="items.length === 1" class="bg-gray-100 rounded-lg"></div>
    </div>
  </div>
</template>

<script setup>
import ContentCardSquare from '~/components/ContentCardSquare.vue'
defineProps({
  items: {
    type: Array
  }
})
</script>