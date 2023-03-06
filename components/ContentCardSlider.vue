<template>
  <div ref="target">
    <h3 class="text-xl font-semibold mb-2">Читайте также</h3>
    <Swiper
      :slidesPerView="3"
      :spaceBetween="24"
    >
      <SwiperSlide v-for="entry in entries" :key="entry.id">
        <ContentCardSquare :entry="entry" />
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<script setup>
import 'swiper/css'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { ref, shallowRef } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'

const props = defineProps({
  notIn: {
    type: Array,
  },
  tags: {
    type: Array,
    required: true,
  },
  limit: {
    type: Number,
    default: 4,
  }
})

const target  = ref()
const loading = ref(true)
const entries = shallowRef([])

// Подождем секунду, страница прогрузилась.
// Иначе блок попадает во вьюпорт и сразу грузиться.
setTimeout(() => {
  try {
    const { stop } = useIntersectionObserver(
        target,
        async ([{ isIntersecting }], observerElement) => {
          if (isIntersecting && entries.value.length === 0) {
            await load()
          }
        },
    )
  } catch (error) {}
  finally {
    loading.value = false
  }
}, 1000)

const load = async () => {
  const { data } = await useQuery({
    query: `
      query getSimilarNotes ($tags: [Int], $notIn: [Int], $limit: Int){
        notes (tags: $tags, notIn: $notIn, limit: $limit) {
          id
          title(words: 5)
          cover_id
          system_name
          cover(sizes: "default@resize:fill:200:150") {
            id
            model_id
            url
            sizes
          }
        },
        albums (tags: $tags, limit: $limit) {
          id
          title
          cover_id
          system_name
          cover(sizes: "default@resize:fill:200:150") {
            id
            model_id
            url
            sizes
          }
        }
      }
    `,
    variables: {...props}
  })

  entries.value = [...data.notes, ...data.albums] || []
}
</script>