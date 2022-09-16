<template>
  <NuxtLoadingIndicator />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <VOverlay />
</template>

<script setup>
import { VOverlay } from '~/components/dev/Overlay'
</script>