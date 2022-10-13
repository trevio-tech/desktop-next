<template>
  <form>
    <Textarea placeholder="Текст сообщения" class="flex-auto" />
    <footer class="flex space-x-2 justify-end mt-2">
      <VButton variant="secondary">
        <PaperClipIcon class="w-5 h-5" />
      </VButton>
      <VButton>Отправить</VButton>
    </footer>
  </form>
</template>

<script setup>
import { Textarea, VButton } from '@trevio/ui'
import { PaperClipIcon } from '@heroicons/vue/24/solid'
</script>