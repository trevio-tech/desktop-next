<template>
  <div ref="target">
    <div class="font-semibold mb-4">По интересам: </div>
    <Swiper v-if="target" :slides-per-view="4">
      <SwiperSlide v-for="user in users" :key="user.id" class="flex flex-col items-center justify-center">
        <NuxtLink :to="{name: 'users.show', params: {userId: user.id}}" class="text-center">
          <img :src="user.avatar" :alt="user.name" width="80" height="80" class="block rounded-full mb-1">
          <span class="font-medium text-sm">{{ user.name }}</span>
        </NuxtLink>
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<script setup>
import 'swiper/css'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { ref } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'
import { useQuery } from '@trevio/ui'

const emit = defineEmits(['loaded'])
const props = defineProps({
  items: {
    type:    Array,
    default: () => []
  }
})

const target = ref()
const users = ref(props.items)

const getUsers = async () => {
  const { data } = await useQuery({
    query: `
      query ($filterBy: String) {
        users (filterBy: $filterBy) {
          id
          name
          avatar
        }
      }
    `,
    variables: {
      filterBy: 'recommended'
    }
  })

  return data.users
}

useIntersectionObserver(
  target,
  async ([{ isIntersecting }]) => {
    if (isIntersecting && props.items.length === 0) {
      emit('loaded', users.value = await getUsers())
    }
  },
)
</script>