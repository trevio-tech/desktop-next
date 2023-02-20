<template>
  <NuxtLayout :heading="title">
    <template #sidebar>
      <BookmarkCategoriesList />
    </template>
    <div v-if="bookmarks.length" class="space-y-4">
      <ContentCardRectangle v-for="bookmark in bookmarks" :key="bookmark.id" :entry="bookmark" />
    </div>
    <div v-else>В этой категории нет закладок</div>
  </NuxtLayout>
</template>

<script setup>
import BookmarkCategoriesList from '~/components/modules/bookmarks/components/BookmarkCategoriesList'
import { ALBUM_CARD_RECTANGLE } from '~/components/modules/albums/graphql'
import { ContentCardRectangle } from '~/components'
import { NOTE_CARD_RECTANGLE } from '~/components/modules/notes/graphql'
import { TRAVEL_CARD_RECTANGLE } from '~/components/modules/travels/graphql'
import { useBookmarksStore } from '../store'
import { useQuery } from '#imports'


const params = useRoute().params
const store = useBookmarksStore()
const categoryId = parseInt(params.categoryId)

let title = `Закладки`
let bookmarks = []

if (categoryId > 0) {
  store.categories.forEach((category) => {
    if (categoryId === parseInt(category.id)) {
      title += ` из категории «${category.name}»`
    }
  })
}

const query = `
  query ($userId: Int!, $categoryId: Int) {
    bookmarks (userId: $userId, categoryId: $categoryId) {
      ...on Travel {
        ${TRAVEL_CARD_RECTANGLE}
      }
      ...on Note {
        ${NOTE_CARD_RECTANGLE}
      }
      ...on Album {
        ${ALBUM_CARD_RECTANGLE}
      }
    }
  }
`

try {
  const { data } = await useQuery({
    query,
    variables: {
      userId:     parseInt(params.userId),
      categoryId,
    }
  })

  bookmarks = data.bookmarks
} catch (error) {}
</script>