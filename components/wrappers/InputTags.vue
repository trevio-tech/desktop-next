<template>
  <InputTags :key-name="keyName" :placeholder="placeholder" :model-value="tags" @update:modelValue="$emit('update:modelValue', $event)" :select-callback="onSelect" />
</template>

<script setup>
import { InputTags } from '@trevio/ui'
import { ref } from 'vue'
import { useGql } from '~/uses'

defineEmits(['update:modelValue'])

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => []
  },
  placeholder: {
    type: String,
  },
  keyName: {
    type: String
  }
})

const tags = ref(props.modelValue)

const onSelect = async ({ name }) => {
  const { data: { createTag }} = await useGql(`
    mutation($name: String) {
      createTag(name: $name) {
        id
        name
      }
    }
  `, {
    name
  })

  return createTag
}
</script>