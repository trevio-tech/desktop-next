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
      <DropdownMenu v-else placement="bottom-end" class="ml-auto h-full flex items-center">
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
          <div class="w-[280px] mb-1">
            <NuxtLink :to="{name: 'users.show', params: {userId: $auth.user.id}}" class="p-4 bg-sky-50 flex items-center rounded-t-lg hover:bg-sky-100">
              <img :src="$auth.user.avatar" :alt="$auth.user.name" class="w-11 h-11 rounded-full" />
              <div class="ml-2 overflow-hidden">
                <div class="text-xs text-gray-400">Перейти в профиль</div>
                <div class="text-sm font-medium truncate">{{ $auth.user.name }}</div>
              </div>
            </NuxtLink>
            <div class="flex items-center mt-1">
              <NuxtLink :to="{name: 'wallets.show'}" class="flex-shrink-0 p-4 bg-gray-100 rounded-bl-lg">
                <div class="text-xs text-gray-400">Мой кошелек</div>
                <div class="text-sm font-medium truncate">{{ $auth.user.wallet?.balance || 0 }} монет</div>
              </NuxtLink>
              <NuxtLink :to="{name: 'users.premium'}" class="flex-auto flex-shrink-0 p-4 bg-gray-100 rounded-br-lg ml-1">
                <div class="text-xs text-gray-400">Премиум</div>
                <div class="text-sm font-medium truncate">Не активирован</div>
              </NuxtLink>
            </div>
          </div>
          <DropdownMenuItem :to="{name: 'users.edit', params: {userId: $auth.user.id}}" @click="hide">Настройки</DropdownMenuItem>
          <DropdownMenuItem :to="{name: 'bookmarks', params: {userId: $auth.user.id}}" @click="hide">Закладки</DropdownMenuItem>
          <DropdownMenuItem :to="{name: 'drafts'}" @click="hide">Черновики</DropdownMenuItem>
          <DropdownMenuItem :to="{name: 'promo'}" @click="hide">Продвижение</DropdownMenuItem>
          <DropdownMenuItem @click="$auth.logout()">Выход</DropdownMenuItem>
        </template>
      </DropdownMenu>
    </div>
  </header>
</template>

<script setup>
import { defineAsyncComponent } from '#imports'
import { ChevronDown } from 'lucide-vue-next'
import { useOverlay, Button, SearchBar, DropdownMenuItem, DropdownMenu } from '@trevio/ui'

const overlay = useOverlay()

const onLogin = async () => {
  overlay.show(defineAsyncComponent(() => import('~/components/modules/users/components/Auth/LoginRegisterDialog.vue')))
}
</script>