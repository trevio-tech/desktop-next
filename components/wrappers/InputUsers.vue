<template>
  <InputTags :key-name="keyName" :search-mutation="searchMutation" search-mutation-name="searchUsers" :placeholder="placeholder" :model-value="users" @update:modelValue="$emit('update:modelValue', $event)" :select-callback="onSelect" skip-creation>
    <template v-slot:selected="{ item, onDelete, index }">
      <div class="flex items-center bg-gray-100 rounded-full h-5 text-xs font-medium space-x-1">
        <img :src="item.avatar" class="w-5 h-5 rounded-full" alt="">
        <div class="max-w-60 truncate">{{ item['name'] }}</div>
        <X class="w-5 h-5 bg-gray-300 rounded-lg cursor-pointer" @click="onDelete(index)" />
      </div>
    </template>
    <template v-slot:option="{ item }">
      <div class="flex items-center space-x-2 p-2 hover:bg-gray-100 cursor-pointer">
        <img :src="item.avatar" class="w-5 h-5 rounded-full" :alt="item.name">
        <div class="mr-2 max-w-60 truncate">{{ item.name }}</div>
      </div>
    </template>
  </InputTags>
</template>

<script setup>
import { ref } from 'vue'
import { X } from 'lucide-vue-next'
import { InputTags } from '@trevio/ui'

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

const searchMutation = `
  query($query: String!) {
    searchUsers(query: $query) {
      id
      name
      avatar
    }
  }
`

const onSelect = (user) => {
  return user
}
</script>