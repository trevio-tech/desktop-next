<template>
  <Dialog title="Подробная информация">
    <div class="w-[480px]">
      {{ user }}
    </div>
  </Dialog>
</template>

<script setup>
import Dialog from '~/components/base/Dialog.vue'

const props = defineProps({
  user: {
    type: Object,
    required: true,
  },
})
</script>