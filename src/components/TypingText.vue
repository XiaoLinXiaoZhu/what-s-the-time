<template>
  <span>
    <template v-for="(node, index) in parsedNodes" :key="index">
      <template v-if="node.type === 'linebreak'">
        <br />
      </template>
      <template v-else-if="node.type === 'delay'">
        <!-- delay节点不渲染任何内容 -->
      </template>
      <template v-else-if="node.type === 'systemTime'">
        <span
          :class="{
            'text-red': false,
            'text-bold': false,
            'text-italic': false
          }"
        >{{ index === currentIndex ? systemTimeDisplay : systemTime }}<span
            v-if="
              isTyping &&
              index === currentIndex &&
              currentCharIndex < 5
            "
            class="typing-cursor"
          >▮</span></span>
      </template>
      <span
        v-else
        :class="{
          'text-red': node.type === 'red',
          'text-bold': node.type === 'bold',
          'text-italic': node.type === 'italic'
        }"
      >{{ displayTexts[index] || '' }}<span
          v-if="
            isTyping &&
            index === currentIndex &&
            currentCharIndex < node.content.length
          "
          class="typing-cursor"
        >▮</span></span>
    </template>
  </span>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { parseText } from '@/utils/textParser'

const props = defineProps<{
  text: string
  speed?: number // 每个字符的显示时间（毫秒）
  autoStart?: boolean // 是否自动开始
}>()

const emit = defineEmits<{
  complete: [] // 显示完成事件
}>()

const parsedNodes = computed(() => parseText(props.text))
const displayTexts = ref<string[]>([])
const currentIndex = ref(0)
const currentCharIndex = ref(0)
const isTyping = ref(false)
const isComplete = ref(false)
const typingTimer = ref<number | null>(null)
const systemTime = ref<string>('')
const systemTimeTimer = ref<number | null>(null)

/**
 * 获取当前系统时间（HH:MM格式）
 */
const getCurrentSystemTime = (): string => {
  const now = new Date()
  const hours = now.getHours().toString().padStart(2, '0')
  const minutes = now.getMinutes().toString().padStart(2, '0')
  return `${hours}:${minutes}`
}

/**
 * 更新系统时间显示
 */
const updateSystemTime = () => {
  systemTime.value = getCurrentSystemTime()
}

/**
 * 系统时间显示（用于打字效果）
 */
const systemTimeDisplay = computed(() => {
  // 检查当前节点是否是 systemTime 节点且正在显示
  const currentNode = parsedNodes.value[currentIndex.value]
  const isSystemTimeNode = currentNode?.type === 'systemTime'
  
  if (isSystemTimeNode && isTyping.value) {
    // 如果正在显示 systemTime 节点，根据 currentCharIndex 显示部分内容
    const displayLength = Math.min(currentCharIndex.value, 5) // HH:MM 是 5 个字符
    return systemTime.value.substring(0, displayLength)
  }
  
  // 非打字状态或已完成，显示完整时间
  return systemTime.value
})

// 默认速度：每个字符 30ms
const typingSpeed = computed(() => props.speed || 30)

// 开始显示
const startTyping = () => {
  if (isTyping.value || isComplete.value) return
  
  isTyping.value = true
  isComplete.value = false
  displayTexts.value = []
  currentIndex.value = 0
  currentCharIndex.value = 0
  
  // 初始化显示数组
  parsedNodes.value.forEach((node, index) => {
    if (node.type === 'linebreak') {
      displayTexts.value[index] = ''
    } else {
      displayTexts.value[index] = ''
    }
  })
  
  typeNextChar()
}

