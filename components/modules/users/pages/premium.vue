<template>
  <NuxtLayout>
    <Alert>
      Премиум аккаунт открывает доступ к небольшим, но приятным функциям сайта. Покупая этот аккаунт, вы лично инвестируете в развитие TREVIO и его независимость.
    </Alert>

    <h3 class="font-semibold mt-6">Что станет доступно, после покупки премиум аккаунта?</h3>
    <ul class="mt-2">
      <li>Цвет для вашего имени на сайте</li>
      <li>Возможность скрыть рекламу</li>
      <li>Возможность скрыть рекомендации</li>
      <li>Возможность скрыть продвигаемые записи</li>
    </ul>

    <div class="mt-6">
      <div v-for="tariff in tariffs" :key="tariff.id">
        {{ tariff }}
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup>
import { useQuery2 } from '#imports'

let tariffs = []

try {
  const { data } = await useQuery2({
    query: `
      query premiumTariffs {
        premiumTariffs {
          id
          period_type
          period_value
          period_text
          price
          discount
          total_price
        }
      }
    `
  })

  tariffs = data.premiumTariffs
} catch (error) {}
</script>