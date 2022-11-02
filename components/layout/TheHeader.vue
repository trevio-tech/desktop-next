<template>
  <header class="flex items-center sticky top-0 h-14 shadow-md bg-white">
    <div class="flex items-center w-full max-w-[1000px] mx-auto">
      <NuxtLink to="/">
        <img src="/images/logotype.svg" alt="" class="block h-6">
      </NuxtLink>
      <div class="flex min-w-[560px] w-[560px] ml-24">
        <Input placeholder="Поиск" />
        <VButton class="ml-auto" v-if="$auth.loggedIn" @click="$overlay.show(TheContentCreationDialog)">Создать</VButton>
      </div>
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
import { VButton, Input } from '@trevio/ui'
import { useNuxtApp } from 'nuxt/app'
import TheContentCreationDialog from './TheContentCreationDialog'

const { $overlay } = useNuxtApp()
</script>