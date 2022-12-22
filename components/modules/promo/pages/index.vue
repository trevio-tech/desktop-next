<template>
  <TheLayout heading="Продвигаемые записи">
    <div v-for="item in items" :key="item.id">
      {{ item.model.title }} - {{ item.ends_at }}
    </div>
  </TheLayout>
</template>

<script setup>
import TheLayout from '~/components/layout/TheLayout.vue'
import { ref } from 'vue'

definePageMeta({
  middleware: 'auth'
})

const items = ref([])

try {
  const { data } = await useQuery({
    query: `
      query {
        promo {
          id
          ends_at
          model {
            ...on Note {
              id
              title
            }
            ...on Travel {
              id
              title
            }
          }
        }
      }
    `,
  })

  items.value = data.promo
} catch (error) {}
</script>