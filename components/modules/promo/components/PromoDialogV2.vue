<template>
  <Dialog title="Это мы продвигаем...">
    <div class="w-[640px] p-4">
      <div class="flex space-x-6">
        <div class="aspect-square flex-shrink-0">
          <img :src="entry?.cover?.url?.default" :alt="entry.title" class="w-[160px] h-[160px] object-cover block rounded-lg" />
        </div>
        <div>
          <h2 class="text-2xl font-semibold mb-2">{{ entry.title }}</h2>
          <p>{{ entry.short_text }}</p>
        </div>
      </div>
      <div v-if="tariffs.length" class="mt-8">
        <div class="bg-stone-50 p-4 rounded-lg">
          <h3 class="text-xl font-semibold mb-4">Тарифы</h3>
          <ul class="flex space-x-4">
            <li
                v-for="tariff in tariffs"
                :key="tariff.id"
                @click="store.selectedTariff = tariff"
                :class="{'outline outline-green-400': store.selectedTariff?.id === tariff.id}"
                class="flex-auto p-4 rounded cursor-pointer hover:outline outline-stone-100">
              <h4 class="text-xl font-semibold">{{ tariff.period_value }} {{ tariff.period_text }}</h4>
              <div class="text-sm">{{ tariff.total_price }} монет</div>
            </li>
          </ul>
        </div>
        <div class="mt-8">
          <Button @click="onSubmit" :loading="isSubmitting">Продвинуть</Button>
        </div>
      </div>
    </div>
  </Dialog>
</template>

<script setup>
import Dialog from '~/components/base/Dialog.vue'
import { ref } from 'vue'
import { useOverlay, Button, useQuery } from '@trevio/ui'
import { usePromoStore } from '~/components/modules/promo/store'

const overlay = useOverlay()

const props = defineProps({
  entry: {
    type: Object
  }
})

const store = usePromoStore()
const tariffs = ref([])
const isSubmitting = ref(false)

try {
  const { data: { promoTariffs }} = await useQuery({
    query: `
      query {
        promoTariffs {
          id
          period_type
          period_value
          period_text
          price
          total_price
        }
      }
    `
  })

  tariffs.value = promoTariffs
} catch (error) {}

const onSubmit = async () => {
  if (isSubmitting.value) return

  isSubmitting.value = true

  try {
    const variables = {
      tariff_id: store.selectedTariff.id,
      input: {
        [props.entry.system_name]: [props.entry.id]
      },
    }

    const { data: { createPromo }} = await useQuery({
      query: `
      mutation ($tariff_id: Int!, $input: PromoInput!) {
        createPromo(tariff_id: $tariff_id, input: $input)
      }
    `,
      variables
    })

    if (createPromo) {
      store.$reset()
    }
  } catch (error) {}
  finally {
    isSubmitting.value = false
  }
}
</script>