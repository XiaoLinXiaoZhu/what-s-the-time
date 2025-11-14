<template>
  <div class="game-view">
    <!-- 手表图片区域 -->
    <div class="watch-container">
      <img :src="watchImage" alt="Watch" class="watch-image" />
      <div class="time-display" v-if="displayTime">
        {{ displayTime }}
      </div>
    </div>

    <!-- 文本显示区域 -->
    <div class="text-container" @click="handleTextClick">
      <div class="text-content" v-if="currentSegment">
        <template v-for="(line, index) in displayedLines" :key="`${currentSegment.id}-${index}`">
          <!-- 只显示当前行和已完成的行 -->
          <template v-if="index <= currentLineIndex || line.type === 'choice'">
            <!-- 场景描述 -->
            <div v-if="line.type === 'narration'" class="narration">
              <TypingText
                v-if="index === currentLineIndex"
                :text="line.text"
                :ref="(el) => setTypingRef(el, index)"
                :auto-start="false"
                @complete="onLineComplete"
              />
              <FormattedText v-else-if="index < currentLineIndex" :text="line.text" />
            </div>
            
            <!-- 对话 -->
            <div v-else-if="line.type === 'dialogue'" class="dialogue">
              <span v-if="line.character" class="character-name">
                {{ line.character }}
              </span>
              <span class="dialogue-text">
                <TypingText
                  v-if="index === currentLineIndex"
                  :text="line.text"
                  :ref="(el) => setTypingRef(el, index)"
                  :auto-start="false"
                  @complete="onLineComplete"
                />
                <FormattedText v-else-if="index < currentLineIndex" :text="line.text" />
              </span>
            </div>
            
            <!-- 选择分支 -->
            <div v-else-if="line.type === 'choice'" class="choices">
              <button
                v-for="(choice, choiceIndex) in line.choices"
                :key="choiceIndex"
                @click.stop="handleChoice(choice, index)"
                class="choice-button"
              >
                {{ choice.text }}
              </button>
            </div>
            
            <!-- 时间匹配分支 -->
            <div v-else-if="line.type === 'timeChoice'" class="time-choice">
              <div class="time-input-wrapper">
                <input
                  v-for="(_, inputIdx) in timeInputChars"
                  :key="inputIdx"
                  :ref="(el) => setTimeInputRef(el, inputIdx)"
                  v-model="timeInputChars[inputIdx]"
                  @input="(e) => handleTimeCharInputForChoice(e, inputIdx, index)"
                  @keydown="(e) => handleTimeCharKeydown(e, inputIdx)"
                  @paste="handleTimePasteForChoice"
                  type="text"
                  maxlength="1"
                  class="time-input-char"
                  :class="{ 'separator': inputIdx === 2 }"
                  :disabled="isProcessing || inputIdx === 2"
                  :readonly="inputIdx === 2"
                />
              </div>
            </div>
            
          </template>
        </template>
        
        <!-- 回到开始按钮 - 在所有行显示完成后显示（开场片段除外） -->
        <div v-if="isAllLinesComplete" class="back-to-start">
          <button @click="backToStart" class="back-button">
            回到开始
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick, onMounted, onUnmounted } from 'vue'
import { findSegment, startSegment, scriptSegments } from '@/data/script'
import type { ScriptSegment, ScriptLine } from '@/types'
import FormattedText from './FormattedText.vue'
import TypingText from './TypingText.vue'
import { useGameState } from '@/composables/useGameState'
import watchImage from '@/img/watch.png'
import type { ComponentPublicInstance } from 'vue'

const { gameState, updateGameState } = useGameState()

const timeInputChars = ref<string[]>(['', '', ':', '', '']) // HH:MM 格式，5个位置
const timeInputRefs = ref<(HTMLInputElement | null)[]>([])
const currentSegment = ref<ScriptSegment | null>(null)
const displayTime = ref<string>('')
const isProcessing = ref(false)

// 逐行显示相关
const currentLineIndex = ref(0)
const displayedLines = ref<ScriptLine[]>([])
const typingRefs = ref<Map<number, ComponentPublicInstance>>(new Map())

// 检查是否所有行都已完成显示
const isAllLinesComplete = computed(() => {
  if (!currentSegment.value || currentSegment.value.id === 'START') {
    return false
  }
  
  // 检查是否到达最后一行
  if (currentLineIndex.value < displayedLines.value.length - 1) {
    return false
  }
  
  // 检查最后一行是否已完成
  const lastLineIndex = displayedLines.value.length - 1
  const lastLine = displayedLines.value[lastLineIndex]
  
  // 如果最后一行是输入框、选择分支或时间匹配分支，不需要打字效果，视为已完成
  if (lastLine?.type === 'input' || lastLine?.type === 'choice' || lastLine?.type === 'timeChoice') {
    return true
  }
  
  // 如果有 TypingText 组件，检查是否已完成
  const typingComponent = typingRefs.value.get(lastLineIndex) as any
  if (typingComponent) {
    return typingComponent.isComplete === true && typingComponent.isTyping === false
  }
  
  // 如果没有 TypingText 组件，视为已完成
  return true
})

