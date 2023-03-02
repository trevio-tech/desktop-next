<template>
  <article class="rounded-lg" :class="[entry.is_pinned ? 'bg-green-50' : 'bg-white']">
    <div class="flex p-4">
      <NuxtLink :to="{name: 'users.show', params: {userId: entry.user_id}}" class="w-10 h-10 flex-shrink-0 mr-4">
        <img :src="entry.user.avatar" :alt="entry.user.name" class="block rounded-full">
      </NuxtLink>
      <div class="text-sm w-full">
        <div class="mb-2 flex items-center">
          <div>
            <NuxtLink class="font-medium" :to="{name: 'users.show', params: {userId: entry.user_id}}">{{ entry.user.name }}</NuxtLink>
            <div class="text-slate-500">{{ entry.created_at }}</div>
          </div>
          <Dropdown placement="bottom-end" class="ml-auto">
            <button type="button" class="p-1 bg-slate-200 rounded-lg">
              <MoreHorizontal class="w-5 h-5 cursor-pointer text-slate-500" />
            </button>
            <template v-slot:popper="{ hide }">
              <DropdownItem as="div" @click="onPin(); hide()" class="flex items-center space-x-2">
                <Check class="w-4 h-4" />
                <span>{{ entry.is_pinned ? 'Отменить решение' : 'Выбрать решением' }}</span>
              </DropdownItem>
              <DropdownItem as="div" @click="onEdit" class="flex items-center space-x-2">
                <Pencil class="w-4 h-4" />
                <span>Редактировать</span>
              </DropdownItem>
              <DropdownItem as="div" @click="onDelete" class="flex items-center space-x-2">
                <Trash class="w-4 h-4" />
                <span>Удалить</span>
              </DropdownItem>
            </template>
          </Dropdown>
        </div>

        <div class="text-sm">{{ entry.text }}</div>

        <ImageViewer v-if="entry.images.length" class="mt-4">
          <ImageGrid :model-value="entry.images" />
        </ImageViewer>
      </div>
    </div>
    <footer class="flex items-center p-4 border-t border-t-stone-100">
      <IsLoggedIn>
        <Like
            :model-type="entry.system_name"
            :model-id="entry.id"
            :is-liked="entry.like?.is_liked"
            :count="entry.likes_count"
        />
      </IsLoggedIn>
    </footer>
  </article>
</template>

<script setup>
import { MoreHorizontal, Check, Pencil, Trash } from 'lucide-vue-next'
import { useNuxtApp } from '#imports'
import { DELETE_ANSWER } from '~/components/modules/questions/graphql'

const emit = defineEmits(['unpinned'])

const props = defineProps({
  entry: {
    type:     Object,
    required: true
  }
})

const { $overlay } = useNuxtApp()

const onEdit = () => {
  $overlay.show(defineAsyncComponent(() => import('~/components/modules/questions/components/AnswerEditDialog.vue')), {
    props: {
      modelValue: props.entry
    },
    on: {
      'update:modelValue': (data) => {
        console.log(data)
        props.entry.text = data.text
        props.entry.images = data.images
        $overlay.hide()
      }
    }
  })
}

const onPin = async () => {
  try {
    const { data: { pinUnpinAnswer }} = await useQuery2({
      query: `
        mutation ($id: ID!) {
          pinUnpinAnswer(id: $id)
        }
      `,
      variables: {
        id: props.entry.id
      }
    })

    props.entry.is_pinned = pinUnpinAnswer === 'pinned'

    if (! props.entry.is_pinned) {
      emit('unpinned')
    }
  } catch (error) {}
}

const onDelete = async () => {
  try {
    const { data } = await useQuery2({
      query: DELETE_ANSWER,
      variables: {
        id: props.entry.id
      }
    })
  } catch (error) {}
}
</script>