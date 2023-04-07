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
    </article>

    <section class="bg-white rounded-lg mt-8">
      <h3 class="text-lg font-semibold p-4">История операций</h3>
      <BalanceOperationList :operations="operations" />
    </section>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import BalanceOperationList from '~/components/modules/wallets/components/BalanceOperationList.vue'
import { Button, Input, FormField, useQuery, usePageQuery } from '@trevio/ui'
import { ref, shallowRef } from 'vue'
import { useForm } from 'vee-validate'
import { definePageMeta, useRoute } from '#imports'
import { CONFIRM_PAYMENT, CREATE_PAYMENT } from '~/components/modules/wallets/graphql/mutations'

definePageMeta({
  middleware: 'auth'
})

const route = useRoute()
const { setErrors } = useForm()

const form = ref({
  amount: 100,
  type: 'bank_card'
})

const isLoading = shallowRef(false)
const operations = shallowRef([])

const types = {
  bank_card: 'Банковская карта',
  qiwi: 'QIWI кошелек',
  yandex_money: 'Ю.Money',
}

if (route.query.operation_id > 0) {
  await confirmPayment()
}

try {
  const { data } = await usePageQuery({
    query: `
      query getBalanceOperations {
        balanceOperations {
          id
          amount
          confirmed_at(format: "iso")
          type
          message
        }
      }
    `
  })

  operations.value = data.balanceOperations
} catch (error) {
  console.log(error)
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
  if (isLoading.value) return

  isLoading.value = true

  try {
    const { data } = await useQuery({
      query: CONFIRM_PAYMENT,
      variables: {
        operation_id: parseInt(route.query.operation_id),
      }
    })

    console.log(data)
  } catch (error) {
    console.log(error)
  } finally {
    isLoading.value = false
  }
}
</script>