// 设置时间输入框的 ref
const setTimeInputRef = (el: any, index: number) => {
  if (el && el instanceof HTMLInputElement) {
    timeInputRefs.value[index] = el
  }
}

// 处理单个字符输入
const handleTimeCharInput = (e: Event, index: number) => {
  const input = e.target as HTMLInputElement
  let value = input.value
  
  // 只允许数字（除了第3个位置是冒号）
  if (index !== 2) {
    value = value.replace(/\D/g, '')
    if (value) {
      timeInputChars.value[index] = value
      
      // 自动移动到下一个输入框
      if (index < 4 && index !== 1) {
        // 跳过冒号位置
        const nextIndex = index === 1 ? 3 : index + 1
        nextTick(() => {
          timeInputRefs.value[nextIndex]?.focus()
        })
      } else if (index === 1) {
        // 小时输入完成，移动到分钟
        nextTick(() => {
          timeInputRefs.value[3]?.focus()
        })
      }
      
      // 检查是否输入完成
      checkTimeComplete()
    } else {
      timeInputChars.value[index] = ''
    }
  } else {
    // 冒号位置不允许输入
    timeInputChars.value[index] = ':'
  }
}

// 处理键盘事件
const handleTimeCharKeydown = (e: KeyboardEvent, index: number) => {
  // 处理退格键
  if (e.key === 'Backspace' && !timeInputChars.value[index] && index > 0) {
    e.preventDefault()
    // 跳过冒号位置
    const prevIndex = index === 3 ? 1 : index === 4 ? 3 : index - 1
    if (prevIndex >= 0) {
      timeInputChars.value[prevIndex] = ''
      nextTick(() => {
        timeInputRefs.value[prevIndex]?.focus()
      })
    }
  }
  
  // 处理方向键
  if (e.key === 'ArrowLeft' && index > 0) {
    const prevIndex = index === 3 ? 1 : index === 4 ? 3 : index - 1
    if (prevIndex >= 0) {
      nextTick(() => {
        timeInputRefs.value[prevIndex]?.focus()
      })
    }
  }
  
  if (e.key === 'ArrowRight' && index < 4) {
    const nextIndex = index === 1 ? 3 : index === 4 ? 4 : index + 1
    if (nextIndex <= 4) {
      nextTick(() => {
        timeInputRefs.value[nextIndex]?.focus()
      })
    }
  }
}

// 处理粘贴
const handleTimePaste = (e: ClipboardEvent) => {
  e.preventDefault()
  const pastedText = e.clipboardData?.getData('text') || ''
  const cleaned = pastedText.replace(/\D/g, '').slice(0, 4)
  
  if (cleaned.length === 4) {
    timeInputChars.value[0] = cleaned[0]
    timeInputChars.value[1] = cleaned[1]
    timeInputChars.value[3] = cleaned[2]
    timeInputChars.value[4] = cleaned[3]
    checkTimeComplete()
  }
}

// 检查时间是否输入完成
const checkTimeComplete = () => {
  const timeStr = `${timeInputChars.value[0]}${timeInputChars.value[1]}:${timeInputChars.value[3]}${timeInputChars.value[4]}`
  
  if (timeInputChars.value[0] && timeInputChars.value[1] && timeInputChars.value[3] && timeInputChars.value[4]) {
    // 验证时间格式
    if (/^\d{1,2}:\d{2}$/.test(timeStr)) {
      // 延迟一下再提交，让用户看到完整的输入
      setTimeout(() => {
        handleTimeInput(timeStr)
      }, 300)
    }
  }
}

// 处理时间输入提交（用于普通输入框）
const handleTimeInput = (time?: string) => {
  const timeStr = time || `${timeInputChars.value[0]}${timeInputChars.value[1]}:${timeInputChars.value[3]}${timeInputChars.value[4]}`
  
  if (!timeStr || isProcessing.value) return
  
  // 验证时间格式
  if (!/^\d{1,2}:\d{2}$/.test(timeStr)) {
    // 重置输入
    timeInputChars.value = ['', '', ':', '', '']
    nextTick(() => {
      timeInputRefs.value[0]?.focus()
    })
    return
  }
  
  isProcessing.value = true
  
  // 查找匹配的片段
  const segment = findSegment(
    timeStr,
    gameState.value.unlockedFlags,
    gameState.value.viewedSegments
  )
  
  if (segment) {
    currentSegment.value = segment
    displayTime.value = timeStr
    gameState.value.viewedSegments.add(segment.id)
  } else {
    // 未找到片段，显示空白
    const blankSegment = findSegment('*')
    if (blankSegment) {
      currentSegment.value = blankSegment
      displayTime.value = timeStr
    }
  }
  
  // 重置输入
  timeInputChars.value = ['', '', ':', '', '']
  isProcessing.value = false
}

