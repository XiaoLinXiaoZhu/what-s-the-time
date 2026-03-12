<template>
  <div class="narration">
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
  </div>
</template>

<script setup lang="ts">
import type { NarrationTextLine } from "@/types";
import FormattedTextV2 from "./FormattedTextV2.vue";
import TypingTextV2 from "./TypingTextV2.vue";

const props = defineProps<{
  line: NarrationTextLine;
  index: number;
  currentLineIndex: number;
}>();

const emit = defineEmits<{
  "set-typing-ref": [el: any, index: number];
  "line-complete": [];
}>();
</script>

<style scoped>
.narration {
  margin-bottom: 16px;
  color: #ccc;
  font-style: italic;
}
</style>
