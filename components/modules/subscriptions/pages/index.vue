<template>
  <NuxtLayout heading="Мои подписки">
    <template #sidebar>
      1
    </template>
    <div class="divide-y">
      <SubscriptionCard
        v-for="subscription in subscriptions"
        :key="subscription.model_type + subscription.model_id"
        :subscription="subscription.model"
      />
    </div>
  </NuxtLayout>
</template>

<script setup>
import SubscriptionCard from '~/components/modules/subscriptions/components/SubscriptionCard.vue'
import { useAuth } from '#auth/runtime/composables'
import { usePageQuery } from '@trevio/ui'

const auth = useAuth()

let subscriptions = []

try {
  const { data } = await usePageQuery({
    query: `
      query ($user_id: ID!) {
        subscriptions (user_id: $user_id) {
          model_type
          model_id
          model {
            ... on Travel {
              id
              title
              system_name
            }
            ... on User {
              id
              name
              avatar
              system_name
            }
          }
        }
      }
    `,
    variables: {
      user_id: auth.user.id
    }
  })

  subscriptions = data.subscriptions
} catch (errors) {}
</script>