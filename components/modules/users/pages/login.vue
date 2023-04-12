<template>
  <NuxtLayout heading="Авторизация">
    <LoginForm @login="navigateTo('/')" />
  </NuxtLayout>
</template>

<script setup>
import LoginForm from '~/components/modules/users/components/Auth/LoginForm.vue'
import { navigateTo,definePageMeta } from '#imports'

definePageMeta({
  middleware: ['guest'],
})
</script>