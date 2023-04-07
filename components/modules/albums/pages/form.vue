<template>
  <NuxtLayout :heading="`${isEdit ? 'Редактирование' : 'Создание'} фотоальбома`">
    <template #sidebar>
      123
    </template>
    <TheForm @submit="onSubmit" :loading="loading" :is-edit="isEdit">
      <FormField name="input.title" label="Заголовок" required  v-slot="{ hasError }">
        <Input v-model="form.title" placeholder="Введите заголовок" :variant="hasError ? 'danger' : undefined" />
      </FormField>

      <FormField
        help="Изображения можно сортировать. Первое изображение будет использовано в качестве обложки."
        label="Изображения"
        name="input.images"
        required
      >
        <FormGallery v-if="form.images" v-model="form.images" />
        <Upload :fields="fields" :input="{model_type: 'albums'}" v-model="form.images">
          <Button>Добавить фото</Button>
        </Upload>
      </FormField>

      <FormField name="input.text" label="Текст">
        <Textarea placeholder="Краткое описание" rows="2" v-model="form.text" />
      </FormField>

      <FormField name="input.place_id" label="Место" v-slot="{ hasError }">
        <SearchPlace :model-value="form.place" @update:modelValue="form.place_id = $event.id" />
      </FormField>

      <FormField name="input.tags" label="Теги" id="tags">
        <InputCustomTags v-model="form.tags" />
      </FormField>

      <FormField v-if="travels.length" name="input.travel_id" label="Хотите добавить в путешествие?" id="travel">
        <TravelListField v-model="form.travel_id" :travels="travels" />
      </FormField>
    </TheForm>
  </NuxtLayout>
</template>

<script setup>
import FormGallery from '~/components/modules/albums/components/FormGallery.vue'
import TheForm from '~/components/TheForm'
import TravelListField from '~/components/modules/travels/components/TravelListField.vue'
import { CREATE_ALBUM, UPDATE_ALBUM, ALBUM_FORM } from '../graphql'
import { InputCustomTags } from '~/components/wrappers'
import { pick } from 'lodash'
import { ref } from 'vue'
import { useForm } from 'vee-validate'
import { useRoute, useRouter, useNuxtApp, definePageMeta } from '#imports'
import { Upload, usePageQuery, Button, SearchPlace, Input, FormField } from '@trevio/ui'


definePageMeta({
  middleware: 'auth'
})

const fields = ['id', 'url(presets: "default@width:640,height:480")']

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
let travels = []

const app = useNuxtApp()

try {
  const { data } = await usePageQuery({
    query: `
      query(${isEdit ? '$id: ID!, ' : ''}$user_id: ID) {
        ${isEdit ? `album(id: $id) { ${ALBUM_FORM} }` : ''}
        travels(user_id: $user_id) {
          id
          title(words: 10)
          cover {
            id
            url(presets: "default@resize:fill:240:160")
          }
        }
      }
    `,
    variables: {
      id: albumId,
      user_id: app.$auth.user.id
    }
  })

  travels = data.travels

  if (isEdit) {
    Object.assign(form.value, data.album)
  }
} catch (error) {}

const onSubmit = async (isDraft = false) => {
  if (loading.value) {
    return
  }

  loading.value = true

  form.value.is_draft = isDraft

  const input = pick(form.value, [
    'place_id',
    'travel_id',
    'is_draft',
    'title',
    'text',
    'tags',
    'images',
  ])

  input.tags = input.tags.map(tag => tag.id)
  input.images = input.images.map(image => image.id)

  try {
    const { data: { albumForm }} = await usePageQuery({
      query: isEdit ? UPDATE_ALBUM : CREATE_ALBUM,
      variables: {
        id: albumId,
        input
      }
    })

    if (albumForm > 0) {
      await useRouter().push({name: 'albums.show', params: {albumId: albumForm}})
    }
  } catch (errors) {
    if (errors[0]?.extensions?.validation) {
      setErrors(errors[0].extensions.validation)
    }
  } finally {
    loading.value = false
  }
}
</script>