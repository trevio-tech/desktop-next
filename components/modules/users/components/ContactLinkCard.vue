<template>
  <div class="bg-white shadow-sm rounded-lg border border-slate-200 p-2 flex items-center">
    <NuxtLink :href="link.url" target="_blank" class="flex">
      <div class="w-10 h-10 bg-slate-100 rounded-lg flex-shrink-0 mr-2 self-start"></div>
      <div class="mr-2">
        <div class="text-sm font-semibold mb-1">{{ link.title || 'Без заголовка' }}</div>
        <div class="text-xs text-gray-500">{{ link.host }}</div>
      </div>
    </NuxtLink>
    <button class="flex-shrink-0 ml-auto flex items-center justify-center w-8 h-8 rounded-lg hover:bg-stone-100 cursor-pointer">
      <X />
    </button>
  </div>
</template>

<script setup>
import { X } from 'lucide-vue-next'

defineProps({
  link: {
    type: Object,
    required: true
  }
})
</script>