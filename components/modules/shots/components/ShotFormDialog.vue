<template>
  <div class="place-self-center flex flex-col items-center justify-center h-full p-4">
    <div class="h-full flex">
      <div class="bg-white flex-shrink-0 w-[480px] h-full rounded-tl-lg overflow-hidden relative" id="shot-container">
        <canvas id="shot"></canvas>

        <ShotEditorTrash
            v-if="isTrash"
            @mouseup="addToTrash" id="trash" class="absolute" style="bottom: 20px; left: calc(50% - 30px)"/>
      </div>

      <div class="w-[320px] h-full bg-gray-100 rounded-tr-lg overflow-hidden">
        <ul class="flex items-center cursor-pointer bg-slate-200 text-center font-medium text-sm border-b border-slate-300">
          <li @click="activeTab = 'text'" class="p-4 flex-auto" :class="{'bg-slate-300': activeTab === 'text'}">Текст</li>
          <li @click="activeTab = 'stickers'" class="p-4 flex-auto" :class="{'bg-slate-300': activeTab === 'stickers'}">Стикеры</li>
          <li @click="activeTab = 'more'" class="p-4 flex-auto" :class="{'bg-slate-300': activeTab === 'more'}">Еще</li>
        </ul>

        <div class="p-4">
          <ShotEditorTextPanel
              v-show="activeTab === 'text'"
              @add-text="addText"
              @set-background-color="setTextBackgroundColor"
              @set-text-color="changeFillColor"
              @set-text-gradient="generateRandomTextGradient"
          />
          <ShotEditorStickerPanel
              v-show="activeTab === 'stickers'"
              @add-sticker="addSticker"
          />
          <ShotEditorMorePanel
              v-show="activeTab === 'more'"
              v-model="form.travel_id"
          />
        </div>
      </div>
    </div>

    <footer class="bg-gray-50 w-full flex items-center rounded-b-lg">
      <div class="w-[480px] flex items-center space-x-2 py-2 px-4">
        <div
            style="background-image: linear-gradient(rgb(218, 112, 165), rgb(253, 168, 31))"
            class="w-8 h-8 rounded-lg cursor-pointer ring-2 ring-white flex items-center justify-center"
            @click="generateRandomBackgroundGradient"
        >
          <Wand2 class="w-4 h-4 text-white"/>
        </div>
        <div
            v-for="color in colors"
            :key="color"
            :style="{backgroundColor: color}"
            class="w-8 h-8 rounded-lg cursor-pointer ring-2 ring-white"
            @click="setBackgroundColor(color)"
        >
        </div>
      </div>

      <div class="border-l p-2 flex space-x-2 w-[320px]">
        <Button class="flex-auto" variant="secondary" @click="$overlay.hide">Закрыть</Button>
        <Button class="flex-auto">Опубликовать</Button>
      </div>
    </footer>
  </div>
</template>

<script setup>
import ShotEditorMorePanel from '~/components/modules/shots/components/ShotEditorMorePanel.vue'
import ShotEditorStickerPanel from '~/components/modules/shots/components/ShotEditorStickerPanel.vue'
import ShotEditorTextPanel from '~/components/modules/shots/components/ShotEditorTextPanel.vue'
import ShotEditorTrash from '~/components/modules/shots/components/ShotEditorTrash.vue'
import { Wand2 } from 'lucide-vue-next'
import { ref } from 'vue'
import { useShotEditor } from '#imports'

const {
  addSticker,
  addText,
  addToTrash,
  changeFillColor,
  generateRandomBackgroundGradient,
  generateRandomTextGradient,
  isTrash,
  setBackgroundColor,
  setTextBackgroundColor,
} = useShotEditor()

const colors = ['white', 'black', 'red', 'green', 'yellow', 'orange']

const activeTab = ref('text')

const form = ref({
  travel_id: null
})
</script>