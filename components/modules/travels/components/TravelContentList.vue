<template>
  <div class="space-y-4">
    <ul>
      <li @click="setFilter({orderByDate: 'new'})">Сначала новые</li>
      <li @click="setFilter({orderByDate: 'old'})">Сначала старые</li>
    </ul>
    <div class="relative">
      <div v-show="items.length" class="space-y-4">
        <article v-for="item in items" :key="item.id" class="flex overflow-hidden rounded-md shadow ring-1 ring-slate-200">
          <NuxtLink :to="`/${item.system_name}/${item.id}`" class="w-40 h-40 bg-stone-200 flex-shrink-0">
            <img :src="item.cover?.sizes?.default" :alt="item.title">
          </NuxtLink>
          <div class="flex-auto p-4 bg-white">
            <h3 class="text-lg font-medium mb-4">
              <NuxtLink :to="`/${item.system_name}/${item.id}`">{{ item.title }}</NuxtLink>
            </h3>
            {{ item.text }}
          </div>
        </article>
        <Button :loading="loading" v-if="!noMore" @click="onMore" class="w-full">Показать еще</Button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'nuxt/app'
import { ref } from 'vue'
import { Button } from '@trevio/ui'

const query = `
  query getTravelContentList ($travelId: Int!, $offset: String!, $filter: TravelContentListFilterInput) {
    travelContentList(travelId: $travelId, offset: $offset, filter: $filter) {
      items {
        ...on Note {
          id
          cover_id
          title(words: 7)
          text(words: 10)
          cover(sizes: "default@resize:fill:200:200") {
            id
            model_id
            url
            sizes
          }
          system_name
        }
        ...on Review {
          id
          title
          cover_id
          cover(sizes: "default@resize:fill:200:200") {
            id
            model_id
            url
            sizes
          }
          system_name
        }
        ...on Question {
          id
          title
          cover_id
          cover(sizes: "default@resize:fill:200:200") {
            id
            model_id
            url
            sizes
          }
          system_name
        }
        ...on Album {
          id
          title
          cover_id
          cover(sizes: "default@resize:fill:200:200") {
            id
            model_id
            url
            sizes
          }
          system_name
        }
      }
      offset
    }
  }
`

const items = ref([])
const offset = ref('')
const noMore = ref(false)
const loading = ref(false)
const myFilter = ref({
  orderByDate: 'new'
})

const getData = async () => {
  try {
    if (loading.value) {
      return
    }

    loading.value = true

    const { data: { travelContentList } } = await useQuery({
      query,
      variables: {
        travelId: parseInt(useRoute().params.travelId),
        offset: offset.value,
        filter: {...myFilter.value}
      }
    })

    if (travelContentList.items.length) {
      offset.value = travelContentList.offset
      items.value = [...items.value, ...travelContentList.items]
    } else if (travelContentList.items.length < 4) {
      noMore.value = true
    }
  } catch (error) {}
  finally {
    loading.value = false
  }
}

const onMore = async () => {
  await getData()
}

const setFilter = async (filter) => {
  Object.assign(myFilter.value, filter)
  offset.value = ''
  items.value = []
  noMore.value = false
  await getData()
}

await getData()
</script>