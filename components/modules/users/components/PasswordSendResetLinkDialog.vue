<template>
  <Dialog title="Восстановление пароля">
    <PasswordSendResetLinkForm class="min-w-[480px]" />
  </Dialog>
</template>

<script setup>
import Dialog from '~/components/base/Dialog.vue'
import PasswordSendResetLinkForm from '~/components/modules/users/components/PasswordSendResetLinkForm.vue'
</script>