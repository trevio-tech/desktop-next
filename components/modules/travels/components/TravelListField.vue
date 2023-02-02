<template>
  <Swiper slidesPerView="auto" :spaceBetween="8">
    <SwiperSlide style="width: 220px;" v-for="travel in travels" :key="travel.id" class="p-1" @click="$emit('update:modelValue', travel.id)">
      <div
          :class="[modelValue === travel.id ? 'ring-green-400' : 'ring-slate-200']"
          class="relative cursor-pointer rounded-lg overflow-hidden ring-4">
        <img :src="travel.cover?.sizes?.default" class="w-full" :alt="travel.title" />
        <div class="absolute left-0 top-0 w-full h-full bg-black/50 p-4 text-sm font-medium text-white">
          {{ travel.title }}
        </div>
      </div>
    </SwiperSlide>
  </Swiper>
</template>

<script setup>
import 'swiper/css'
import { Swiper, SwiperSlide } from 'swiper/vue'

defineEmits(['update:modelValue'])
defineProps({
  travels: {
    type: Array,
    required: true,
  },
  modelValue: {
    type: [Number, String, null],
    required: true,
  }
})
</script>