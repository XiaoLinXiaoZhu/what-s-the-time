<template>
  <div class="game-view">
    <!-- 手表图片区域 -->
    <WatchDisplay :display-time="displayTime" />

    <!-- 文本显示区域 -->
    <div class="text-container" @click="handleTextClick">
      <div class="text-content" v-if="currentSegment">
        <template v-for="(line, index) in displayedLines" :key="`${currentSegment.id}-${index}`">
          <ScriptLineRenderer
            v-if="index <= currentLineIndex || line.type === 'choice'"
            :line="line"
            :index="index"
            :current-line-index="currentLineIndex"
            @set-typing-ref="setTypingRef"
            @line-complete="onLineComplete"
            @choice-select="handleChoice"
            @time-choice-complete="handleTimeChoice"
            @input-complete="handleInputComplete"
          />
        </template>

        <!-- 回到开始按钮 - 在所有行显示完成后显示（开场片段除外） -->
        <BackToStartButton v-if="shouldShowBackButton" @click="backToStart" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, watch } from 'vue'
import { useGameNavigation } from '@/composables/useGameNavigation'
import { useScriptDisplay } from '@/composables/useScriptDisplay'
import { useKeyboardNavigation } from '@/composables/useKeyboardNavigation'
import { INPUT_FOCUS_DELAY } from '@/constants'
import WatchDisplay from './WatchDisplay.vue'
import ScriptLineRenderer from './ScriptLineRenderer.vue'
import BackToStartButton from './BackToStartButton.vue'

// 剧本显示（先创建，因为导航依赖它）
const scriptDisplay = useScriptDisplay({
  onLineComplete: () => {
    onLineComplete()
  }
})

const {
  currentLineIndex,
  displayedLines,
  isAllLinesComplete,
  setTypingRef,
  skipCurrentLine,
  showNextLine,
  insertLines,
  moveToLine,
  getTypingComponent,
  setDisplayedLines
} = scriptDisplay

// 游戏导航
const { currentSegment, displayTime, handleTimeInput, handleChoice, handleTimeChoice, backToStart, init } = useGameNavigation({
  insertLines,
  moveToLine,
  displayedLines
})

// 将 currentSegment 同步到 useScriptDisplay
watch(currentSegment, (newSegment) => {
  if (newSegment) {
    setDisplayedLines([...newSegment.lines])
    scriptDisplay.currentLineIndex.value = 0
    scriptDisplay.typingRefs.value.clear()
    
    // 等待 DOM 更新后启动第一行的打字效果
    nextTick(() => {
      const typingComponent = getTypingComponent(0)
      if (typingComponent && typeof typingComponent.startTyping === 'function') {
        typingComponent.startTyping()
      }
    })
  }
}, { immediate: true })

// 计算是否应该显示"回到开始"按钮（START 片段不显示）
const shouldShowBackButton = computed(() => {
  return isAllLinesComplete.value && currentSegment.value?.id !== 'START'
})

// 键盘导航
const { handleGlobalKeyDown, handleTextClick } = useKeyboardNavigation({
  showNextLine,
  backToStart,
  isAllLinesComplete: shouldShowBackButton,
  skipCurrentLine,
  getTypingComponent,
  currentLineIndex,
  displayedLines
})

// 处理输入完成
const handleInputComplete = (time: string, lineIndex: number) => {
  // 检查下一行是否是 timeChoice
  const nextLine = displayedLines.value[lineIndex + 1]
  if (nextLine?.type === 'timeChoice') {
    // 如果下一行是 timeChoice，直接使用刚才输入的时间处理 timeChoice
    handleTimeChoice(time, lineIndex + 1)
  } else {
    // 否则，执行原来的逻辑：查找匹配的片段
    handleTimeInput(time)
  }
}

// 当前行显示完成
const onLineComplete = () => {
  const currentLine = displayedLines.value[currentLineIndex.value]

  // 如果当前行是输入框或时间匹配分支，自动聚焦第一个输入框
  if (currentLine?.type === 'input' || currentLine?.type === 'timeChoice') {
    nextTick(() => {
      setTimeout(() => {
        // TimeInput 组件会自动处理聚焦
      }, INPUT_FOCUS_DELAY)
    })
  }
}


// 初始化
onMounted(() => {
  init()
  window.addEventListener('keydown', handleGlobalKeyDown)
})

// 组件卸载时移除事件监听
onUnmounted(() => {
  window.removeEventListener('keydown', handleGlobalKeyDown)
})
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
}
</style>
