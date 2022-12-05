<template>
  <Dialog title="Закладки">
    <div v-for="category in store.bookmarksCategories" :key="category.id">
      <label :for="`category-${category.id}`">
        <input type="checkbox" :id="`category-${category.id}`" :value="category.id" v-model="categories" />
        <span>{{ category.name }}</span>
      </label>
    </div>
    <Button @click="onSubmit">Сохранить</Button>
    {{ categories }}
  </Dialog>
</template>

<script setup>
import { ref } from 'vue'
import { useQuery } from '#imports'
import { useUsersStore } from '../store'
import { Dialog } from '~/components/dev/Overlay'
import { Button } from '@trevio/ui'

const props = defineProps({
  modelType: {
    type: String,
    required: true,
  },
  modelId: {
    type: Number,
    required: true,
  }
})

const store = useUsersStore()
const loading = ref(false)
const categories = ref([])

const onSubmit = async () => {
  if (loading.value) {
    return
  }

  loading.value = true

  try {
    const { data } = await useQuery({
      query: `
        mutation ($model_type: String!, $model_id: Int!, $categories: [Int!]!) {
          createDeleteBookmark(model_type: $model_type, model_id: $model_id, categories: $categories) {
            insert
            delete
          }
        }
      `,
      variables: {
        model_type:  props.modelType,
        model_id:    props.modelId,
        categories:  categories.value,
      }
    })

    if (data.createDeleteBookmark === 'created') {
      store.incrementBookmarksCount(3)
    } else if (data.createDeleteBookmark === 'deleted') {
      store.decrementBookmarksCount(3)
    }
  } catch (error) {}
  finally {
    loading.value = false
  }
}
</script>