<template>
  <NuxtLayout heading="Регистрация">
    <RegisterForm @login="navigateTo('/')" />
  </NuxtLayout>
</template>

<script setup>
import RegisterForm from '~/components/modules/users/components/RegisterForm.vue'
import { navigateTo } from '#imports'

definePageMeta({
  middleware: ['guest'],
})
</script>