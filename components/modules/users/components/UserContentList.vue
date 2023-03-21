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
    </div>
    <div @click="onMore" class="text-center bg-gray-300/50">Еще</div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { NESTED_USER_CONTENT } from '~/components/modules/users/graphql'
import { useQuery } from '@trevio/ui'

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

    const { data: { userContent } } = await useQuery({
      query: NESTED_USER_CONTENT,
      variables: {
        user_id: useRoute().params.userId,
        offset: offset.value,
        filter: {...myFilter.value}
      }
    })

    if (userContent.items.length) {
      offset.value = userContent.offset
      items.value = [...items.value, ...userContent.items]
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