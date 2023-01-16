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
import { CREATE_ANSWER, UPDATE_ANSWER } from '~/components/modules/questions/graphql'

const emit = defineEmits(['created', 'updated'])

const props = defineProps({
  questionId: {
    type:     Number,
    required: true
  },
  answer: {
    type: Object,
  }
})

const { setErrors, handleSubmit } = useForm()

const loading = ref(false)

const formInitialState = {
  question_id: props.questionId,
  text: '',
}

const form = ref({...formInitialState})
const isEdit = props.answer?.id > 0

if (isEdit) {
  form.value.text = props.answer.text
}

const onSubmit = handleSubmit(async () => {
  if (loading.value) return

  loading.value = true

  const variables = {
    input: {...form.value}
  }

  if (isEdit) {
    variables.answer_id = props.answer.id
  }

  try {
    const { data } = await useQuery({
      query: isEdit ? UPDATE_ANSWER : CREATE_ANSWER,
      variables
    })

    if (data.answerForm?.id > 0) {
      form.value = {...formInitialState}

      emit(isEdit ? 'updated' : 'created', data.answerForm)
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