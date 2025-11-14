import { ref, onUnmounted } from 'vue'
import type { TextNode } from '@/types'

/**
 * 动画文本切换间隔（毫秒）
 */
const ANIMATE_INTERVAL = 100

/**
 * 动画文本管理 Composable
 * 用于管理 animateText 节点的文本切换动画
 */
export function useAnimateText() {
  // 每个节点的动画索引（用于普通显示模式）
  const animateTextIndices = ref<Map<number, number>>(new Map())
  // 每个节点的定时器
  const animateTextIntervals = ref<Map<number, number>>(new Map())
  // 每个节点在打字时使用的文本索引（打字完成后会继续切换）
  const animateTextTypingIndices = ref<Map<number, number>>(new Map())

  /**
   * 获取指定节点的当前显示文本（普通模式）
   */
  const getAnimateText = (node: TextNode, nodeIndex: number): string => {
    if (node.type !== 'animateText' || !node.animateTexts || node.animateTexts.length === 0) {
      return node.content
    }
    
    const currentIndex = animateTextIndices.value.get(nodeIndex) ?? 0
    return node.animateTexts[currentIndex] || node.animateTexts[0]
  }

  /**
   * 获取指定节点在打字时使用的文本内容
   */
  const getAnimateTextContent = (
    node: TextNode,
    nodeIndex: number,
    isTyping: boolean,
    isCurrentNode: boolean
  ): string => {
    if (node.type !== 'animateText' || !node.animateTexts || node.animateTexts.length === 0) {
      return node.content
    }
    
    // 如果正在打字，使用固定的文本索引（打字时不会切换）
    if (isTyping && isCurrentNode) {
      const typingIndex = animateTextTypingIndices.value.get(nodeIndex) ?? 0
      return node.animateTexts[typingIndex] || node.animateTexts[0]
    }
    
    // 打字完成后，使用动态索引
    const animateIndex = animateTextIndices.value.get(nodeIndex) ?? 0
    return node.animateTexts[animateIndex] || node.animateTexts[0]
  }

  /**
   * 获取指定节点的显示内容（打字模式）
   */
  const getAnimateTextDisplay = (
    node: TextNode,
    nodeIndex: number,
    displayText: string,
    isTyping: boolean,
    isCurrentNode: boolean,
    isCompleted: boolean
  ): string => {
    if (node.type !== 'animateText' || !node.animateTexts || node.animateTexts.length === 0) {
      return displayText
    }
    
    // 如果节点还没有被打字到，不显示任何内容
    if (!isCompleted && !isCurrentNode) {
      return ''
    }
    
    // 如果正在打字且是当前节点，显示部分内容
    if (isTyping && isCurrentNode) {
      return displayText
    }
    
    // 打字完成后，显示完整的动态文本
    const animateIndex = animateTextIndices.value.get(nodeIndex) ?? 0
    return node.animateTexts[animateIndex] || node.animateTexts[0]
  }

  /**
   * 启动指定节点的动画定时器
   */
  const startAnimation = (node: TextNode, nodeIndex: number) => {
    if (node.type !== 'animateText' || !node.animateTexts || node.animateTexts.length <= 1) {
      return
    }
    
    // 如果已经有定时器，先清除
    const existingInterval = animateTextIntervals.value.get(nodeIndex)
    if (existingInterval) {
      clearInterval(existingInterval)
    }
    
    // 初始化索引
    if (!animateTextIndices.value.has(nodeIndex)) {
      animateTextIndices.value.set(nodeIndex, 0)
    }
    
    // 创建新的定时器，每0.5秒切换一次
    const interval = setInterval(() => {
      const currentIndex = animateTextIndices.value.get(nodeIndex) ?? 0
      const nextIndex = (currentIndex + 1) % node.animateTexts!.length
      animateTextIndices.value.set(nodeIndex, nextIndex)
    }, ANIMATE_INTERVAL)
    
    animateTextIntervals.value.set(nodeIndex, interval as unknown as number)
  }

  /**
   * 停止指定节点的动画
   */
  const stopAnimation = (nodeIndex: number) => {
    const interval = animateTextIntervals.value.get(nodeIndex)
    if (interval) {
      clearInterval(interval)
      animateTextIntervals.value.delete(nodeIndex)
    }
  }

  /**
   * 初始化打字时使用的文本索引
   */
  const initTypingIndex = (nodeIndex: number, textIndex: number = 0) => {
    if (!animateTextTypingIndices.value.has(nodeIndex)) {
      animateTextTypingIndices.value.set(nodeIndex, textIndex)
    }
  }

  /**
   * 完成打字，将打字索引同步到动画索引并启动动画
   */
  const completeTyping = (node: TextNode, nodeIndex: number) => {
    const typingIndex = animateTextTypingIndices.value.get(nodeIndex) ?? 0
    animateTextIndices.value.set(nodeIndex, typingIndex)
    startAnimation(node, nodeIndex)
  }

  /**
   * 快速完成：设置显示文本并启动动画
   */
  const skipToComplete = (node: TextNode, nodeIndex: number) => {
    if (node.type !== 'animateText' || !node.animateTexts || node.animateTexts.length === 0) {
      return node.content
    }
    
    // 初始化索引并启动动画
    animateTextIndices.value.set(nodeIndex, 0)
    animateTextTypingIndices.value.set(nodeIndex, 0)
    startAnimation(node, nodeIndex)
    
    return node.animateTexts[0]
  }

  /**
   * 清理所有定时器和状态
   */
  const cleanup = () => {
    animateTextIntervals.value.forEach((interval) => {
      clearInterval(interval)
    })
    animateTextIntervals.value.clear()
    animateTextIndices.value.clear()
    animateTextTypingIndices.value.clear()
  }

  // 组件卸载时清理
  onUnmounted(() => {
    cleanup()
  })

  return {
    // 普通模式
    getAnimateText,
    startAnimation,
    stopAnimation,
    cleanup,
    
    // 打字模式
    getAnimateTextContent,
    getAnimateTextDisplay,
    initTypingIndex,
    completeTyping,
    skipToComplete,
    
    // 状态（用于调试）
    animateTextIndices,
    animateTextTypingIndices
  }
}

