<template>
  <div tabindex="-1" aria-hidden="true" class="absolute left-0 top-0 w-full h-full overflow-y-auto">
    <div class="flex items-center justify-center flex-col p-10 min-h-full">
      <div class="relative w-[360px] max-w-2xl bg-white rounded-lg shadow dark:bg-gray-700">
        <header class="p-4 flex justify-between items-center p-4 rounded-t border-b border-gray-200">
          <h3 class="text-lg font-semibold text-gray-900 leading-none">
            Подтверждение удаления
          </h3>
          <button @click="onClose" type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center" data-modal-toggle="defaultModal">
            <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
            <span class="sr-only">Закрыть</span>
          </button>
        </header>

        <div class="p-4 text-center">
          <p class="mb-4">После удаления материал нельзя будет восстановить.</p>
          <Button :loading="pendingDeletion" variant="primary" class="w-full" @click="onDelete">Удалить</Button>
          <Button variant="secondary" class="w-full mt-1" @click="onClose">Отмена</Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Button, useQuery, useOverlay } from '@trevio/ui'
import { ref } from 'vue'

const emits = defineEmits(['deleted'])

const props = defineProps({
  mutation: {
    type: String,
    required: true,
  },
  mutationName: {
    type: String,
    required: true,
  },
  variables: {
    type: Object
  }
})

const overlay = useOverlay()

const pendingDeletion = ref(false)

const onClose = () => {
  if (pendingDeletion.value === false) {
    overlay.hide()
  }
}

const onDelete = async () => {
  if (pendingDeletion.value) {
    return
  }

  pendingDeletion.value = true

  try {
    const { data } = await useQuery({
      query:     props.mutation,
      variables: props.variables,
    })

    if (data[props.mutationName]) {
      emits('deleted')
    }
  } catch (error) {
    console.log(error)
  }
  finally {
    pendingDeletion.value = false
  }
}
</script>