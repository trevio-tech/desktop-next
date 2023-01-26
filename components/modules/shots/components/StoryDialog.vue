<template>
  <div class="place-self-center h-full p-4">
    <div class="w-[480px] bg-white w-full h-full rounded-lg overflow-hidden">
      <Swiper
        :modules="[Autoplay]"
        :preload-images="false"
        :autoplay="{
          delay: 3000,
          pauseOnMouseEnter: true,
          disableOnInteraction: false,
        }"
      class="h-full">
        <SwiperSlide v-for="item in items" :key="item.id">
          <img :src="item.image" :alt="item.image" loading="lazy">
        </SwiperSlide>
      </Swiper>
    </div>
  </div>
</template>

<script setup>
import { useRouter, useNuxtApp } from 'nuxt/app'
import { ref, nextTick } from 'vue'
import { Autoplay } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css/pagination'
import 'swiper/css'

const { $overlay } = useNuxtApp()

const router = useRouter()
const hash = router.currentRoute.value.hash
const id = hash.replace(/\D+/g, '')
let items = ref([])

try {
  if (hash.includes('#story-')) {
    setTimeout(async () => {
      const { data } = await useQuery({
        query: `
        query($user_id: ID!) {
          story2(user_id: $user_id) {
            id
            image
          }
        }
      `,
        variables: {
          user_id: id
        }
      }, {
        key: hash
      })

      items.value = data.story2
    }, 0)
  }
} catch (error) {}
</script>