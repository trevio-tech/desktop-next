<template>
  <TheLayout heading="Редактирование профиля">
    <template #sidebar>
      <ul>
        <li><NuxtLink :to="{name: 'users.edit', params: {userId: $route.params.userId}}">Основные настройки</NuxtLink></li>
        <li><NuxtLink :to="{name: 'users.edit.password', params: {userId: $route.params.userId}}">Смена пароля</NuxtLink></li>
        <li><NuxtLink :to="{name: 'users.edit.contacts', params: {userId: $route.params.userId}}">Контакты</NuxtLink></li>
      </ul>
    </template>
    <form @submit.prevent="onSubmit" class="min-h-full flex flex-col justify-between bg-white p-4 rounded-md shadow ring-1 ring-slate-200">
      <div class="space-y-4">
        <FormField
          name="input.name"
          label="Отображаемое имя"
          required
          v-slot="{ hasError }">
          <Input v-model="form.name" placeholder="Ваш ник, имя и/или фамилия или название компании" />
        </FormField>

        <FormField name="input.description" label="Описание">
          <Textarea v-model="form.description" rows="3" placeholder="Пара слов о себе" />
        </FormField>


        <FormField name="input.place_id" label="Откуда вы?">
          <SearchPlace v-model="form.place" @update:modelValue="form.place_id = $event.id" />
        </FormField>

        <FormField name="input.gender" label="Пол">
          <Select v-model="form.gender"
                  is-primitive
                  :items="[{id: null, name: 'Другой'}, {id: 'male', name: 'Мужской'}, {id: 'female', name: 'Женский'}]">
          </Select>
          {{ form.gender }}
        </FormField>

        <FormField name="input.birthday" label="День рождения">
          <Input v-model="form.birthday" type="date" />
          {{ form.birthday }}
        </FormField>
      </div>
      <footer class="mt-8">
        <hr class="mb-4 -mx-4 border-gray-200">

        <div class="flex space-x-2">
          <Button type="submit">Сохранить</Button>
        </div>
      </footer>
    </form>
  </TheLayout>
</template>

<script setup>
import TheLayout from '~/components/layout/TheLayout'
import { FormField, Textarea, Input, Button, Select, SearchPlace } from '@trevio/ui'
import { ref } from 'vue'
import { useRoute } from 'nuxt/app'
import { UPDATE_USER } from '../graphql'
import { useQuery } from '#imports'

const form = ref({
  place_id: null,
  name: '',
  description: '',
  birthday: null,
})

const userId = parseInt(useRoute().params.userId)

try {
  const { data: { user } } = await useQuery({
    query: `
      query($id: Int!) {
        user(id: $id) {
          id
          name
          description
          birthday
          gender
        }
      }
    `,
    variables: {
      id: userId
    }
  })

  form.value = user
} catch (error) {}

const onSubmit = async () => {
  try {
    const input = form.value

    delete input.id
    delete input.__typename

    const { data: { updateUser } } = await useQuery({
      query: `
        ${UPDATE_USER}
      `,
      variables: {
        id: userId,
        input
      }
    })

    console.log(updateUser)
  } catch (error) {}
}
</script>