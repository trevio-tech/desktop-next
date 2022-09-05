<template>
  <TheLayout>
    <template #top>
      <div class="bg-blue-300/50 w-full h-50"></div>
    </template>
    <template #sidebar>
      <div class="bg-green-300/50 w-full h-full"></div>
    </template>
    <div class="bg-gray-300/50 w-full h-full"></div>
  </TheLayout>
</template>

<script setup>
import TheLayout from '~/components/layout/TheLayout'
</script>