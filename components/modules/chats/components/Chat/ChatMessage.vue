<template>
  <div>
    {{ message.text }}
  </div>
</template>

<script setup>
defineProps({
  message: {
    type: Object,
    required: true,
  }
})
</script>