<template>
  <Dialog title="Создание категории закладок">
    <form @submit.prevent="onSubmit" class="w-[480px]">
      <FormField name="name" for="name" label="Название категории" required>
        <Input v-model="form.name" id="name" placeholder="Введите название категории" />
      </FormField>
      <label for="is-private" class="flex items-center space-x-1 leading-loose mt-1 text-sm">
        <input type="checkbox" id="is-private" v-model="form.is_private" />
        <span>Приватная категория</span>
      </label>
      <footer class="flex items-center space-x-2 mt-4">
        <Button type="submit" :loading="loading">Сохранить</Button>
        <Button variant="secondary" @click="$overlay.hide">Назад</Button>
      </footer>
    </form>
  </Dialog>
</template>

<script setup>
import { Button, FormField, Input } from '@trevio/ui'
import { Dialog } from '~/components/dev/Overlay'
import { ref } from 'vue'
import { useForm } from 'vee-validate'
import { useNuxtApp } from 'nuxt/app'
import { useQuery } from '#imports'
import { useUsersStore } from '~/components/modules/users/store'

const { handleSubmit, setErrors} = useForm()
const { $overlay } = useNuxtApp()
const store = useUsersStore()
const form = ref({
  name: '',
  is_private: false,
})
const loading = ref(false)

const onSubmit = handleSubmit(async () => {
  if (loading.value) return

  loading.value = true

  try {
    const { data } = await useQuery({
      query: `
        mutation($name: String!, $is_private: Boolean) {
          createBookmarkCategory(name: $name, is_private: $is_private) {
            id
            name
            content_count
          }
        }
      `,
      variables: {...form.value}
    })

    if (data.createBookmarkCategory) {
      store.addCategory(data.createBookmarkCategory)
      $overlay.hide()
    }
  } catch (error) {
    if (error.message === 'validation') {
      setErrors(error.extensions.validation)
    }
  } finally {
    loading.value = false
  }
})
</script>