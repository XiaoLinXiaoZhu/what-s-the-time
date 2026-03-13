<template>
  <div class="dialogue" :class="{ 'has-character': !!line.character }">
    <span v-if="line.character" class="character-name">
      {{ line.character }}
    </span>
    <span class="dialogue-text">
      <TypingText
        v-if="index === currentLineIndex"
        :nodes="line.nodes"
        :ref="(el: any) => $emit('set-typing-ref', el, index)"
        :auto-start="false"
        @complete="$emit('line-complete')"
      />
      <FormattedText
        v-else-if="index < currentLineIndex"
        :nodes="line.nodes"
      />
    </span>
  </div>
</template>

<script setup lang="ts">
import type { DialogueLine } from "@/types";
import FormattedText from "@/ui/shared/FormattedText.vue";
import TypingText from "@/ui/shared/TypingText.vue";

defineProps<{
  line: DialogueLine;
  index: number;
  currentLineIndex: number;
}>();

defineEmits<{
  "set-typing-ref": [el: unknown, index: number];
  "line-complete": [];
}>();
</script>

<style scoped>
.dialogue {
  margin: 16px 0;
}

.dialogue.has-character {
  display: flex;
  align-items: baseline;
  gap: 8px;
}

.character-name {
  color: #666;
  font-size: 14px;
  flex-shrink: 0;
  white-space: nowrap;
}

.dialogue-text {
  color: #e0e0e0;
}
</style>
