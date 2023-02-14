<template>
  <form @submit.prevent="onSubmit">
    <div v-if="store.mode === 'reply'">
      {{ reply.text }}
    </div>
    <FormField name="input.text">
      <Textarea v-model="form.text" placeholder="Текст сообщения" class="flex-auto" />
    </FormField>
    <ImageGrid :model-value="form.images"></ImageGrid>
    <footer class="flex space-x-2 justify-end mt-2">
      <Upload model-type="chatMessage" :presets="['default@width:120,height:120']" v-model="form.images">
        <Button variant="secondary">
          <ImagePlus class="w-5 h-5" />
        </Button>
      </Upload>
      <Button type="submit">Отправить</Button>
    </footer>
  </form>
</template>

<script setup>
import { CREATE_CHAT_MESSAGE } from '../../graphql'
import { ImagePlus } from 'lucide-vue-next'
import { ref, watch } from 'vue'
import { useChatStore } from '~/components/modules/chats/stores/chat'
import { useForm } from 'vee-validate'
import { pick } from 'lodash'

const formInitialState = {
  parent_id:  null,
  link_id:    null,
  text:       '',
  images:     [],
}

const { chatId } = defineProps({
  chatId: {
    type:     String,
    required: true,
  }
})

const form = ref({...formInitialState})
const reply = ref({})
const store = useChatStore()
const isLoading = ref(false)

watch(() => store.selectedMessages, (newValue) => {
  if (store.mode === 'edit') {
    form.value.text = newValue[Object.keys(newValue)[0]].text
  }

  if (store.mode === 'reply') {
    const message = newValue[Object.keys(newValue)[0]]

    reply.value = message
    form.value.parent_id = message.id
  }
})

const { handleSubmit, setErrors } = useForm()

const onSubmit = handleSubmit(async () => {
  if (isLoading.value) {
    return
  }

  isLoading.value = true

  const input = pick(form.value, [
    'parent_id',
    'link_id',
    'text',
    'images',
  ])

  input.images = input.images.map(image => parseInt(image.id))

  try {
    await useQuery({
      query: CREATE_CHAT_MESSAGE,
      variables: {
        chatId,
        input
      }
    })

    form.value = {...formInitialState}
  } catch (error) {
    if (error['message'] === 'validation') {
      setErrors(error['extensions']['validation'])
    }
  } finally {
    isLoading.value = false
  }
})
</script>