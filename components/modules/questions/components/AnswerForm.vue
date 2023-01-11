<template>
  <form @submit.prevent="onSubmit">
    <FormField name="text" v-slot="{ hasError }">
      <Textarea v-model="form.text" placeholder="Введите текст ответа" :variant="hasError ? 'danger' : undefined" />
    </FormField>

    <Button type="submit" class="mt-2">Отправить</Button>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import { useForm } from 'vee-validate'

const emit = defineEmits(['created'])

const props = defineProps({
  questionId: {
    type:     Number,
    required: true
  }
})

const { setErrors, handleSubmit } = useForm()

const loading = ref(false)

const formInitialState = {
  question_id: props.questionId,
  text: '',
}

const form = ref({...formInitialState})

const onSubmit = handleSubmit(async () => {
  if (loading.value) return

  loading.value = true

  try {
    const { data } = await useQuery({
      query: `
        mutation($input: AnswerInput!) {
          createAnswer(input: $input) {
            id
            text
          }
        }
      `,
      variables: {
        input: {...form.value}
      }
    })

    if (data.createAnswer?.id > 0) {
      form.value = {...formInitialState}
      emit('created', data.createAnswer)
    }
  } catch (error) {
    if (error['message'] === 'validation') {
      setErrors(error['extensions']['validation'])
    }
  } finally {
    loading.value = false
  }
})
</script>