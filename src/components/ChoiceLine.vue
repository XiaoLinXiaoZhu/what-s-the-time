<template>
  <div class="choices">
    <button
      v-for="(choice, choiceIndex) in line.choices"
      :key="choiceIndex"
      @click.stop="$emit('choice-select', choice, index)"
      class="choice-button"
    >
      {{ choice.text }}
    </button>
  </div>
</template>

<script setup lang="ts">
import type { ChoiceLine } from '@/types'

defineProps<{
  line: ChoiceLine
  index: number
}>()

defineEmits<{
  'choice-select': [choice: ChoiceLine['choices'][0], lineIndex: number]
}>()
</script>

<style scoped>
.choices {
  margin-top: 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.choice-button {
  padding: 12px 20px;
  background: rgba(74, 158, 255, 0.2);
  border: 2px solid #4a9eff;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.2s;
}

.choice-button:hover {
  background: rgba(74, 158, 255, 0.4);
  transform: translateX(8px);
}
</style>

