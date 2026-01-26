<template>
  <div class="dialogue">
    <span v-if="line.character" class="character-name">
      {{ line.character }}
    </span>
    <span class="dialogue-text">
      <TypingTextV2
        v-if="index === currentLineIndex"
        :nodes="line.nodes"
        :ref="(el) => $emit('set-typing-ref', el, index)"
        :auto-start="false"
        @complete="$emit('line-complete')"
      />
      <FormattedTextV2
        v-else-if="index < currentLineIndex"
        :nodes="line.nodes"
      />
    </span>
  </div>
</template>

<script setup lang="ts">
import type { DialogueTextLine } from '@/types'
import TypingTextV2 from './TypingTextV2.vue'
import FormattedTextV2 from './FormattedTextV2.vue'

const props = defineProps<{
  line: DialogueTextLine
  index: number
  currentLineIndex: number
}>()

const emit = defineEmits<{
  'set-typing-ref': [el: any, index: number]
  'line-complete': []
}>()
</script>

<style scoped>
.dialogue {
  margin-bottom: 25px;
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
