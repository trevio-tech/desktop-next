<template>
  <div class="flex items-center space-x-2 cursor-pointer">
    <HeartIcon class="w-5 h-5" />
    <div class="text-sm font-semibold text-gray-dark ml-1">{{ count }}</div>
  </div>
</template>

<script setup>
import { HeartIcon } from '@heroicons/vue/24/outline'
import { ref } from 'vue'

const props = defineProps({
  modelType: {
    type:     String,
    required: true,
  },
  modelId: {
    type:     Number,
    required: true,
  },
  isLiked: {
    type:    Boolean,
    default: false,
  },
  count: {
    type:    Number,
    default: 0,
  },
})
</script>