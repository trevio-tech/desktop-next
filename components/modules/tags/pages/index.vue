<template>
  <TheLayout :heading="title">
    <div class="flex flex-wrap">
      <NuxtLink
          v-for="tag in tags"
          :key="tag.id"
          :style="{lineHeight: 'auto', fontSize: 16 + (tag.content_count > 20 ? 20 : tag.content_count) + 'px'}"
          :to="{name: 'tags.tag', params: {tag: tag.name}}" class="mr-4">{{ tag.name }}</NuxtLink>
    </div>

    {{ items }}
  </TheLayout>
</template>

<script setup>
import TheLayout from '~/components/layout/TheLayout.vue'
import { useRoute } from 'nuxt/app'
import { FEED } from '~/components/modules/activity/graphql'

const route = useRoute()
let tags = []
let items = []

const contentTypes = {
  albums: 'фотоальбомов',
  notes: 'заметок',
  questions: 'вопросов',
  reviews: 'отзывов',
  travels: 'путешествий',
}

let titleContentType = ''

if (Object.hasOwn(contentTypes, route.params?.content)) {
  titleContentType = contentTypes[route.params?.content]
}

const title = route.params?.tag
    ? `Поиск ${titleContentType} по тегу ${route.params.tag}`
    : 'Теги'

try {
  if (route.name === 'tags') {
    const { data } = await useQuery({
      query: `
        query {
          tags {
            id
            name
            content_count
          }
        }
      `
    })

    tags = data.tags
  } else if (route.name === 'tags.tag' || route.name === 'tags.tag.content') {
    const { data } = await useQuery({
      query: `
        query($tag: String, $system_name: String) {
          contentList(tag: $tag, system_name: $system_name) {
            ${FEED}
          }
        }
      `,
      variables: {
        tag:          route.params.tag,
        system_name:  route.params.content
      }
    })

    items = data.contentList
  }
} catch (error) {}
</script>