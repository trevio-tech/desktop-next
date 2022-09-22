<template>
  <div>
    <div class="flex items-center space-x-2">
      <VCheckbox v-for="(item, key) in list" :key="key" :value="key" v-model="content">{{ item }}</VCheckbox>
    </div>
    {{ content }}
  </div>
</template>

<script setup>
import { VCheckbox } from '@trevio/ui'
import { ref } from 'vue'

const content = ref([])

const list = {
  travels:    'Путешествия',
  notes:      'Заметки',
  reviews:    'Отзывы',
  albums:     'Фотоальбомы',
  questions:  'Вопросы',
}
</script>