// 显示下一个字符
const typeNextChar = () => {
  // 跳过所有换行、delay 和 systemTime 节点（systemTime 需要特殊处理）
  while (
    currentIndex.value < parsedNodes.value.length &&
    (parsedNodes.value[currentIndex.value].type === 'linebreak' ||
     parsedNodes.value[currentIndex.value].type === 'delay')
  ) {
    const node = parsedNodes.value[currentIndex.value]
    if (node.type === 'linebreak') {
      displayTexts.value[currentIndex.value] = ''
    } else if (node.type === 'delay') {
      // delay 节点，应用延时后继续
      const delayTime = (node.delayTime || 0) * 1000 // 转换为毫秒
      currentIndex.value++
      currentCharIndex.value = 0
      typingTimer.value = window.setTimeout(() => {
        typeNextChar()
      }, delayTime)
      return
    }
    currentIndex.value++
    currentCharIndex.value = 0
  }
  
  if (currentIndex.value >= parsedNodes.value.length) {
    // 所有节点都显示完成
    isTyping.value = false
    isComplete.value = true
    emit('complete')
    return
  }
  
  const currentNode = parsedNodes.value[currentIndex.value]
  
  // 处理 systemTime 节点
  if (currentNode.type === 'systemTime') {
    // systemTime 节点：显示 5 个字符（HH:MM）
    if (currentCharIndex.value < 5) {
      currentCharIndex.value++
      typingTimer.value = window.setTimeout(() => {
        typeNextChar()
      }, typingSpeed.value)
    } else {
      // systemTime 节点显示完成，移动到下一个节点
      currentIndex.value++
      currentCharIndex.value = 0
      typeNextChar()
    }
    return
  }
  
  if (currentCharIndex.value < currentNode.content.length) {
    // 显示下一个字符
    const newText = currentNode.content.substring(0, currentCharIndex.value + 1)
    displayTexts.value[currentIndex.value] = newText
    const currentChar = currentNode.content[currentCharIndex.value]
    currentCharIndex.value++
    
    // 计算下一个字符的显示时间（根据字符类型调整）
    let delay = typingSpeed.value
    
    // 标点符号稍长停顿
    if (/[！？]/.test(currentChar)) {
      delay = typingSpeed.value * 4
    } else if (/[。]/.test(currentChar)) {
      delay = typingSpeed.value * 3
    } else if (/[，、；：]/.test(currentChar)) {
      delay = typingSpeed.value * 2
    }
    
    typingTimer.value = window.setTimeout(() => {
      typeNextChar()
    }, delay)
  } else {
    // 当前节点显示完成，移动到下一个
    currentIndex.value++
    currentCharIndex.value = 0
    
    // 根据上一行的长度计算延迟（但不超过 500ms）
    if (currentIndex.value > 0) {
      const prevNode = parsedNodes.value[currentIndex.value - 1]
      if (prevNode && prevNode.type !== 'linebreak') {
        const prevLength = prevNode.content.length
        const delay = Math.min(prevLength * 10, 500) // 最多延迟 500ms
        
        typingTimer.value = window.setTimeout(() => {
          typeNextChar()
        }, delay)
      } else {
        // 如果上一行是换行，立即继续
        typeNextChar()
      }
    } else {
      typeNextChar()
    }
  }
}

// 快速显示完当前行
const skipToEnd = () => {
  if (!isTyping.value) return
  
  if (typingTimer.value) {
    clearTimeout(typingTimer.value)
    typingTimer.value = null
  }
  
  // 立即显示所有剩余文本（跳过 delay 节点，systemTime 节点会自动显示）
  parsedNodes.value.forEach((node, index) => {
    if (node.type !== 'linebreak' && node.type !== 'delay' && node.type !== 'systemTime') {
      displayTexts.value[index] = node.content
    }
  })
  
  // 对于 systemTime 节点，确保显示完整
  parsedNodes.value.forEach((node, index) => {
    if (node.type === 'systemTime') {
      currentCharIndex.value = 5 // 确保显示完整
    }
  })
  
  isTyping.value = false
  isComplete.value = true
  emit('complete')
}

// 监听文本变化，重置状态
watch(() => props.text, () => {
  if (typingTimer.value) {
    clearTimeout(typingTimer.value)
    typingTimer.value = null
  }
  isTyping.value = false
  isComplete.value = false
  displayTexts.value = []
  currentIndex.value = 0
  currentCharIndex.value = 0
  
  if (props.autoStart !== false) {
    // 延迟一下再开始，确保 DOM 更新完成
    setTimeout(() => {
      startTyping()
    }, 50)
  }
}, { immediate: true })

onMounted(() => {
  // 初始化系统时间
  updateSystemTime()
  
  // 设置定时器，每分钟更新一次系统时间（在分钟变化时更新）
  const updateTimer = () => {
    updateSystemTime()
    // 计算到下一分钟的毫秒数
    const now = new Date()
    const msUntilNextMinute = 60000 - (now.getSeconds() * 1000 + now.getMilliseconds())
    systemTimeTimer.value = window.setTimeout(() => {
      updateSystemTime()
      // 之后每分钟更新一次
      systemTimeTimer.value = window.setInterval(updateSystemTime, 60000)
    }, msUntilNextMinute)
  }
  updateTimer()
  
  if (props.autoStart !== false) {
    startTyping()
  }
})

onUnmounted(() => {
  if (typingTimer.value) {
    clearTimeout(typingTimer.value)
  }
  if (systemTimeTimer.value) {
    clearTimeout(systemTimeTimer.value)
    clearInterval(systemTimeTimer.value)
  }
})

// 暴露方法供父组件调用
defineExpose({
  startTyping,
  skipToEnd,
  isTyping,
  isComplete
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

.typing-cursor {
  animation: blink 0.5s infinite;
  color: inherit;
}

@keyframes blink {
  0%, 50% {
    opacity: 1;
  }
  51%, 100% {
    opacity: 0.5;
  }
}
</style>

