<template>
  <form @submit.prevent="$emit('submit')" class="min-h-full flex flex-col justify-between bg-white p-4 rounded-md shadow ring-1 ring-slate-200">
    <div class="space-y-4">
      <slot></slot>
    </div>
    <footer class="mt-8">
      <hr class="mb-4 -mx-4 border-gray-200">

      <div class="flex space-x-2">
        <Button type="submit">{{ isEdit ? 'Сохранить' : 'Создать' }}</Button>
        <Button @click="$emit('draft', true)" type="submit" variant="secondary">Сохранить в черновик</Button>
      </div>
    </footer>
  </form>
</template>

<script setup>
import { Button } from '@trevio/ui';

defineEmits(['submit', 'draft'])

defineProps({
  isEdit: {
    type: Boolean,
  }
})
</script>