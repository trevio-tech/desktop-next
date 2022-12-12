<template>
  <Dialog title="Выбор продвигаемых записей">
    <div @click="onSelect">Я ТЕСТОВАЯ ЗАПИСЬ, продвинь меня!</div>
    <Button @click="emit('select', selected)">Сохранить</Button>
  </Dialog>
</template>

<script setup>
import Dialog from '~/components/base/Dialog.vue'
const emit = defineEmits(['select'])
import { ref } from 'vue'
import { Button } from '@trevio/ui'

const selected = ref([])

const onSelect = () => {
  selected.value.push({
    model_type: 'test',
    model_id: 123,
    title: 'Я ТЕСТОВАЯ ЗАПИСЬ, продвинь меня!'
  })
}
</script>