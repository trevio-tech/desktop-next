<template>
  <TheLayout :heading="user.name">
    {{ user }}
    <div @click="onEdit">modal</div>
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

const onEdit = () => {
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