// 回到开始
const backToStart = () => {
  currentSegment.value = startSegment
  timeInputChars.value = ['', '', ':', '', '']
  displayTime.value = ''
  currentTimeChoiceLineIndex.value = null
  updateGameState({
    currentTime: undefined
  })
}

// 设置 TypingText 组件的 ref
const setTypingRef = (el: any, index: number) => {
  if (el && typeof el === 'object' && 'startTyping' in el) {
    typingRefs.value.set(index, el)
  }
}

// 处理全局键盘事件
const handleGlobalKeyDown = (event: KeyboardEvent) => {
  // 如果按的是 Enter 或空格
  if (event.key === 'Enter' || event.key === ' ') {
    // 如果焦点在输入框上，不处理（让输入框自己处理）
    const target = event.target as HTMLElement
    if (target && (target.classList.contains('time-input-char') || target.closest('.time-input-char'))) {
      return
    }
    
    // 如果所有行都已完成（包括回到开始按钮），触发回到开始
    if (isAllLinesComplete.value) {
      event.preventDefault()
      backToStart()
      return
    }
    
    // 如果焦点在按钮上，不处理
    if (target && (target.classList.contains('back-button') || target.closest('.back-button'))) {
      return
    }
    
    event.preventDefault()
    handleTextAction()
  }
}

// 处理文本区域点击或键盘操作
const handleTextClick = (event: MouseEvent) => {
  // 如果点击的是选择按钮、输入框或按钮，不处理
  const target = event.target as HTMLElement
  if (
    target.closest('.choice-button') ||
    target.closest('.time-input-char') ||
    target.closest('.back-button') ||
    target.closest('.input-line')
  ) {
    return
  }
  
  handleTextAction()
}

// 统一的文本操作处理
const handleTextAction = () => {
  const typingComponent = typingRefs.value.get(currentLineIndex.value) as any
  
  if (typingComponent) {
    // 检查是否正在显示
    if (typingComponent.isTyping === true) {
      // 如果正在显示，快速显示完当前行
      if (typeof typingComponent.skipToEnd === 'function') {
        typingComponent.skipToEnd()
      }
    } else if (typingComponent.isComplete === true) {
      // 如果当前行已完成，显示下一行
      showNextLine()
    }
  } else {
    // 如果没有 TypingText 组件（比如选择分支、输入框或时间匹配分支），检查是否需要等待输入
    const currentLine = displayedLines.value[currentLineIndex.value]
    if (currentLine?.type !== 'input' && currentLine?.type !== 'timeChoice') {
      showNextLine()
    }
  }
}

// 显示下一行
const showNextLine = () => {
  if (!currentSegment.value) return
  
  if (currentLineIndex.value < displayedLines.value.length - 1) {
    currentLineIndex.value++
    
    const nextLine = displayedLines.value[currentLineIndex.value]
    
    // 等待 DOM 更新后处理
    nextTick(() => {
      // 如果下一行是输入框或时间匹配分支，直接聚焦第一个输入框
      if (nextLine?.type === 'input' || nextLine?.type === 'timeChoice') {
        setTimeout(() => {
          timeInputRefs.value[0]?.focus()
          // 如果是时间匹配分支，记录行索引
          if (nextLine?.type === 'timeChoice') {
            currentTimeChoiceLineIndex.value = currentLineIndex.value
          }
        }, 100)
      } else {
        // 否则启动打字效果
        const typingComponent = typingRefs.value.get(currentLineIndex.value) as any
        if (typingComponent && typeof typingComponent.startTyping === 'function') {
          typingComponent.startTyping()
        }
      }
    })
  }
}

// 当前行显示完成
const onLineComplete = () => {
  const currentLine = displayedLines.value[currentLineIndex.value]
  
  // 如果当前行是输入框或时间匹配分支，自动聚焦第一个输入框
  if (currentLine?.type === 'input' || currentLine?.type === 'timeChoice') {
    nextTick(() => {
      setTimeout(() => {
        timeInputRefs.value[0]?.focus()
        // 如果是时间匹配分支，记录行索引
        if (currentLine?.type === 'timeChoice') {
          currentTimeChoiceLineIndex.value = currentLineIndex.value
        }
      }, 100)
    })
  }
  // 不自动显示下一行，等待用户点击
}

