<template>
  <div v-if="count" class="overlay">
    <div class="overlay-backdrop" :style="{
      zIndex: count
    }"></div>
    <Component
      v-for="(overlay, index) in $overlay.stack"
      :is="overlay.component"
      :key="overlay.key"
      :style="{
        zIndex: index + 1
      }"
      v-bind="overlay.props"
      v-on="overlay.on"
      role="dialog"
    ></Component>
  </div>
</template>

<script setup>
import { getCurrentInstance, computed } from 'vue'
const { $overlay } = getCurrentInstance().appContext.config.globalProperties
const count = computed(() => $overlay.stack.length)
</script>

<style>
.overlay {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  overflow: hidden;
}
.overlay-backdrop {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0,0,0,.4);
  z-index: 1;
}
</style>