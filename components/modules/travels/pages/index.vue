<template>
  <TheLayout heading="Путешествия">
    <template #sidebar>1</template>
    <div class="space-y-4">
      <Travel v-for="travel in travels" :entry="travel" :key="travel.id" />
    </div>
  </TheLayout>
</template>

<script setup>
import TheLayout from '~/components/layout/TheLayout'
import Travel from '../components/Travel'
import { TRAVELS } from '../graphql';
import { useAsyncGql } from '~/uses'
import { useRoute, useRouter } from 'nuxt/app'
import { watch } from 'vue'

const route = useRoute()
const router = useRouter()

const { data: { value: { travels }}, refresh } = await useAsyncGql(`
  query($tag_id: Int) {
    ${TRAVELS}
  }
`, {
  tag_id: parseInt(route.query.tag_id)
})
watch(() => route.query.tag_id, refresh)

</script>