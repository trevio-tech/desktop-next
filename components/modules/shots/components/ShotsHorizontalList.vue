<template>
  <div class="flex space-x-2">
    <button v-if="$auth.loggedIn" @click="createShot" class="transition-colors cursor-pointer text-gray-400 rounded-lg w-[80px] h-[140px] bg-gray-200 flex items-center justify-center hover:text-purple-400 hover:bg-purple-200">
      <PlusCircle class="w-8 h-8" />
    </button>
    <div v-for="item in items" :key="item.id" class="relative">
      <img :src="item.image" :alt="item.user.name" width="80" height="140" class="cursor-pointer rounded-lg" @click="onClick(isStory ? item.user_id : item.id)" />
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
import { useNuxtApp } from '#imports'
import { PlusCircle } from 'lucide-vue-next'

const props = defineProps({
  items: {
    type: Array
  },
  isStory: {
    type: Boolean,
    default: false,
  }
})

const { $overlay, $auth } = useNuxtApp()
const router = useRouter()
const hash = computed(() => router.currentRoute.value.hash)

const createShot = () => {
  $overlay.hide()
  // $overlay.show(defineAsyncComponent(() => import('~/components/modules/shots/components/ShotEditor.vue')))
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