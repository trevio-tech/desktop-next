<template>
  <DropdownMenu placement="bottom-end">
    <template v-slot:default="{ isActive }">
      <button type="button" class="hover:bg-stone-100 rounded-lg text-sm p-1.5" :class="{'bg-stone-100': isActive}">
        <MoreHorizontal />
      </button>
    </template>
    <template v-slot:popper="{ hide }">
      <DropdownMenuItem :to="to" @click="hide">
        <template #prepend>
          <Pencil class="w-5 h-5" />
        </template>
        Редактировать
      </DropdownMenuItem>
      <DropdownMenuItem @click="hide">
        <template #prepend>
          <Trash class="w-5 h-5 text-red-500" />
        </template>
        <DeletionConfirmationButton keyword="заметка" :mutation="DELETE_NOTE" mutation-name="deleteNote" :variables="{id: modelId}">
          Удалить
        </DeletionConfirmationButton>
      </DropdownMenuItem>
    </template>
  </DropdownMenu>
</template>

<script setup>
import DeletionConfirmationButton from '~/components/common/dialogs/DeletionConfirmationButton.vue'
import { DELETE_NOTE } from '~/components/modules/notes/graphql'
import { DropdownMenu, DropdownMenuItem } from '@trevio/ui'
import { MoreHorizontal, Pencil, Trash } from 'lucide-vue-next'

const { modelType, modelId } = defineProps({
  modelType: {
    type: String,
    required: true,
    validator(value) {
      return ['albums', 'notes', 'travels'].includes(value)
    }
  },
  modelId: {
    type: [String, Number],
    required: true
  }
})

const to = {
  albums: {name: 'albums.edit', params: {albumId: modelId}},
  notes: {name: 'notes.edit', params: {noteId: modelId}},
  questions: {name: 'questions.edit', params: {questionId: modelId}},
  reviews: {name: 'reviews.edit', params: {reviewId: modelId}},
  travels: {name: 'travels.edit', params: {travelId: modelId}},
}[modelType]
</script>