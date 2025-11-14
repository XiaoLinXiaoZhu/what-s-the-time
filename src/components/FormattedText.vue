<template>
  <span>
    <template v-for="(node, index) in parsedNodes" :key="index">
      <br v-if="node.type === 'linebreak'" />
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

const props = defineProps<{
  text: string
}>()

const parsedNodes = computed(() => parseText(props.text))
</script>

<style scoped>
.text-red {
  color: #ff4444;
}

.text-bold {
  font-weight: bold;
}

.text-italic {
  font-style: italic;
}
</style>

