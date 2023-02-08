<template>
  <main class="flex-auto flex flex-col" :class="{'gap-4': noGap === false}">
    <h1 v-if="heading" class="text-2xl font-semibold">{{ heading }}</h1>
    <div v-if="!!$slots.top" style="width: 796px">
      <slot name="top"></slot>
    </div>
    <div v-if="!!$slots['top-after']">
      <slot name="top-after"></slot>
    </div>
    <div class="flex-auto flex" :class="{'flex-row-reverse': reverse, 'gap-4': noGap === false}">
      <div class="flex-shrink-0 min-w-[560px]" :class="[hasSidebar ? 'max-w-[560px]' : 'w-full']">
        <slot></slot>
      </div>
      <div v-if="hasSidebar" class="flex-shrink-0 flex-auto" style="max-width: calc(1000px - 560px - 180px - 2rem)">
        <slot name="sidebar-before"></slot>
        <slot name="sidebar"></slot>
      </div>
    </div>
  </main>
</template>

<script lang="ts" setup>
import { useBreadcrumbsStore } from '~/components/layout/breadcrumbs/store'
import { useRoute } from '#app'
import { useSlots } from 'vue'

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

const slots = useSlots()
const route = useRoute()

const hasSidebar = !!slots.sidebar || !!slots['sidebar-before']

// const breadcrumbs = useBreadcrumbsStore(useNuxtApp().$pinia)

/*if (props.heading) {
  breadcrumbs.$patch({
    breadcrumb: {
      name: route.name,
      text: props.heading
    }
  })
}*/
</script>