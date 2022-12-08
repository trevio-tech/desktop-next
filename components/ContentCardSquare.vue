<template>
  <article class="bg-white overflow-hidden ring-1 ring-slate-200 rounded-lg w-[200px]">
    <NuxtLink :to="to" class="block">
      <img :src="entry.cover?.sizes?.default" :alt="entry.title" width="200" height="150" loading="lazy">
    </NuxtLink>
    <div class="p-4">
      <h2 class="mb-2 overflow-hidden">
        <NuxtLink :to="to">{{ entry.title }}</NuxtLink>
      </h2>
      <NuxtLink :to="to" class="text-sm">{{ entry.text }}</NuxtLink>
    </div>
  </article>
</template>

<script setup>
import useContentCard from '~/components/ContentCard/useContentCard'

const props = defineProps({
  entry: {
    type:     Object,
    required: true,
  },
})

const { to } = useContentCard(props)
</script>