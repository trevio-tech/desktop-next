<template>
  <NuxtLayout>
    <Html>
      <Head>
        <Title>{{ travel.title }} - Путешествия</Title>
        <Meta name="description" :content="travel.text"/>
      </Head>
    </Html>

    <template #sidebar>
      1
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

    <ContentList :travelId="travel.id" :fields="NESTED_CONTENT_LIST" order-by="date">
      <template v-slot="{ items, isMore, isLoading, onFetch }">
        <div class="space-y-4">
          <ContentCardRectangle v-for="item in items" :key="item.id" :entry="item" />
          <Button v-if="isMore" :loading="isLoading" @click="onFetch" class="w-full" variant="secondary">Показать еще</Button>
        </div>
      </template>
    </ContentList>

<!--    <ContentList :fields="NESTED_CONTENT_LIST" :query="travel.tags.map((tag) => tag.name).join(' ')">
      <template v-slot="{ items, isMore, isLoading, onFetch }">
        <div class="space-y-4">
          <ContentCardRectangle v-for="item in items" :key="item.id" :entry="item" />
          <Button v-if="isMore" :loading="isLoading" @click="onFetch" class="w-full" variant="secondary">Показать еще</Button>
        </div>
      </template>
    </ContentList>-->
  </NuxtLayout>
</template>

<script setup>
import Content from '~/components/Content.vue'
import { ContentCardRectangle } from '~/components'
import { TRAVEL } from '../graphql'
import { usePageQuery, ContentList, Button } from '@trevio/ui'
import { useRoute } from '#imports'
import { NESTED_CONTENT_LIST } from '../graphql'
import { ref } from 'vue'

const route = useRoute()

const travel = ref({})

try {
  const { data } = await usePageQuery({
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

  travel.value = data.travel
} catch (errors) {
  console.log(errors)
}
</script>