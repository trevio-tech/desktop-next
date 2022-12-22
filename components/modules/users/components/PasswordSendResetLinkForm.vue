<template>
  <form @submit.prevent="onSubmit" autocomplete="off" :class="{loading}">
    <FormField label="Электронная почта" name="email" v-slot="{ hasError }">
      <Input
        v-model="form.email"
        :variant="hasError ? 'danger' : undefined"
        autocomplete="none"
        type="email"
        id="email"
        placeholder="Введите email указанный при регистрации" />
    </FormField>

    <Button class="w-full mt-4" type="submit" :loading="loading">Восстановить</Button>
  </form>
</template>

<script setup>
import { useNuxtApp } from '#app'
import { ref } from 'vue'
import { useForm } from 'vee-validate'

const emit = defineEmits(['login', 'register'])
const { $auth } = useNuxtApp()
const { handleSubmit, setErrors } = useForm()
const loading = ref(false)

const form = ref({
  email: '',
})

const onSubmit = handleSubmit(async () => {
  if (loading.value) return

  loading.value = true

  try {
    await $auth.loginWith('local', {body: form.value})
    emit('login')
  } catch ({ data }) {
    if (Object.hasOwn(data, 'errors')) {
      setErrors(data.errors)
    }
  } finally {
    loading.value = false
  }
})
</script>