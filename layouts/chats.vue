<template>
  <div class="flex flex-col gap-4 h-full">
    <TheHeader class="flex-shrink-0" />
    <div class="flex-auto flex flex-col w-full h-full overflow-hidden max-w-[1000px] mx-auto">
      <div class="flex-auto h-full flex gap-4">
        <TheNavigation class="flex-shrink-0 w-[180px]" />
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