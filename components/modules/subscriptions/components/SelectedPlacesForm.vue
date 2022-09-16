<template>
  <Dialog title="Избранные направления">
    <form @submit="onSubmit" class="w-[480px] space-y-4">
      <FormField name="interests" label="Поиск направлений">
        <SearchPlace :model-value="{full_name: ''}" @update:modelValue="onSelect" clear-after-select />
      </FormField>

      <div v-if="modelValue.length">
        <ul class="text-sm space-y-1">
          <li v-for="(place, index) in modelValue" :key="place.id">{{ place.full_name }}</li>
        </ul>
      </div>

      <VButton type="submit">Сохранить</VButton>
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
  try {
    /*await useGql(`
      mutation($interests: [InterestInput]!) {
        updateInterests(interests: $interests)
      }
    `, {
      interests: interests.value
    })*/

    $overlay.hide()
  } catch (error) {
    errors.setErrors(error[0]['extensions']['validation'])
  }
})
</script>