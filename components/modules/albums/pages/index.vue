<template>
  <TheLayout heading="Фотоальбома">
    <template #sidebar>1</template>
    <div class="space-y-4">
      <div v-for="album in albums" :key="album.id">
        <NuxtLink :to="{name: 'albums.show', params: {albumId: album.id}}">{{ album.title }}</NuxtLink>
      </div>
    </div>
  </TheLayout>
</template>

<script setup>
import TheLayout from '~/components/layout/TheLayout'
import { useQuery } from '#imports'

const { data: { albums }} = await useQuery({
  query: `
    query {
      albums {
        id
        title
      }
    }
  `
})
</script>