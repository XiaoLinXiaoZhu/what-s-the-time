<template>
  <div class="dialogue">
    <span v-if="line.character" class="character-name">
      {{ line.character }}
    </span>
    <span class="dialogue-text">
      <TypingText
        v-if="index === currentLineIndex"
        :text="line.text"
        :ref="(el) => $emit('set-typing-ref', el, index)"
        :auto-start="false"
        @complete="$emit('line-complete')"
      />
      <FormattedText v-else-if="index < currentLineIndex" :text="line.text" />
    </span>
  </div>
</template>

<script setup lang="ts">
import type { DialogueLine } from '@/types'
import TypingText from './TypingText.vue'
import FormattedText from './FormattedText.vue'

defineProps<{
  line: DialogueLine
  index: number
  currentLineIndex: number
}>()

defineEmits<{
  'set-typing-ref': [el: any, index: number]
  'line-complete': []
}>()
</script>

<style scoped>
.dialogue {
  margin-bottom: 20px;
}

.character-name {
  display: inline-block;
  color: #4a9eff;
  font-weight: bold;
  margin-right: 8px;
}

.dialogue-text {
  color: #fff;
}
</style>

