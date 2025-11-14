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
                @click.stop="handleChoice(choice)"
                class="choice-button"
              >
                {{ choice.text }}
              </button>
            </div>
          </template>
        </template>
      </div>
    </div>

    <!-- 时间输入区域 -->
    <div class="input-container">
      <div v-if="needsSecondQuestion" class="second-question">
        <p>我记得，那天是从几点开始不对劲的？</p>
      </div>
      <div class="time-input-wrapper">
        <input
          v-model="timeInput"
          @keyup.enter="handleTimeInput"
          type="text"
          placeholder="输入时间 (HH:MM)"
          class="time-input"
          :disabled="isProcessing"
        />
        <button @click="handleTimeInput" :disabled="isProcessing" class="submit-button">
          确认
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue'
import { findSegment } from '@/data/script'
import type { ScriptSegment, ScriptLine } from '@/types'
import FormattedText from './FormattedText.vue'
import TypingText from './TypingText.vue'
import { useGameState } from '@/composables/useGameState'
import watchImage from '@/img/watch.png'
import type { ComponentPublicInstance } from 'vue'

const { gameState, updateGameState } = useGameState()

const timeInput = ref('')
const currentSegment = ref<ScriptSegment | null>(null)
const displayTime = ref<string>('')
const isProcessing = ref(false)
const needsSecondQuestion = computed(() => gameState.value.needsSecondQuestion)

// 逐行显示相关
const currentLineIndex = ref(0)
const displayedLines = ref<ScriptLine[]>([])
const typingRefs = ref<Map<number, ComponentPublicInstance>>(new Map())

const handleTimeInput = () => {
  if (!timeInput.value.trim() || isProcessing.value) return
  
  const time = timeInput.value.trim()
  
  // 验证时间格式
  if (!/^\d{1,2}:\d{2}$/.test(time)) {
    alert('请输入正确的时间格式 (HH:MM)')
    return
  }
  
  isProcessing.value = true
  
  // 如果需要第二问
  if (gameState.value.needsSecondQuestion) {
    const segment = findSegment(
      gameState.value.currentTime || '',
      time,
      gameState.value.unlockedFlags,
      gameState.value.viewedSegments
    )
    
    if (segment) {
      currentSegment.value = segment
      displayTime.value = `${gameState.value.currentTime} + ${time}`
      updateGameState({
        needsSecondQuestion: false,
        currentTime: undefined
      })
      gameState.value.viewedSegments.add(segment.id)
    }
  } else {
    // 检查是否需要第二问
    const segment = findSegment(
      time,
      undefined,
      gameState.value.unlockedFlags,
      gameState.value.viewedSegments
    )
    
    if (segment && segment.secondTime) {
      // 需要第二问
      updateGameState({
        needsSecondQuestion: true,
        currentTime: time
      })
      displayTime.value = time
    } else if (segment) {
      // 直接显示片段
      currentSegment.value = segment
      displayTime.value = time
      gameState.value.viewedSegments.add(segment.id)
    } else {
      // 未找到片段，显示空白
      const blankSegment = findSegment('*')
      if (blankSegment) {
        currentSegment.value = blankSegment
        displayTime.value = time
      }
    }
  }
  
  timeInput.value = ''
  isProcessing.value = false
}

// 设置 TypingText 组件的 ref
const setTypingRef = (el: any, index: number) => {
  if (el && typeof el === 'object' && 'startTyping' in el) {
    typingRefs.value.set(index, el)
  }
}

// 处理文本区域点击
const handleTextClick = (event: MouseEvent) => {
  // 如果点击的是选择按钮，不处理
  if ((event.target as HTMLElement).closest('.choice-button')) {
    return
  }
  
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
    // 如果没有 TypingText 组件（比如选择分支），直接显示下一行
    showNextLine()
  }
}

// 显示下一行
const showNextLine = () => {
  if (!currentSegment.value) return
  
  if (currentLineIndex.value < displayedLines.value.length - 1) {
    currentLineIndex.value++
    
    // 等待 DOM 更新后启动下一行的打字效果
    nextTick(() => {
      const typingComponent = typingRefs.value.get(currentLineIndex.value) as any
      if (typingComponent && typeof typingComponent.startTyping === 'function') {
        typingComponent.startTyping()
      }
    })
  }
}

// 当前行显示完成
const onLineComplete = () => {
  // 自动显示下一行（可选，如果不需要自动，可以注释掉）
  // showNextLine()
}

// 监听片段变化，重置显示状态
watch(currentSegment, (newSegment) => {
  if (newSegment) {
    displayedLines.value = newSegment.lines
    currentLineIndex.value = 0
    typingRefs.value.clear()
    
    // 等待 DOM 更新后启动第一行的打字效果
    nextTick(() => {
      const typingComponent = typingRefs.value.get(0) as any
      if (typingComponent && typeof typingComponent.startTyping === 'function') {
        typingComponent.startTyping()
      }
    })
  }
}, { immediate: true })

const handleChoice = (choice: { targetSegmentId: string; setFlag?: string }) => {
  if (choice.setFlag) {
    gameState.value.unlockedFlags.add(choice.setFlag)
  }
  // TODO: 实现跳转逻辑
  console.log('Choice selected:', choice)
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

.input-container {
  padding: 20px;
  background: rgba(0, 0, 0, 0.8);
  border-top: 1px solid #333;
}

.second-question {
  margin-bottom: 12px;
  color: #4a9eff;
  font-size: 16px;
}

.time-input-wrapper {
  display: flex;
  gap: 12px;
  max-width: 400px;
  margin: 0 auto;
}

.time-input {
  flex: 1;
  padding: 12px;
  background: #1a1a1a;
  border: 2px solid #333;
  color: #fff;
  font-size: 18px;
  border-radius: 4px;
  outline: none;
}

.time-input:focus {
  border-color: #4a9eff;
}

.submit-button {
  padding: 12px 24px;
  background: #4a9eff;
  border: none;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
  border-radius: 4px;
  transition: background 0.2s;
}

.submit-button:hover:not(:disabled) {
  background: #3a8eef;
}

.submit-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>

