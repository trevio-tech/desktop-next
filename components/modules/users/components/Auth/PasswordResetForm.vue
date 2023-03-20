<template>
  <form @submit.prevent="onSubmit" autocomplete="off" :class="{loading}">
    <fieldset class="space-y-2">
      <FormField name="email" v-slot="{ hasError }">
        <Input v-model="form.email" :variant="hasError ? 'danger' : undefined" autocomplete="none" type="email" id="email" placeholder="Электронная почта" />
      </FormField>

      <FormField name="password" v-slot="{ hasError }">
        <Input v-model="form.password"
               :variant="hasError ? 'danger' : undefined"
               autocomplete="none" type="password" id="password" placeholder="Пароль" />
      </FormField>

      <FormField name="password" v-slot="{ hasError }">
        <Input v-model="form.password_confirmation"
               :variant="hasError ? 'danger' : undefined"
               autocomplete="none" type="password" id="password-confirmation" placeholder="Повторите пароль" />
      </FormField>
    </fieldset>

    <Button class="w-full mt-4" type="submit" :loading="loading">Восстановить</Button>
  </form>
</template>

<script setup>
import { useNuxtApp } from '#imports'
import { ref } from 'vue'
import { useForm } from 'vee-validate'
import { Button } from '@trevio/ui'

const emit = defineEmits(['login', 'register'])
const { $auth } = useNuxtApp()
const { handleSubmit, setErrors } = useForm()
const loading = ref(false)

const form = ref({
  email: '',
  password: '',
  password_confirmation: '',
})

const onSubmit = handleSubmit(async () => {
  if (loading.value) return

  loading.value = true

  try {
    await $auth.loginWith('graphql', {...form.value})
    emit('login')
  } catch (errors) {
    if (errors[0].extensions.validation) {
      setErrors(errors[0].extensions.validation)
    }
  } finally {
    loading.value = false
  }
})
</script>