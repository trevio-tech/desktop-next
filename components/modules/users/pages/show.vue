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
      <div>
        <h3 class="font-semibold mb-2 flex items-center space-x-1">
          <span>Подписки</span>
          <Cog @click="onEditFriends" class="w-5 h-5 text-gray-800 cursor-pointer" />
        </h3>
        <ul v-if="user?.friends" class="space-y-2">
          <li v-for="friend in user.friends" :key="friend.id">
            <NuxtLink :to="{name: 'users.show', params: {userId: friend.id}}" class="flex items-center space-x-2">
              <img :src="friend.avatar" class="w-5 h-5 rounded-full block" alt="">
              <span class="text-sm font-medium">{{ friend.name }}</span>
            </NuxtLink>
          </li>
        </ul>
        <div v-else class="text-sm text-slate-400">Пользователь не на кого не подписан</div>
      </div>

      <div class="mt-4">
        <h3 class="font-semibold mb-2 flex items-center space-x-1">
          <span>Интересы</span>
          <Cog @click="onEditInterests" class="w-5 h-5 text-gray-800 cursor-pointer" />
        </h3>
        <ul v-if="user?.interests">
          <li v-for="interest in user.interests" :key="interest.id">
            <NuxtLink :to="{name: 'users.show', params: {userId: interest.id}}" class="text-sm font-medium">
              {{ interest.name }}
            </NuxtLink>
          </li>
        </ul>
        <div v-else class="text-sm text-slate-400">Пользователь ничем не интересуется</div>
      </div>

      <div class="mt-4">
        <h3 class="font-semibold mb-2 flex items-center space-x-1">
          <span>Направления</span>
          <Cog @click="onEditSelectedPlaces" class="w-5 h-5 text-gray-800 cursor-pointer" />
        </h3>
        <ul v-if="user?.selectedPlaces" class="space-y-1">
          <li v-for="place in user.selectedPlaces" :key="place.id" class="truncate">
            <NuxtLink :to="{name: 'users.show', params: {userId: place.id}}">
              <div  class="text-sm font-medium">{{ place.name }}</div>
              <div class="text-xs text-gray-500 truncate">{{ place.parent_names }}</div>
            </NuxtLink>
          </li>
        </ul>
        <div v-else class="text-sm text-slate-400">У пользователя нет избранных направлений</div>
      </div>
    </template>

    <ContentList :userId="route.params.userId" :fields="NESTED_USER_CONTENT">
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
import FriendsForm from '~/components/modules/subscriptions/components/FriendsForm'
import InterestsForm from '~/components/modules/subscriptions/components/InterestsForm'
import SelectedPlacesForm from '~/components/modules/subscriptions/components/SelectedPlacesForm'
import UserHero from '~/components/modules/users/components/UserHero.vue'
import { Cog } from 'lucide-vue-next'
import { ContentCardRectangle } from '~/components'
import { ContentList } from '@trevio/ui'
import { NESTED_USER_CONTENT } from '~/components/modules/users/graphql'
import { USER } from '../graphql'
import { shallowRef } from 'vue'
import { useActivityStore } from '~/components/modules/activity/store'
import { useQuery, useOverlay, Button } from '@trevio/ui'
import { useRoute } from '#imports'

const overlay = useOverlay()
const route = useRoute()

const activityStore = useActivityStore()
const user = shallowRef()

try {
  const { data } = await useQuery({
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