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
  { name: 'Путешествия', href: '/' },
  { name: 'Заметки', href: '/' },
  { name: 'Отзывы', href: '/' },
  { name: 'Фотоальбомы', href: '/' },
  { name: 'Вопросы и ответы', href: '/' },
  { name: 'Блоги компаний', href: '/' }
]
</script>