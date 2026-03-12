<template>
  <div class="choices">
    <button
      v-for="(choice, choiceIndex) in line.choices"
      :key="choiceIndex"
      @click.stop="handleChoiceClick(choice, choiceIndex)"
      :disabled="isDisabled"
      class="choice-button"
      :class="{
        'choice-button-disabled': isDisabled,
        'choice-button-selected': isSelected(choiceIndex),
        'choice-button-unselected': isDisabled && !isSelected(choiceIndex)
      }"
    >
      {{ choice.text }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { ChoiceLineV2, DisplayedLineV2 } from "@/types";

const props = defineProps<{
  line: DisplayedLineV2 & ChoiceLineV2;
  index: number;
}>();

const emit = defineEmits<{
  "choice-select": [
    choice: ChoiceLineV2["choices"][0],
    lineIndex: number,
    choiceIndex: number,
  ];
}>();

// 根据行状态决定是否禁用
const isDisabled = computed(() => {
  const status = props.line.status;
  return status === "completed" || status === "disabled";
});

// 检查选项是否被选中（从 line.selectedChoiceIndex 读取）
const isSelected = (choiceIndex: number): boolean => {
  return isDisabled.value && props.line.selectedChoiceIndex === choiceIndex;
};

// 处理选择点击
const handleChoiceClick = (
  choice: ChoiceLineV2["choices"][0],
  choiceIndex: number,
) => {
  if (!isDisabled.value) {
    emit("choice-select", choice, props.index, choiceIndex);
  }
};
</script>

<style scoped>
.choices {
  margin-top: 24px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.choice-button {
  padding: 10px 16px;
  background: transparent;
  border: 1px solid #666;
  color: #666;
  font-size: 16px;
  cursor: pointer;
  border-radius: 0;
  transition: all 0.2s;
  text-align: left;
  font-family: inherit;
}

/* 未选中状态（可点击）的 hover - 必须在禁用样式之前 */
.choice-button:hover {
  color: #999;
  border-color: #999;
  background: rgba(255, 255, 255, 0.05);
}

/* 已选中状态 */
.choice-button-selected {
  color: #fff !important;
  border-color: #fff !important;
  background: transparent;
  font-weight: normal;
}

.choice-button-selected:hover {
  color: #fff !important;
  border-color: #fff !important;
  background: transparent;
}

/* 未选中的选项（已禁用状态） */
.choice-button-unselected {
  color: #444 !important;
  border-color: #333 !important;
  opacity: 0.6;
}

.choice-button-unselected:hover {
  color: #444 !important;
  border-color: #333 !important;
  background: transparent;
}

/* 禁用状态 - 必须放在最后，覆盖其他样式 */
.choice-button:disabled,
.choice-button-disabled {
  cursor: not-allowed;
  pointer-events: none;
}
</style>

