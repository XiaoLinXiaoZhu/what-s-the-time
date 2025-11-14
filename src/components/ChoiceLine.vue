<template>
  <div class="choices">
    <button
      v-for="(choice, choiceIndex) in line.choices"
      :key="choiceIndex"
      @click.stop="handleChoiceClick(choice)"
      :disabled="isDisabled"
      class="choice-button"
      :class="{ 'choice-button-disabled': isDisabled }"
    >
      {{ choice.text }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { ChoiceLine } from '@/types'

const props = defineProps<{
  line: ChoiceLine
  index: number
}>()

const emit = defineEmits<{
  'choice-select': [choice: ChoiceLine['choices'][0], lineIndex: number]
}>()

// 根据行状态决定是否禁用
const isDisabled = computed(() => {
  const status = (props.line as any).status
  return status === 'completed' || status === 'disabled'
})

// 处理选择点击
const handleChoiceClick = (choice: ChoiceLine['choices'][0]) => {
  if (!isDisabled.value) {
    emit('choice-select', choice, props.index)
  }
}
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

.choice-button:hover:not(:disabled) {
  background: rgba(74, 158, 255, 0.4);
  transform: translateX(8px);
}

.choice-button:disabled,
.choice-button-disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}
</style>

