<template>
  <div>{{ er }}</div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useNuxtApp, useRoute, useFetch } from '#imports'
import { ref } from 'vue'

const { $auth } = useNuxtApp()
const route = useRoute()
const er = ref(null)

try {
  const { data } = await useFetch(`http://127.0.0.1:9000/api/users/oauth/${route.params.provider}/callback`, {
    query: {
      code: route.query.code
    }
  })

  onMounted(() => {
    opener.setToken(data.value?.token)
    window.close()
  })
} catch (error) {
  er.value = error
}
</script>