<template>
  <div class="flex items-center">
    <NuxtLink :to="{name: 'users.show', params: {userId: user.id}}" class="block">
      <img :src="avatar" :alt="user.name" loading="lazy" width="40" height="40" class="rounded-full" />
    </NuxtLink>

    <div class="ml-2 overflow-hidden truncate text-sm">
      <NuxtLink :to="{name: 'users.show', params: {userId: user.id}}" class="font-bold">
        {{ user.name }}
      </NuxtLink>
      <div class="text-slate-400">
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useNuxtApp } from 'nuxt/app'

const props = defineProps({
  user: {
    type:     Object,
    required: true,
  },
})

const { $auth } = useNuxtApp()

let avatar = props.user.avatar

// При загрузке нового аватара,
// во всех местах где используеться этот компонент,
// аватар смениться на лету.
if ($auth.loggedIn && parseInt(props.user.id) === parseInt($auth.user.id)) {
  avatar = $auth.user.avatar
}
</script>
