<template>
  <div class="flex flex-col h-full gap-6">
    <TheHeader class="flex-shrink-0" />

    <div class="flex justify-center gap-10 h-full">
      <TheNavigation class="w-[180px]" />

      <main class="flex flex-col w-[800px]">
<!--        <h1 v-if="heading" class="text-xl font-bold mb-4">{{ heading }}</h1>-->

        <!-- HERO -->
        <div v-if="hasHero" class="mb-4">
          <slot name="hero" />
        </div>
        <!-- / HERO -->

        <!-- CONTENT, CONTENT-SIDEBAR -->
        <div class="flex" :class="{'flex-row-reverse': isReverse, 'gap-10': hasSidebar}">
          <div :class="{'w-[560px]': hasSidebar}">
            <slot />
          </div>
          <div v-if="hasSidebar" class="flex-shrink-0 w-[240px]">
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
import { useHead } from '#head'

const props = defineProps({
  heading: {
    type: String,
    default: ''
  },
  isReverse: {
    type: Boolean,
    default: false
  }
})

useHead({
  titleTemplate: '%s — Trevio.ru - о путешествиях',
})

const slots = useSlots()

const hasSidebar = computed(() => !!slots['sidebar-before'] || !!slots['sidebar'] || !!slots['sidebar-after'])
const hasHero = computed(() => !!slots['hero'])
</script>