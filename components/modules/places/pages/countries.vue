<template>
  <NuxtLayout heading="Страны">
    <div class="grid grid-cols-3 gap-4">
      <div v-for="(countries, letter) in alphabet" :key="letter">
        <h3 class="mb-2 font-semibold text-xl">{{ letter }}</h3>
        <div v-for="country in countries" :key="country.id">
          <NuxtLink :to="{name: 'places.show', params: {placeId: country.id}}">
            {{ country.name }}
          </NuxtLink>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup>
let alphabet = {}
let memory = null

const { data } = await useQuery({
  query: `{
    countries {
      id
      name
    }
  }`
})

data.countries.forEach((country, key) => {
  // Получаем первую букву
  let letter = country['name'].charAt(0).toUpperCase()

  // Если текущая буква не равна предыдущей
  if( letter !== memory ) {
    // Заносим букву в "память"
    memory = letter

    // Добавляем новый массив
    alphabet[memory] = {}
  }

  // Дополняем массив
  alphabet[memory][key] = country
})
</script>