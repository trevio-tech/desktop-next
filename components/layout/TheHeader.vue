<template>
  <header class="flex items-center sticky top-0 h-14 shadow-md bg-white z-10">
    <div class="flex items-center w-full h-full max-w-[1000px] mx-auto gap-6">
      <NuxtLink to="/" class="w-[180px]">
        <img src="/images/logotype.svg" alt="" class="block mx-auto h-8">
      </NuxtLink>
      <div class="flex w-[560px]">
        <SearchBar class="w-full" />
      </div>
      <ul v-if="!$auth.loggedIn" class="flex space-x-2 ml-auto">
        <li @click="$overlay.show(defineAsyncComponent(() => import('~/components/modules/users/components/LoginRegisterDialog.vue')))">
          <Button>Войти</Button>
        </li>
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
          <DropdownItem as="div" @click="hide">
            <NuxtLink :to="{name: 'bookmarks', params: {userId: $auth.user.id}}">Закладки</NuxtLink>
          </DropdownItem>
          <DropdownItem as="div" @click="hide">
            <NuxtLink :to="{name: 'promo'}">Продвижение</NuxtLink>
          </DropdownItem>
          <DropdownItem as="div" @click="$auth.logout()">Выход</DropdownItem>
        </template>
      </Dropdown>
    </div>
  </header>
</template>