<template>
  <NuxtLayout heading="Продвигаемые записи">
    <div class="space-y-2">
      <div v-for="item in items" :key="item.id" class="bg-white shadow-sm rounded-lg border border-slate-200 p-4 rounded-lg">
        <h3 class="text-lg font-semibold">{{ item.model.title }}</h3>
        <div class="text-sm"><span class="text-slate-400">продвигается до:</span> {{ item.ends_at }}</div>
        <div class="text-sm"><span class="text-slate-400">количество показов:</span> {{ item.views_count }}</div>
      </div>
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
    query: /* GraphQL */`
      query {
        myPromo {
          id
          ends_at
          views_count
          model {
            ...on Note {
              id
              title
              system_name
            }
            ...on Travel {
              id
              title
              system_name
            }
          }
        }
      }
    `,
  })

  items.value = data.myPromo
} catch (error) {}
</script>