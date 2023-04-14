<template>
  <ul v-if="breadcrumbs.length" aria-label="breadcrumbs" class="flex space-x-2">
    <li v-for="(breadcrumb, index) in breadcrumbs" :key="breadcrumb.name">
      <span v-if="index > 0 && index < breadcrumbs.length" class="mr-2 text-gray-500">&gg;</span>
      <NuxtLink :to="{name: breadcrumb.name}" class="underline">{{ breadcrumb.text }}</NuxtLink>
    </li>
  </ul>
</template>

<script>
import { useBreadcrumbsStore } from '~/components/layout/breadcrumbs/store'
import { ref, watch } from 'vue'
import { useRoute, useRouter } from '#imports';

export default {
  setup(_, { $pinia }) {
    const $route = useRoute()
    const router = useRouter()
    const store = useBreadcrumbsStore($pinia)
    const breadcrumbs = ref([])

    const items = {
      'users':          'Пользователи',
      'users.login':    'Авторизация',
      'users.register': 'Регистрация',
      'users.show':     'Пользователь',
    };

    watch(() => $route.name, (newValue) => {
      if (store.breadcrumb.name === newValue) {
        breadcrumbs.value.push(store.breadcrumb)
      } else {
        breadcrumbs.value.splice(breadcrumbs.value.at(-1), 1)
      }
    })

    const route = $route.nausers.split('.');

    if (route.length > 0) {
      if (router.hasRoute(route[0]) && items.hasOwnProperty(route[0])) {
        breadcrumbs.value.push({
          name: route[0],
          text: items[route[0]]
        });
      }

      route.reduce((previousValue, currentValue) => {
        const key = `${previousValue}.${currentValue}`;

        if (router.hasRoute(key) && items.hasOwnProperty(key)) {
          breadcrumbs.value.push({
            name: key,
            text: items[key]
          });
        }

        return key;
      });
    } else {
      breadcrumbs.value.push({
        name: route[0],
        text: items[route[0]]
      })
    }

    return {
      store,
      breadcrumbs
    }
  },
}
</script>