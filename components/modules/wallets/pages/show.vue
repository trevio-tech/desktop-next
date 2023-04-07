<template>
  <NuxtLayout heading="Мой кошелек">
    <template #sidebar>
      1
    </template>
    <article class="bg-white p-8 rounded-lg">
      <h3 class="text-lg font-semibold mb-4">Пополнение</h3>

      <form @submit.prevent="onSubmit">
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
        <Button type="submit">Пополнить</Button>
      </form>

      <hr class="-mx-8 my-8">

      <h3 class="text-lg font-semibold mb-4">История операций</h3>
    </article>
  </NuxtLayout>
</template>

<script setup>
import { Button, Input, FormField } from '@trevio/ui'
import { ref } from 'vue'
import { useForm } from 'vee-validate'

const { setErrors } = useForm()

const form = ref({
  amount: 0,
  type: 'bank_card'
})

const types = {
  bank_card: 'Банковская карта',
  qiwi: 'QIWI кошелек',
  yandex_money: 'Ю.Money'
}

const onSubmit = async () => {
  alert(form.value.type + '-------' + form.value.amount)
}
</script>