<template>
  <div class="dialogue">
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
import FormattedText from "./FormattedText.vue";
import TypingText from "./TypingText.vue";

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

.character-name {
  color: #aaa;
  font-size: 14px;
  display: block;
  margin-bottom: 4px;
}

.dialogue-text {
  color: #e0e0e0;
}
</style>
