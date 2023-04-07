<template>
  <NuxtLayout heading="Смена пароля">
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
          <FormField name="password_old" label="Старый пароль" required v-slot="{ hasError }">
            <Input v-model="form.password_old" id="password-old" type="password" :variant="hasError ? 'danger' : ''" />
          </FormField>
          <FormField name="password" label="Новый пароль" required v-slot="{ hasError }">
            <Input v-model="form.password" id="password" type="password" :variant="hasError ? 'danger' : ''" />
          </FormField>
          <FormField name="password_confirmation" label="Повторите новый пароль" required v-slot="{ hasError }">
            <Input v-model="form.password_confirmation" id="password-confirmation" type="password" :variant="hasError ? 'danger' : ''" />
          </FormField>
        </div>

        <hr class="my-6 -mx-4 h-px bg-gray-200 border-0">

        <Button type="submit">Сохранить</Button>
      </form>
    </Card>
  </NuxtLayout>
</template>

<script setup>
import Card from '~/components/Card'
import { Button, useQuery, Input, FormField } from '@trevio/ui'
import { UPDATE_PASSWORD } from '../graphql'
import { ref } from 'vue'
import { useForm } from 'vee-validate'
import { useRoute } from '#imports'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

const route = useRoute()
const userId = route.params.userId

const formInitialState = {
  password_old: '',
  password: '',
  password_confirmation: '',
}

const form = ref({...formInitialState})

const { handleSubmit, setErrors } = useForm()

const onSubmit = handleSubmit(async () => {
  try {
    const { data } = await useQuery({
      query: UPDATE_PASSWORD,
      variables: {
        input: {...form.value}
      }
    })

    if (data.updatePassword) {
      form.value = {...formInitialState}

      toast.success('Пароль изменен!', {
        position: 'top-center'
      })
    }
  } catch (errors) {
    if (errors[0]?.extensions?.validation) {
      setErrors(errors[0].extensions.validation)
    }
  }
})
</script>