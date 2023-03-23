<template>
  <NuxtLayout heading="Продвигаемые записи">
    <div v-for="item in items" :key="item.id">
      {{ item.model.title }} - {{ item.ends_at }}
    </div>
  </NuxtLayout>
</template>

<script setup>
import { ref } from 'vue'
import { definePageMeta } from '#imports'
import { usePageQuery } from '@trevio/ui'

definePageMeta({
  middleware: 'auth'
})

const items = ref([])

try {
  const { data } = await usePageQuery({
    query: /* GraphQL */ `
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