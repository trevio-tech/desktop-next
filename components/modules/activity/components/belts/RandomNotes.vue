<template>
  <section ref="target" class="p-6 bg-indigo-50 rounded-lg">
    <h3 class="font-medium mb-4 text-lg">Читайте также</h3>
    <Swiper :slidesPerView="'auto'" :spaceBetween="24" class="swiper-random-notes" :grabCursor="true">
      <SwiperSlide v-for="item in items" :key="item.id" style="width: 80%; height: 200px;" class="flex">
        <article class="p-4 bg-white rounded-lg border border-indigo-100 flex h-full">
          <div class="user-select-none">
            <NuxtLink :to="{name: 'users.show', params: {userId: item.user.id}}" class="flex items-center space-x-2 mb-3">
              <img :src="item.user.avatar" :alt="item.user.name" class="flex-shrink-0 w-4 h-4 rounded-full">
              <span class="text-sm">{{ item.user.name }}</span>
            </NuxtLink>
            <h2 class="font-medium">
              <NuxtLink :to="{name: 'notes.show', params: {noteId: item.id}}" class=" hover:underline">{{ item.title }}</NuxtLink>
            </h2>
            <p v-if="item.text" class="mt-2">
              <NuxtLink :to="{name: 'notes.show', params: {noteId: item.id}}">{{ item.text }}</NuxtLink>
            </p>
          </div>
        </article>
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

const getRandomNotes = async () => {
  try {
    const { data } = await useQuery({
      query: `
        query {
          notes(random: true, limit: 10) {
            id
            title(words: 5)
            cover_id
            text(words: 10)
            user {
              id
              name
              avatar
            }
          }
        }
      `
    })

    items.value = data.notes
  } catch (error) {
    console.log(error)
  }
}

useIntersectionObserver(
  target,
  async ([{ isIntersecting }]) => {
    if (isIntersecting && items.value.length === 0) {
      await getRandomNotes()
    }
  },
)
</script>

<style>
.swiper-random-notes .swiper-wrapper {
  align-items: center;
}
</style>