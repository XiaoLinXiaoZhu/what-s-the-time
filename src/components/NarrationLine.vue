<template>
  <div class="narration">
    <TypingText
      v-if="index === currentLineIndex"
      :text="line.text"
      :ref="(el) => $emit('set-typing-ref', el, index)"
      :auto-start="false"
      @complete="$emit('line-complete')"
    />
    <FormattedText v-else-if="index < currentLineIndex" :text="line.text" />
  </div>
</template>

<script setup lang="ts">
import type { NarrationLine } from '@/types'
import TypingText from './TypingText.vue'
import FormattedText from './FormattedText.vue'

defineProps<{
  line: NarrationLine
  index: number
  currentLineIndex: number
}>()

defineEmits<{
  'set-typing-ref': [el: any, index: number]
  'line-complete': []
}>()
</script>

<style scoped>
.narration {
  margin-bottom: 16px;
  color: #ccc;
  font-style: italic;
}
</style>

