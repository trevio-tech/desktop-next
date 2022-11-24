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
          <FormField name="confirmation_password" label="Повторите новый пароль" required>
            <Input v-model="form.confirmation_password" id="confirmation-password" type="password" />
          </FormField>
        </div>

        <hr class="my-6 -mx-4 h-px bg-gray-200 border-0">

        <Button>Сохранить</Button>
      </form>
    </Card>
  </TheLayout>
</template>

<script setup>
import TheLayout from '~/components/layout/TheLayout'
import { FormField, Textarea, Input, Button, Select } from '@trevio/ui'
import { gql, useAsyncQuery, useMutation } from '#imports'
import { ref } from 'vue'
import { useRoute } from 'nuxt/app'
import { UPDATE_USER } from '../graphql'
import Card from '~/components/Card'
import { useForm } from 'vee-validate'

const form = ref({
  name: '',
  description: '',
  birthday: null,
})

const userId = parseInt(useRoute().params.userId)

try {
  const { data } = await useAsyncQuery(gql`
    query($id: Int!) {
      user(id: $id) {
        id
        name
        description
        birthday
        gender
      }
    }
  `, {
    id: userId
  })

  form.value = data.value.user
} catch (error) {}

const onSubmit = async () => {
  try {
    const input = form.value

    delete input.id
    delete input.__typename

    const { mutate } = await useMutation(gql`
      ${UPDATE_USER}
    `, {
      variables: {
        id: userId,
        input
      }
    })

    mutate()
  } catch (error) {}
}
</script>