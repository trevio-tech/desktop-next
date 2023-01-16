<template>
  <article class="flex">
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
            <DropdownItem as="div" @click="onPin(); hide()">{{ entry.is_pinned ? 'Отменить выбор' : 'Выбрать ответом' }}</DropdownItem>
            <DropdownItem as="div" @click="onEdit(hide)">Редактировать</DropdownItem>
          </template>
        </Dropdown>
      </div>
      <div class="text-sm">{{ entry.text }}</div>
    </div>
  </article>
</template>

<script setup>
import { MoreHorizontal } from 'lucide-vue-next'
import { useNuxtApp } from '#app'

const emit = defineEmits(['pinned', 'unpinned'])

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
        Object.assign(props.entry, data)
        $overlay.hide()
      }
    }
  })
}

const onPin = async () => {
  try {
    const { data: { pinUnpinAnswer }} = await useQuery({
      query: `
        mutation ($id: Int!) {
          pinUnpinAnswer(id: $id)
        }
      `,
      variables: {
        id: props.entry.id
      }
    })

    props.entry.is_pinned = pinUnpinAnswer === 'pinned'

    if (props.entry.is_pinned) {
      emit('pinned')
    } else {
      emit('unpinned')
    }
  } catch (error) {}
}
</script>