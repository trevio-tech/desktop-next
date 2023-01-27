<template>
  <div>
    <Button @click="emit('addText')" class="w-full">Добавит текст</Button>

    <div @click="emit('changeFont', 'Montserrat')" class="mt-6 text-2xl">Обычный</div>
    <div @click="emit('changeFont', 'Pacifico')" class="text-2xl" style="font-family: 'Pacifico';">Пропись</div>

    <h3 class="mt-6 mb-4 text-sm font-medium">Цвет текста</h3>
    <div class="grid grid-cols-6 gap-2">
      <div
          style="background-image: linear-gradient(rgb(218, 112, 165), rgb(253, 168, 31))"
          class="w-10 h-10 rounded-full cursor-pointer ring-2 ring-white flex items-center justify-center"
          @click="emit('setTextGradient')"
      >
        <Wand2 class="w-6 h-6 text-white"/>
      </div>
      <div
          v-for="color in colors"
          :key="color"
          :style="{backgroundColor: color}"
          class="w-10 h-10 rounded-full cursor-pointer ring-2 ring-white"
          @click="emit('setTextColor', color)"
      >
      </div>
    </div>


    <h3 class="mt-6 mb-4 text-sm font-medium">Цвет подложки для текста</h3>
    <div class="grid grid-cols-6 gap-2">
      <div title="Убрать подложку" class="w-10 h-10 rounded-full cursor-pointer ring-2 ring-white flex items-center justify-center bg-slate-400"
           @click="emit('setBackgroundColor', '')"
      >
        <X class="w-6 h-6 text-white"/>
      </div>
      <div
          v-for="color in colors"
          :key="color"
          :style="{backgroundColor: color}"
          class="w-10 h-10 rounded-full cursor-pointer ring-2 ring-white"
          @click="emit('setBackgroundColor', color)"
      >
      </div>
    </div>
  </div>
</template>

<script setup>
import { Wand2, X } from 'lucide-vue-next'

const emit = defineEmits(['addText', 'setBackgroundColor', 'setTextColor', 'setTextGradient', 'changeFont'])
const colors = ['white', 'black', 'red', 'green', 'yellow', 'orange']
</script>