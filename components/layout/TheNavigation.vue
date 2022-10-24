<template>
  <nav>
    <ul class="font-semibold space-y-1">
      <li v-for="(item, index) in items" :key="index">
        <NuxtLink :to="item.href" class="block w-full">{{ item.name }}</NuxtLink>
      </li>
    </ul>
  </nav>
</template>

<script setup>
const items = [
  { name: 'Путешествия', href: '/travels' },
  { name: 'Заметки', href: '/notes' },
  { name: 'Отзывы', href: '/reviews' },
  { name: 'Фотоальбомы', href: '/albums' },
  { name: 'Вопросы и ответы', href: '/questions' },
  { name: 'Блоги компаний', href: '/posts' }
]
</script>