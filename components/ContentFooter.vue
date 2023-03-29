<template>
  <footer class="flex items-center p-4 border-t border-t-stone-100">
    <IsLoggedIn>
      <Like
        :model-type="entry.system_name"
        :model-id="entry.id"
        :is-liked="entry.like?.is_liked"
        :count="entry.likes_count"
      />
    </IsLoggedIn>

    <ChatButton
        class="ml-1"
      @click="$overlay.show(defineAsyncComponent(() => import('~/components/modules/chats/components/ChatDialog.vue')), {
      props: {
        chatId: `${entry.system_name}-${entry.id}`,
        title: entry.title
      }
      })" :messages-count="entry.messages_count" />

    <BookmarkButton
      class="ml-auto"
      v-model="bookmarks"
      :model-type="entry.system_name"
      :model-id="entry.id"
    />
  </footer>
</template>

<script setup>
import BookmarkButton from '~/components/modules/bookmarks/components/BookmarkButton'
import useContentCard from '~/components/ContentCard/useContentCard'
import { IsLoggedIn } from '@trevio/ui'

const props = defineProps({
  entry: {
    type: Object,
    required: true
  }
})

const { bookmarks } = useContentCard(props)
</script>