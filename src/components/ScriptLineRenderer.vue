<template>
  <NarrationLine
    v-if="line.type === 'narration'"
    :line="line"
    :index="index"
    :current-line-index="currentLineIndex"
    @set-typing-ref="$emit('set-typing-ref', $event, index)"
    @line-complete="$emit('line-complete')"
  />
  <DialogueLine
    v-else-if="line.type === 'dialogue'"
    :line="line"
    :index="index"
    :current-line-index="currentLineIndex"
    @set-typing-ref="$emit('set-typing-ref', $event, index)"
    @line-complete="$emit('line-complete')"
  />
  <ChoiceLine
    v-else-if="line.type === 'choice'"
    :line="line"
    :index="index"
    @choice-select="$emit('choice-select', $event, index)"
  />
  <TimeChoiceLine
    v-else-if="line.type === 'timeChoice'"
    :line="line"
    :index="index"
    :current-line-index="currentLineIndex"
    @time-choice-complete="$emit('time-choice-complete', $event, index)"
  />
  <InputLine
    v-else-if="line.type === 'input'"
    :line="line"
    :index="index"
    :current-line-index="currentLineIndex"
    @input-complete="$emit('input-complete', $event, index)"
  />
  <TimeDisplayLine
    v-else-if="line.type === 'timeDisplay'"
    :line="line"
    :index="index"
  />
  <CommandLine
    v-else-if="line.type === 'command'"
    :line="line"
    :index="index"
    @command-execute="$emit('command-execute', $event, index)"
  />
</template>

<script setup lang="ts">
import type { ScriptLine } from '@/types'
import NarrationLine from './NarrationLine.vue'
import DialogueLine from './DialogueLine.vue'
import ChoiceLine from './ChoiceLine.vue'
import TimeChoiceLine from './TimeChoiceLine.vue'
import InputLine from './InputLine.vue'
import TimeDisplayLine from './TimeDisplayLine.vue'
import CommandLine from './CommandLine.vue'

defineProps<{
  line: ScriptLine
  index: number
  currentLineIndex: number
}>()

defineEmits<{
  'set-typing-ref': [el: any, index: number]
  'line-complete': []
  'choice-select': [choice: any, lineIndex: number]
  'time-choice-complete': [time: string, lineIndex: number]
  'input-complete': [time: string, lineIndex: number]
  'command-execute': [command: any, lineIndex: number]
}>()
</script>

