<template>
  <Dialog title="Авторизация">
<!--    <LoginForm class="max-w-[480px]" @login="$overlay.hide()" />-->
    <RegisterForm class="max-w-[480px]" @login="$overlay.hide()" />
  </Dialog>
</template>

<script setup>
import Dialog from '~/components/base/Dialog.vue'
import LoginForm from '~/components/modules/users/components/LoginForm.vue'
import RegisterForm from '~/components/modules/users/components/RegisterForm.vue'
</script>