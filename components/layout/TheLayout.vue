<template>
  <main class="flex-auto flex flex-col gap-4">
    <h1 v-if="heading" class="text-2xl font-semibold">{{ heading }}</h1>
    <div v-if="!!$slots.top">
      <slot name="top"></slot>
    </div>
    <div class="flex-auto flex gap-4" :class="{'flex-row-reverse': reverse}">
      <div class="flex-shrink-0 min-w-[560px]" :class="[!!$slots.sidebar ? 'w-[560px]' : 'w-full']">
        <slot></slot>
      </div>
      <div v-if="!!$slots.sidebar" class="flex-shrink-0 flex-auto" style="width: calc(1000px - 560px - 180px - 2rem)">
        <slot name="sidebar"></slot>
      </div>
    </div>
  </main>
</template>

<script lang="ts" setup>
import { useBreadcrumbsStore } from '~/components/layout/breadcrumbs/store'
import { useNuxtApp, useRoute } from '#app'
import { watch } from 'vue'

const props = defineProps({
  reverse: {
    type: Boolean
  },
  heading: {
    type: String
  }
})

const breadcrumbs = useBreadcrumbsStore(useNuxtApp().$pinia)
const route = useRoute()

if (props.heading) {
  breadcrumbs.$patch({
    breadcrumb: {
      name: route.name,
      text: props.heading
    }
  })
}
</script>