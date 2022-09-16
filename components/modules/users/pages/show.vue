<template>
  <TheLayout :heading="user.name">
    <div v-if="user.interests.length">
      <div @click="onEditInterests">Редактировать интересы</div>
      <ul class="flex flex-wrap space-x-1">
        <li v-for="interest in user.interests" :key="interest.id">{{ interest.name }}</li>
      </ul>
    </div>
  </TheLayout>
</template>

<script setup>
import TheLayout from '~/components/layout/TheLayout'
import { useAsyncGql } from '~/uses'
import { USER } from '../graphql'
import { useRoute, useNuxtApp } from 'nuxt/app'
import InterestsForm from '~/components/modules/subscriptions/components/InterestsForm'

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
</script>