<template>
  <article class="p-3 bg-white hover:bg-stone-50 flex items-center">
    <NuxtLink :to="`/${subscription.system_name}/${subscription.id}`" class="flex-auto flex items-center overflow-hidden pr-4">
      <img src="/images/noavatar.svg" alt="" class="w-10 h-10 mr-2"
           :class="[subscription.system_name === 'users' ? 'rounded-full' : 'rounded-lg']">

      <h3 class="truncate text-sm" :title="getHeading">{{ getHeading }}</h3>
    </NuxtLink>
    <div class="flex-shrink-0">
      <SubscriptionButton
        :model-type="subscription.system_name"
        :model-id="subscription.id"
        v-slot="{ onSubmit, isLoading, isSubscribed }">
        <Button @click="onSubmit" :loading="isLoading" variant="secondary">
          {{ isSubscribed ? 'Отписаться' : 'Подписаться' }}
        </Button>
      </SubscriptionButton>
    </div>
  </article>
</template>

<script setup>
import { computed } from 'vue'
import { Button, SubscriptionButton } from '@trevio/ui'

const props = defineProps({
  subscription: {
    type: Object,
    required: true
  }
})

const getPreview = computed(() => {
  if (props.subscription.system_name === 'users') {
    return props.subscription.avatar
  }
})

const getHeading = computed(() => {
  if (props.subscription.system_name === 'users') {
    return props.subscription.name
  }

  if (props.subscription.system_name === 'travels') {
    return props.subscription.title
  }

  return ''
})
</script>