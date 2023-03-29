<template>
  <form @submit.prevent="onSubmit" autocomplete="off" :class="{loading}">
    <div v-if="isSend">
      Ссылка для восстановления пароля отправлена на ваш адрес электронной почты.
    </div>
    <div v-else>
      <FormField label="Электронная почта" name="email" v-slot="{ hasError }" required>
        <Input
            v-model="form.email"
            :variant="hasError ? 'danger' : undefined"
            autocomplete="none"
            type="email"
            id="email"
            placeholder="Введите email указанный при регистрации" />
      </FormField>

      <Button class="w-full mt-4" type="submit" :loading="loading">Восстановить</Button>
    </div>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import { useForm } from 'vee-validate'
import { usePageQuery, Button, Input } from '@trevio/ui'

const { handleSubmit, setErrors } = useForm()
const loading = ref(false)
const isSend = ref(false)

const form = ref({
  email: '',
})

const onSubmit = handleSubmit(async () => {
  if (loading.value) return

  loading.value = true

  try {
    const { data } = await usePageQuery({
      query: `
        query ($email: String) {
          sendResetLink(email: $email)
        }
      `,
      variables: {
        email: form.value.email
      }
    })

    isSend.value = data.sendResetLink
  } catch (errors) {
    if (errors[0]?.extensions?.validation) {
      setErrors(errors[0].extensions.validation)
    }
  } finally {
    loading.value = false
  }
})
</script>