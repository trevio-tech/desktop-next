<template>
  <button type="button" @click="onClick" class="p-1 text-sm flex items-center rounded-lg bg-slate-100 text-slate-400 flex items-center space-x-1 font-medium">
    <Bookmark class="w-5 h-5" :class="{'text-red-500': active}" />
  </button>
</template>

<script setup>
import { Bookmark } from 'lucide-vue-next'
import { defineAsyncComponent, ref } from 'vue'
import { useNuxtApp } from 'nuxt/app'

const emit = defineEmits(['update:modelValue'])
const props = defineProps({
  modelType: {
    type: String,
    required: true,
  },
  modelId: {
    type: Number,
    required: true,
  },
  modelValue: {
    type: Array,
    default: () => []
  }
})

const { $overlay } = useNuxtApp()

const active = ref(props.modelValue?.length > 0)

const onClick = async () => {
  $overlay.show(defineAsyncComponent(() => import('~/components/modules/bookmarks/components/BookmarkDialog.vue')), {
    props,
    on: {
      change: (categories) => {
        active.value = categories.length > 0
        emit('update:modelValue', categories)
        $overlay.hide()
      }
    }
  })
}
</script>