import { ref, computed, watch, nextTick, type Ref } from 'vue'
import type { ScriptSegment, ScriptLine } from '@/types'
import type { ComponentPublicInstance } from 'vue'

export interface UseScriptDisplayOptions {
  currentSegment?: Ref<ScriptSegment | null>
  onLineComplete?: () => void
}

/**
 * 行显示状态管理 Composable
 * 管理剧本行的显示进度和状态
 */
export function useScriptDisplay(options: UseScriptDisplayOptions) {
  const { currentSegment } = options

  // 状态
  const currentLineIndex = ref(0)
  const displayedLines = ref<ScriptLine[]>([])
  const typingRefs = ref<Map<number, ComponentPublicInstance>>(new Map())

  // 暴露 displayedLines 以便外部访问和修改
  const setDisplayedLines = (lines: ScriptLine[]) => {
    displayedLines.value = lines
  }

  /**
   * 检查是否所有行都已完成显示
   */
  const isAllLinesComplete = computed(() => {
    // 如果没有行，返回 false
    if (!displayedLines.value.length) {
      return false
    }
    
    // 开场片段不显示"回到开始"按钮
    if (currentSegment?.value?.id === 'START') {
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

  /**
   * 设置 TypingText 组件的 ref
   */
  const setTypingRef = (el: any, index: number) => {
    if (el && typeof el === 'object' && 'startTyping' in el) {
      typingRefs.value.set(index, el)
    }
  }

  /**
   * 获取 TypingText 组件
   */
  const getTypingComponent = (index: number) => {
    return typingRefs.value.get(index) as any
  }

  /**
   * 跳过当前行的打字效果
   */
  const skipCurrentLine = () => {
    const typingComponent = getTypingComponent(currentLineIndex.value)
    if (typingComponent && typeof typingComponent.skipToEnd === 'function') {
      typingComponent.skipToEnd()
    }
  }

  /**
   * 显示下一行
   */
  const showNextLine = () => {
    if (displayedLines.value.length === 0) return

    if (currentLineIndex.value < displayedLines.value.length - 1) {
      currentLineIndex.value++

      const nextLine = displayedLines.value[currentLineIndex.value]

      // 等待 DOM 更新后处理
      nextTick(() => {
        // 如果下一行需要输入，不自动启动打字效果
        if (nextLine?.type === 'input' || nextLine?.type === 'timeChoice') {
          // 由具体组件处理聚焦
          return
        }

        // 否则启动打字效果
        const typingComponent = getTypingComponent(currentLineIndex.value)
        if (typingComponent && typeof typingComponent.startTyping === 'function') {
          typingComponent.startTyping()
        }
      })
    }
  }

  /**
   * 在当前行之后插入新行
   */
  const insertLines = (index: number, lines: ScriptLine[]) => {
    displayedLines.value.splice(index + 1, 0, ...lines)
  }

  /**
   * 移动到指定行
   */
  const moveToLine = (index: number) => {
    currentLineIndex.value = index

    // 等待 DOM 更新后启动打字效果
    nextTick(() => {
      const typingComponent = getTypingComponent(currentLineIndex.value)
      if (typingComponent && typeof typingComponent.startTyping === 'function') {
        typingComponent.startTyping()
      }
    })
  }


  // 监听片段变化，重置显示状态
  if (currentSegment) {
    watch(
      currentSegment,
      (newSegment) => {
        if (newSegment) {
          displayedLines.value = [...newSegment.lines] // 使用展开运算符创建新数组，避免引用问题
          currentLineIndex.value = 0
          typingRefs.value.clear()

          // 等待 DOM 更新后启动第一行的打字效果
          nextTick(() => {
            const typingComponent = getTypingComponent(0)
            if (typingComponent && typeof typingComponent.startTyping === 'function') {
              typingComponent.startTyping()
            }
          })
        }
      },
      { immediate: true }
    )
  }

  return {
    currentLineIndex,
    displayedLines,
    typingRefs,
    isAllLinesComplete,
    setTypingRef,
    getTypingComponent,
    skipCurrentLine,
    showNextLine,
    insertLines,
    moveToLine,
    setDisplayedLines
  }
}

