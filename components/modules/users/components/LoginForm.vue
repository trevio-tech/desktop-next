<template>
  <form @submit.prevent="onSubmit" autocomplete="off" :class="{loading}">
    <fieldset class="space-y-2">
      <FormField name="email">
        <Input v-model="form.email" autocomplete="none" type="email" id="email" placeholder="Электронная почта" />
      </FormField>

      <FormField name="password">
        <Input v-model="form.password" autocomplete="none" type="password" id="password" placeholder="Пароль" />
      </FormField>
      <div class="mt-1 text-sm underline cursor-pointer">Восстановить пароль</div>
    </fieldset>

    <Button class="w-full mt-4" type="submit" :loading="loading">Войти</Button>

    <SocialLogin />
  </form>
</template>

<script setup>
import { useNuxtApp } from '#app'
import { ref } from 'vue'
import { useForm } from 'vee-validate'
import SocialLogin from '~/components/modules/users/components/SocialLogin.vue'

const emit = defineEmits(['login', 'register'])
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