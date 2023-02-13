<template>
  <div class="w-full h-full flex flex-col items-center justify-center" style="background-image: url('/images/no-image.png')">
    <div @click="handleError" class="cursor-pointer" title="Вернуться на главную">
      <img src="/images/logotype.svg" alt="Trevio.ru - о путешествиях">
    </div>
    <div class="text-center mt-10">
      <h1 class="text-9xl font-semibold">{{ error.statusCode }}</h1>
    </div>
  </div>
</template>

<script setup>
import { useError } from '#imports'

const error = useError()

const handleError = () => clearError({ redirect: '/' })
</script>