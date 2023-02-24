<template>
  <div class="overflow-hidden flex items-center justify-center h-[366px] relative border-2 border-gray-300 border-dashed rounded-md appearance-none hover:border-gray-400 focus:outline-none aspect-square">
    <Upload
      :fields="fields"
      :input="{model_type: 'travels'}"
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

const fields = ['id', 'url(presets: "default@resize:fill:640:640")']

const image = ref({id: null, url: null})

if (Array.isArray(props.modelValue) && props.modelValue[0]?.url?.default) {
  image.value = props.modelValue[0].url.default
}

const onUploaded = (images) => {
  image.value = images[0].url.default
  emit('update:modelValue', images)
}
</script>