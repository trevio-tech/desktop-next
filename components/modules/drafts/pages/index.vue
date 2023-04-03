<template>
  <NuxtLayout heading="Мои черновики">
    <template #sidebar>
      123
    </template>
    <div v-if="drafts.length > 0" class="rounded-lg overflow-hidden divide-y">
      <DraftCard v-for="draft in drafts" :key="draft.id" :content="draft" />
    </div>
    <div v-else>У вас нет черновиков.</div>
  </NuxtLayout>
</template>

<script setup>
import DraftCard from '~/components/modules/drafts/components/DraftCard.vue'
import { shallowRef } from 'vue'
import { usePageQuery } from '@trevio/ui'

const drafts = shallowRef([])

try {
  const { data } = await usePageQuery({
    query: `
      query getDrafts {
        drafts {
          ... on Note {
            id
            title
            system_name
            created_at
          }
          ... on Travel {
            id
            title
            system_name
            created_at
          }
          ... on Review {
            id
            title
            system_name
            created_at
          }
        }
      }
    `,
    variables: {
    }
  })

  drafts.value = data.drafts
} catch (errors) {
  console.log(errors)
}
</script>