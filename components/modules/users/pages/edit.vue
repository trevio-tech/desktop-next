<template>
  <NuxtLayout heading="Редактирование профиля">
    <template #sidebar>
      <ul>
        <li><NuxtLink :to="{name: 'users.edit'}">Основные настройки</NuxtLink></li>
        <li><NuxtLink :to="{name: 'users.edit.password'}">Смена пароля</NuxtLink></li>
        <li><NuxtLink :to="{name: 'users.edit.contacts'}">Контакты</NuxtLink></li>
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
          <select v-model="form.gender" class="input">
            <option disabled value="">Ничего не выбрано</option>
            <option v-for="gender in genders" :key="gender.id" :value="gender.id">{{ gender.name }}</option>
          </select>
        </FormField>

        <FormField name="input.birthday" label="День рождения">
          <Input v-model="form.birthday" type="date" />
        </FormField>
      </div>
      <footer class="mt-8">
        <hr class="mb-4 -mx-4 border-gray-200">

        <div class="flex space-x-2">
          <Button type="submit">Сохранить</Button>
        </div>
      </footer>
    </form>
  </NuxtLayout>
</template>

<script setup>
import { usePageQuery, SearchPlace, Button, Input, FormField } from '@trevio/ui'
import { ref } from 'vue'
import { UPDATE_USER } from '../graphql'
import { PLACE_WITH_PARENTS_FIELDS } from '~/components/modules/places/graphql'
import { useAuth } from '#auth/runtime/composables'
import { definePageMeta } from '#imports'

definePageMeta({
  middleware: 'auth'
})

const form = ref({
  place_id: null,
  name: '',
  description: '',
  birthday: null,
  gender: null
})

const genders = [{id: null, name: 'Другой'}, {id: 'male', name: 'Мужской'}, {id: 'female', name: 'Женский'}]

const userId = parseInt(useAuth().user.id)

try {
  const { data: { user } } = await usePageQuery({
    query: `
      query($id: ID!) {
        user(id: $id) {
          id
          name
          description
          birthday(format: "Y-m-d")
          gender
          place {
            ${PLACE_WITH_PARENTS_FIELDS}
          }
        }
      }
    `,
    variables: {
      id: userId
    }
  })

  Object.assign(form.value, user)
} catch (error) {}

const onSubmit = async () => {
  try {
    const input = {...form.value}

    delete input.id
    delete input.__typename
    delete input.place

    const { data: { updateUser } } = await usePageQuery({
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