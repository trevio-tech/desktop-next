<template>
  <TheLayout heading="Пользователь">
    <template #top>
      <div class="bg-gradient-to-r from-blue-50 to-blue-200 flex items-center h-40 px-10 rounded-lg">
        <div>
          <h1 class="text-4xl font-semibold">{{ user.name }}</h1>
          <p class="max-w-[480px] text-sm mt-2">{{ user.description }}</p>
        </div>
      </div>
    </template>
    <template #sidebar>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto deleniti quaerat qui vel. Delectus eos est fuga harum, id impedit laborum magnam nihil pariatur placeat ratione repellat velit voluptate voluptates.
    </template>
    <div v-if="user.interests.length">
      <div @click="onEditInterests" class="underline">Редактировать интересы</div>
      <ul class="flex flex-wrap space-x-1">
        <li v-for="interest in user.interests" :key="interest.id">{{ interest.name }}</li>
      </ul>
    </div>

    <hr>
    <div @click="onEditSelectedPlaces" class="underline">Редактировать направления</div>
    <ul class="flex flex-wrap space-x-1">
      <li v-for="(place, index) in user.selectedPlaces" :key="place.id">
        <span>{{ place.full_name }}</span>
      </li>
    </ul>
  </TheLayout>
</template>

<script setup>
import TheLayout from '~/components/layout/TheLayout'
import { useAsyncGql } from '~/uses'
import { USER } from '../graphql'
import { useRoute, useNuxtApp } from 'nuxt/app'
import InterestsForm from '~/components/modules/subscriptions/components/InterestsForm'
import SelectedPlacesForm from '~/components/modules/subscriptions/components/SelectedPlacesForm'

const { $overlay } = useNuxtApp()

const { data: { value: { user }}} = await useAsyncGql(`
  query($id: Int!) {
    user(id: $id) {
      ${USER}
    }
  }
`, {
 id: parseInt(useRoute().params.userId)
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