<template>
  <DropdownMenu placement="bottom-end">
    <template v-slot:default="{ isActive }">
      <button type="button" class="hover:bg-stone-100 rounded-lg text-sm p-1.5" :class="{'bg-stone-100': isActive}">
        <MoreHorizontal />
      </button>
    </template>
    <template v-slot:popper="{ hide }">
      <DropdownMenuItem @click="promoDialog(hide)">
        <template #prepend>
          <TrendingUp class="w-5 h-5 text-green-500" />
        </template>
        Продвинуть
      </DropdownMenuItem>
      <DropdownMenuItem :to="editLink" @click="hide">
        <template #prepend>
          <Pencil class="w-5 h-5" />
        </template>
        Редактировать
      </DropdownMenuItem>
      <DropdownMenuItem @click="hide">
        <template #prepend>
          <Trash class="w-5 h-5 text-red-500" />
        </template>
        <DeletionConfirmationButton keyword="заметка" :mutation="mutation" :mutation-name="mutationName" :variables="{id: modelId}">
          Удалить
        </DeletionConfirmationButton>
      </DropdownMenuItem>
    </template>
  </DropdownMenu>
</template>

<script setup>
import DeletionConfirmationButton from '~/components/common/dialogs/DeletionConfirmationButton.vue'
import { DELETE_ALBUM } from '~/components/modules/albums/graphql'
import { DELETE_NOTE } from '~/components/modules/notes/graphql'
import { DELETE_QUESTION } from '~/components/modules/questions/graphql'
import { DELETE_REVIEW } from '~/components/modules/reviews/graphql'
import { DELETE_TRAVEL } from '~/components/modules/travels/graphql'
import { DropdownMenu, DropdownMenuItem } from '@trevio/ui'
import { MoreHorizontal, Pencil, Trash, TrendingUp } from 'lucide-vue-next'
import { defineAsyncComponent } from 'vue'
import { useOverlay } from '@trevio/ui'

const { entry, modelType, modelId } = defineProps({
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
  },
  entry: {
    type: Object,
    required: true,
  }
})

const overlay = useOverlay()

const mutation = {
  albums: DELETE_ALBUM,
  notes: DELETE_NOTE,
  questions: DELETE_QUESTION,
  reviews: DELETE_REVIEW,
  travels: DELETE_TRAVEL,
}[modelType]

const mutationName = {
  albums: 'deleteAlbum',
  notes: 'deleteNote',
  questions: 'deleteQuestion',
  reviews: 'deleteReview',
  travels: 'deleteTravel',
}[modelType]

const editLink = {
  albums: {name: 'albums.edit', params: {albumId: modelId}},
  notes: {name: 'notes.edit', params: {noteId: modelId}},
  questions: {name: 'questions.edit', params: {questionId: modelId}},
  reviews: {name: 'reviews.edit', params: {reviewId: modelId}},
  travels: {name: 'travels.edit', params: {travelId: modelId}},
}[modelType]

const promoDialog = (hide) => {
  overlay.show(defineAsyncComponent(() => import('~/components/modules/promo/components/PromoDialogV2.vue')), {
    props: {
      entry
    }
  })

  hide()
}
</script>