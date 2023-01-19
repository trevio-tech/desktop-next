<template>
  <div class="place-self-center flex flex-col items-center justify-center h-full p-4">
    <div class="h-full flex">
      <div class="bg-white flex-shrink-0 w-[480px] h-full rounded-tl-lg" id="shot-container">
        <canvas id="shot"></canvas>
      </div>
      <div class="w-[320px] h-full bg-gray-100 rounded-tr-lg">
        <div @click="addText">addText</div>
      </div>
    </div>
    <footer class="p-4 bg-gray-100 w-full rounded-b-lg"></footer>
  </div>
</template>

<script setup>
import useCanvas from '~/components/modules/shots/composables/useCanvas'
import { X } from 'lucide-vue-next'
const { addText } = useCanvas()

</script>