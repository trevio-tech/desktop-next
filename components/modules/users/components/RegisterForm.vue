<template>
  <form @submit.prevent="onSubmit" autocomplete="off">
    <fieldset class="space-y-2">
      <FormField name="name">
        <Input v-model="form.name" type="text" id="name" placeholder="Имя пользователя" />
      </FormField>

      <FormField name="email">
        <Input v-model="form.email" autocomplete="off" type="email" id="email" placeholder="Электронная почта" />
      </FormField>

      <FormField name="password">
        <Input v-model="form.password" autocomplete="off" type="password" id="password" placeholder="Пароль" />
      </FormField>

      <FormField name="password_confirmation">
        <Input v-model="form.password_confirmation" autocomplete="off" type="password" id="password-confirmation" placeholder="Повторите пароль" />
      </FormField>
    </fieldset>

    <Button type="submit" class="w-full mt-4">Зарегистрироваться</Button>

    <div class="mt-4 text-xs">
      Регистрируясь, вы соглашаетесь с <NuxtLink to="/terms" class="underline">правилами пользования сайтом</NuxtLink> и даете согласие на <NuxtLink class="underline" to="/privacy">обработку персональных данных</NuxtLink>.
    </div>

    <SocialLogin />
  </form>
</template>

<script setup>
import { useNuxtApp } from '#app'
import { ref } from 'vue'
import { useForm } from 'vee-validate'
import SocialLogin from '~/components/modules/users/components/SocialLogin.vue'

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