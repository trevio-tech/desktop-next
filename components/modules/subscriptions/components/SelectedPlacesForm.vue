<template>
  <Dialog title="Избранные направления">
    <form @submit="onSubmit" class="w-[480px] space-y-4">
      <FormField name="interests" label="Поиск направлений">
        <SearchPlace :model-value="{full_name: ''}" @update:modelValue="onSelect" clear-after-select />
      </FormField>

      <div v-if="modelValue.length">
        <ul class="text-sm">
          <li v-for="(place, index) in modelValue" :key="place.id" class="w-full flex items-center p-1 hover:bg-gray-100 rounded-lg">
            <span class="truncate mr-4">{{ place.full_name }}</span>
            <XMarkIcon @click="modelValue.splice(index, 1)" class="cursor-pointer flex-shrink-0 w-5 h-5 text-red-500 ml-auto" />
          </li>
        </ul>
      </div>

      <VButton :loading="loading" type="submit">Сохранить</VButton>
    </form>
  </Dialog>
</template>

<script setup>
import { Dialog } from '~/components/dev/Overlay'
import { FormField, VButton, SearchPlace } from '@trevio/ui'
import { ref } from 'vue'
import { useForm } from 'vee-validate'
import { useGql } from '~/uses'
import { useNuxtApp } from 'nuxt/app'
import { XMarkIcon } from '@heroicons/vue/20/solid'

const emit = defineEmits([
  'update:modelValue'
])
const props = defineProps({
  modelValue: {
    type: Array
  }
})

const { $overlay } = useNuxtApp()

const places = ref(props.modelValue)
const loading = ref(false)

const { handleSubmit } = useForm()

const onUpdate = (value) => {
  emit('update:modelValue', places.value = value)
}

const onSelect = async (place) => {
  emit('update:modelValue', place)
}

const onChange = async (query) => {
  const { data: { searchPlaces }} = await useGql(`
    query($query: String!) {
      searchPlaces(query: $query) {
        id
        parent_id
        full_name
        parent {
          id
          parent_id
          name
        }
      }
    }
  `, {
    query
  })

  return searchPlaces
}

const onSubmit = handleSubmit(async (values, errors) => {
  if (loading.value) {
    return
  }

  loading.value = true

  try {
    await useGql(`
      mutation($type: String!, $items: [Int]!) {
        updateSubscriptions(type: $type, items: $items)
      }
    `, {
      type: 'places',
      items: places.value.map(place => parseInt(place.id)),
    })

    $overlay.hide()
  } catch (error) {
    errors.setErrors(error[0]['extensions']['validation'])
  } finally {
    loading.value = false
  }
})
</script>