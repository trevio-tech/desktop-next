<template>
  <section class="overflow-hidden rounded-lg">
    <Upload v-model="user.banner" mutation-name="uploadBanner">
      <div
        class="h-[320px]"
        :style="{
          backgroundImage: `url(${user.banner})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover'
        }">
      </div>
    </Upload>

    <div class="bg-gray-300 p-4 rounded-lg h-[80px] -mt-[40px] flex items-center">

      <div class="mr-4 flex-shrink-0 -mt-[120px]">
        <Upload v-model="user.avatar" mutation-name="uploadAvatar">
          <img :src="user.avatar" class="w-[160px] h-[160px] rounded-full" alt="">
        </Upload>
      </div>
      <div>
        <h1 class="truncate">{{ user.name }}</h1>
<!--        <p class="max-w-[480px] text-sm mt-2">{{ user.description }}</p>-->
      </div>
    </div>

  </section>
</template>

<script setup>
import { Upload } from '@trevio/ui'

defineProps({
  user: {
    type: Object,
    required: true
  }
})
</script>