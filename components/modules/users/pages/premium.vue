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

    <div class="mt-6 grid grid-cols-3 gap-4">
      <PremiumTariffCard v-for="tariff in tariffs" :key="tariff.id" :tariff="tariff" />
    </div>
  </NuxtLayout>
</template>

<script setup>
import { usePageQuery } from '@trevio/ui'
import { Alert } from '@trevio/ui'
import PremiumTariffCard from '~/components/modules/users/components/PremiumTariffCard.vue'

let tariffs = []

try {
  const { data } = await usePageQuery({
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