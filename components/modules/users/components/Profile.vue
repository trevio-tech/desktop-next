<template>
  <div class="flex items-center">
    <NuxtLink :to="{name: 'users.show', params: {userId: user.id}}" class="block">
      <img :src="avatar" :alt="user.name" loading="lazy" width="40" height="40" class="rounded-full" />
    </NuxtLink>

    <div class="ml-2 overflow-hidden truncate text-sm">
      <NuxtLink :to="{name: 'users.show', params: {userId: user.id}}" class="font-bold">
        {{ user.name }}
      </NuxtLink>
      <SubscriptionButton v-slot="{ onSubmit, isSubscribed, isLoading }" model-type="users" :model-id="user.id">
        <div class="text-slate-400" @click="onSubmit">{{ isSubscribed ? 'Отписаться' : 'Подписаться' }}</div>
      </SubscriptionButton>
    </div>
  </div>
</template>

<script setup>
import { useNuxtApp } from '#imports'
import { SubscriptionButton } from '@trevio/ui'

const props = defineProps({
  user: {
    type:     Object,
    required: true,
  },
})

const { $auth } = useNuxtApp()

let avatar = props.user.avatar

// При загрузке нового аватара,
// во всех местах, где используется этот компонент,
// аватар смениться на лету.
if ($auth.loggedIn && parseInt(props.user.id) === parseInt($auth.user.id)) {
  avatar = $auth.user.avatar
}
</script>
