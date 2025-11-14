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
        {{ displayTexts[index] || '' }}
      </span>
    </template>
  </span>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { parseText } from '@/utils/textParser'
import type { TextNode } from '@/types'

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

// 默认速度：每个字符 30ms
const typingSpeed = computed(() => props.speed || 30)

// 计算总字符数（不包括格式标记）
const totalChars = computed(() => {
  return parsedNodes.value
    .filter(node => node.type !== 'linebreak')
    .reduce((sum, node) => sum + node.content.length, 0)
})

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
  // 跳过所有换行节点，找到下一个文本节点
  while (
    currentIndex.value < parsedNodes.value.length &&
    parsedNodes.value[currentIndex.value].type === 'linebreak'
  ) {
    displayTexts.value[currentIndex.value] = ''
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
  
  // 立即显示所有剩余文本
  parsedNodes.value.forEach((node, index) => {
    if (node.type !== 'linebreak') {
      displayTexts.value[index] = node.content
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
  if (props.autoStart !== false) {
    startTyping()
  }
})

onUnmounted(() => {
  if (typingTimer.value) {
    clearTimeout(typingTimer.value)
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
  color: #ff4444;
}

.text-bold {
  font-weight: bold;
}

.text-italic {
  font-style: italic;
}
</style>

