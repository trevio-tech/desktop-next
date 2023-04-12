<template>
  <section ref="target">
    <h3 class="font-medium mb-4 text-lg">Длинные путешествия</h3>

    <Swiper :slidesPerView="'auto'" :spaceBetween="12" class="swiper-random-notes" :grabCursor="true">
      <SwiperSlide v-for="item in items" :key="item.id" class="flex aspect-square rounded-lg overflow-hidden" style="width: 220px">
        <img :src="item.cover.url.default" :alt="item.title" class="object-fit w-full h-full" />
        <div class="absolute top-0 right-0 bottom-0 left-0 p-4 bg-black/50">
          <NuxtLink :to="{name: 'users.show', params: {userId: item.user.id}}" class="flex items-center space-x-2 mb-3">
            <img :src="item.user.avatar" :alt="item.user.name" class="flex-shrink-0 w-4 h-4 rounded-full">
            <span class="text-sm text-white">{{ item.user.name }}</span>
          </NuxtLink>
          <h2 class="font-medium text-xl text-white">
            <NuxtLink :to="{name: 'travels.show', params: {travelId: item.id}}" class=" hover:underline">{{ item.title }}</NuxtLink>
          </h2>
          <p v-if="item.text" class="mt-2">
            <NuxtLink :to="{name: 'travels.show', params: {travelId: item.id}}">{{ item.text }}</NuxtLink>
          </p>
        </div>
      </SwiperSlide>
    </Swiper>
  </section>
</template>

<script setup>
import { shallowRef, ref } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'
import { useQuery } from '@trevio/ui'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'

const target = shallowRef()
const items = ref([])

const getTravels = async () => {
  try {
    const { data } = await useQuery({
      query: `
        query {
          travels(filter_by: "has_nested_content", limit: 10) {
            id
            title
            user {
              id
              name
              avatar
            }
            cover {
              url(presets: "default@resize:fill:200:200")
            }
          }
        }
      `
    })

    items.value = data.travels
  } catch (error) {
    console.log(error)
  }
}

useIntersectionObserver(
    target,
    async ([{ isIntersecting }]) => {
      if (isIntersecting && items.value.length === 0) {
        await getTravels()
      }
    },
)
</script>

<style>
.swiper-random-notes .swiper-wrapper {
  align-items: center;
}
</style>