<template>
  <div class="flex flex-col min-h-full">
    <TheHeader />
    <div class="flex-auto flex flex-col w-full max-w-[960px] mx-auto">
      <div class="flex-auto flex gap-4">
        <TheNavigation class="flex-shrink-0" />
        <slot />
      </div>
    </div>
    <TheFooter />
  </div>
</template>

<script setup>
import TheHeader from '~/components/layout/TheHeader'
import TheFooter from '~/components/layout/TheFooter'
import TheNavigation from '~/components/layout/TheNavigation'
</script>