<template>
  <header class="shadow-md flex items-center p-4 sticky top-0">
    <NuxtLink to="/">
      <img src="/images/logotype.svg" alt="" class="block h-6">
    </NuxtLink>
    <ul class="flex space-x-2 ml-auto">
      <li><NuxtLink to="/login">Войти</NuxtLink></li>
      <li><NuxtLink to="/register">Регистрация</NuxtLink></li>
    </ul>
  </header>
</template>