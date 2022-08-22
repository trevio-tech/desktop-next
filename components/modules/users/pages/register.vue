<template>
  <form @submit.prevent="" class="flex items-center justify-center flex-auto bg-blue-50">
    <div class="p-6 bg-white flex h-full items-center justify-center shadow-sm rounded-lg">
      <div class="space-y-6 p-6 w-100">
        <div>
          <label class="text-sm mb-1 block text-gray-600">Вы?</label>
          <div class="flex items-center space-x-4">
            <v-radio name="is-company" id="user">Пользователь</v-radio>
            <v-radio name="is-company" id="company">Компания</v-radio>
          </div>
        </div>

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

        <div>
          <label for="password" class="text-sm mb-1 block text-gray-600">Ваши интересы?</label>
          <v-input type="password" id="password" />
        </div>

        <v-button type="submit">Зарегистрироваться</v-button>
      </div>
      <div class="p-6 bg-indigo-600 h-full w-75 rounded-lg">
        asdas
      </div>
    </div>
  </form>
</template>

<script setup>
import { VInput, VButton, VRadio } from 'ui'
</script>

<style lang="scss">

</style>