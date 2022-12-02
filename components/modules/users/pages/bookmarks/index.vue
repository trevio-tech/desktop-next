<template>
  <TheLayout heading="Закладки">
    <template #sidebar>
      <BookmarkCategoriesList />
    </template>
    <div v-if="bookmarks.length">
      <ContentCardRectangle v-for="bookmark in bookmarks" :key="bookmark.id" :entry="bookmark" />
    </div>
    <div v-else>В этой категории нет закладок</div>
  </TheLayout>
</template>

<script setup>
import BookmarkCategoriesList from '../../components/BookmarkCategoriesList'
import { ContentCardRectangle } from '~/components'
import { NOTE_CARD_RECTANGLE } from '~/components/modules/notes/graphql'
import { TRAVEL_CARD_RECTANGLE } from '~/components/modules/travels/graphql'
import { useQuery } from '#imports'
import { useRoute } from 'nuxt/app'

let bookmarks = []

const query = `
  query ($userId: Int!, $categoryId: Int) {
    bookmarks (userId: $userId, categoryId: $categoryId) {
      ...on Travel {
        ${TRAVEL_CARD_RECTANGLE}
      }
      ...on Note {
        ${NOTE_CARD_RECTANGLE}
      }
    }
  }
`

try {
  const params = useRoute().params

  const { data } = await useQuery({
    query,
    variables: {
      userId:     parseInt(params.userId),
      categoryId: parseInt(params.categoryId),
    }
  })

  bookmarks = data.bookmarks
} catch (error) {}

</script>