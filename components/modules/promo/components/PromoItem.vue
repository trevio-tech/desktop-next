<template>
  <div @click="emit('select', item)" :class="{'font-semibold': selected}">
    {{ item.title }}
    <X @click="emit('delete')" class="w-5 h-5" />
  </div>
</template>

<script setup>
import { X } from 'lucide-vue-next'

const emit = defineEmits(['select', 'delete'])

defineProps({
  item: {
    type: Object,
    required: true,
  },
  selected: {
    type: Boolean
  }
})
</script>