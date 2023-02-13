<template>
  <div>{{ er }}</div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useNuxtApp, useRoute } from '#imports'
import { ref } from 'vue'
import { useFetch } from '#imports'

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