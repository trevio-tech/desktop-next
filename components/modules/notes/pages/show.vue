<template>
  <TheLayout :heading="note.title">
    <template #sidebar>
      <Menu>
        <MenuList>
          <MenuListItem>
            <template #icon>
              <Pencil class="w-5 h-5" />
            </template>
            <NuxtLink :to="`/notes/${note.id}/edit`">Редактировать</NuxtLink>
          </MenuListItem>
          <MenuListItem variant="negative">
            <template #icon>
              <Trash class="w-5 h-5" />
            </template>
            <NuxtLink :to="`/notes/${note.id}/edit`">Удалить</NuxtLink>
          </MenuListItem>
        </MenuList>
      </Menu>
    </template>

    <article class="bg-white p-4 overflow-hidden rounded-md shadow ring-1 ring-slate-200">
      <ImageViewer>
        <div v-html="note.text" class="prose-sm"></div>
      </ImageViewer>
    </article>
    <div ref="similarBlock" class="mt-4">
      <h3 class="text-xl font-semibold mb-2">Читайте также</h3>
      <div class="space-y-2">
        <div v-for="similarNote in similarNotes" class="truncate">
          <NuxtLink :to="{name: 'notes.show', params: {noteId: similarNote.id}}">{{ similarNote.title }}</NuxtLink>
        </div>
      </div>
    </div>
  </TheLayout>
</template>

<script setup>
import { useRoute } from 'nuxt/app'
import { useAsyncQuery } from '~/uses'
import { useFetch } from '~/composables'
import TheLayout from '~/components/layout/TheLayout'
import { NOTE } from '../graphql'
import { ImageViewer } from '@trevio/ui'
import { ref } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'

import Menu from '../../../../../ui/src/components/Menu/Menu.vue'
import MenuList from '../../../../../ui/src/components/Menu/MenuList.vue'
import MenuListItem from '../../../../../ui/src/components/Menu/MenuListItem.vue'
import { Pencil, Trash } from 'lucide-vue-next'

const route = useRoute()
const note = ref()

try {
  const { data } = await useAsyncQuery({
    query: `
      query($id: Int!) {
        ${NOTE}
      }
    `,
    variables: {
      id: parseInt(route.params.noteId)
    }
  })

  note.value = data.note
} catch (error) {
  console.log(error)
}

// Похожие заметки
const similarBlock = ref()
const similarNotes = ref([])

const { stop } = useIntersectionObserver(
    similarBlock,
    async ([{ isIntersecting }], observerElement) => {
      if (isIntersecting && similarNotes.value.length === 0) {
        similarNotes.value = await getSimilar(note.value.tags)
      }
    },
)

const getSimilar = async (tags) => {
  const { data } = await useFetch({
    query: `
      query getSimilarNotes ($tags: [Int], $notIn: [Int], $limit: Int){
        notes (tags: $tags, notIn: $notIn, limit: $limit) {
          id
          title
        }
      }
    `,
    variables: {
      tags: tags.map(tag => tag.id),
      notIn: [note.value.id],
      limit: 5
    }
  })

  return data?.notes || []
}
</script>