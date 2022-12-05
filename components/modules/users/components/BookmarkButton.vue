<template>
  <button type="button" @click="onClick">
    <Bookmark class="w-5 h-5" />
  </button>
</template>

<script setup>
import { Bookmark } from 'lucide-vue-next'
import { defineAsyncComponent } from 'vue'
import { useNuxtApp } from 'nuxt/app'

const props = defineProps({
  modelType: {
    type: String,
    required: true,
  },
  modelId: {
    type: Number,
    required: true,
  }
})

const { $overlay } = useNuxtApp()

const onClick = async () => {
  $overlay.show(defineAsyncComponent(() => import('~/components/modules/users/components/BookmarkDialog.vue')), {
    props
  })
}
</script>