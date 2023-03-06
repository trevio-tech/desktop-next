<template>
  <Dialog title="Продвижение">
    <div class="grid grid-cols-3 w-[640px] divide-x divide-gray-200">
      <div class="col-span-2 pr-4">
        <ul class="divide-y">
          <li v-for="(section, key) in store.selectedItems" :key="key" class="space-y-1 py-4">
            <div class="font-semibold">{{ section.name }}</div>
            <div v-for="(item, index) in section.items" :key="item.id" class="flex items-center text-sm">
              <div class="truncate font-medium flex-auto text-slate-500 mr-2">{{ item.title }}</div>
              <button @click="onDelete(item, index)" :title="item.title" type="button">
                <X class="w-5 h-5" />
              </button>
            </div>
            <div @click="onClickMore(key)" class="cursor-pointer underline mb-4 text-sm text-blue-400">Добавить {{ section.name.toLowerCase() }}</div>
          </li>
        </ul>
      </div>
      <div class="col-span-1 pl-4">
        <div class="sticky top-0 divide-y">
          <ul class="space-y-px pb-4">
            <li
                v-for="tariff in tariffs"
                :key="tariff.id"
                @click="store.selectedTariff = tariff"
                :class="{'bg-blue-100': store.selectedTariff?.id === tariff.id}"
                class="p-2 rounded cursor-pointer hover:bg-blue-50">
              {{ tariff.periodValue }} {{ tariff.periodText }}
              <div>{{ tariff.totalPrice }} монет</div>
            </li>
          </ul>
          <div class="pt-4">
            <div v-if="store.readyToPromotion"
                 class="mb-2">Цена: {{ store.totalPrice }}</div>
            <Button :disabled="! store.readyToPromotion" @click="onSubmit" class="w-full">Продвинуть</Button>
          </div>
        </div>
      </div>
    </div>
  </Dialog>
</template>

<script setup>
import Dialog from '~/components/base/Dialog.vue'
import PromoFindContentDialog from '~/components/modules/promo/components/PromoFindContentDialog.vue'
import { ref } from 'vue'
import { useNuxtApp } from '#imports'

import { X } from 'lucide-vue-next'
import { usePromoStore } from '~/components/modules/promo/store'

const props = defineProps({
  entry: {
    type: Object
  }
})

const { $overlay } = useNuxtApp()
const store = usePromoStore()

const tariffs = ref([])

if (props.entry?.system_name) {
  store.selectedItems[props.entry.system_name].items.unshift(props.entry)
}

try {
  const { data: { promoTariffs }} = await useQuery({
    query: `
      query {
        promoTariffs {
          id
          periodType
          periodValue
          periodText
          price
          totalPrice
        }
      }
    `
  }, {
    key: 'promo'
  })

  tariffs.value = promoTariffs
} catch (error) {}

const onClickMore = (systemName) => {
  $overlay.show(PromoFindContentDialog, {
    props: {
      systemName
    },
    on: {
      select(items) {
        items.forEach((item) => {
          const selectedItemsIds = store.selectedItems[item.system_name].items
            .map((selectedItem) => parseInt(selectedItem.id))

          if (selectedItemsIds.indexOf(parseInt(item.id)) === -1) {
            store.selectedItems[item.system_name].items.unshift(item)
          }
        })

        $overlay.hide()
      }
    }
  })
}

const onDelete = ({ system_name }, index) => {
  store.delete(system_name, index)
}

const onSubmit = async () => {
  const variables = {
    tariff_id: store.selectedTariff.id,
    input: {},
  }

  for (let systemName in store.selectedItems) {
    if (! Object.hasOwn(variables.input, systemName)) {
      variables.input[systemName] = []
    }

    variables.input[systemName] = store.selectedItems[systemName]
      .items
      .map((selectedItem) => selectedItem.id)
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
}
</script>