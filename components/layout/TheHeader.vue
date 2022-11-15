<template>
  <header class="flex items-center sticky top-0 h-14 shadow-md bg-white">
    <div class="flex items-center w-full h-full max-w-[1000px] mx-auto">
      <NuxtLink to="/">
        <img src="/images/logotype.svg" alt="" class="block h-6">
      </NuxtLink>
      <div class="flex min-w-[560px] w-[560px] ml-24">
        <Input placeholder="Поиск" />
        <Button class="ml-auto" v-if="$auth.loggedIn" @click="$overlay.show(TheContentCreationDialog)">Создать</Button>
      </div>
      <ul v-if="!$auth.loggedIn" class="flex space-x-2 ml-auto">
        <li><NuxtLink to="/login">Войти</NuxtLink></li>
        <li><NuxtLink to="/register">Регистрация</NuxtLink></li>
      </ul>
      <Dropdown placement="bottom-end" v-else class="ml-auto h-full flex items-center">
        <img :src="$auth.user.avatar" :alt="$auth.user.name" class="w-10 h-10 rounded-full block" />
        <template v-slot:popper="{ hide }">
          <DropdownItem as="div" @click="hide">
            <NuxtLink :to="{name: 'users.show', params: {userId: $auth.user.id}}">Мой профиль</NuxtLink>
          </DropdownItem>
          <DropdownItem as="div" @click="hide">
            <NuxtLink :to="{name: 'users.edit', params: {userId: $auth.user.id}}">Настройки</NuxtLink>
          </DropdownItem>
          <DropdownItem as="div" @click="$auth.logout()">Выход</DropdownItem>
        </template>
      </Dropdown>
    </div>
  </header>
</template>

<script setup>
import { Button, Input, Dropdown, DropdownItem } from '@trevio/ui'
import { useNuxtApp } from 'nuxt/app'
import TheContentCreationDialog from './TheContentCreationDialog'

const { $overlay } = useNuxtApp()
</script>