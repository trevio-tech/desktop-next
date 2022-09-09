<template>
  <InputTags :model-value="tags" @update:modelValue="$emit('update:modelValue', $event)"  :change-callback="onChange" :select-callback="onSelect" />
</template>

<script setup>
import { InputTags } from 'ui'
import { ref } from 'vue'
import { useGql } from '~/uses'

defineEmits(['update:modelValue'])

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => []
  }
})

const tags = ref(props.modelValue)

const onChange = async (query) => {
  const { data: { searchTags }} = await useGql(`
    query($query: String!) {
      searchTags(query: $query) {
        id
        name
      }
    }
  `, {
    query
  })

  return searchTags
}

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