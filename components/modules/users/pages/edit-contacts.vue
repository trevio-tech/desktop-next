<template>
  <NuxtLayout heading="Редактирование контактов">
    <template #sidebar>
      <ul>
        <li><NuxtLink :to="{name: 'users.edit', params: {userId}}">Основные настройки</NuxtLink></li>
        <li><NuxtLink :to="{name: 'users.edit.password', params: {userId}}">Смена пароля</NuxtLink></li>
        <li><NuxtLink :to="{name: 'users.edit.contacts', params: {userId}}">Контакты</NuxtLink></li>
      </ul>
    </template>

    <div class="bg-white rounded-lg p-6">
      <form @submit.prevent="onSubmit">
        <h3 class="text-xl font-semibold mb-4">Контактные ссылки</h3>
        <FormField class="mb-2" name="url" v-slot="{ hasError }">
          <Input v-model="url" type="url" placeholder="Вставьте ссылку" :has-error="hasError" />
        </FormField>

        <Button :loading="isParsing" type="submit">Добавить</Button>
      </form>

      <div v-if="links.length" class="mt-6">
        <hr class="mb-6">
        <div class="space-y-4">
          <ContactLinkCard
              v-for="(link, index) in links"
              :key="link.id"
              :link="link"
              @deleted="links.splice(index, 1)" />
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup>
import ContactLinkCard from '~/components/modules/users/components/ContactLinkCard.vue'
import { Button, useQuery, usePageQuery, Input } from '@trevio/ui'
import { LINK } from '~/components/modules/links/graphql'
import { shallowRef } from 'vue'
import { useForm } from 'vee-validate'
import { useRoute } from '#imports'

const route = useRoute()
const { handleSubmit, setErrors } = useForm()
const userId = route.params.userId
const url = shallowRef('')
const isParsing = shallowRef(false)
const links = shallowRef([])

try {
  const { data } = await usePageQuery({
    query: `
      query getContactLinks($user_id: ID!) {
        contactLinks(user_id: $user_id) {
          ${LINK}
        }
      }
    `,
    variables: {
      user_id: userId
    }
  })

  links.value = data.contactLinks
} catch (errors) {}

const onSubmit = handleSubmit(async () => {
  if (isParsing.value) return

  isParsing.value = true

  try {
    const { data } = await useQuery({
      query: `
        mutation createContactLink($url: String) {
          link: createContactLink(url: $url) {
            ${LINK}
          }
        }
      `,
      variables: {
        url: url.value
      }
    })

    links.value.unshift(data.link)

    url.value = ''
  } catch (errors) {
    if (errors[0]?.extensions?.validation) {
      setErrors(errors[0].extensions.validation)
    }
  } finally {
    isParsing.value = false
  }
})
</script>