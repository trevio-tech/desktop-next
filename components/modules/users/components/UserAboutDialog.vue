<template>
  <Dialog title="Подробная информация">
    <div class="w-[480px] text-sm">
      <div class="flex items-center space-x-2">
        <AtSign />
        <div>{{ user.name }}</div>
      </div>
      <hr class="my-4">
      <div class="flex items-center space-x-2">
        <Cake />
        <div>День рождения: <span class="font-medium">{{ user.birthday }}</span></div>
      </div>
      <div v-if="user.place" class="flex items-center space-x-2 mt-4">
        <Home />
        <div>Город: <span class="font-medium">{{ user.place.full_name }}</span></div>
      </div>
      <hr class="my-4">
      <div class="font-medium mb-2">Описание:</div>
      {{ user.description }}
    </div>
  </Dialog>
</template>

<script setup>
import Dialog from '~/components/base/Dialog.vue'
import { AtSign, Cake, Home } from 'lucide-vue-next'

const props = defineProps({
  user: {
    type: Object,
    required: true,
  },
})
</script>