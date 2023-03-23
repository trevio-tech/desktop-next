<template>
  <NuxtLayout heading="Фотоальбома">
    <template #sidebar>1</template>
    <div class="space-y-4">
      <ContentCard v-for="album in albums" :key="album.id" :entry="album" />
    </div>
  </NuxtLayout>
</template>

<script setup>
import { usePageQuery } from '@trevio/ui'
import ContentCard from '~/components/ContentCard.vue'
import { ALBUM_CARD } from '~/components/modules/albums/graphql'

const { data: { albums }} = await usePageQuery({
  query: `
    query {
      albums {
        ${ALBUM_CARD}
      }
    }
  `
})
</script>