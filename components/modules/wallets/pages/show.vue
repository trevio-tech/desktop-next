<template>
  <NuxtLayout heading="Мой кошелек">
    <template #sidebar>
      1
    </template>
    <article class="bg-white p-8 rounded-lg">
      <h3 class="text-lg font-semibold mb-4">Пополнение</h3>

      <form @submit.prevent="createPayment">
        <fieldset class="mb-4">
          <FormField name="amount" label="Введите сумму в рублях">
            <Input v-model="form.amount" />
          </FormField>
        </fieldset>
        <fieldset class="flex items-center space-x-4 mb-8">
          <button
            v-for="(name, key) in types"
            :key="key" @click="form.type = key"
            type="button"
            :class="{'border-green-500 ring-4 ring-green-200': form.type === key}"
            class="flex-auto p-2 border rounded-lg text-sm font-medium"
          >
            {{ name }}
          </button>
        </fieldset>
        <Button :loading="isLoading" type="submit">Пополнить</Button>
      </form>

      <hr class="-mx-8 my-8">

      <h3 class="text-lg font-semibold mb-4">История операций</h3>
    </article>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import { Button, Input, FormField, useQuery } from '@trevio/ui'
import { CREATE_PAYMENT } from '~/components/modules/wallets/graphql/mutations'
import { ref, shallowRef } from 'vue'
import { useForm } from 'vee-validate'
import { useRoute } from '#imports'

const route = useRoute()
const { setErrors } = useForm()

const form = ref({
  amount: 100,
  type: 'bank_card'
})

const isLoading = shallowRef(false)

const types = {
  bank_card: 'Банковская карта',
  qiwi: 'QIWI кошелек',
  yandex_money: 'Ю.Money',
}

if (route.query.operation_id > 0) {
  await confirmPayment()
}

const createPayment = async () => {
  if (isLoading.value) return

  isLoading.value = true

  try {
    const { data } = await useQuery({
      query: CREATE_PAYMENT,
      variables: {
        amount: parseInt(form.value.amount),
        type: form.value.type,
      }
    })

    if (data.createPayment) {
      document.location.href = data.createPayment
    }
  } catch (error) {
    console.log(error)
  } finally {
    isLoading.value = false
  }
}

/**
 * Подтверждение платежа.
 */
async function confirmPayment(): Promise<void> {
  try {
    alert(route.query.operation_id)
  } catch (error) {
    console.log(error)
  }
}
</script>