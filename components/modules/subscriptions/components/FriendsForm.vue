<template>
  <Dialog title="Мои подписки">
    <form @submit="onSubmit" class="w-[480px] space-y-4">
      <FormField name="users" label="Поиск пользователей">
        <InputUsers placeholder="Введите ник пользователя" :model-value="modelValue" @update:modelValue="onUpdate" />
      </FormField>

      <form-field v-if="recommendations.length" name="recommendations" label="Рекоммедации">
        {{ recommendations }}
      </form-field>

      <VButton :loading="loading" type="submit">Сохранить</VButton>
    </form>
  </Dialog>
</template>

<script setup>
import { Dialog } from '~/components/dev/Overlay'
import { FormField, VButton } from '@trevio/ui';
import { InputUsers } from '~/components/wrappers'
import { ref } from 'vue'
import { useForm } from 'vee-validate'
import { useGql } from '~/uses'
import { useNuxtApp } from 'nuxt/app'

const emit = defineEmits([
  'update:modelValue'
])
const props = defineProps({
  modelValue: {
    type: Array
  },
  recommendations: {
    type: Array,
    default: () => []
  }
})

const { $overlay } = useNuxtApp()

const users = ref(props.modelValue)

const loading = ref(false)

const onUpdate = (value) => {
  emit('update:modelValue', users.value = value)
}

const { handleSubmit } = useForm()

const onSubmit = handleSubmit(async (values, errors) => {
  if (loading.value) {
    return
  }

  loading.value = true

  try {
    await useGql(`
      mutation($type: String!, $items: [Int]!) {
        updateSubscriptions(type: $type, items: $items)
      }
    `, {
      type: 'users',
      items: users.value.map(user => parseInt(user.id)),
    })

    $overlay.hide()
  } catch (error) {
    errors.setErrors(error[0]['extensions']['validation'])
  } finally {
    loading.value = false
  }
})
</script>