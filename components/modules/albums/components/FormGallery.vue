<template>
  <div class="grid grid-cols-4 gap-2">
    <div v-for="(image, index) in modelValue" :key="image.id" class="aspect-square" @click="onDelete(index)">
      <img :src="image.url" alt="" class="w-full h-full object-cover rounded-lg block">
    </div>
  </div>
</template>

<script setup>
import { nextTick } from 'vue'

const emit = defineEmits(['update:modelValue'])

const props = defineProps({
  modelValue: {
    type:     Array,
    required: true,
  }
})

const onDelete = async (index) => {
  props.modelValue.splice(index, 1)
  emit('update:modelValue', props.modelValue)
}
</script>