<template>
  <div class="place-self-center p-5 max-w-[1480px] h-full w-full max-h-[800px]">
    <div class="flex items-center justify-center h-full w-full overflow-hidden rounded-lg">
      <div class="flex justify-center flex-col w-[400px] p-10 bg-white h-full flex-shrink-0 overflow-y-auto">
        <NuxtLink to="/" class="block mb-10" title="Trevio.ru - о путешествиях">
          <img src="/images/logotype.svg" alt="Trevio.ru - о путешествиях" class="mx-auto" />
        </NuxtLink>
        <RegisterForm v-if="isRegister" @login="overlay.hide()" />
        <LoginForm v-else @login="overlay.hide()" />

        <Button @click="isRegister = !isRegister" class="w-full mt-2" variant="secondary">
          {{ isRegister ? 'Войти в профиль' : 'Быстрая регистрация' }}
        </Button>
      </div>

      <div class="select-none h-full w-full max-w-[1040px] relative">
        <button @click="overlay.hide" type="button" class="absolute top-2 right-2 text-gray-100 bg-transparent bg-black/20 hover:bg-black/50 rounded-lg p-1.5">
          <X class="w-5 h-5" />
          <span class="sr-only">Закрыть</span>
        </button>

        <img :src="`/images/authentication/background-${randomBg}.avif`" loading="lazy" alt="" class="object-cover w-full h-full">

        <div class="absolute w-full bg-gradient-to-t from-black/80 to-transparent bottom-0 left-0 md:p-10 lg:p-20 font-semibold text-white">
          <h2 class="lg:text-4xl md:text-3xl mb-6 md:leading-normal lg:leading-normal">{{ randomQuote.text }}</h2>
          <p class="text-lg">– {{ randomQuote.author }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import LoginForm from '~/components/modules/users/components/LoginForm.vue'
import RegisterForm from '~/components/modules/users/components/RegisterForm.vue'
import { ref } from 'vue'
import { X } from 'lucide-vue-next'
import { useOverlay } from '@trevio/ui'

const overlay = useOverlay()
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
</script>