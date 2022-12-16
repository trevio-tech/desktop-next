<template>
  <div tabindex="-1" aria-hidden="true" class="absolute left-0 top-0 right-0 bottom-0">
    <div class="flex items-center justify-center h-full w-full p-10">
      <div class="flex items-center justify-center max-w-[1400px] h-full max-h-[720px] overflow-hidden rounded-lg">

        <div class="flex justify-center flex-col w-[360px] p-10 bg-white h-full flex-shrink-0 overflow-y-auto">
          <NuxtLink to="/" class="block mb-10" title="Trevio.ru - о путешествиях">
            <img src="/images/logotype.svg" alt="Trevio.ru - о путешествиях" class="mx-auto" />
          </NuxtLink>
          <RegisterForm v-if="isRegister" @login="$overlay.hide()" />
          <LoginForm v-else @login="$overlay.hide()" />

          <div @click="isRegister = !isRegister" class="mt-6">
            {{ isRegister ? 'Войти' : ' Создать аккаунт' }}
          </div>
        </div>

        <div class="h-full relative">
          <img :src="`/images/authentication/background-${randomBg}.avif`" alt="" class="object-cover w-full h-full">

          <div @click="changeQuote" class="select-none overflow-hidden absolute w-full bg-gradient-to-t from-black/80 to-transparent bottom-0 left-0 p-20 font-semibold text-white">
            <h2 class="text-4xl mb-6 leading-normal">{{ randomQuote.text }}</h2>
            <p class="text-lg">– {{ randomQuote.author }}</p>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import LoginForm from '~/components/modules/users/components/LoginForm.vue'
import RegisterForm from '~/components/modules/users/components/RegisterForm.vue'
import { ref } from 'vue'

const isRegister = ref(false)

const random = (min, max) => {
  return Math.ceil(min + Math.random() * (max - min));
}

const randomBg = ref(random(0, 3))

const quotes = [
  {
    author: 'Франц Фанон',
    text: `«Говорить на иностранном языке – значит завоевать его мир и культуру»`
  },
  {
    author: 'Эмиль Золя',
    text: `«Ничто так не развивает ум, как путешествие»`
  },
  {
    author: 'Марк Твен',
    text: `«Путешествовать необходимо тем, кто учится»`
  },
  {
    author: 'Рэй Брэдберри',
    text: `«Посмотри на мир. Он куда удивительнее cнов»`
  },
  {
    author: 'Мэттью Карстен',
    text: `«Инвестиции в поездки это инвестиции в себя»`
  },
  {
    author: 'Хеллен Келлер',
    text: `«Жизнь – это либо отчаянное приключение, либо ничего»`
  },
]

const randomQuote = ref(quotes[random(0, quotes.length - 1)])

const changeQuote = () => {
  const newValue = quotes[random(0, quotes.length - 1)]

  if (newValue === randomQuote.value.text) {
    changeQuote()
  } else {
    randomQuote.value = newValue
  }
}
</script>