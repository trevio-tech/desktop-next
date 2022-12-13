<template>
  <Dialog title="Авторизация">
    <form class="max-w-[480px]" @submit.prevent="onSubmit" autocomplete="off" :class="{loading}">
      <div class="mb-2 bg-red-300 p-4 ronded" v-if="isBanned">
        Пользователь заблокирован
      </div>

      <FormField name="email" label="Электронная почта" required>
        <Input v-model="form.email" type="email" id="email" />
      </FormField>

      <FormField name="password" label="Пароль" required>
        <Input v-model="form.password" type="password" id="password" />
      </FormField>

      <div class="mt-4">
        Авторизуясь, вы соглашаетесь с <nuxt-link to="/terms" class="underline">правилами пользования сайтом</nuxt-link> и даете согласие на <nuxt-link class="underline" to="/privacy">обработку персональных данных</nuxt-link>.
      </div>

      <div class="mt-4">
        <Button type="submit" :loading="loading">Войти</Button>
      </div>
    </form>
  </Dialog>
</template>

<script setup>
import Dialog from '~/components/base/Dialog.vue'
import { useNuxtApp } from '#app'
import { ref } from 'vue'
import { useForm } from 'vee-validate'

const { $auth, $overlay } = useNuxtApp()
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
    const { token } = await $auth.loginWith('local', {body: form.value})
    await $auth.strategy.token.set(token)
    $overlay.hide()
  } catch ({ data }) {
    if (Object.hasOwn(data, 'errors')) {
      setErrors(data.errors)
    }
  } finally {
    loading.value = false
  }
})
</script>