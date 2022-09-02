<template>
  <header class="sticky top-0 p-4 shadow-md">
    <div class="flex items-center max-w-[1000px] mx-auto">
      <NuxtLink to="/">
        <img src="/images/logotype.svg" alt="" class="block h-6">
      </NuxtLink>
      <ul class="flex space-x-2 ml-auto">
        <li><NuxtLink to="/login">Войти</NuxtLink></li>
        <li><NuxtLink to="/register">Регистрация</NuxtLink></li>
      </ul>
    </div>
  </header>
</template>