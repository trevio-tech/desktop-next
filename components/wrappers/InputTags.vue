<template>
  <InputTags :key-name="keyName" :placeholder="placeholder" :model-value="tags"
             @update:modelValue="emit('update:modelValue', $event)" :select-callback="onSelect"/>
</template>

<script setup>
import { ref } from 'vue'
import { useQuery } from '#imports'

const emit = defineEmits(['update:modelValue'])

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => [],
  },
  placeholder: {
    type: String,
  },
  keyName: {
    type: String,
  },
})

const tags = ref(props.modelValue)

const onSelect = async ({ name }) => {
  const { data: { createTag }} = await useQuery2({
    query: `
      mutation($name: String!) {
        createTag(name: $name) {
          id
          name
        }
      }
    `,
    variables: {
      name,
    },
  })

  return createTag
}
</script>