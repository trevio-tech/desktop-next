<template>
  <div class="place-self-center p-4">
    <div class="w-[480px] h-[840px] bg-white rounded-lg overflow-hidden relative">
      <div class="p-4 top-0 left-4 right-4 absolute">
        <div class="swiper-scrollbar"></div>
      </div>
      <Swiper
        :modules="[Autoplay, Scrollbar]"
        :preload-images="false"
        :scrollbar="{
          el: '.swiper-scrollbar',
        }"
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
import 'swiper/css'
import 'swiper/css/scrollbar'
import { Autoplay, Scrollbar } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { ref } from 'vue'
import { usePageQuery } from '@trevio/ui'
import { useRouter } from '#imports'

const router = useRouter()
const hash = router.currentRoute.value.hash
const id = hash.replace(/\D+/g, '')
let items = ref([])

try {
  if (hash.includes('#story-')) {
    setTimeout(async () => {
      const { data } = await usePageQuery({
        query: `
        query($user_id: ID!) {
          story(user_id: $user_id) {
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

      items.value = data.story
    }, 0)
  }
} catch (error) {}
</script>