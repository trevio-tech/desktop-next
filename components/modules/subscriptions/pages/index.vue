<template>
  <NuxtLayout heading="Мои подписки">
    <template #sidebar>
      1
    </template>

    <Dropdown class="mb-4">
      <template v-slot:default="{ isActive }">
        <Button :loading="isLoading" variant="secondary">
          <template #prepend>
            <Filter class="w-4 h-4" />
          </template>
          {{ subscriptionTypes[activeSubscriptionType] }}
        </Button>
      </template>
      <template v-slot:popper="{ hide }">
        <DropdownItem v-for="(name, key) in subscriptionTypes" :key="key" @click="onChangeSubscriptionType(key); hide()">
          {{ name }}
        </DropdownItem>
      </template>
    </Dropdown>

    <div v-if="subscriptions.length" class="divide-y overflow-hidden rounded-lg">
      <SubscriptionCard
        v-for="subscription in subscriptions"
        :key="subscription.model_type + subscription.model_id"
        :subscription="subscription.model"
      />
    </div>
    <div v-else>Подписок не найдено.</div>
  </NuxtLayout>
</template>

<script setup>
import SubscriptionCard from '~/components/modules/subscriptions/components/SubscriptionCard.vue'
import { Filter } from 'lucide-vue-next'
import { shallowRef } from 'vue'
import { useAuth } from '#auth/runtime/composables'
import { usePageQuery, Dropdown, DropdownItem, Button } from '@trevio/ui'

const auth = useAuth()
const isLoading = shallowRef(false)
const subscriptions = shallowRef([])
const subscriptionTypes = {
  all: 'Все подписки',
  users: 'Пользователи',
  travels: 'Путешествия',
  tags: 'Интересы',
  places: 'Направления'
}
const activeSubscriptionType= shallowRef('all')

const onChangeSubscriptionType = async (type) => {
  activeSubscriptionType.value = type
  await fetchSubscriptions()
}

const fetchSubscriptions = async () => {
  if (isLoading.value) return

  isLoading.value = true

  try {
    const { data } = await usePageQuery({
      query: `
      query ($user_id: ID!, $model_type: String) {
        subscriptions (user_id: $user_id, model_type: $model_type) {
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
        user_id: auth.user.id,
        model_type: activeSubscriptionType.value === 'all' ? undefined : activeSubscriptionType.value
      }
    })

    subscriptions.value = data.subscriptions
  } catch (errors) {}
  finally {
    isLoading.value = false
  }
}

await fetchSubscriptions()
</script>