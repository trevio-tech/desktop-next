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
          <MenuListItem variant="negative">
            <template #icon>
              <Trash class="w-5 h-5" />
            </template>
            <div @click="$overlay.show(PromoDialog, {
              props: {
                entry: note
              }
            })">Продвинуть</div>
          </MenuListItem>
        </MenuList>
      </Menu>
    </template>

    <article>
      <ImageViewer>
        <div v-html="note.text" class="prose"></div>
      </ImageViewer>
    </article>

    <ContentCardSlider v-if="note?.tags.length > 0" :notIn="[note.id]" :tags="note?.tags.map((tag) => tag.id)" />
  </TheLayout>
</template>

<script setup>
import { useRoute } from 'nuxt/app'
import { useAsyncQuery } from '~/uses'
import TheLayout from '~/components/layout/TheLayout'
import { NOTE } from '../graphql'
import { ref } from 'vue'
import PromoDialog from '~/components/modules/promo/components/PromoDialog.vue'

import { Pencil, Trash } from 'lucide-vue-next'
import ContentCardSlider from '~/components/ContentCardSlider.vue'

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
</script>