// 监听片段变化，重置显示状态
watch(currentSegment, (newSegment) => {
  if (newSegment) {
    displayedLines.value = [...newSegment.lines] // 使用展开运算符创建新数组，避免引用问题
    currentLineIndex.value = 0
    typingRefs.value.clear()
    // 重置输入框
    timeInputChars.value = ['', '', ':', '', '']
    currentTimeChoiceLineIndex.value = null
    
    // 等待 DOM 更新后启动第一行的打字效果
    nextTick(() => {
      const typingComponent = typingRefs.value.get(0) as any
      if (typingComponent && typeof typingComponent.startTyping === 'function') {
        typingComponent.startTyping()
      }
      
      // 如果第一行是输入框或时间匹配分支，自动聚焦第一个输入框
      if (newSegment.lines[0]?.type === 'input' || newSegment.lines[0]?.type === 'timeChoice') {
        setTimeout(() => {
          timeInputRefs.value[0]?.focus()
        }, 100)
      }
    })
  }
}, { immediate: true })

// 监听输入框行或时间匹配分支的显示，自动聚焦
watch(() => {
  const currentLine = displayedLines.value[currentLineIndex.value]
  return currentLine?.type === 'input' || currentLine?.type === 'timeChoice'
}, (isInputLine) => {
  if (isInputLine) {
    nextTick(() => {
      setTimeout(() => {
        timeInputRefs.value[0]?.focus()
        // 如果是时间匹配分支，记录行索引
        if (currentLine?.type === 'timeChoice') {
          currentTimeChoiceLineIndex.value = currentLineIndex.value
        }
      }, 100)
    })
  }
})

// 初始化：显示开场片段
onMounted(() => {
  currentSegment.value = startSegment
  // 添加全局键盘事件监听
  window.addEventListener('keydown', handleGlobalKeyDown)
})

// 组件卸载时移除事件监听
onUnmounted(() => {
  window.removeEventListener('keydown', handleGlobalKeyDown)
})

// 处理选择分支
const handleChoice = (choice: { text: string; lines: ScriptLine[]; setFlag?: string }, lineIndex: number) => {
  // 设置 flag
  if (choice.setFlag) {
    gameState.value.unlockedFlags.add(choice.setFlag)
  }
  
  // 记录选择历史
  gameState.value.choiceHistory.push({
    choiceText: choice.text,
    timestamp: Date.now()
  })
  
  // 显示选择的选项（作为对话）
  const choiceLine: ScriptLine = {
    type: 'dialogue',
    text: `{italic}你选择了：{/italic} ${choice.text}`
  }
  
  // 在当前行之后插入选择的选项和后续内容
  const insertIndex = lineIndex + 1
  displayedLines.value.splice(insertIndex, 0, choiceLine, ...choice.lines)
  
  // 移动到下一行
  currentLineIndex.value = insertIndex
  
  // 等待 DOM 更新后启动下一行的打字效果
  nextTick(() => {
    const typingComponent = typingRefs.value.get(currentLineIndex.value) as any
    if (typingComponent && typeof typingComponent.startTyping === 'function') {
      typingComponent.startTyping()
    }
  })
}
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

.watch-container {
  position: relative;
  width: 100%;
  height: 40%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #000;
}

.watch-image {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.time-display {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 24px;
  color: #fff;
  background: rgba(0, 0, 0, 0.7);
  padding: 8px 16px;
  border-radius: 4px;
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

.narration {
  margin-bottom: 16px;
  color: #ccc;
  font-style: italic;
}

.dialogue {
  margin-bottom: 20px;
}

.character-name {
  display: inline-block;
  color: #4a9eff;
  font-weight: bold;
  margin-right: 8px;
}

.dialogue-text {
  color: #fff;
}

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

.input-line {
  margin-top: 24px;
  margin-bottom: 20px;
}

.second-question {
  margin-bottom: 12px;
  color: #4a9eff;
  font-size: 16px;
  font-style: italic;
}

.time-input-wrapper {
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: center;
}

.time-input-char {
  width: 50px;
  height: 50px;
  text-align: center;
  background: rgba(26, 26, 26, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #fff;
  font-size: 24px;
  font-weight: 500;
  border-radius: 4px;
  outline: none;
  transition: all 0.2s;
}

.time-input-char:focus {
  border-color: rgba(255, 255, 255, 0.5);
  background: rgba(26, 26, 26, 0.8);
  box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.1);
}

.time-input-char.separator {
  width: 20px;
  border: none;
  background: transparent;
  pointer-events: none;
  font-size: 24px;
  color: rgba(255, 255, 255, 0.5);
}

.time-input-char.separator:focus {
  box-shadow: none;
}

.back-to-start {
  margin-top: 32px;
  text-align: center;
}

.back-button {
  padding: 12px 32px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: #fff;
  font-size: 16px;
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.2s;
}

.back-button:hover {
  background: rgba(255, 255, 255, 0.15);
  border-color: rgba(255, 255, 255, 0.5);
  transform: translateY(-2px);
}
</style>

