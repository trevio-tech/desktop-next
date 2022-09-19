<template>
  <InputTags :key-name="keyName" :placeholder="placeholder" :model-value="users" @update:modelValue="$emit('update:modelValue', $event)" :change-callback="onChange" :select-callback="onSelect" skip-creation />
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

const users = ref(props.modelValue)

const onChange = async (query) => {
  const { data: { searchUsers }} = await useGql(`
    query($query: String!) {
      searchUsers(query: $query) {
        id
        name
        avatar
      }
    }
  `, {
    query
  })

  return searchUsers
}

const onSelect = (user) => {
  return user
}
</script>