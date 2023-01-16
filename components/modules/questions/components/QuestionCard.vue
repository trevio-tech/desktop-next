<template>
  <article class="bg-white rounded ring-1 ring-slate-100">
    <div class="flex p-4 space-x-4">
      <div class="flex-shrink-0">
        <NuxtLink :to="to">
          <img :src="entry.user.avatar" :alt="entry.user.name" class="w-10 h-10 rounded-full block"/>
        </NuxtLink>
      </div>
      <div>
        <div class="text-sm mb-1 text-slate-400">Задан {{ entry.published_at }}</div>
        <h2 class="font-semibold text-xl">
          <NuxtLink :to="to">{{ entry.title }}</NuxtLink>
        </h2>
        <p v-if="entry.text" class="mt-2 text-sm leading-normal">
          <NuxtLink :to="to">{{ entry.text }}</NuxtLink>
        </p>
        <div v-if="entry.tags.length" class="space-x-2 mt-2 text-slate-400 text-sm">
          <NuxtLink
              class="hover:text-slate-600"
              v-for="tag in entry.tags"
              :key="tag.id"
              :to="{name: 'tags.tag.content', params: {tag: tag.name.trim(), content: 'questions'}}">#{{ tag.name }}</NuxtLink>
        </div>
      </div>
    </div>
    <footer class="flex items-center p-4 border-t border-t-stone-100">
      <IsLoggedIn>
        <Like
          :model-type="entry.system_name"
          :model-id="entry.id"
          :is-liked="entry.like?.is_liked"
          :count="entry.likes_count"
        />
      </IsLoggedIn>
      <CommentsButton title="Количество ответов" :to="to" class="ml-2">{{ entry.answers_count || 0 }}</CommentsButton>
      <QuestionResolvedLabel v-if="entry.resolved_at" class="ml-4" :title="entry.resolved_at" />
      <div class="flex items-center ml-auto space-x-2">
        <IsLoggedIn class="flex items-center">
          <BookmarkButton
              v-model="bookmarks"
              :model-type="entry.system_name"
              :model-id="entry.id" />
        </IsLoggedIn>
      </div>
    </footer>
  </article>
</template>

<script setup>
import useContentCard from '~/components/ContentCard/useContentCard'
import BookmarkButton from '~/components/modules/bookmarks/components/BookmarkButton'
import QuestionResolvedLabel from '~/components/modules/questions/components/QuestionResolvedLabel.vue'
import CommentsButton from '~/components/CommentsButton.vue'

const props = defineProps({
  entry: {
    type: Object,
    required: true,
  },
})

const { to, label, bookmarks } = useContentCard(props)
</script>