<template>
  <Dialog title="Создание категории закладок">
    <form @submit.prevent="onSubmit">
      <FormField name="name" for="name" label="Название категории" required v-slot="{ hasError }">
        <Input v-model="form.name" id="name" placeholder="Введите название категории" :variant="hasError ? 'danger' : ''" />
      </FormField>
      <label for="is-private" class="flex items-center space-x-1 leading-loose mt-1 text-sm">
        <input type="checkbox" id="is-private" v-model="form.is_private" />
        <span>Приватная категория</span>
      </label>
      <footer class="flex items-center space-x-2 mt-4">
        <Button type="submit" :loading="loading">Сохранить</Button>
        <Button variant="secondary" @click="overlay.hide">Назад</Button>
      </footer>
    </form>
  </Dialog>
</template>

<script setup>
import Dialog from '~/components/base/Dialog.vue'
import { ref } from 'vue'
import { useForm } from 'vee-validate'
import { useOverlay, useQuery, Button } from '@trevio/ui'
import { useBookmarksStore } from '~/components/modules/bookmarks/store'
import { CREATE_BOOKMARK_CATEGORY, UPDATE_BOOKMARK_CATEGORY } from '../graphql/mutations'

const props = defineProps({
  category: {
    type: Object,
    default: () => {
      return {
        name: '',
        is_private: false,
      }
    }
  }
})

const { handleSubmit, setErrors} = useForm()
const overlay = useOverlay()
const store = useBookmarksStore()

const form = ref({...props.category})

const loading = ref(false)

const onSubmit = handleSubmit(async () => {
  if (loading.value) return

  loading.value = true

  try {
    const isEdit = form.value.id

    const variables = {
      input: {
        name: form.value.name,
        is_private: form.value.is_private,
      }
    }

    if (isEdit) {
      variables.id = form.value.id
    }

    const { data } = await useQuery({
      query: isEdit
          ? UPDATE_BOOKMARK_CATEGORY
          : CREATE_BOOKMARK_CATEGORY,
      variables
    })

    if (data.bookmarkCategory) {
      if (isEdit) {
        store.updateCategory(data.bookmarkCategory)
      } else {
        store.addCategory(data.bookmarkCategory)
      }
      overlay.hide()
    }
  } catch (errors) {
    if (errors[0]?.extensions?.validation) {
      setErrors(errors[0].extensions.validation)
    }
  } finally {
    loading.value = false
  }
})
</script>