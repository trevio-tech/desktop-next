<template>
  <section class="overflow-hidden rounded-lg">

    <div id="bb" class="h-[320px] relative"
      :style="{
        backgroundPosition: 'center',
        backgroundSize: 'cover'
      }">
      <Upload v-model="user.banner" mutation-name="uploadBanner" class="absolute right-0 top-0 p-4">
        <Button variant="secondary" class="text-white bg-white/10">
          Изменить обложку
          <template #prepend>
            <Pencil class="w-4 h-4" />
          </template>
        </Button>
      </Upload>
    </div>

    <div class="bg-white shadow border-b border-gray-200/50 p-4 rounded-lg h-[120px] -mt-[60px] flex items-center relative">
      <div class="mr-4 flex-shrink-0 -mt-[120px]">
        <Upload v-model="user.avatar" mutation-name="uploadAvatar">
          <div class="p-1 shadow w-[200px] h-[200px] rounded-full bg-white">
            <img :src="user.avatar" class="rounded-full" @load="onLoad" crossorigin="anonymous" alt="" />
          </div>
        </Upload>
      </div>
      <div class="flex-auto flex items-center justify-between">
        <div>
          <h1 class="truncate text-xl font-semibold">{{ user.name }}</h1>
          <div class="underline text-sm font-medium text-blue-400 cursor-pointer">О пользователи...</div>
        </div>
        <Button @click="$router.push({name: 'users.edit', params: {userId: user.id}})">Редактировать</Button>
      </div>
    </div>

  </section>
</template>

<script setup>
import { Upload, shadeColor } from '@trevio/ui'
import ColorThief from 'colorthief/dist/color-thief'
import { Pencil } from 'lucide-vue-next'

defineProps({
  user: {
    type: Object,
    required: true
  }
})

const colorThief = new ColorThief()

const onLoad = (event) => {
  if (event.target.complete) {
    const color = colorThief.getColor(event.target)
    const el = document.querySelector('#bb')

    el.style.backgroundImage = `linear-gradient(-45deg, ${shadeColor(color, 10)}, ${shadeColor(color, 50)})`;
  }
}
</script>