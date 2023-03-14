<template>
  <div class="space-y-4">
    <ul v-if="items.length" class="flex items-center text-sm font-medium">
      <li @click="setFilter({orderByDate: 'new'})" class="cursor-pointer py-1 px-2 rounded-full" :class="{'bg-gray-200': myFilter.orderByDate === 'new'}">Сначала новые</li>
      <li @click="setFilter({orderByDate: 'old'})" class="cursor-pointer py-1 px-2 rounded-full" :class="{'bg-gray-200': myFilter.orderByDate === 'old'}">Сначала старые</li>
    </ul>
    <div class="relative space-y-4">
      <article v-for="item in items" :key="item.id" class="flex overflow-hidden rounded-md shadow ring-1 ring-slate-200">
        <NuxtLink :to="`/${item.system_name}/${item.id}`" class="w-40 h-40 bg-stone-200 flex-shrink-0">
          <img :src="item.cover?.url?.default" :alt="item.title">
        </NuxtLink>
        <div class="flex-auto p-4 bg-white">
          <h3 class="text-lg font-medium mb-4">
            <NuxtLink :to="`/${item.system_name}/${item.id}`">{{ item.title }}</NuxtLink>
          </h3>
          {{ item.text }}
        </div>
      </article>
      <Button :loading="loading" v-if="nestedEntriesCount > items.length" @click="onMore" variant="secondary" class="w-full">Показать еще</Button>
    </div>
  </div>
</template>

<script setup>

import { ref } from 'vue'
import { NESTED_CONTENT_LIST } from '~/components/modules/travels/graphql'


const props = defineProps({
  nestedEntriesCount: {
    type: Number,
    default: 0,
  }
})

const items = ref([])
const offset = ref('')
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

    const { data: { travelContent } } = await useQuery({
      query: NESTED_CONTENT_LIST,
      variables: {
        travel_id: useRoute().params.travelId,
        offset: offset.value,
        filter: {...myFilter.value}
      }
    })

    if (travelContent.items.length) {
      offset.value = travelContent.offset
      items.value = [...items.value, ...travelContent.items]
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
  await getData()
}

await getData()
</script>