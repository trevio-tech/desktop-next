<template>
  <Dialog title="Выбор продвигаемых записей">
    <div class="w-[640px]">
      <ContentList :user-id="$auth.user?.id" :system-name="systemName">
        <template v-slot="{ entry, index }">
          <PromoItem
              @select="onSelect"
              @delete="onDelete(entry, index)"
              :item="entry"
              :selected="selectedKeys[`${entry.system_name}_${entry.id}`] === true" />
        </template>
      </ContentList>
      <Button @click="emit('select', selected)">Продолжить</Button>
    </div>
  </Dialog>
</template>

<script setup>
import Dialog from '~/components/base/Dialog.vue'
import { ref } from 'vue'
import ContentList from '~/components/ContentList.vue'
import PromoItem from '~/components/modules/promo/components/PromoItem.vue'
import { Button } from '@trevio/ui'

const emit = defineEmits(['select'])

const selected = ref([])
const selectedKeys = ref({})
const props = defineProps({
  systemName: {
    type: String
  }
})

const onSelect = (entry) => {
  selected.value.push(entry)
  selectedKeys.value[`${entry.system_name}_${entry.id}`] = true
}

const onDelete = (entry, index) => {
  selected.value = selected.value.splice(index, 1)
  delete selectedKeys.value[`${entry.system_name}_${entry.id}`]
}
</script>