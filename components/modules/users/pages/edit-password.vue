<template>
  <TheLayout heading="Смена пароля">
    <template #sidebar>
      <ul>
        <li><NuxtLink :to="{name: 'users.edit', params: {userId}}">Основные настройки</NuxtLink></li>
        <li><NuxtLink :to="{name: 'users.edit.password', params: {userId}}">Смена пароля</NuxtLink></li>
        <li><NuxtLink :to="{name: 'users.edit.contacts', params: {userId}}">Контакты</NuxtLink></li>
      </ul>
    </template>
    <Card>
      <form @submit.prevent="onSubmit" class="p-4">
        <div class="space-y-4">
          <FormField name="password_old" label="Старый пароль" required>
            <Input v-model="form.password_old" id="password-old" type="password" />
          </FormField>
          <FormField name="password" label="Новый пароль" required>
            <Input v-model="form.password" id="password" type="password" />
          </FormField>
          <FormField name="password_confirmation" label="Повторите новый пароль" required>
            <Input v-model="form.password_confirmation" id="password-confirmation" type="password" />
          </FormField>
        </div>

        <hr class="my-6 -mx-4 h-px bg-gray-200 border-0">

        <Button type="submit">Сохранить</Button>
      </form>
    </Card>
  </TheLayout>
</template>

<script setup>
import TheLayout from '~/components/layout/TheLayout'
import { FormField, Input, Button } from '@trevio/ui'
import { ref } from 'vue'
import { useRoute } from 'nuxt/app'
import { UPDATE_USER_PASSWORD } from '../graphql'
import Card from '~/components/Card'
import { useForm } from 'vee-validate'
import { useFetch } from '~/composables'

const form = ref({
  password_old: '',
  password: '',
  password_confirmation: '',
})

const userId = parseInt(useRoute().params.userId)

const { handleSubmit, setErrors } = useForm()

const onSubmit = handleSubmit(async () => {
  try {
    const { data } = await useFetch({
      query: UPDATE_USER_PASSWORD,
      variables: {
        id: userId,
        ...form.value
      }
    })

    if (data.updateUserPassword) {
      alert('Пароль обновлен')
    }
  } catch (error) {
    if (error[0].message === 'validation') {
      setErrors(error[0]['extensions']['validation'])
    }
  }
})
</script>