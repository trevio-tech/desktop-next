<template>
  <div>
    <Button @click="textAdd" class="w-full">Добавит текст</Button>

    <h3 class="mt-6 mb-4 text-sm font-medium">Шрифт</h3>
    <ul>
      <li
          v-for="font in fonts"
          :style="{fontFamily: `${font.font}`}"
          class="text-2xl cursor-pointer"
          @click="textSetFont(font.font)">{{ font.name }}</li>
    </ul>

    <h3 class="mt-6 mb-4 text-sm font-medium">Цвет текста</h3>
    <div class="grid grid-cols-6 gap-2">
      <div
          style="background-image: linear-gradient(rgb(218, 112, 165), rgb(253, 168, 31))"
          class="w-10 h-10 rounded-full cursor-pointer ring-2 ring-white flex items-center justify-center"
          @click="textSetRandomGradient"
      >
        <Wand2 class="w-6 h-6 text-white"/>
      </div>
      <div
          v-for="color in colors"
          :key="color"
          :style="{backgroundColor: color}"
          class="w-10 h-10 rounded-full cursor-pointer ring-2 ring-white"
          @click="textSetColor(color)"
      >
      </div>
    </div>


    <h3 class="mt-6 mb-4 text-sm font-medium">Цвет подложки для текста</h3>
    <div class="grid grid-cols-6 gap-2">
      <div title="Убрать подложку" class="w-10 h-10 rounded-full cursor-pointer ring-2 ring-white flex items-center justify-center bg-slate-400"
           @click="textSetBackgroundColor('')"
      >
        <X class="w-6 h-6 text-white"/>
      </div>
      <div
          v-for="color in colors"
          :key="color"
          :style="{backgroundColor: color}"
          class="w-10 h-10 rounded-full cursor-pointer ring-2 ring-white"
          @click="textSetBackgroundColor(color)"
      >
      </div>
    </div>
  </div>
</template>

<script setup>
import { Wand2, X } from 'lucide-vue-next'
import { useShotEditor } from '#imports'

const {
  textAdd,
  textSetBackgroundColor,
  textSetColor,
  textSetFont,
  textSetRandomGradient,
} = useShotEditor()

const colors = ['white', 'black', 'red', 'green', 'yellow', 'orange']

const fonts = [
  {name: 'Обычный', font: 'Montserrat'},
  {name: 'Пропись', font: 'Pacifico'},
]
</script>