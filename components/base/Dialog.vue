<template>
  <div tabindex="-1" aria-hidden="true" class="absolute left-0 top-0 right-0 bottom-0">
    <div class="flex items-center justify-start flex-col p-10 overflow-y-auto max-h-full min-h-full">
      <div class="h-full relative min-w-[320px] flex flex-col max-w-2xl bg-white rounded-lg shadow-md" :class="{'flex-auto h-full': fullHeight}">
        <!-- Modal header -->
        <header class="p-4 flex justify-between items-center p-4 rounded-t border-b border-slate-200">
          <h3 class="text-xl font-semibold text-slate-900 leading-none mr-4">
            {{ title }}
          </h3>
          <button @click="$overlay.hide" type="button" class="text-slate-400 bg-transparent hover:bg-slate-200 hover:text-slate-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center">
            <X class="w-5 h-5" />
            <span class="sr-only">Закрыть</span>
          </button>
        </header>
        <div class="p-4 flex-auto">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { X } from 'lucide-vue-next'

defineProps({
  title: {
    type: String
  },
  fullHeight: {
    type: Boolean
  }
})

</script>