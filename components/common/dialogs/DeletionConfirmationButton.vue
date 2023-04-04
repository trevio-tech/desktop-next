<template>
  <div @click="onClick">
    <slot />
  </div>
</template>

<script setup>
import { useOverlay } from '@trevio/ui'

const emits = defineEmits(['deleted'])
const props = defineProps({
  mutation: {
    type: String,
    required: true,
  },
  mutationName: {
    type: String,
    required: true,
  },
  variables: {
    type: Object
  }
})

const overlay = useOverlay()

const onClick = async () => {
  const component = await (async () => await import('./DeletionConfirmationDialog.vue'))()

  overlay.show(component['default'], {
    props,
    on: {
      delete() {
        emits('delete')
      }
    }
  })
}
</script>