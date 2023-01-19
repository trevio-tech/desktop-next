<template>
  <div class="place-self-center flex flex-col items-center justify-center h-full p-4">
    <div class="h-full flex">
      <div class="bg-white flex-shrink-0 w-[480px] h-full rounded-tl-lg" id="shot-container">
        <canvas id="shot"></canvas>
      </div>
      <div class="w-[320px] h-full bg-gray-100 rounded-tr-lg p-2">
        <Button @click="addText" class="w-full">Добавит текст</Button>
        <Button @click="changeFillColor('red')" class="w-full">Красный</Button>
        <Button @click="changeFillColor('green')" class="w-full">Зеленый</Button>
        <Button @click="changeFillColor('yellow')" class="w-full">Желтый</Button>
        <Button @click="changeFillColor('orange')" class="w-full">Оранжевый</Button>
      </div>
    </div>
    <footer class="p-4 bg-gray-100 w-full rounded-b-lg"></footer>
  </div>
</template>

<script setup>
import { useShotEditor } from '#imports'
const { addText, changeFillColor } = useShotEditor()
</script>