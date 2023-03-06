<template>
  <div class="divide-y divide-gray-200">
    <div class="pt-4 pb-8 px-4">
      <h3 class="mb-4 text-sm font-bold">Кисть</h3>
      <div @click="setBrush('Crayon')">Мелок</div>
      <div @click="setBrush('Fur')">Мех</div>
      <div @click="setBrush('Ink')">Чернила</div>
      <div @click="setBrush('Marker')">Маркер</div>
      <div @click="setBrush('Web')">Паутина</div>
    </div>


    <div class="py-8 px-4">
      <h3 class="mb-4 text-sm font-bold">Цвет кисти</h3>
      <div class="grid grid-cols-6 gap-2">
        <div
          v-for="color in colors"
          :key="color"
          :style="{backgroundColor: color}"
          class="w-10 h-10 rounded-full cursor-pointer ring-2 ring-white"
          @click="setBrushColor(color)"
        >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>


const { setBrush, setBrushColor } = useShotEditor()

const colors = ['white', 'black', 'red', 'green', 'yellow', 'orange']
</script>