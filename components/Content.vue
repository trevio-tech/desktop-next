<template>
  <article class="rounded-t-lg bg-white">
    <header class="flex items-center justify-between p-4 mb-4 border-b">
      <div class="flex items-center space-x-2">
        <NuxtLink :to="{name: 'users.show', params: {userId: entry.user.id}}" class="w-10 flex-shrink-0">
          <img :src="entry.user.avatar" :alt="entry.user.name" class="rounded-full" />
        </NuxtLink>
        <div class="text-sm">
          <NuxtLink :to="{name: 'users.show', params: {userId: entry.user.id}}" class="font-medium">
            {{ entry.user.name }}
          </NuxtLink>
          <div class="text-slate-400">{{ entry.published_at }}</div>
        </div>
      </div>

      <ContentOwnerDropdownMenu
        v-if="parseInt(entry.user_id) === parseInt($auth.user?.id)"
        :model-type="entry.system_name"
        :model-id="entry.id"
        :entry="entry"
      />
      <SubscriptionButton
        v-else
        v-slot="{ onSubmit, isSubscribed, isLoading }"
        model-type="users"
        :model-id="entry.user_id"
      >
        <Button :loading="isLoading" @click="onSubmit('users', entry.user_id)" type="button">
          {{ isSubscribed ? 'Отписаться' : 'Подписаться' }}
        </Button>
      </SubscriptionButton>
    </header>

    <div class="p-4">
      <slot name="after-header" />

      <h2 class="heading text-2xl mb-4">{{ entry.title }}</h2>

      <ImageViewer>
        <slot name="body">
          <div v-html="entry.text" class="prose"></div>
        </slot>
      </ImageViewer>
    </div>
    <ContentFooter :entry="entry" />
  </article>
</template>

<script setup>
import ContentFooter from '~/components/ContentFooter.vue'
import ContentOwnerDropdownMenu from './ContentOwnerDropdownMenu.vue'
import { Button, SubscriptionButton, useSubscriptionsStore, ImageViewer } from '@trevio/ui'

const store = useSubscriptionsStore()

defineProps({
  entry: {
    type:     Object,
    required: true,
  }
})
</script>