<template>
  <div class="flex flex-col h-full gap-4">
    <TheHeader class="flex-shrink-0" />

    <div class="flex justify-center gap-4 h-full">
      <TheNavigation class="w-[180px]" />

      <main class="flex flex-col gap-4">
        <!-- HERO -->
        <div v-if="hasHero" class="bg-red-50">
          <slot name="hero" />
        </div>
        <!-- / HERO -->

        <!-- CONTENT, CONTENT-SIDEBAR -->
        <div class="flex-auto flex w-[800px] gap-4" :class="{'flex-row-reverse': isReverse}">
          <div class="flex-shrink-0 min-w-[560px] max-w-[840px]">
            <slot />
          </div>
          <div v-if="hasSidebar" class="flex-shrink-0 w-[240px] bg-gray-100">
            <slot name="sidebar-before" />
            <slot name="sidebar" />
            <slot name="sidebar-after" />
          </div>
        </div>
        <!-- / CONTENT, CONTENT-SIDEBAR -->
      </main>
    </div>
  </div>
</template>

<script setup>
import TheHeader from '~/components/layout/TheHeader'
import TheFooter from '~/components/layout/TheFooter'
import TheNavigation from '~/components/layout/TheNavigation'
import { computed, useSlots } from 'vue'

useHead({
  titleTemplate: '%s — Trevio.ru - о путешествиях',
})

defineProps({
  isReverse: {
    type: Boolean,
    default: false
  }
})

const slots = useSlots()

const hasSidebar = computed(() => {
  return !!slots['sidebar-before'] || !!slots['sidebar'] || !!slots['sidebar-after']
})
const hasHero = computed(() => {
  return !!slots['hero']
})
</script>