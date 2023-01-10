<template>
  <NuxtLink class="px-2.5 py-1 text-sm flex items-center rounded-lg bg-slate-100 text-slate-500 flex items-center font-medium">
    <MessageCircle class="w-4 h-4 mr-2" />
    <span><slot></slot></span>
  </NuxtLink>
</template>

<script setup>
import { MessageCircle } from 'lucide-vue-next'
</script>