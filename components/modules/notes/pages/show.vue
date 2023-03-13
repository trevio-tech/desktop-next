<template>
  <NuxtLayout>
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

    <Article :entry="note" />

    <ChatButton
        @click="$overlay.show(defineAsyncComponent(() => import('~/components/modules/chats/components/ChatDialog.vue')), {
        props: {
          chatId: `${note.system_name}-${note.id}`,
          title: note.title
        }
      })" :messages-count="note.messages_count" />
    <ContentCardSlider v-if="note?.tags.length > 0" :notIn="[note.id]" :tags="note?.tags.map((tag) => tag.id)" />
  </NuxtLayout>
</template>

<script setup>
import Article from '~/components/Article.vue'
import ContentCardSlider from '~/components/ContentCardSlider.vue'
import PromoDialog from '~/components/modules/promo/components/PromoDialog.vue'
import { NOTE } from '../graphql'
import { Pencil, Trash } from 'lucide-vue-next'
import { ref } from 'vue'
import { useHead, useRoute } from '#imports'


const route = useRoute()
const note = ref()

try {
  const { data } = await useQuery({
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