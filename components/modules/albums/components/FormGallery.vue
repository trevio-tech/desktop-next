<template>
  <Draggable :model-value="modelValue" @update:modelValue="$emit('update:modelValue', $event)" tag="div" item-key="id" class="grid grid-cols-4 gap-2">
    <template #item="{ element, index }">
      <div class="cursor-move select-none relative rounded-lg overflow-hidden aspect-square">
        <img :src="element.url.default" alt="" class="w-full h-full object-cover block">

        <div class="absolute top-0 left-0 w-full h-full flex items-center justify-center space-x-1 bg-black bg-opacity-25 text-white">
          <div class="p-2 bg-gray-400/80 rounded-full cursor-pointer">
            <Pencil class="w-5 h-5" />
          </div>
          <div @click="onDelete(index)" class="p-2 bg-red-400/80 rounded-full bg-gray cursor-pointer">
            <Trash class="w-5 h-5" />
          </div>
        </div>
      </div>
    </template>
  </Draggable>
</template>

<script setup>
import {
  Pencil,
  Trash
} from 'lucide-vue-next'

import Draggable from 'vuedraggable'

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