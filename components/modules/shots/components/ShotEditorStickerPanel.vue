<template>
  <div class="p-4">
    <h3 class="mb-4 text-sm font-bold">Стикеры</h3>
    <div class="grid grid-cols-3 gap-4">
      <img src="/images/shots/stickers/1.png" @click="addSticker('/images/shots/stickers/1.png')" class="object-cover w-full h-full" alt="">
      <img src="/images/shots/stickers/2.png" @click="addSticker('/images/shots/stickers/2.png')" class="object-cover w-full h-full" alt="">
      <img src="/images/shots/stickers/3.png" @click="addSticker('/images/shots/stickers/3.png')" class="object-cover w-full h-full" alt="">
    </div>
  </div>
</template>

<script setup>
import { useShotEditor } from '#imports'

const { addSticker } = useShotEditor()
</script>