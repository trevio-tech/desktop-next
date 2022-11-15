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

      <FormField name="email" label="Электронная почта" required>
        <Input v-model="form.email" type="email" id="email" />
      </FormField>

      <FormField name="password" label="Пароль" required>
        <Input v-model="form.password" type="password" id="password" />
      </FormField>

      <FormField name="password" label="Повторите пароль" required>
        <Input v-model="form.password_confirmation" type="password" id="password-confirmation" />
      </FormField>

      <v-button type="submit">Зарегистрироваться</v-button>
    </form>
  </TheLayout>
</template>

<script setup>
import { ref } from 'vue'
import TheLayout from '~/components/layout/TheLayout'
import { Button, FormField, Input, RadioGroup, RadioGroupLabel, RadioGroupOption } from '@trevio/ui'

const form = ref({
  email: null,
  password: null,
  password_confirmation: null
})
</script>