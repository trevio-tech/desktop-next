<template>
  <header class="flex items-center sticky top-0 h-14 shadow-md bg-white z-10">
    <div class="flex items-center w-full h-full max-w-[1020px] mx-auto gap-10">
      <NuxtLink to="/" class="w-[180px] flex-shrink-0">
        <img src="/images/logotype.svg" alt="" class="block mx-auto h-8">
      </NuxtLink>
      <div class="flex flex-shrink-0 w-[560px]">
        <SearchBar class="w-full" />
      </div>
      <ul v-if="!$auth.loggedIn" class="flex space-x-2 ml-auto">
        <li @click="onLogin">
          <Button>Войти</Button>
        </li>
      </ul>
      <Dropdown v-else placement="bottom-end" class="ml-auto h-full flex items-center">
        <template
          v-slot:default="{ isActive }"
        >
          <div class="flex items-center justify-center h-full px-2 cursor-pointer"
               :class="{'bg-slate-200': isActive}">
            <img :src="$auth.user.avatar" :alt="$auth.user.name" class="w-10 h-10 rounded-full block" />
            <ChevronDown class="ml-2 w-5 h-5" />
          </div>
        </template>
        <template v-slot:popper="{ hide }">
          <DropdownItem as="div" @click="hide">
            <NuxtLink :to="{name: 'users.show', params: {userId: $auth.user.id}}">Мой профиль</NuxtLink>
          </DropdownItem>
          <DropdownItem as="div" @click="hide">
            <NuxtLink :to="{name: 'users.edit', params: {userId: $auth.user.id}}">Настройки</NuxtLink>
          </DropdownItem>
          <DropdownItem as="div" @click="hide">
            <NuxtLink :to="{name: 'bookmarks', params: {userId: $auth.user.id}}">Закладки</NuxtLink>
          </DropdownItem>
          <DropdownItem as="div" @click="hide">
            <NuxtLink :to="{name: 'promo'}">Продвижение</NuxtLink>
          </DropdownItem>
          <DropdownItem as="div" @click="hide">
            <NuxtLink :to="{name: 'users.premium'}">Premium</NuxtLink>
          </DropdownItem>
          <DropdownItem as="div" @click="$auth.logout()">Выход</DropdownItem>
        </template>
      </Dropdown>
    </div>
  </header>
</template>

<script setup>
import { useNuxtApp, defineAsyncComponent } from '#imports'
import { ChevronDown } from 'lucide-vue-next'

const { $overlay } = useNuxtApp()

const onLogin = async () => {
  $overlay.show(defineAsyncComponent(() => import('~/components/modules/users/components/LoginRegisterDialog.vue')))
}
</script>