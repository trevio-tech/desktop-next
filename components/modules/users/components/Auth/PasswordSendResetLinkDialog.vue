<template>
  <Dialog title="Восстановление пароля">
    <PasswordSendResetLinkForm class="w-[480px]" />
  </Dialog>
</template>

<script setup>
import Dialog from '~/components/base/Dialog.vue'
import PasswordSendResetLinkForm from './PasswordSendResetLinkForm.vue'
</script>