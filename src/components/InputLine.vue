<template>
  <div class="input-line">
    <TimeInput
      :auto-focus="shouldAutoFocus"
      :disabled="isDisabled"
      @complete="(time) => $emit('input-complete', time)"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { InputLine } from '@/types'
import TimeInput from './TimeInput.vue'

const props = defineProps<{
  line: InputLine
  index: number
  currentLineIndex: number
}>()

defineEmits<{
  'input-complete': [time: string]
}>()

const shouldAutoFocus = computed(() => props.index === props.currentLineIndex)

// 根据行状态决定是否禁用
const isDisabled = computed(() => {
  const status = props.line.status
  return status === 'completed' || status === 'disabled'
})
</script>

<style scoped>
.input-line {
  margin-top: 24px;
  margin-bottom: 20px;
}
</style>

