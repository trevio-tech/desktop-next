<template>
  <div class="flex flex-col min-h-full gap-4">
    <TheHeader />
    <div class="flex-auto flex flex-col w-full max-w-[1000px] mx-auto">
      <div class="flex-auto flex gap-4">
        <TheNavigation class="flex-shrink-0 w-[180px]" />
        <div class="flex-auto flex flex-col">
<!--          <TheBreadcrumbs />-->
          <slot />
        </div>
      </div>
    </div>
    <TheFooter />
  </div>
</template>

<script setup>
import TheBreadcrumbs from '~/components/layout/breadcrumbs/TheBreadcrumbs'
import TheHeader from '~/components/layout/TheHeader'
import TheFooter from '~/components/layout/TheFooter'
import TheNavigation from '~/components/layout/TheNavigation'

useHead({
  titleTemplate: '%s — Trevio.ru - о путешествиях',
})
</script>