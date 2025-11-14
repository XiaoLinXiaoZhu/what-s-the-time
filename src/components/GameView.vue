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
    <div class="text-container">
      <div class="text-content" v-if="currentSegment">
        <template v-for="(line, index) in currentSegment.lines" :key="index">
          <!-- 场景描述 -->
          <div v-if="line.type === 'narration'" class="narration">
            <FormattedText :text="line.text" />
          </div>
          
          <!-- 对话 -->
          <div v-else-if="line.type === 'dialogue'" class="dialogue">
            <span v-if="line.character" class="character-name">
              {{ line.character }}
            </span>
            <span class="dialogue-text">
              <FormattedText :text="line.text" />
            </span>
          </div>
          
          <!-- 选择分支 -->
          <div v-else-if="line.type === 'choice'" class="choices">
            <button
              v-for="(choice, choiceIndex) in line.choices"
              :key="choiceIndex"
              @click="handleChoice(choice)"
              class="choice-button"
            >
              {{ choice.text }}
            </button>
          </div>
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
import { ref, computed } from 'vue'
import { findSegment } from '@/data/script'
import type { ScriptSegment } from '@/types'
import FormattedText from './FormattedText.vue'
import { useGameState } from '@/composables/useGameState'
import watchImage from '@/img/watch.png'

const { gameState, updateGameState } = useGameState()

const timeInput = ref('')
const currentSegment = ref<ScriptSegment | null>(null)
const displayTime = ref<string>('')
const isProcessing = ref(false)
const needsSecondQuestion = computed(() => gameState.value.needsSecondQuestion)

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

