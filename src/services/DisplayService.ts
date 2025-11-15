import { stateStore } from '@/stores/StateStore'
import type { ComponentPublicInstance } from 'vue'

/**
 * 显示服务
 * 管理显示相关的逻辑
 */
export class DisplayService {
  /**
   * 设置 TypingText 组件的 ref
   */
  setTypingRef(el: ComponentPublicInstance | null, index: number): void {
    const displayState = stateStore._internalDisplayState
    if (el && typeof el === 'object' && 'startTyping' in el) {
      displayState.typingRefs.set(index, el)
    } else {
      displayState.typingRefs.delete(index)
    }
  }

  /**
   * 获取 TypingText 组件
   */
  getTypingComponent(index: number): ComponentPublicInstance | undefined {
    const displayState = stateStore._internalDisplayState
    return displayState.typingRefs.get(index)
  }

  /**
   * 跳过当前行的打字效果
   */
  skipCurrentLine(): void {
    const displayState = stateStore._internalDisplayState
    const typingComponent = displayState.typingRefs.get(displayState.currentLineIndex)
    if (typingComponent && typeof typingComponent.skipToEnd === 'function') {
      typingComponent.skipToEnd()
    }
  }

  /**
   * 显示下一行
   */
  showNextLine(): void {
    const displayState = stateStore._internalDisplayState
    if (displayState.displayedLines.length === 0) {
      return
    }

    if (displayState.currentLineIndex < displayState.displayedLines.length - 1) {
      const nextLineIndex = displayState.currentLineIndex + 1
      const nextLine = displayState.displayedLines[nextLineIndex]

      stateStore.updateDisplayState({
        currentLineIndex: nextLineIndex,
        pendingSideEffects: nextLine?.type === 'input' || nextLine?.type === 'timeChoice' || nextLine?.type === 'choice'
          ? [] // 输入行、时间选择行和选择行不自动启动打字效果
          : [{ type: 'startTyping', target: nextLineIndex, delay: 0 }]
      })
    }
  }

  /**
   * 移动到指定行
   */
  moveToLine(index: number): void {
    const displayState = stateStore._internalDisplayState
    if (index >= 0 && index < displayState.displayedLines.length) {
      const line = displayState.displayedLines[index]

      stateStore.updateDisplayState({
        currentLineIndex: index,
        pendingSideEffects: line?.type === 'input' || line?.type === 'timeChoice' || line?.type === 'choice'
          ? [] // 输入行、时间选择行和选择行不自动启动打字效果
          : [{ type: 'startTyping', target: index, delay: 0 }]
      })
    }
  }

  /**
   * 检查是否所有行都已完成显示
   */
  isAllLinesComplete(): boolean {
    const displayState = stateStore._internalDisplayState

    // 如果没有行，返回 false
    if (!displayState.displayedLines.length) {
      return false
    }

    // 开场片段不显示"回到开始"按钮
    if (displayState.currentSegment?.id === 'START') {
      return false
    }

    // 检查是否到达最后一行
    if (displayState.currentLineIndex < displayState.displayedLines.length - 1) {
      return false
    }

    // 检查最后一行是否已完成
    const lastLineIndex = displayState.displayedLines.length - 1
    const lastLine = displayState.displayedLines[lastLineIndex]

    // 如果最后一行是输入框、选择分支或时间匹配分支，不需要打字效果，视为已完成
    if (lastLine?.type === 'input' || lastLine?.type === 'choice' || lastLine?.type === 'timeChoice') {
      return true
    }

    // 如果有 TypingText 组件，检查是否已完成
    const typingComponent = displayState.typingRefs.get(lastLineIndex)
    if (typingComponent) {
      return typingComponent.isComplete === true && typingComponent.isTyping === false
    }

    // 如果没有 TypingText 组件，视为已完成
    return true
  }
}

// 单例
export const displayService = new DisplayService()

