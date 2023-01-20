<template>
  <div @mouseenter="onMouseEnter" @mouseleave="onMouseLeave" class="bg-black/40 rounded-full w-[60px] h-[60px] flex items-center justify-center ring-4 ring-white shadow">
    <div id="trash-json" class="w-8 h-8"></div>
  </div>
</template>

<style>
#trash-json path {
  stroke: white;
}
</style>

<script setup>
import { onMounted, onBeforeMount } from 'vue'
import bodymovin from 'lottie-web'
import TrashIcon from './trash.json'

let icon = null

onMounted(() => {
  icon = bodymovin.loadAnimation({
    container: document.getElementById('trash-json'),
    animationData: TrashIcon,
    renderer: 'svg',
    loop: true,
    autoplay: false,
    name: 'trashIcon',
  })
})

onBeforeMount(() => {
  if (icon !== null) {
    icon.destroy()
  }
})

const onMouseEnter = () => {
  icon.play()
}
const onMouseLeave = () => {
  icon.stop()
}
</script>