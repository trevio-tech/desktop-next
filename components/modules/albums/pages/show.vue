<template>
  <TheLayout :heading="data.album.title">
    <template #sidebar>
      <NuxtLink :to="`/albums/${data.album.id}/edit`">edit</NuxtLink>
    </template>
    <article class="space-y-4">
      <div v-if="data.album.text" class="prose-sm">{{ data.album.text }}</div>

      <div class="grid grid-cols-4 gap-2">
        <div v-for="image in data.album.images" :key="image.id" class="aspect-square">
          <img :src="image.sizes.default" alt="" class="w-full h-full object-cover rounded-lg block">
        </div>
      </div>
    </article>
  </TheLayout>
</template>

<script setup>
import TheLayout from '~/components/layout/TheLayout'
import { ALBUM } from '~/components/modules/albums/graphql'
import { gql, useAsyncQuery } from '#imports'
import { useRoute } from 'nuxt/app'

const query = gql`
  query getAlbum($id: Int!) {
    album(id: $id) {
      ${ALBUM}
    }
  }
`
const variables = { id: parseInt(useRoute().params.albumId) }

const { data } = await useAsyncQuery(query, variables)
</script>