<template>
  <form @submit.prevent="onSubmit" autocomplete="off" :class="{loading}">
    <FormField name="email" label="Электронная почта" required>
      <Input v-model="form.email" type="email" id="email" />
    </FormField>

    <FormField name="password" label="Пароль" required>
      <Input v-model="form.password" type="password" id="password" />
    </FormField>

    <div class="mt-4">
      Авторизуясь, вы соглашаетесь с <NuxtLink to="/terms" class="underline">правилами пользования сайтом</NuxtLink> и даете согласие на <NuxtLink class="underline" to="/privacy">обработку персональных данных</NuxtLink>.
    </div>

    <div class="mt-4">
      <Button type="submit" :loading="loading">Войти</Button>
    </div>
  </form>
</template>

<script setup>
import { useNuxtApp } from '#app'
import { ref } from 'vue'
import { useForm } from 'vee-validate'

const emit = defineEmits(['login'])
const { $auth } = useNuxtApp()
const { handleSubmit, setErrors } = useForm()
const loading = ref(false)

const form = ref({
  email: '',
  password: '',
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