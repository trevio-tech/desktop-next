<template>
  <form @submit.prevent="$emit('submit', isDraft)" class="bg-white p-4 rounded-md shadow ring-1 ring-slate-200">
    <div class="space-y-4">
      <slot></slot>
    </div>
    <footer class="mt-8">
      <hr class="mb-4 -mx-4 border-gray-200">

      <div class="flex justify-end space-x-2">
        <Button :loading="loading" @click="isDraft = true" type="submit" variant="secondary">{{ isEdit ? 'Сохранить' : 'Создать' }} черновик</Button>
        <Button :loading="loading" @click="isDraft = false" type="submit">{{ isEdit ? 'Сохранить' : 'Создать' }}</Button>
      </div>
    </footer>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import { Button } from '@trevio/ui'

defineEmits(['submit'])
defineProps({
  isEdit: {
    type: Boolean,
  },
  loading: {
    type: Boolean
  }
})

const isDraft = ref(false)
</script>