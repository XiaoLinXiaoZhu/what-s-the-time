<template>
  <div class="game-view">
    <WatchDisplay :display-time="displayTime" />

    <div ref="textContainerRef" class="text-container" @click="handleTextClick">
      <div v-if="displayState.currentSegment" class="text-content">
        <template
          v-for="(line, index) in displayState.displayedLines"
          :key="line.id"
        >
          <ScriptLineRenderer
            v-if="shouldShowLine(line, index)"
            :ref="(el: any) => setLineRef(el, index)"
            :line="line"
            :index="index"
            :current-line-index="displayState.currentLineIndex"
            @set-typing-ref="handleSetTypingRef"
            @line-complete="onLineComplete"
            @choice-select="handleChoice"
            @time-choice-complete="handleTimeChoice"
            @input-complete="handleInputComplete"
            @command-execute="handleCommandExecute"
          />
        </template>

        <BackToStartButton v-if="shouldShowBackButton" @click="backToStart" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  type ComponentPublicInstance,
  computed,
  nextTick,
  onMounted,
  onUnmounted,
  ref,
  watch,
} from "vue";
import { useKeyboardNavigation } from "@/composables/useKeyboardNavigation";
import {
  choiceService,
  commandService,
  displayService,
  inputService,
  navigationService,
  sideEffectExecutor,
  stateStore,
  timeChoiceService,
} from "@/engine";
import type { ChoiceLine, CommandLine, DisplayedLine } from "@/types";
import BackToStartButton from "./BackToStartButton.vue";
import ScriptLineRenderer from "./ScriptLineRenderer.vue";
import WatchDisplay from "./WatchDisplay.vue";

const displayState = computed(() => stateStore.displayState);
const gameState = computed(() => stateStore.gameState);

const textContainerRef = ref<HTMLElement | null>(null);
const lineRefs = ref<Map<number, ComponentPublicInstance>>(new Map());

const displayTime = computed(() => gameState.value.currentTime || "");

const shouldShowLine = (line: DisplayedLine, index: number): boolean => {
  if (line.status === "completed") return true;
  return index <= displayState.value.currentLineIndex;
};

const shouldShowBackButton = computed(() => {
  return (
    displayService.isAllLinesComplete() &&
    displayState.value.currentSegment?.id !== "START"
  );
});

const setLineRef = (el: ComponentPublicInstance | null, index: number) => {
  if (el) lineRefs.value.set(index, el);
};

const scrollToLine = (lineIndex: number) => {
  if (!textContainerRef.value) return;

  const lineComponent = lineRefs.value.get(lineIndex);
  if (!lineComponent?.$el) return;

  const container = textContainerRef.value;
  const lineElement = lineComponent.$el as HTMLElement;
  const containerRect = container.getBoundingClientRect();
  const lineRect = lineElement.getBoundingClientRect();

  const scrollTop =
    container.scrollTop +
    lineRect.top -
    containerRect.top -
    containerRect.height / 2;

  container.scrollTo({ top: Math.max(0, scrollTop), behavior: "smooth" });
};

watch(
  () => displayState.value.currentLineIndex,
  (newIndex) => {
    if (newIndex >= 0) {
      nextTick(() => setTimeout(() => scrollToLine(newIndex), 100));
    }
  },
);

watch(
  () => displayState.value.currentSegment?.id,
  () => lineRefs.value.clear(),
);

// 事件处理
const handleSetTypingRef = (el: unknown, index: number) => {
  displayService.setTypingRef(el, index);
};

const handleChoice = (choice: unknown, lineIndex: number, choiceIndex: number) => {
  const line = displayState.value.displayedLines[lineIndex];
  if (line) {
    choiceService.handleChoice(
      choice as ChoiceLine["choices"][0],
      line.id,
      choiceIndex,
    );
  }
};

const handleTimeChoice = (time: string, lineIndex: number) => {
  const line = displayState.value.displayedLines[lineIndex];
  if (line) timeChoiceService.handleTimeChoice(time, line.id);
};

const handleInputComplete = (time: string, lineIndex: number) => {
  const line = displayState.value.displayedLines[lineIndex];
  if (line) inputService.handleInputComplete(time, line.id);
};

const handleCommandExecute = (command: unknown, lineIndex: number) => {
  commandService.handleCommand(command as CommandLine, lineIndex);
};

const backToStart = () => navigationService.navigateToStart();

const onLineComplete = () => {
  // 副作用执行器自动处理后续逻辑
};

const { handleGlobalKeyDown, handleTextClick } = useKeyboardNavigation({
  showNextLine: () => displayService.showNextLine(),
  backToStart,
  isAllLinesComplete: shouldShowBackButton,
  skipCurrentLine: () => displayService.skipCurrentLine(),
  getTypingComponent: (index: number) => displayService.getTypingComponent(index),
  currentLineIndex: computed(() => displayState.value.currentLineIndex),
  displayedLines: computed(() => displayState.value.displayedLines),
});

onMounted(() => {
  sideEffectExecutor.init();
  navigationService.navigateToStart();
  window.addEventListener("keydown", handleGlobalKeyDown);
});

onUnmounted(() => {
  window.removeEventListener("keydown", handleGlobalKeyDown);
});
</script>

<style scoped>
.game-view {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: #000;
  position: relative;
}

.text-container {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  background: rgba(20, 20, 20, 0.9);
  outline: none;
}

.text-container:focus {
  outline: none;
}

.text-content {
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.8;
  font-size: 18px;
  padding-bottom: 50%;
}
</style>
