<template>
  <div class="place-self-center flex flex-col items-center justify-center h-full p-4">
    <div class="h-full flex">
      <div class="bg-white flex-shrink-0 w-[480px] h-full rounded-tl-lg relative" id="shot-container">
        <canvas id="shot"></canvas>

        <ShotEditorTrash
          v-if="isTrash"
          @mouseup="addToTrash" id="trash" class="absolute" style="bottom: 20px; left: calc(50% - 40px)" />
      </div>

      <div class="w-[320px] h-full bg-gray-100 rounded-tr-lg p-4">
        <Button @click="addText" class="w-full">Добавит текст</Button>

        <h3 class="mt-4 mb-2 font-bold text-wh">Цвет</h3>
        <div class="grid grid-cols-4 gap-2">
          <div
            v-for="color in colors"
            :key="color"
            :style="{backgroundColor: color}"
            class="w-16 h-16 rounded-full cursor-pointer ring-2 ring-white"
            @click="changeFillColor(color)"
          >
          </div>
        </div>
      </div>
    </div>
    <footer class="p-4 bg-gray-50 w-full rounded-b-lg"></footer>
  </div>
</template>

<script setup>
import { useShotEditor } from '#imports'
import ShotEditorTrash from '~/components/modules/shots/components/ShotEditorTrash.vue'

const { addText, changeFillColor, addToTrash, isTrash } = useShotEditor()

const colors = ['white', 'black', 'red', 'green', 'yellow', 'orange']
</script>