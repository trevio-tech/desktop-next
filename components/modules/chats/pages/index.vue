<template>
  <TheLayout heading="Чаты">
    {{ $route.params }}
    <ul class="bg-white overflow-hidden shadow ring-1 ring-slate-200 rounded-lg divide-y divide-slate-200">
      <li v-for="chat in chats" :key="chat.id" class="flex space-x-2 p-4 hover:bg-slate-100 text-sm">
        <div class="flex-shrink-0">
          <img :src="chat.lastMessage?.user?.avatar" :alt="chat.lastMessage?.user?.name" width="40" height="40" class="rounded-full">
        </div>
        <div class="flex-auto">
          <h3 class="font-medium mb-1">{{ chat.content?.title }}</h3>
          <div class="text-slate-500">{{ chat.last_message_at }} - <span class="font-semibold">{{ chat.lastMessage?.text }}</span></div>
        </div>
      </li>
    </ul>
  </TheLayout>
</template>

<script setup>
import TheLayout from '~/components/layout/TheLayout'
import { ref } from 'vue'

const chats = ref([])

const onLoad = async () => {
  const { data } = await useQuery({
    query: `
      query {
        chatsV2 {
          id
          name
          last_message_id
          last_message_at(relative: true)
          model_type
          model_id
          content {
            id
            title
          }
          lastMessage {
            id
            user_id
            chat_id
            text
            user {
              id
              name
              avatar
            }
          }
        }
      }
    `
  })

  if (chats) {
    chats.value = data.chatsV2
  }
}

await onLoad()
</script>