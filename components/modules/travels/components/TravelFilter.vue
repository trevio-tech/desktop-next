<template>
  <div class="p-4 bg-white space-y-2 rounded-lg">
    <Checkbox v-if="$auth.loggedIn" v-model="bySubscriptions" :value="bySubscriptions">
      <div @click="bySubscriptions = !bySubscriptions">Мои подписки</div>
    </Checkbox>
    <div class="flex space-x-2">
      <FormField name="budget-from" label="Бюджет от">
        <Input type="number" min="0" placeholder="0" />
      </FormField>
      <FormField name="budget-to" label="Бюджет до">
        <Input type="number" min="0" placeholder="0" />
      </FormField>
    </div>
  </div>
</template>

<script setup>
import { Checkbox, Input, FormField } from '@trevio/ui'
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'nuxt/app'

const route = useRoute()
const router = useRouter()
const bySubscriptions = ref(route.query.timeline !== 1)

watch(bySubscriptions, (newValue) => {
  if (newValue === false) {
    router.push({
      name: 'travels',
      query: {
        timeline: 1
      }
    })
  } else {
    router.push({
      name: 'travels',
    })
  }
})
</script>