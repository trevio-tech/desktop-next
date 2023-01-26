<template>
  <div class="flex space-x-2">
    <div v-for="item in items" :key="item.id" class="relative">
      <img :src="item.image" :alt="item.user.name" width="80" height="180" class="cursor-pointer rounded-lg" @click="onClick(isStory ? item.user_id : item.id)" />
      <NuxtLink :to="{name: 'users.show', params: {userId: item.user_id}}" class="absolute bottom-2 left-2">
        <img :src="item.user.avatar" :alt="item.user.name" width="24" class="rounded-full block" />
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
import ShotDialog from '~/components/modules/shots/components/ShotDialog.vue'
import StoryDialog from '~/components/modules/shots/components/StoryDialog.vue'
import { computed } from 'vue'
import { useRouter, useNuxtApp } from 'nuxt/app'


const props = defineProps({
  items: {
    type: Array
  },
  isStory: {
    type: Boolean,
    default: false,
  }
})

const { $overlay, $auth, $authChannel } = useNuxtApp()
const router = useRouter()
const hash = computed(() => router.currentRoute.value.hash)

try {
  if ($auth.loggedIn) {
    $authChannel.here((data) => console.log(data))
  }
} catch (error) {
  console.log(error)
}

const showDialog = () => {
  $overlay.show(props.isStory ? StoryDialog : ShotDialog, {
    onHide: async () => {
      await router.push({
        name: router.currentRoute.value.name,
      })
    }
  })
}

const onClick = async (itemId) => {
  await router.push({
    name: router.currentRoute.value.name,
    hash: props.isStory
      ? `#story-${itemId}`
      : `#shot-${itemId}`
  })

  showDialog()
}

// При загрузке страницы проверяем хеш.
if (hash.value.length && (hash.value.includes('#shot-') || hash.value.includes('#story-'))) {
  showDialog()
}
</script>