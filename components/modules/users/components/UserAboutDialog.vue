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
      <div v-if="user.links.length > 0" class="mt-4">
        <hr class="mb-4">
        <div class="font-medium mb-2">Контактные ссылки:</div>
        <ul class="space-y-1 list-inside list-disc text-blue-500">
          <li v-for="link in user.links" :key="link.id" class="truncate">
            <a :href="link.url" target="_blank" class="hover:underline" :title="link.title">{{ link.title }}</a>
          </li>
        </ul>
      </div>
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