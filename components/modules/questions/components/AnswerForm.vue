<template>
  <form @submit.prevent="onSubmit">
    <FormField name="text" v-slot="{ hasError }">
      <Textarea v-model="form.text" placeholder="Введите текст ответа" :variant="hasError ? 'danger' : undefined" />
    </FormField>

    <ImageGrid v-if="form.images.length" v-model="form.images" deletable class="mt-4" />

    <div class="flex items-center mt-4 space-x-2">
      <Button :loading="loading" type="submit">Отправить</Button>
      <Upload
          v-model="form.images"
          :fields="uploadFields"
          :input="{model_type: 'answers'}">
        <Button :loading="loading" variant="secondary">
          <Image />
        </Button>
      </Upload>
    </div>

  </form>
</template>

<script setup>
import { ref } from 'vue'
import { useForm } from 'vee-validate'
import { CREATE_ANSWER, UPDATE_ANSWER } from '~/components/modules/questions/graphql'
import { Image } from 'lucide-vue-next'
import { useQuery } from '@trevio/ui'

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

const uploadFields = [
    'id',
    'url(presets: "default@width:120,height:120")'
]

const { setErrors, handleSubmit } = useForm()

const loading = ref(false)

const formInitialState = {
  question_id: props.questionId,
  text: '',
  images: [],
}

const form = ref({...formInitialState})
const isEdit = props.answer?.id > 0

if (isEdit) {
  form.value.text = props.answer.text
  form.value.images = props.answer.images
}

const onSubmit = handleSubmit(async () => {
  if (loading.value) return

  loading.value = true

  const variables = {
    input: {...form.value}
  }

  variables.input.images = form.value.images.map(image => image.id)

  if (isEdit) {
    variables.id = props.answer.id
  }

  try {
    const { data } = await useQuery({
      query: isEdit ? UPDATE_ANSWER : CREATE_ANSWER,
      variables
    })

    if (data.answer?.id > 0) {
      form.value = {...formInitialState}
      emit(isEdit ? 'updated' : 'created', data.answer)
    }
  } catch (error) {
    if (error?.extensions?.validation) {
      setErrors(error.extensions.validation)
    }
  } finally {
    loading.value = false
  }
})
</script>