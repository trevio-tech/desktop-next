<template>
  <DropdownMenu>
    <Button>Фильтр</Button>
    <template #popper>
      <DropdownMenuItem v-for="(item, key) in list" :key="key" :value="key" :as="Checkbox" v-model="content" @update:modelValue="$emit('update:modelValue', $event)">
        {{ item }}
      </DropdownMenuItem>
    </template>
  </DropdownMenu>
</template>

<script setup>
import { ref } from 'vue'
import { Button, DropdownMenuItem, DropdownMenu } from '@trevio/ui'

defineEmits(['update:modelValue'])
const props = defineProps({
  modelValue: {
    type: Array,
    default: () => []
  }
})

const content = ref(props.modelValue)

const list = {
  travels:    'Путешествия',
  notes:      'Заметки',
  reviews:    'Отзывы',
  albums:     'Фотоальбомы',
  questions:  'Вопросы',
}
</script>