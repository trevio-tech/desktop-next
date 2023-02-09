<template>
  <TheLayout :heading="`${isEdit ? 'Редактирование' : 'Создание'} фотоальбома`">
    <template #sidebar>
      123
    </template>
    <TheForm @submit="onSubmit" @draft="form.is_draft = true" :loading="loading" :is-edit="isEdit">
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
        <Upload :fields="['id', 'url']" :presets="['default@width:640,height:480']" model-type="albums" v-model="form.images">
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
  </TheLayout>
</template>

<script setup>
import FormGallery from '~/components/modules/albums/components/FormGallery.vue'
import TheForm from '~/components/TheForm'
import TheLayout from '~/components/layout/TheLayout'
import TravelListField from '~/components/modules/travels/components/TravelListField.vue'
import { CREATE_ALBUM, UPDATE_ALBUM, ALBUM_FORM } from '../graphql'
import { InputCustomTags } from '~/components/wrappers'
import { definePageMeta } from '#imports'
import { pick } from 'lodash'
import { ref } from 'vue'
import { useForm } from 'vee-validate'
import { useRoute, useRouter, useNuxtApp } from 'nuxt/app'

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
let travels = []

const app = useNuxtApp()

try {
  const { data } = await useQuery({
    query: `
      query(${isEdit ? '$id: Int!, ' : ''}$userId: ID) {
        ${isEdit ? `album(id: $id) { ${ALBUM_FORM} }` : ''}
        travels(userId: $userId) {
          id
          title(words: 10)
          cover(sizes: "default@resize:fill:240:160") {
            id
            model_id
            url
            sizes
          }
        }
      }
    `,
    variables: {
      id: albumId,
      userId: app.$auth.user.id
    }
  })

  travels = data.travels

  if (isEdit) {
    Object.assign(form.value, data.album)
  }
} catch (error) {}

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
    const { data: { albumForm }} = await useQuery({
      query: isEdit ? UPDATE_ALBUM : CREATE_ALBUM,
      variables: {
        input,
        id: albumId
      }
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
</script>