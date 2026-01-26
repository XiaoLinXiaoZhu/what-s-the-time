<template>
  <div class="time-choice">
    <TimeInput
      :auto-focus="shouldAutoFocus"
      :disabled="isDisabled"
      @complete="(time) => $emit('time-choice-complete', time, index)"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { DisplayedLineV2, TimeChoiceLineV2 } from '@/types'
import TimeInput from './TimeInput.vue'

const props = defineProps<{
  line: DisplayedLineV2 & TimeChoiceLineV2
  index: number
  currentLineIndex: number
}>()

defineEmits<{
  'time-choice-complete': [time: string, lineIndex: number]
}>()

const shouldAutoFocus = computed(() => props.index === props.currentLineIndex)

// 根据行状态决定是否禁用
const isDisabled = computed(() => {
  const status = props.line.status
  return status === 'completed' || status === 'disabled'
})
</script>

<style scoped>
.time-choice {
  margin-top: 24px;
  margin-bottom: 20px;
}
</style>

