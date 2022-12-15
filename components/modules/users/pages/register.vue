<template>
  <TheLayout heading="Регистрация">
    <RegisterForm @login="navigateTo('/')" />
  </TheLayout>
</template>

<script setup>
import RegisterForm from '~/components/modules/users/components/RegisterForm.vue'
import { navigateTo } from '#app'

definePageMeta({
  middleware: ['guest'],
})
</script>