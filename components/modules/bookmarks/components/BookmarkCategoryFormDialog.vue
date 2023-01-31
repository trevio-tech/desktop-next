<template>
  <Dialog title="Создание категории закладок">
    <form @submit.prevent="onSubmit">
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
import Dialog from '~/components/base/Dialog.vue'
import { ref } from 'vue'
import { useForm } from 'vee-validate'
import { useNuxtApp } from 'nuxt/app'
import { useQuery } from '#imports'
import { useBookmarksStore } from '~/components/modules/bookmarks/store'

const { handleSubmit, setErrors} = useForm()
const { $overlay } = useNuxtApp()
const store = useBookmarksStore()
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
        mutation($name: String!, $isPrivate: Boolean) {
          createBookmarkCategory(name: $name, isPrivate: $isPrivate) {
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