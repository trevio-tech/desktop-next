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
      <div @click="$overlay.show(PasswordSendResetLinkDialog)" class="text-sm text-gray-500 underline cursor-pointer">Восстановить пароль</div>
    </fieldset>

    <Button class="w-full mt-4" type="submit" :loading="loading">Войти</Button>

    <SocialLogin />
  </form>
</template>

<script setup>
import { useNuxtApp } from '#imports'
import { ref } from 'vue'
import { useForm } from 'vee-validate'
import SocialLogin from '~/components/modules/users/components/SocialLogin.vue'
import PasswordSendResetLinkDialog from '~/components/modules/users/components/PasswordSendResetLinkDialog.vue'

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
    await $auth.loginWith('graphql', {...form.value})
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