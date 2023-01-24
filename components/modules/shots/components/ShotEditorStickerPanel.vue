<template>
  <div>
    <h3 class="mb-4 text-sm font-medium">Стикеры</h3>
    <div class="grid grid-cols-3 gap-4">
      <img src="/images/shots/stickers/1.png" @click="emit('addSticker', '/images/shots/stickers/1.png')" class="object-cover w-full h-full" alt="">
      <img src="/images/shots/stickers/2.png" @click="emit('addSticker', '/images/shots/stickers/2.png')" class="object-cover w-full h-full" alt="">
      <img src="/images/shots/stickers/3.png" @click="emit('addSticker', '/images/shots/stickers/3.png')" class="object-cover w-full h-full" alt="">
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(['addSticker'])
</script>