<template>
  <div class="custom-dialog1">
    <div style="background-color: #fff; padding: 16px; max-width: 480px; box-shadow: 0 0 4px 4px rgba(0,0,0,.4); position: absolute">
      <header @click="$overlay.hide">Закрыть {{ testProps }}</header>
      <div @click="onClick">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<style>
.custom-dialog1 {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
</style>

<script>
import { defineAsyncComponent } from 'vue'

export default {
  name: 'Test',
  props: {
    testProps: String
  },
  methods: {
    onClick() {
      this.$overlay.show(defineAsyncComponent(() => import('~/components/dev/Overlay/modals/Test1')))
    }
  }
}
</script>