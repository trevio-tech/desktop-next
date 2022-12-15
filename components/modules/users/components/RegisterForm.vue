<template>
  <form @submit.prevent="onSubmit" class="space-y-6">
    <FormField name="name" label="Ник" required>
      <Input v-model="form.name" type="text" id="name" />
    </FormField>

    <FormField name="email" label="Электронная почта" required>
      <Input v-model="form.email" type="email" id="email" />
    </FormField>

    <FormField name="password" label="Пароль" required>
      <Input v-model="form.password" type="password" id="password" />
    </FormField>

    <FormField name="password_confirmation" label="Повторите пароль" required>
      <Input v-model="form.password_confirmation" type="password" id="password-confirmation" />
    </FormField>

    <Button type="submit">Зарегистрироваться</Button>
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
  name: '',
  email: '',
  password: '',
  password_confirmation: '',
  is_company: false,
})

const onSubmit = handleSubmit(async () => {
  if (loading.value) return

  loading.value = true

  try {
    const { data } = await useQuery({
      query: `
        mutation ($input: RegisterUserInput!) {
          registerUser(input: $input)
        }
      `,
      variables: {
        input: {...form.value}
      }
    })

    if (data.registerUser === true) {
      await $auth.loginWith('local', {body: {
        email:    form.value.email,
        password: form.value.password,
      }})

      emit('login')
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