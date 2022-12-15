<template>
  <TheLayout heading="Авторизация">
    <LoginForm @login="navigateTo('/')" />
  </TheLayout>
</template>

<script setup>
import LoginForm from '~/components/modules/users/components/LoginForm.vue'
import { navigateTo } from '#app'

definePageMeta({
  middleware: ['guest'],
})
</script>