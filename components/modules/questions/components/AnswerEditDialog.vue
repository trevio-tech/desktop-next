<template>
  <Dialog title="Редактирование ответа">
    <AnswerForm
      class="w-[480px]"
      :answer="modelValue"
      :question-id="modelValue.question_id"
      @updated="emit('update:modelValue', $event)" />
  </Dialog>
</template>

<script setup>
import Dialog from '~/components/base/Dialog.vue'
import AnswerForm from '~/components/modules/questions/components/AnswerForm.vue'

const emit = defineEmits(['update:modelValue'])

const props = defineProps({
  modelValue: {
    type:     Object,
    required: true,
  }
})
</script>