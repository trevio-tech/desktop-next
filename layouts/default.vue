<template>
  <div class="flex flex-col min-h-full">
    <TheHeader />
    <div class="flex-auto flex flex-col">
      <slot />
    </div>
    <TheFooter />
  </div>
</template>

<script setup>
import TheHeader from '~/components/layout/TheHeader'
import TheFooter from '~/components/layout/TheFooter'
</script>