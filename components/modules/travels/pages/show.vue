<template>
  <NuxtLayout>
    <Html>
      <Head>
        <Title>{{ travel.title }} - Путешествия</Title>
        <Meta name="description" :content="travel.text"/>
      </Head>
    </Html>

    <template #sidebar>
      <NuxtLink :to="{name: 'travels.edit', params: {travelId: travel.id}}">Редактировать</NuxtLink>
    </template>

    <Content :entry="travel" />

    <div v-if="travel.tags && travel.tags.length" class="space-x-2 mt-4 text-slate-400 text-sm truncate">
      <NuxtLink
          class="hover:text-slate-600"
          v-for="tag in travel.tags"
          :key="tag.id"
          :title="tag.name"
          :to="{name: 'travels', query: {tag_id: tag.id}}">#{{ tag.name }}
      </NuxtLink>
    </div>

    <hr class="my-4">

    <ContentList :travelId="travel.id" :fields="NESTED_CONTENT_LIST">
      <template v-slot="{ items, isMore, isLoading, onFetch }">
        <div class="space-y-4">
          <ContentCardRectangle v-for="item in items" :key="item.id" :entry="item" />
          <Button v-if="isMore" :loading="isLoading" @click="onFetch" class="w-full" variant="secondary">Показать еще</Button>
        </div>
      </template>
    </ContentList>
  </NuxtLayout>
</template>

<script setup>
import Content from '~/components/Content.vue'
import { ContentCardRectangle } from '~/components'
import { TRAVEL } from '../graphql'
import { useQuery, ContentList, Button } from '@trevio/ui'
import { useRoute } from '#imports'
import { NESTED_CONTENT_LIST } from '../graphql'


const route = useRoute()
let travel = {}

try {
  const { data } = await useQuery({
    query: /* GraphQL */`
      query($id: ID!) {
        travel(id: $id) {
          ${TRAVEL}
        }
      }
    `,
    variables: {
      id: route.params.travelId,
    },
  })

  travel = data.travel
} catch (error) {
  console.log(error)
}
</script>