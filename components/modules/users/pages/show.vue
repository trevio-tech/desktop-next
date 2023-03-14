<template>
  <NuxtLayout heading="Пользователь">
    <Html>
      <Head>
        <Title>{{ user.name }} - Пользователи</Title>
        <Meta name="description" :content="user.description" />
      </Head>
    </Html>

    <template #hero>
      <div class="bg-gradient-to-r from-blue-50 to-blue-200 flex items-center h-40 px-10 rounded-lg">
        <div class="mr-4 flex-shrink-0">
          <Upload v-model="user.avatar" mutation-name="uploadAvatar">
            <img :src="user.avatar" class="w-24 h-24 rounded-full" alt="">
          </Upload>
        </div>
        <div class="overflow-hidden">
          <h1 class="text-4xl font-semibold truncate">{{ user.name }}</h1>
          <p class="max-w-[480px] text-sm mt-2">{{ user.description }}</p>
        </div>
      </div>
    </template>
    <template #sidebar>
      <div>
        <h3 class="font-semibold mb-2 flex items-center space-x-1">
          <span>Подписки</span>
          <Cog @click="onEditFriends" class="w-5 h-5 text-gray-800 cursor-pointer" />
        </h3>
        <ul v-if="user.friends.length" class="space-y-2">
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
        <ul v-if="user.interests.length">
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
        <ul v-if="user.selectedPlaces.length" class="space-y-1">
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

    <ContentList :user-id="user.id" />
  </NuxtLayout>
</template>

<script setup>
import { USER } from '../graphql'
import { useRoute, useNuxtApp, useQuery } from '#imports'
import { Cog } from 'lucide-vue-next'
import InterestsForm from '~/components/modules/subscriptions/components/InterestsForm'
import FriendsForm from '~/components/modules/subscriptions/components/FriendsForm'
import SelectedPlacesForm from '~/components/modules/subscriptions/components/SelectedPlacesForm'
import ContentList from '~/components/ContentList'
import { useActivityStore } from '~/components/modules/activity/store'

const { $overlay } = useNuxtApp()
const activityStore = useActivityStore()

const { data: { user }} = await useQuery({
  query: `
    query($id: ID!) {
      user(id: $id) {
        ${USER}
      }
    }
  `,
  variables: {
    id: useRoute().params.userId,
  }
})

const onEditInterests = () => {
  $overlay.show(InterestsForm, {
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
  $overlay.show(FriendsForm, {
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
  $overlay.show(SelectedPlacesForm, {
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