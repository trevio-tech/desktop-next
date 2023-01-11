<template>
  <InputTags :key-name="keyName" :placeholder="placeholder" :model-value="tags"
             @update:modelValue="onUpdate" :select-callback="onSelect"/>
</template>

<script setup>
import { ref } from 'vue'
import { useQuery } from '#imports'

defineEmits(['update:modelValue'])

const onUpdate = (e) => {
  console.log(e)
}

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
  const { data: { createTag }} = await useQuery({
    query: `
      mutation($name: String) {
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