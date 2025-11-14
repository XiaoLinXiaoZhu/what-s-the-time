<template>
  <div class="time-choice">
    <TimeInput
      :auto-focus="shouldAutoFocus"
      @complete="(time) => $emit('time-choice-complete', time, index)"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { TimeChoiceLine } from '@/types'
import TimeInput from './TimeInput.vue'

const props = defineProps<{
  line: TimeChoiceLine
  index: number
  currentLineIndex: number
}>()

defineEmits<{
  'time-choice-complete': [time: string, lineIndex: number]
}>()

const shouldAutoFocus = computed(() => props.index === props.currentLineIndex)
</script>

<style scoped>
.time-choice {
  margin-top: 24px;
  margin-bottom: 20px;
}
</style>

