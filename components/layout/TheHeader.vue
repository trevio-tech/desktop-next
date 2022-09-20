<template>
  <header class="flex items-center sticky top-0 h-14 shadow-md bg-white">
    <div class="flex items-center w-full max-w-[1000px] mx-auto">
      <NuxtLink to="/">
        <img src="/images/logotype.svg" alt="" class="block h-6">
      </NuxtLink>
      <VButton v-if="$auth.loggedIn" @click="$overlay.show(TheContentCreationDialog)" class="ml-24">Создать</VButton>
      <ul v-if="!$auth.loggedIn" class="flex space-x-2 ml-auto">
        <li><NuxtLink to="/login">Войти</NuxtLink></li>
        <li><NuxtLink to="/register">Регистрация</NuxtLink></li>
      </ul>
      <ul v-else class="flex space-x-2 ml-auto">
        <li><NuxtLink :to="`/users/${$auth.user.id}`">Профиль</NuxtLink></li>
      </ul>
    </div>
  </header>
</template>

<script setup>
import { VButton } from '@trevio/ui'
import { useNuxtApp } from 'nuxt/app'
import TheContentCreationDialog from './TheContentCreationDialog'

const { $overlay } = useNuxtApp()
</script>