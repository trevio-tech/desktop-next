<template>
  <section class="overflow-hidden rounded-lg">

    <div class="h-[320px] relative">
      <div id="banner" class="absolute top-0 left-0 w-full h-full pointer-events-none"></div>
      <div :style="styles" class="absolute top-0 left-0 w-full h-full pointer-events-none"></div>

      <Dropdown placement="bottom-end" class="absolute right-0 top-0 p-4">
        <template v-slot:default="{ isActive }">
          <Button variant="secondary" class="text-white bg-white/10">
            Изменить обложку
            <template #prepend>
              <Pencil class="w-4 h-4" />
            </template>
          </Button>
        </template>
        <template v-slot:popper="{ hide }">
          <DropdownItem @click="onUpload(hide)">
            <template #prepend>
              <Image class="w-5 h-5 text-blue-500" />
            </template>
            Загрузить
          </DropdownItem>
          <DropdownItem v-if="user.banner !== null" @click="onDelete(hide)">
            <template #prepend>
              <Trash class="w-5 h-5 text-red-500" />
            </template>
            Удалить
          </DropdownItem>
        </template>
      </Dropdown>
    </div>

    <div class="bg-white shadow border-b border-gray-200/50 p-4 rounded-lg h-[120px] -mt-[60px] flex items-center relative">
      <div class="mr-4 flex-shrink-0 -mt-[120px]">
        <div class="p-1 shadow w-[200px] h-[200px] rounded-full bg-white">
          <Avatar v-model="user.avatar" :alt="user.name" :editable="isIam" @load="onLoad"/>
        </div>
      </div>
      <div class="flex-auto flex items-center justify-between">
        <div>
          <h1 class="truncate text-xl font-semibold">{{ user.name }}</h1>
          <div class="underline text-sm font-medium text-blue-400 cursor-pointer">Подробнее...</div>
        </div>
        <Button @click="$router.push({name: 'users.edit', params: {userId: user.id}})">Редактировать</Button>
      </div>
    </div>

    <Upload style="display: none" id="upload-banner" v-model="user.banner" mutation-name="uploadBanner"></Upload>
  </section>
</template>

<script setup>
import ColorThief from 'colorthief/dist/color-thief'
import { Pencil, Image, Trash } from 'lucide-vue-next'
import { Upload, shadeColor, useQuery, Button, Avatar, DropdownItem, Dropdown } from '@trevio/ui'
import { computed } from 'vue'
import { useAuth } from '#auth/runtime/composables'

const auth = useAuth()

const props = defineProps({
  user: {
    type: Object,
    required: true
  }
})

let styles = computed(() => {
  return {
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundImage: `url(${props.user.banner})`
  }
})

const isIam = computed(() => parseInt(props.user.id) === parseInt(auth?.user?.id))

const colorThief = new ColorThief()

const onLoad = (event) => {
  if (event.target.complete) {
    const color = colorThief.getColor(event.target)
    const el = document.querySelector('#banner')

    if (el) {
      el.style.backgroundImage = `linear-gradient(-45deg, ${shadeColor(color, 10)}, ${shadeColor(color, 50)})`;
    }
  }
}

const onDelete = async (hide) => {
  hide()
  try {
    const { data } = await useQuery({
      query: /* GraphQL */`
      mutation deleteBanner {
        deleteBanner
      }
    `
    })

    if (data.deleteBanner) {
      props.user.banner = null
    }
  } catch (errors) {}
}

const onUpload = (hide) => {
  document.querySelector('#upload-banner').click()
  hide()
}
</script>