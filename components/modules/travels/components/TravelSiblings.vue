<template>
  <div>
    <div class="mb-2 font-semibold">Цепочка путешествий:</div>
    <div class="flex items-center space-x-4">
      <ContentCardSquare v-for="item in items" :key="item.id" :entry="item" class="flex-1" />
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