<template>
  <div class="game-view">
    <!-- 手表图片区域 -->
    <WatchDisplay :display-time="displayTime" />

    <!-- 文本显示区域 -->
    <div class="text-container" ref="textContainerRef" @click="handleTextClick">
      <div class="text-content" v-if="displayState.currentSegment">
        <template v-for="(line, index) in displayState.displayedLines" :key="line.id">
          <ScriptLineRenderer
            v-if="shouldShowLine(line, index)"
            :ref="(el) => setLineRef(el, index)"
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

        <!-- 回到开始按钮 - 在所有行显示完成后显示（开场片段除外） -->
        <BackToStartButton v-if="shouldShowBackButton" @click="backToStart" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch, nextTick, type ComponentPublicInstance } from 'vue'
import { stateStore } from '@/stores/StateStore'
import { navigationService } from '@/services/NavigationService'
import { choiceService } from '@/services/ChoiceService'
import { timeChoiceService } from '@/services/TimeChoiceService'
import { inputService } from '@/services/InputService'
import { commandService } from '@/services/CommandService'
import { displayService } from '@/services/DisplayService'
import { sideEffectExecutor } from '@/services/SideEffectExecutor'
import { useKeyboardNavigation } from '@/composables/useKeyboardNavigation'
import WatchDisplay from './WatchDisplay.vue'
import ScriptLineRenderer from './ScriptLineRenderer.vue'
import BackToStartButton from './BackToStartButton.vue'

// 响应式状态（只读）
const displayState = computed(() => stateStore.displayState)
const gameState = computed(() => stateStore.gameState)

// 滚动相关
const textContainerRef = ref<HTMLElement | null>(null)
const lineRefs = ref<Map<number, ComponentPublicInstance>>(new Map())

// 计算显示时间
const displayTime = computed(() => {
  return gameState.value.currentTime || ''
})

/**
 * 判断是否应该显示行
 * 
 * 系统性规则（基于行状态，而非类型补丁）：
 * 1. 已完成的行（status === 'completed'）始终显示
 * 2. choice 行总是显示（交互行，需要用户选择）
 * 3. 其他行根据 currentLineIndex 显示（进度控制）
 */
const shouldShowLine = (line: any, index: number) => {
  // 规则1：已完成的行始终显示
  // 这包括：转换后的 timeDisplay、已完成的 choice、已完成的 input 等
  if (line.status === 'completed') {
    return true
  }
  
  // 规则2：choice 行总是显示（它们是交互行，需要用户选择）
  if (line.type === 'choice') {
    return true
  }
  
  // 规则3：其他行根据 currentLineIndex 显示（进度控制）
  const shouldShow = index <= displayState.value.currentLineIndex
  
  // 调试日志
  if (line.type === 'timeDisplay' || line.type === 'timeChoice' || line.type === 'input') {
    console.log('[GameView] shouldShowLine:', {
      lineType: line.type,
      lineId: line.id,
      index,
      status: line.status,
      currentLineIndex: displayState.value.currentLineIndex,
      shouldShow,
      reason: line.status === 'completed' ? 'completed' : 
              line.type === 'choice' ? 'choice' : 
              'currentLineIndex'
    })
  }
  
  return shouldShow
}

// 计算是否应该显示"回到开始"按钮
const shouldShowBackButton = computed(() => {
  return displayService.isAllLinesComplete() && displayState.value.currentSegment?.id !== 'START'
})

// 设置行 ref
const setLineRef = (el: any, index: number) => {
  if (el) {
    lineRefs.value.set(index, el)
  }
}

// 滚动到指定行
const scrollToLine = (lineIndex: number) => {
  if (!textContainerRef.value) return

  const lineComponent = lineRefs.value.get(lineIndex)
  if (!lineComponent) return

  // 获取行组件的 DOM 元素
  // ScriptLineRenderer 没有根元素，$el 会指向第一个子组件
  let lineElement: HTMLElement | null = null
  
  if (lineComponent.$el) {
    lineElement = lineComponent.$el as HTMLElement
  } else if ((lineComponent as any).$el) {
    lineElement = (lineComponent as any).$el as HTMLElement
  }
  
  if (!lineElement) return

  // 计算滚动位置
  const container = textContainerRef.value
  const containerRect = container.getBoundingClientRect()
  const lineRect = lineElement.getBoundingClientRect()
  
  // 计算目标滚动位置（让行显示在容器中间偏上的位置，留出 100px 的顶部空间）
  const scrollTop = container.scrollTop + lineRect.top - containerRect.top - containerRect.height / 2

  // 平滑滚动
  container.scrollTo({
    top: Math.max(0, scrollTop),
    behavior: 'smooth'
  })
}

// 监听 currentLineIndex 变化，自动滚动到当前行
watch(
  () => displayState.value.currentLineIndex,
  (newIndex) => {
    if (newIndex >= 0) {
      // 等待 DOM 更新后再滚动
      nextTick(() => {
        setTimeout(() => {
          scrollToLine(newIndex)
        }, 100) // 稍微延迟，确保打字动画已开始
      })
    }
  }
)

// 监听片段变化，清理行 refs
watch(
  () => displayState.value.currentSegment?.id,
  () => {
    lineRefs.value.clear()
  }
)

// 事件处理
const handleSetTypingRef = (el: any, index: number) => {
  displayService.setTypingRef(el, index)
}

const handleChoice = (choice: any, lineIndex: number, choiceIndex: number) => {
  const line = displayState.value.displayedLines[lineIndex]
  if (line) {
    choiceService.handleChoice(choice, line.id, choiceIndex)
  }
}

const handleTimeChoice = (time: string, lineIndex: number) => {
  const line = displayState.value.displayedLines[lineIndex]
  if (line) {
    timeChoiceService.handleTimeChoice(time, line.id)
  }
}

const handleInputComplete = (time: string, lineIndex: number) => {
  const line = displayState.value.displayedLines[lineIndex]
  if (line) {
    inputService.handleInputComplete(time, line.id)
  }
}

const handleCommandExecute = (command: any, lineIndex: number) => {
  commandService.handleCommand(command, lineIndex)
}

const backToStart = () => {
  navigationService.navigateToStart()
}

const onLineComplete = () => {
  // 当前行显示完成，可以在这里处理额外的逻辑
  // 副作用执行器会自动处理打字效果和聚焦
}

// 键盘导航
const { handleGlobalKeyDown, handleTextClick } = useKeyboardNavigation({
  showNextLine: () => displayService.showNextLine(),
  backToStart,
  isAllLinesComplete: shouldShowBackButton,
  skipCurrentLine: () => displayService.skipCurrentLine(),
  getTypingComponent: (index: number) => displayService.getTypingComponent(index),
  currentLineIndex: computed(() => displayState.value.currentLineIndex),
  displayedLines: computed(() => displayState.value.displayedLines)
})

// 初始化
onMounted(() => {
  // 初始化副作用执行器
  sideEffectExecutor.init()
  
  // 导航到开始片段
  navigationService.navigateToStart()
  
  // 添加键盘事件监听
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

  padding-bottom: 50%;
}
</style>
