<template>
  <main class="flex-auto flex flex-col" :class="{'gap-4': noGap === false}">
    <h1 v-if="heading" class="text-2xl font-semibold">{{ heading }}</h1>
    <div v-if="!!$slots.top">
      <slot name="top"></slot>
    </div>
    <div v-if="!!$slots['top-after']">
      <slot name="top-after"></slot>
    </div>
    <div class="flex-auto flex" :class="{'flex-row-reverse': reverse, 'gap-4': noGap === false}">
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
  },
  noGap: {
    type: Boolean
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