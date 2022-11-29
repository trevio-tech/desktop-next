<template>
  <TheLayout :heading="album.title">
    <template #sidebar>
      <NuxtLink :to="`/albums/${album.id}/edit`">edit</NuxtLink>
    </template>
    <article class="space-y-4">
      <div v-if="album.text" class="prose-sm">{{ album.text }}</div>

      <ImageViewer>
        <div class="grid grid-cols-4 gap-2">
          <div v-for="image in album.images" :key="image.id" class="aspect-square">
            <img :src="image.sizes.default" :data-src="image.url" :data-id="image.id" alt="" class="w-full h-full object-cover rounded-lg block">
          </div>
        </div>
      </ImageViewer>
    </article>
  </TheLayout>
</template>

<script setup>
import TheLayout from '~/components/layout/TheLayout'
import { ALBUM } from '~/components/modules/albums/graphql'
import { ImageViewer } from '@trevio/ui'
import { ref } from 'vue'
import { useRoute } from 'nuxt/app'

const album = ref()

try {
  const { data } = await useQuery({
    query: `
      query getAlbum($id: Int!) {
        album(id: $id) {
          ${ALBUM}
        }
      }
    `,
    variables: {
      id: parseInt(useRoute().params.albumId)
    }
  })

  album.value = data.album
} catch (error) {}
</script>