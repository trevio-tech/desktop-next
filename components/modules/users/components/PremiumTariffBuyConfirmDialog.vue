<template>
  <Dialog :title="isBuySuccess ? 'Поздравляем!' : 'Покупка премиум аккаунта'">
    <div class="w-[480px]">
      <div v-if="isBuySuccess">
        Вы приобрели премиум аккаунт до <span class="font-semibold">{{ endsAt }}</span>.
      </div>
      <div v-else>
        Оплачивая премиум аккаунт, вы соглашаетесь
        со всеми <NuxtLink to="/" class="underline">правилами</NuxtLink> и <NuxtLink to="/" class="underline">условиями</NuxtLink>.
        <div class="mt-4">
          <Button :loading="isLoading" @click="onSubmit">Купить премиум за {{ tariff.total_price }}</Button>
        </div>
      </div>
    </div>
  </Dialog>
</template>

<script setup>
import Dialog from '~/components/base/Dialog.vue'
import { usePageQuery, Button } from '@trevio/ui'
import { toast } from 'vue3-toastify'
import { shallowRef } from 'vue'

const props = defineProps({
  tariff: {
    type: Object,
    required: true,
  },
})

const isBuySuccess = shallowRef(false)
const isLoading = shallowRef(false)
const endsAt = shallowRef('')

const onSubmit = async () => {
  if (isLoading.value) {
    return
  }

  isLoading.value = true

  try {
    const { data } = await usePageQuery({
      query: `
        mutation buyPremium($tariff_id: ID!) {
          buyPremium(tariff_id: $tariff_id)
        }
      `,
      variables: {
        tariff_id: props.tariff.id
      }
    })

    if (data.buyPremium) {
      endsAt.value = data.buyPremium
      isBuySuccess.value = true
    }
  } catch (errors) {
    toast(errors[0].extensions.debugMessage || errors[0].message, {
      type: 'error'
    })
  } finally {
    isLoading.value = false
  }
}
</script>