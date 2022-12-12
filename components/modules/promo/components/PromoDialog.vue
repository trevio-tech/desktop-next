<template>
  <Dialog title="Продвижение">
    <div class="grid grid-cols-3 w-[640px] divide-x divide-gray-200">
      <div class="col-span-2 pr-4">
        <div @click="onClickMore" class="underline mb-4 text-sm text-blue-500">Нажмите, чтобы добавить в продвижение другие записи</div>
        <h3 class="font-medium mb-1">Выбрано для продвижения:</h3>
        <ul class="space-y-1">
          <li v-for="(ent, key) in selectedEntries" :key="key" class="truncate text-sm">
            {{ ent.title }}
            <X @click="onDelete(key)" class="w-5 h-5" />
          </li>
        </ul>
      </div>
      <div class="col-span-1 pl-4">
        <ul class="space-y-px sticky top-0">
          <li
            v-for="tariff in tariffs"
            :key="tariff.id"
            @click="selectedTariff = tariff.id"
            :class="{'bg-blue-100': selectedTariff === tariff.id}"
            class="p-4 rounded cursor-pointer hover:bg-blue-50">
            {{ tariff.periodValue }} {{ tariff.periodText }}
            <div>{{ tariff.totalPrice }} монет</div>
          </li>
        </ul>
      </div>
    </div>
  </Dialog>
</template>

<script setup>
import Dialog from '~/components/base/Dialog.vue'
import PromoFindContentDialog from '~/components/modules/promo/components/PromoFindContentDialog.vue'
import { ref } from 'vue'
import { useNuxtApp } from '#app'
import { useQuery } from '#imports'
import { X } from 'lucide-vue-next'

const props = defineProps({
  entry: {
    type: Object
  }
})

const { $overlay } = useNuxtApp()

const selectedEntries = ref({})
const tariffs = ref([])
const selectedTariff = ref(null)

if (typeof props.entry === 'object') {
  selectedEntries.value[`${props.entry.system_name}_${props.entry.id}`] = props.entry
}

try {
  const { data: {promoTariffs}} = await useQuery({
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
  })

  tariffs.value = promoTariffs
} catch (error) {}

const onClickMore = () => {
  $overlay.show(PromoFindContentDialog, {
    on: {
      select(entries) {
        entries.forEach((entry) => {
          selectedEntries.value[`${entry.system_name}_${entry.id}`] = entry
        })
        $overlay.hide()
      }
    }
  })
}

const onDelete = (key) => delete selectedEntries.value[key]
</script>