<template>
  <div @click="onClick">
    <slot></slot>
  </div>
</template>

<style scoped>
:slotted(*) {
  pointer-events: v-bind(pointerEvents);
}
</style>

<script setup>
import { useNuxtApp } from '#app'
import { defineAsyncComponent, ref, watch } from 'vue'

const { $auth, $overlay } = useNuxtApp()
const pointerEvents = ref($auth.loggedIn ? 'auto' : 'none')

watch(() => $auth.loggedIn, (loggedIn) => {
  pointerEvents.value = loggedIn ? 'auto' : 'none'
})

const onClick = async () => {
  if (! $auth.loggedIn) {

    $overlay.show(
        defineAsyncComponent(() => import('~/components/AuthDialog.vue'))
    )
  }
}
</script>