<template>
  <form @submit.prevent="onSubmit">
    <div v-if="store.mode === 'reply'">
      {{ reply.text }}
    </div>
    <Textarea v-model="form.text" placeholder="Текст сообщения" class="flex-auto" />
    <footer class="flex space-x-2 justify-end mt-2">
      <Button variant="secondary">
        <ImagePlus class="w-5 h-5" />
      </Button>
      <Button type="submit">Отправить</Button>
    </footer>
  </form>
</template>

<script setup>
import { ref, watch } from 'vue'
import { CREATE_CHAT_MESSAGE } from '../../graphql'
import { ImagePlus } from 'lucide-vue-next'
import { Textarea, Button } from '@trevio/ui'
import { useChatStore } from '~/components/modules/chats/stores/chat'

const { chatId } = defineProps({
  chatId: {
    type:     String,
    required: true,
  }
})

const form = ref({
  parent_id:  null,
  link_id:    null,
  text:       ''
})
const reply = ref({})

const store = useChatStore()

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

const onSubmit = async () => {
  try {
    await useQuery({
      query: CREATE_CHAT_MESSAGE,
      variables: {
        chat_id: chatId,
        input: {
          parent_id: parseInt(form.value.parent_id),
          link_id:   parseInt(form.value.link_id),
          text:      form.value.text,
        }
      }
    })
  } catch (error) {}
}
</script>