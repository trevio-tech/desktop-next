<template>
  <div class="overflow-hidden flex items-center justify-center h-[366px] relative border-2 border-gray-300 border-dashed rounded-md appearance-none hover:border-gray-400 focus:outline-none aspect-square">
    <Upload
      :model-type="modelType"
      :fields="fields"
      @uploaded="$emit('uploaded', $event)"
      class="absolute top-0 left-0 w-full h-full cursor-pointer opacity-0"
    />
    <div v-if="! image.url" class="flex flex-col items-center">
      <img src="/images/upload.png" class="w-32" alt="">
      <div class="font-medium text-gray-600 mt-2">
          Нажмите, чтобы выбрать обложку
      </div>
    </div>
    <img v-else :src="image.url" class="object-cover w-full h-full" alt="" />
  </div>
</template>

<script setup>
import Upload from '~/components/Upload'

defineProps({
  modelType: {
    type: String,
    required: true,
  },
  image: {
    type: Object
  }
})

const emit = defineEmits([
  'uploaded'
])

const fields = ['id', 'url']
</script>