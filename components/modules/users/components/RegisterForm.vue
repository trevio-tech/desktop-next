<template>
  <form @submit.prevent="onSubmit" autocomplete="off">
    <fieldset class="space-y-2">
      <FormField name="name" v-slot="{ hasError }">
        <Input v-model="form.name" :variant="hasError ? 'danger' : undefined" type="text" id="name" placeholder="Имя пользователя" />
      </FormField>

      <FormField name="email" v-slot="{ hasError }">
        <Input v-model="form.email" :variant="hasError ? 'danger' : undefined" autocomplete="off" type="email" id="email" placeholder="Электронная почта" />
      </FormField>

      <FormField name="password" v-slot="{ hasError }">
        <Input v-model="form.password" :variant="hasError ? 'danger' : undefined" autocomplete="off" type="password" id="password" placeholder="Пароль" />
      </FormField>

      <FormField name="password_confirmation" v-slot="{ hasError }">
        <Input v-model="form.password_confirmation" :variant="hasError ? 'danger' : undefined" autocomplete="off" type="password" id="password-confirmation" placeholder="Повторите пароль" />
      </FormField>
    </fieldset>

    <FormField name="is_company" class="mt-4">
      <div class="flex items-center space-x-2">
        <Checkbox v-model="form.is_company" :value="true" id="is-company">
          Бизнес-аккаунт
        </Checkbox>
        <HelpCircle
            @click="$overlay.show(defineAsyncComponent(() => import('~/components/modules/users/components/AboutBusinessAccountDialog.vue')))"
            class="w-4 h-4 text-gray-400 hover:text-blue-500 cursor-pointer" />
      </div>
    </FormField>

    <Button :loading="loading" type="submit" class="w-full mt-4">Зарегистрироваться</Button>

    <div class="mt-4 text-xs font-medium">
      Регистрируясь, вы соглашаетесь с <NuxtLink to="/terms" class="underline">правилами пользования сайтом</NuxtLink> и даете согласие на <NuxtLink class="underline" to="/privacy">обработку персональных данных</NuxtLink>.
    </div>

    <SocialLogin />
  </form>
</template>

<script setup>
import SocialLogin from '~/components/modules/users/components/SocialLogin.vue'
import { HelpCircle } from 'lucide-vue-next'
import { defineAsyncComponent } from '#imports'
import { ref } from 'vue'
import { useForm } from 'vee-validate'
import { useNuxtApp } from '#imports'

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
          registerUser(input: $input) {
            id
          }
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
    if (error.extensions.validation) {
      setErrors(error.extensions.validation)
    }
  } finally {
    loading.value = false
  }
})
</script>