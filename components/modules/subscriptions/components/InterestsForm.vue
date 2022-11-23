<template>
  <Dialog title="Мои интересы">
    <form @submit="onSubmit" class="w-[480px] space-y-4">
      <FormField name="name" label="Поиск интересов">
        <InputTags
          placeholder="Введите название интереса"
          :model-value="modelValue"
          :set-errors="setErrors"
          @update:modelValue="onUpdate"
        />
      </FormField>
      <Button :loading="loading" type="submit">Сохранить</Button>
    </form>
  </Dialog>
</template>

<script setup>
import { Dialog } from '~/components/dev/Overlay'
import { FormField, Button } from '@trevio/ui';
import { InputTags } from '~/components/wrappers'
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
  }
})

const { $overlay } = useNuxtApp()

const interests = ref(props.modelValue)

const loading = ref(false)

const onUpdate = (value) => {
  emit('update:modelValue', interests.value = value)
}

const { handleSubmit, setErrors } = useForm()

const onSubmit = handleSubmit(async () => {
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
      type: 'tags',
      items: interests.value.map(interest => parseInt(interest.id)),
    })

    $overlay.hide()
  } catch (errors) {
    if (errors[0].message === 'validation') {
      setErrors(errors[0]['extensions']['validation'])
    }
  } finally {
    loading.value = false
  }
})
</script>