<template>
  <NuxtLayout heading="Пользователь">
    <Html>
      <Head>
        <Title>{{ user.name }} - Пользователи</Title>
        <Meta name="description" :content="user.description" />
      </Head>
    </Html>

    <template #hero>
      <UserHero v-if="user" :user="user" />
    </template>

    <template #sidebar>
      тут сайдбар
    </template>

    <ContentList :userId="route.params.userId" :fields="NESTED_USER_CONTENT" order-by="date">
      <template v-slot="{ items, isMore, isLoading, onFetch }">
        <div class="space-y-4">
          <ContentCardRectangle v-for="item in items" :key="item.id" :entry="item" />
          <Button v-if="isMore" :loading="isLoading" @click="onFetch" class="w-full" variant="secondary">Показать еще</Button>
        </div>
      </template>
    </ContentList>
  </NuxtLayout>
</template>

<script setup>
import UserHero from '~/components/modules/users/components/UserHero.vue'
import { ContentCardRectangle } from '~/components'
import { ContentList } from '@trevio/ui'
import { NESTED_USER_CONTENT } from '~/components/modules/users/graphql'
import { USER } from '../graphql'
import { shallowRef } from 'vue'
import { useActivityStore } from '~/components/modules/activity/store'
import { usePageQuery, useOverlay, Button } from '@trevio/ui'
import { useRoute } from '#imports'

const overlay = useOverlay()
const route = useRoute()

const activityStore = useActivityStore()
const user = shallowRef()

try {
  const { data } = await usePageQuery({
    query: `
      query($id: ID!) {
        user(id: $id) {
          ${USER}
        }
      }
    `,
    variables: {
      id: route.params.userId,
    }
  })

  user.value = data.user
} catch (errors) {
  console.log(errors)
}

const onEditInterests = () => {
  overlay.show(InterestsForm, {
    props: {
      modelValue: user.interests
    },
    on: {
      async 'update:modelValue'(interests) {
        user.interests = interests
      }
    }
  })
}
const onEditFriends = () => {
  overlay.show(FriendsForm, {
    props: {
      modelValue: user.friends,
    },
    on: {
      async 'update:modelValue'(friends) {
        user.friends = friends
        // Сбрасываем ленту, если лента пустая она будет загружена снова.
        await activityStore.refreshMyFeed()
      }
    }
  })
}
const onEditSelectedPlaces = () => {
  overlay.show(SelectedPlacesForm, {
    props: {
      modelValue: user.selectedPlaces
    },
    on: {
      async 'update:modelValue'(selectedPlaces) {
        user.selectedPlaces.push(selectedPlaces)
      }
    }
  })
}
</script>