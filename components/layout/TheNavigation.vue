<template>
  <nav>
    <ul class="main-nav space-y-px mb-4">
      <li>
        <NuxtLink to="/" class="px-3 py-2 hover:bg-slate-100 rounded-lg flex items-center space-x-3">
          <Users class="w-5 h-5 text-slate-500" />
          <span class="font-medium">Моя лента</span>
        </NuxtLink>
      </li>
      <li>
        <NuxtLink to="/new" class="px-3 py-2 hover:bg-slate-100 rounded-lg flex items-center space-x-3">
          <Clock2 class="w-5 h-5 text-slate-500" />
          <span class="font-medium">Свежее</span>
        </NuxtLink>
      </li>
      <li>
        <NuxtLink to="/top" class="px-3 py-2 hover:bg-slate-100 rounded-lg flex items-center space-x-3">
          <Flame class="w-5 h-5 text-orange-500" />
          <span class="font-medium">Топ</span>
        </NuxtLink>
      </li>
    </ul>

    <ul class="main-nav font-medium text-sm space-y-px">
      <li v-for="(item, index) in items" :key="index">
        <NuxtLink :to="item.href" class="px-3 py-2 hover:bg-slate-100 rounded-lg block">{{ item.name }}</NuxtLink>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import { Clock2, Users, Flame, Circle } from 'lucide-vue-next'

const items = [
  { name: 'Путешествия', href: '/travels' },
  { name: 'Заметки', href: '/notes' },
  { name: 'Отзывы', href: '/reviews' },
  { name: 'Фотоальбомы', href: '/albums' },
  { name: 'Вопросы и ответы', href: '/questions' },
  { name: 'Чаты', href: '/chats' }
]
</script>

<style lang="scss">
.main-nav {
  .router-link-active {
    @apply bg-slate-200/80;
  }
}
</style>