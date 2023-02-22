<template>
  <div class="overflow-hidden flex items-center justify-center h-[366px] relative border-2 border-gray-300 border-dashed rounded-md appearance-none hover:border-gray-400 focus:outline-none aspect-square">
    <Upload
      model-type="travels"
      :fields="fields"
      @update:modelValue="onUploaded"
      class="absolute top-0 left-0 w-full h-full cursor-pointer opacity-0"
    />
    <div v-if="! image" class="flex flex-col items-center">
      <img src="/images/upload.png" class="w-32" alt="">
      <div class="font-medium text-gray-600 mt-2">
          Нажмите, чтобы выбрать обложку
      </div>
    </div>
    <img v-else :src="image" class="object-cover w-full h-full" alt="" />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  modelValue: {
    type: Array,
  }
})

const emit = defineEmits([
  'update:modelValue'
])

const fields = ['id', 'url']

const image = ref({id: null, url: null})

if (props.modelValue.url.original) {
  image.value = props.modelValue.url.original
}

const onUploaded = (images) => {
  image.value = images[0]
  emit('update:modelValue', images)
}
</script>