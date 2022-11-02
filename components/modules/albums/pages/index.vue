<template>
  <TheLayout heading="Фотоальбома">
    <template #sidebar>1</template>
    <div class="space-y-4">
      <div v-for="album in albums.data" :key="album.id">
        <NuxtLink :to="{name: 'albums.edit', params: {albumId: album.id}}">{{ album.title }}</NuxtLink>
      </div>
    </div>
  </TheLayout>
</template>

<script setup>
import TheLayout from '~/components/layout/TheLayout'
import { useAsyncGql } from '~/uses'

const { data: { value: { albums }}} = await useAsyncGql(`
  query {
    albums {
      data {
        id
        title
      }
    }
  }
`)
</script>