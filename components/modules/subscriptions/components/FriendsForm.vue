<template>
  <Dialog title="Мои подписки">
    <form @submit="onSubmit" class="w-[480px] space-y-4">
      <FormField name="users" label="Поиск пользователей">
        <InputUsers placeholder="Введите ник пользователя" :model-value="modelValue" @update:modelValue="onUpdate" />
      </FormField>

      <FormField v-if="recommendations.length" name="recommendations" label="Рекоммедации">
        {{ recommendations }}
      </FormField>

      <Button :loading="loading" type="submit">Сохранить</Button>
    </form>
  </Dialog>
</template>

<script setup>
import Dialog from '~/components/base/Dialog.vue'
import { InputUsers } from '~/components/wrappers'
import { ref } from 'vue'
import { useForm } from 'vee-validate'
import { useNuxtApp } from '#imports'

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
    await useQuery({
      query: `
        mutation($type: String!, $items: [Int]!) {
          updateSubscriptions(type: $type, items: $items)
        }
      `,
      variables:{
        type: 'users',
        items: users.value.map(user => parseInt(user.id)),
      }
    })

    $overlay.hide()
  } catch (error) {
    errors.setErrors(error['extensions']['validation'])
  } finally {
    loading.value = false
  }
})
</script>