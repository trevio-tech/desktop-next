<template>
  <Dialog title="Мои интересы">
    <form @submit="onSubmit" class="w-[480px] space-y-4">
      <FormField name="interests" label="Поиск интересов">
        <InputTags placeholder="Введите название интереса" :model-value="modelValue" @update:modelValue="onUpdate" />
      </FormField>
      <VButton type="submit">Сохранить</VButton>
    </form>
  </Dialog>
</template>

<script setup>
import { Dialog } from '~/components/dev/Overlay'
import { FormField, VButton } from '@trevio/ui';
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

const onUpdate = (value) => {
  emit('update:modelValue', interests.value = value)
}

const { handleSubmit } = useForm()

const onSubmit = handleSubmit(async (values, errors) => {
  try {
    await useGql(`
      mutation($interests: [InterestInput]!) {
        updateInterests(interests: $interests)
      }
    `, {
      interests: interests.value
    })

    $overlay.hide()
  } catch (error) {
    errors.setErrors(error[0]['extensions']['validation'])
  }
})
</script>