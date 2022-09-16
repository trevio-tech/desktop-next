<template>
  <header class="sticky top-0 p-4 shadow-md">
    <div class="flex items-center max-w-[1000px] mx-auto">
      <NuxtLink to="/">
        <img src="/images/logotype.svg" alt="" class="block h-6">
      </NuxtLink>
      <ul v-if="!$auth.loggedIn" class="flex space-x-2 ml-auto">
        <li><NuxtLink to="/login">Войти</NuxtLink></li>
        <li><NuxtLink to="/register">Регистрация</NuxtLink></li>
      </ul>
      <ul v-else class="flex space-x-2 ml-auto">
        <li><NuxtLink to="/travels/create">Создать путешествие</NuxtLink></li>
        <li><NuxtLink :to="`/users/${$auth.user.id}`">Профиль</NuxtLink></li>
      </ul>
    </div>
  </header>
</template>