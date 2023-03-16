<template>
  <NuxtLayout :heading="album.title">
    <template #sidebar>
      <NuxtLink :to="`/albums/${album.id}/edit`">edit</NuxtLink>
    </template>
    <Content :entry="album">
      <template #body>
        <div class="grid grid-cols-4 gap-2">
          <div v-for="image in album.images" :key="image.id" class="aspect-square">
            <img :src="image.url.default" :data-src="image.url.original" :data-id="image.id" alt="" class="w-full h-full object-cover rounded-lg block">
          </div>
        </div>
      </template>
    </Content>
  </NuxtLayout>
</template>

<script setup>
import { useRoute } from '#imports'
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