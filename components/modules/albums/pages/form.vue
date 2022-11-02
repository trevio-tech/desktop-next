<template>
  <TheLayout :heading="`${isEdit ? 'Редактирование' : 'Создание'} фотоальбома`">
    <template #sidebar>
      123
    </template>
    <form @submit.prevent="onSubmit" class="bg-white p-4 rounded-md shadow ring-1 ring-slate-200">
        <div class="space-y-4">
          <FormField name="input.title" label="Заголовок" required  v-slot="{ hasError }">
            <Input v-model="form.title" placeholder="Введите заголовок" />
          </FormField>

          <FormField
            help="Изображения можно сортировать. Первое изображение будет использовано в качестве обложки."
            label="Изображения"
            name="input.text"
            required
          >
            <FormGallery v-if="form.images" v-model="form.images" />
            <Upload :fields="['id', 'url']" model-type="albums" @uploaded="onUploaded" />
          </FormField>

          <FormField name="input.text" label="Текст">
            <Textarea placeholder="Краткое описание" rows="2" v-model="form.text" />
          </FormField>

          <FormField name="input.place_id" label="Место" v-slot="{ hasError }">
            <SearchPlace :model-value="form.place" @update:modelValue="form.place_id = $event.id" />
          </FormField>

          <FormField name="input.tags" label="Теги" id="tags">
            <InputTags v-model="form.tags" />
          </FormField>

          <FormField v-if="data.travels.length" name="input.travel_id" label="Путешествие" id="travel">
            <Select :model-value="form.travel_id" @update:modelValue="form.travel_id = $event.id" :items="data.travels" key-name="title" />
          </FormField>
        </div>

      <hr class="mt-8 mb-4 -mx-4 border-gray-200">

      <div class="flex space-x-2">
        <VButton type="submit">{{ isEdit ? 'Сохранить' : 'Создать' }}</VButton>
        <VButton @click="form.is_draft = true" type="submit" variant="secondary">Сохранить в черновик</VButton>
      </div>
    </form>
  </TheLayout>
</template>

<script setup>
import TheLayout from '~/components/layout/TheLayout'
import pick from 'lodash.pick'
import { CREATE_ALBUM, UPDATE_ALBUM, ALBUM_FORM } from '../graphql'
import { FormField, Select, Input, Textarea, VButton, SearchPlace } from '@trevio/ui';
import { InputTags } from '~/components/wrappers'
import { ref } from 'vue'
import { useForm } from 'vee-validate';
import { useGql } from '~/uses'
import { useRoute, useRouter, useNuxtApp } from 'nuxt/app'
import Upload from '~/components/Upload.vue'
import FormGallery from '~/components/modules/albums/components/FormGallery.vue'

definePageMeta({
  middleware: 'auth'
})

const form = ref({
  place_id: null,
  travel_id: null,
  title: '',
  place: {
    id: null,
    name: ''
  },
  is_draft: false,
  text: '',
  tags: [],
  images: []
})

const route = useRoute()
const { handleSubmit, setErrors } = useForm()
const albumId = parseInt(route.params.albumId)
const isEdit = albumId > 0
const danger = ref(false)
const loading = ref(false)

const app = useNuxtApp()

const { data } = await useGql(`
    query(${isEdit ? '$id: Int!, ' : ''}$userId: ID) {
      ${isEdit ? `album(id: $id) { ${ALBUM_FORM} }` : ''}
      travels(userId: $userId) {
        id
        title(words: 6)
      }
    }
  `, {
  id: albumId,
  userId: app.$auth.user.id
})

if (isEdit) {
  Object.assign(form.value, data.album)
}

const onSubmit = handleSubmit(async () => {
  if (loading.value) {
    return
  }

  loading.value = true

  const input = pick(form.value, [
    'place_id',
    'travel_id',
    'title',
    'text',
    'tags',
    'images',
  ])

  input.tags = input.tags.map(tag => parseInt(tag.id))
  input.images = input.images.map(image => parseInt(image.id))

  try {
    const { data: { albumForm }} = await useGql(isEdit ? UPDATE_ALBUM : CREATE_ALBUM, {
      input,
      id: albumId
    })

    if (albumForm > 0) {
      await useRouter().push({name: 'albums.show', params: {albumId: albumForm}})
    }
  } catch (error) {
    if (error[0]['message'] === 'validation') {
      setErrors(error[0]['extensions']['validation'])
    }
  } finally {
    loading.value = false
  }
})

const onUploaded = (images) => {
  images.forEach((image) => form.value.images.push(image))
}
</script>