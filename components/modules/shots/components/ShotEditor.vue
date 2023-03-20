<template>
  <div class="place-self-center flex flex-col items-center justify-center h-full p-4">
    <div class="h-full flex">
      <div class="bg-white flex-shrink-0 w-[480px] h-full rounded-tl-lg overflow-hidden relative">
        <canvas id="shot"></canvas>
        <ShotEditorTrashButton
          v-if="shotEditorStore.isTrash"
          id="trash"
          class="absolute"
          style="bottom: 20px; left: calc(50% - 30px)"
          @mouseup="trashAdd"></ShotEditorTrashButton>
        <ShotEditorImageButton
            v-else
            @click="addImage"
          class="absolute"
            style="bottom: 30px; left: calc(50% - 20px)"></ShotEditorImageButton>
      </div>

      <div class="w-[320px] flex flex-col h-full bg-gray-100 rounded-tr-lg overflow-hidden">
        <ul class="flex items-center cursor-pointer bg-slate-200 text-center font-medium text-sm border-b border-slate-300">
          <li @click="activeTab = 'text'" class="p-4 flex-1" :class="{'bg-slate-300': activeTab === 'text'}">Текст</li>
<!--          <li @click="activeTab = 'brushes'" class="p-4 flex-1" :class="{'bg-slate-300': activeTab === 'brushes'}">Кисти</li>-->
          <li @click="activeTab = 'stickers'" class="p-4 flex-1" :class="{'bg-slate-300': activeTab === 'stickers'}">Стикеры</li>
        </ul>

        <div class="flex-auto flex flex-col">
          <ShotEditorTextPanel v-show="activeTab === 'text'" />
<!--          <ShotEditorPanelBrushes  v-show="activeTab === 'brushes'" />-->
          <ShotEditorStickerPanel v-show="activeTab === 'stickers'"/>

          <label v-if="lastUserTravel" for="last-travel" class="mt-auto text-sm p-4 ">
            <input type="checkbox" v-model="form.isTravel" id="last-travel">
            Прикрепить к путешествию "<span class="font-medium">{{ lastUserTravel.title }}</span>"
          </label>
        </div>
      </div>
    </div>

    <footer class="bg-gray-50 w-full flex items-center rounded-b-lg">
      <ShotEditorBackground class="w-[480px]" />

      <div class="border-l -ml-[1px] p-2 flex space-x-2 w-[320px]">
        <Button :loading="isLoading" class="flex-auto" variant="secondary" @click="overlay.hide">Закрыть</Button>
        <Button :loading="isLoading" class="flex-auto" @click="onSubmit(onSubmitCallback, form.isTravel)">Опубликовать</Button>
      </div>
    </footer>
  </div>
</template>

<script setup>
import ShotEditorBackground from '~/components/modules/shots/components/ShotEditorBackground.vue'
import ShotEditorImageButton from '~/components/modules/shots/components/ShotEditorImageButton.vue'
import ShotEditorStickerPanel from '~/components/modules/shots/components/ShotEditorStickerPanel.vue'
import ShotEditorTextPanel from '~/components/modules/shots/components/ShotEditorTextPanel.vue'
import ShotEditorTrashButton from '~/components/modules/shots/components/ShotEditorTrashButton.vue'
import ShotEditorPanelBrushes from '~/components/modules/shots/components/ShotEditorPanelBrushes.vue'
import { ref } from 'vue'
import { useShotsStore } from '~/components/modules/shots/store'
import { useShotEditor } from '@trevio/ui'
import { useOverlay } from '@trevio/ui'

const overlay = useOverlay()

const {
  createShotEditor,
  trashAdd,
  shotEditorStore,
  onSubmit,
  isLoading,
  addImage,
} = useShotEditor()

const colors = ['white', 'black', 'red', 'green', 'yellow', 'orange']

const activeTab = ref('text')
const lastUserTravel = ref(null)

const form = ref({
  isTravel: false
})

const onSubmitCallback = ({ createShot }) => {
  useShotsStore().updateStory(createShot)
  overlay.hide()
}

try {
  createShotEditor()

  const { data } = await useQuery({
    query: `
      query($userId: ID) {
        lastUserTravel: travels(userId: $userId, limit: 1) {
          id
          title
        }
      }
    `
  })

  if (data.lastUserTravel.length) {
    lastUserTravel.value = data.lastUserTravel[0]
  }
} catch (error) {}
</script>