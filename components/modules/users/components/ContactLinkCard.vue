<template>
  <div v-if="!isEdit" class="bg-white shadow-sm rounded-lg border border-slate-200 p-2 flex items-center">
    <NuxtLink :href="link.url" target="_blank" class="flex">
      <div class="w-10 h-10 bg-slate-100 rounded-lg flex-shrink-0 mr-2 self-start"></div>
      <div class="mr-2">
        <div class="text-sm font-semibold mb-1">{{ link.title || 'Без заголовка' }}</div>
        <div class="text-xs text-gray-500">{{ link.host }}</div>
      </div>
    </NuxtLink>
    <Dropdown class="flex-shrink-0 ml-auto" placement="bottom-end">
      <button class="flex items-center justify-center w-8 h-8 rounded-lg hover:bg-stone-100 cursor-pointer">
        <MoreHorizontal />
      </button>
      <template #popper>
        <DropdownItem @click="isEdit = !isEdit">
          <template #prepend>
            <Pencil class="w-5 h-5" />
          </template>
          Редактировать
        </DropdownItem>
        <DropdownItem @click="onDelete" :busy="isDeleting">
          <template #prepend>
            <Trash class="w-5 h-5 text-red-500" />
          </template>
          Удалить
        </DropdownItem>
      </template>
    </Dropdown>
  </div>
  <form v-else @submit.prevent="onSubmit">
    <FormField class="mb-2" name="title" v-slot="{ hasError }">
      <Input v-model="link.title" placeholder="Введите название для ссылки" :has-error="hasError" />
    </FormField>

    <Button type="submit">Сохранить</Button>
  </form>
</template>

<script setup>
import { MoreHorizontal, Trash, Pencil } from 'lucide-vue-next'
import { Dropdown, DropdownItem, useQuery, Button } from '@trevio/ui'
import { shallowRef } from 'vue'
import { useForm } from 'vee-validate'

const emits = defineEmits(['update:modelValue', 'deleted'])
const props = defineProps({
  link: {
    type: Object,
    required: true
  }
})

const { handleSubmit, setErrors } = useForm()
const isDeleting = shallowRef(false)
const isEditing = shallowRef(false)
const isEdit = shallowRef(false)

const onDelete = async () => {
  if (isDeleting.value) return

  isDeleting.value = true

  try {
    const { data: { deleteContactLink }} = await useQuery({
      query: `
        mutation deleteContactLink($link_id: ID!) {
          deleteContactLink(link_id: $link_id)
        }
      `,
      variables: {
        link_id: props.link.id
      }
    })

    if (deleteContactLink) {
      emits('deleted')
    }
  } catch (errors) {}
  finally {
    isDeleting.value = false
  }
}

const onSubmit = handleSubmit(async () => {
  if (isEditing.value) return

  isEditing.value = true

  try {
    const { data: { updateContactLink }} = await useQuery({
      query: `
        mutation updateContactLink($link_id: ID!, $title: String!) {
          updateContactLink(link_id: $link_id, title: $title)
        }
      `,
      variables: {
        link_id: props.link.id,
        title: props.link.title,
      }
    })

    if (updateContactLink) {
      isEdit.value = false
    }
  } catch (errors) {
    if (errors[0]?.extensions?.validation) {
      setErrors(errors[0].extensions.validation)
    }
  }
  finally {
    isEditing.value = false
  }
})
</script>