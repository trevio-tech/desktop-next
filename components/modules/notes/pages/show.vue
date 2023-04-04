<template>
  <NuxtLayout>
    <template #sidebar>
      <Menu>
        <MenuList>
          <MenuListItem variant="negative">
            <template #icon>
              <Trash class="w-5 h-5" />
            </template>
            <div @click="$overlay.show(PromoDialogV2, {
              props: {
                entry: note
              }
            })">Продвинуть</div>
          </MenuListItem>
        </MenuList>
      </Menu>
    </template>

    <Content :entry="note" />
<!--    <ContentCardSlider v-if="note?.tags.length > 0" :notIn="[note.id]" :tags="note?.tags.map((tag) => tag.id)" />-->
  </NuxtLayout>
</template>

<script setup>
import Content from '~/components/Content.vue'
import ContentCardSlider from '~/components/ContentCardSlider.vue'
import PromoDialogV2 from '~/components/modules/promo/components/PromoDialogV2.vue'
import { NOTE } from '../graphql'
import { Pencil, Trash } from 'lucide-vue-next'
import { ref } from 'vue'
import { useHead, useRoute } from '#imports'
import { usePageQuery } from '@trevio/ui'


const route = useRoute()
const note = ref()

try {
  const { data } = await usePageQuery({
    query: `
      query($id: ID!) {
        ${NOTE}
      }
    `,
    variables: {
      id: route.params.noteId
    }
  })

  note.value = data.note

  useHead({
    title: `${data.note.title} - Заметки`,
  })
} catch (error) {
  console.log(error)
}
</script>