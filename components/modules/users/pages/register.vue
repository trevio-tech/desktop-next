<template>
  <form @submit.prevent="" class="flex items-center justify-center flex-col py-20 flex-auto bg-blue-50">
    <div class="p-12 gap-12 flex-auto flex items-center justify-center shadow-sm rounded-lg bg-white">
      <div class="space-y-6 w-100">
        <RadioGroup v-model="plan">
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
      </div>
      <div class="p-6 bg-indigo-600 h-full w-100 rounded-lg">

      </div>
    </div>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import { VInput, VButton, RadioGroup, RadioGroupLabel, RadioGroupOption  } from 'ui'

const plan = ref('startup')
</script>

<style lang="scss">

</style>