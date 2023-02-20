<template>
  <NuxtLayout heading="Авторизация">
    <template #sidebar>
      Сайдбар
    </template>
    <LoginForm @login="navigateTo('/')" />
  </NuxtLayout>
</template>

<script setup>
import LoginForm from '~/components/modules/users/components/LoginForm.vue'
import { navigateTo } from '#imports'

definePageMeta({
  middleware: ['guest'],
})
</script>