<template>
  <div @mouseenter="onMouseEnter" @mouseleave="onMouseLeave" class="bg-black/40 rounded-full w-[80px] h-[80px] flex items-center justify-center ring-4 ring-white shadow">
    <div id="trash-json"></div>
  </div>
</template>

<style>
#trash-json path {
  stroke: white;
}
</style>

<script setup>
import { onMounted } from 'vue'
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

const onMouseEnter = () => {
  icon.play()
}
const onMouseLeave = () => {
  icon.stop()
}
</script>