<template>
  <Dialog title="Что хотите создать?">
    <ul class="w-[640px] grid grid-cols-2 gap-4">
      <li v-ripple v-for="(item, index) in items" :key="index"
          class="flex items-center cursor-pointer bg-white rounded-lg p-4 hover:bg-blue-50 hover:border-blue-200 border border-gray-100">
        <NuxtLink :to="item.href" @click="$overlay.hide" class="block">
          <div class="font-medium">{{ item.name }}</div>
          <div class="text-xs text-gray-400">{{ item.text }}</div>
        </NuxtLink>
      </li>
    </ul>
  </Dialog>
</template>

<script setup>
import { Dialog } from '~/components/dev/Overlay'

const items = [
  {
    name: 'Путешествие',
    text: 'Сборник заметок, отзывов и фотографий из вашего приключения',
    href: '/travels/create'
  },
  {
    name: 'Заметка',
    text: 'Подробности, которыми вы хотите поделиться',
    href: '/notes/create'
  },
  {
    name: 'Отзыв',
    text: 'Не держите в себе! Поделитесь мнением с читателем',
    href: '/reviews/create'
  },
  {
    name: 'Фотоальбом',
    text: 'Яркие моменты, собранные в ваш фотоальбом',
    href: '/albums/create'
  },
  {
    name: 'Вопрос',
    text: 'Задайте вопрос, на который не смогли найти ответ',
    href: '/questions/create'
  },
  {
    name: 'Шот',
    text: 'Эмоции и истории здесь и сейчас',
    href: '/shots/create'
  }
]
</script>