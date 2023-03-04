<template>
  <NuxtLayout :heading="album.title">
    <template #sidebar>
      <NuxtLink :to="`/albums/${album.id}/edit`">edit</NuxtLink>
    </template>
    <article class="space-y-4">
      <h1 class="text-2xl mb-4">{{ album.title }}</h1>
      <div v-if="album.text" class="prose-sm">{{ album.text }}</div>

      <ImageViewer>
        <div class="grid grid-cols-4 gap-2">
          <div v-for="image in album.images" :key="image.id" class="aspect-square">
            <img :src="image.url.default" :data-src="image.url.original" :data-id="image.id" alt="" class="w-full h-full object-cover rounded-lg block">
          </div>
        </div>
      </ImageViewer>
    </article>
  </NuxtLayout>
</template>

<script setup>

import { ALBUM } from '~/components/modules/albums/graphql'
import { ref } from 'vue'

import { useQuery } from '@trevio/ui'

const album = ref()

try {
  const { data } = await useQuery({
    query: `
      query getAlbum($id: ID!) {
        album(id: $id) {
          ${ALBUM}
        }
      }
    `,
    variables: {
      id: useRoute().params.albumId
    }
  })

  album.value = data.album
} catch (error) {}
</script>