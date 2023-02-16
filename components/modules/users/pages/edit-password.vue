<template>
  <TheLayout heading="Смена пароля">
    <template #sidebar>
      <ul>
        <li><NuxtLink :to="{name: 'users.edit', params: {userId: $route.params.userId}}">Основные настройки</NuxtLink></li>
        <li><NuxtLink :to="{name: 'users.edit.password', params: {userId: $route.params.userId}}">Смена пароля</NuxtLink></li>
        <li><NuxtLink :to="{name: 'users.edit.contacts', params: {userId: $route.params.userId}}">Контакты</NuxtLink></li>
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
  </TheLayout>
</template>

<script setup>
import Card from '~/components/Card'
import TheLayout from '~/components/layout/TheLayout'
import { UPDATE_USER_PASSWORD } from '../graphql'
import { ref } from 'vue'
import { useForm } from 'vee-validate'

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
      query: UPDATE_USER_PASSWORD,
      variables: {...form.value}
    })

    if (data.updateUserPassword) {
      form.value = {...formInitialState}
    }
  } catch (error) {
    if (error.message === 'validation') {
      setErrors(error['extensions']['validation'])
    }
  }
})
</script>