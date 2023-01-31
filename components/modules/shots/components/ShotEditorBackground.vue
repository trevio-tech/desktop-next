<template>
  <div class="flex items-center space-x-2 p-2">
    <div
        title="Добавить фоновое изображение"
        style="background-image: linear-gradient(rgb(118, 212, 165), rgb(153, 168, 31))"
        class="w-10 h-10 rounded-lg cursor-pointer ring-2 ring-white flex items-center justify-center"
        @click="generateRandomBackgroundGradient"
    >
      <ImagePlus class="w-5 h-5 text-white"/>
    </div>
    <div
        title="Случайный цвет фона"
        style="background-image: linear-gradient(rgb(218, 112, 165), rgb(253, 168, 31))"
        class="w-10 h-10 rounded-lg cursor-pointer ring-2 ring-white flex items-center justify-center"
        @click="generateRandomBackgroundGradient"
    >
      <Wand2 class="w-5 h-5 text-white"/>
    </div>
    <div
      v-for="color in colors" :key="color"
      :style="{ backgroundColor: color}"
      class="w-10 h-10 rounded-lg cursor-pointer ring-2 ring-white"
      @click="setBackgroundColor(color)"
    >
    </div>
  </div>
</template>

<script setup>
import { Wand2, ImagePlus } from 'lucide-vue-next'
import { useShotEditor } from '#imports'

const { generateRandomBackgroundGradient, setBackgroundColor } = useShotEditor()


const colors = ['white', 'black', 'red', 'green', 'yellow', 'orange']
</script>