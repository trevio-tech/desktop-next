<template>
  <Dropdown>
    <VButton>Фильтр</VButton>
    <template #popper>
      <DropdownItem v-for="(item, key) in list" :key="key" :value="key" :as="Checkbox" v-model="content" @update:modelValue="$emit('update:modelValue', $event)">
        {{ item }}
      </DropdownItem>
    </template>
  </Dropdown>
</template>

<script setup>
import { Checkbox, Dropdown, DropdownItem, VButton } from '@trevio/ui'
import { ref } from 'vue'

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