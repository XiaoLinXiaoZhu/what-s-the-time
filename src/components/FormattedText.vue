<template>
  <span>
    <template v-for="(node, index) in parsedNodes" :key="index">
      <br v-if="node.type === 'linebreak'" />
      <template v-else-if="node.type === 'delay'">
        <!-- delay节点不渲染任何内容 -->
      </template>
      <span
        v-else-if="node.type === 'systemTime'"
        :class="{
          'text-red': false,
          'text-bold': false,
          'text-italic': false
        }"
      >
        {{ systemTimeDisplay }}
      </span>
      <span
        v-else
        :class="{
          'text-red': node.type === 'red',
          'text-bold': node.type === 'bold',
          'text-italic': node.type === 'italic'
        }"
      >
        {{ node.content }}
      </span>
    </template>
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { parseText } from '@/utils/textParser'
import { useSystemTime } from '@/composables/useSystemTime'

const props = defineProps<{
  text: string
}>()

const parsedNodes = computed(() => parseText(props.text))

// 使用全局系统时间
const { systemTime, getCurrentSystemTime } = useSystemTime()

// 确保始终有值
const systemTimeDisplay = computed(() => {
  return systemTime.value || getCurrentSystemTime()
})
</script>

<style scoped>
.text-red {
  color: #ff4444 !important;
}

.text-bold {
  font-weight: bold !important;
}

.text-italic {
  font-style: italic !important;
}
</style>

