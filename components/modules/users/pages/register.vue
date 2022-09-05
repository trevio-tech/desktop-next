<template>
  <TheLayout heading="Регистрация">
    <NuxtLink to="/users/1">Пользователь 1</NuxtLink>

    <form @submit.prevent="" class="space-y-6 w-6/12">
      <RadioGroup>
        <RadioGroupLabel id="type" class="text-sm mb-1 block text-gray-600">Кто вы?</RadioGroupLabel>
        <div class="flex space-x-2 text-sm">
          <RadioGroupOption v-slot="{ checked }" value="startup">
            <span :class="checked ? 'bg-blue-200' : 'bg-slate-100'" class="py-1 px-2 rounded-md cursor-pointer">Пользователь</span>
          </RadioGroupOption>
          <RadioGroupOption v-slot="{ checked }" value="business">
            <span :class="checked ? 'bg-blue-200' : 'bg-slate-100'" class="py-1 px-2 rounded-md cursor-pointer">Компания</span>
          </RadioGroupOption>
        </div>
      </RadioGroup>

      <div>
        <label for="email" class="text-sm mb-1 block text-gray-600">Адрес электронной почты</label>
        <v-input type="email" id="email" />
      </div>

      <div>
        <label for="password" class="text-sm mb-1 block text-gray-600">Пароль</label>
        <v-input type="password" id="password" />
      </div>

      <div>
        <label for="password" class="text-sm mb-1 block text-gray-600">Повторите пароль</label>
        <v-input type="password" id="password" />
      </div>

      <v-button type="submit">Зарегистрироваться</v-button>
    </form>
  </TheLayout>
</template>

<script setup>
import TheLayout from '~/components/layout/TheLayout'
import { VButton, VInput, RadioGroup, RadioGroupLabel, RadioGroupOption } from 'ui';
</script>