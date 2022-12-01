<template>
  <div :id="`message-${message.id}`" class="flex space-x-2 p-4" :class="{'bg-yellow-100': isSelected}" @click="onEdit">
    <div class="flex-shrink-0">
      <NuxtLink :to="{name: 'users.show', params: {userId: message.user.id}}">
        <img :src="message.user.avatar" :alt="message.user.name" class="w-8 h-8 rounded-full block" />
      </NuxtLink>
    </div>
    <div class="text-sm">
      <div class="mb-1">
        <NuxtLink :to="{name: 'users.show', params: {userId: message.user.id}}">
          <span class="font-medium">{{ message.user.name }}</span> &middot; <span class="text-gray-400">{{ message.time }}</span>
        </NuxtLink>
      </div>
      <div>{{ message.text }}</div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useChatStore } from '~/components/modules/chats/stores/chat'

const props = defineProps({
  message: {
    type:     Object,
    required: true,
  }
})

const store = useChatStore()

const isSelected = computed(
    () => store.selectedMessages[props.message.id]?.id > 0
)

const onEdit = () => {
  store.selectMessage(props.message)
}
</script>