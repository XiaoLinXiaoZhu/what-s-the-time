import { ref, type Ref } from 'vue'
import { findSegment, startSegment } from '@/data/script'
import type { ScriptSegment, ScriptLine, ChoiceLine } from '@/types'
import { useGameState } from './useGameState'

export interface UseGameNavigationOptions {
  insertLines: (index: number, lines: ScriptLine[]) => void
  moveToLine: (index: number) => void
  displayedLines: { value: ScriptLine[] }
}

/**
 * 游戏导航逻辑 Composable
 * 处理片段切换、选择分支、时间匹配等导航逻辑
 */
export function useGameNavigation(options: UseGameNavigationOptions) {
  const { insertLines, moveToLine, displayedLines } = options
  const { gameState } = useGameState()

  // 状态
  const currentSegment = ref<ScriptSegment | null>(null)
  const displayTime = ref<string>('')

  /**
   * 处理时间输入（用于普通输入框）
   */
  const handleTimeInput = (time: string) => {
    // 查找匹配的片段
    const segment = findSegment(time, gameState.value.unlockedFlags, gameState.value.viewedSegments)

    if (segment) {
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

  /**
   * 处理选择分支
   */
  const handleChoice = (
    choice: ChoiceLine['choices'][0],
    lineIndex: number
  ) => {
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
    insertLines(lineIndex, [choiceLine, ...choice.lines])

    // 移动到下一行
    moveToLine(lineIndex + 1)
  }

  /**
   * 处理时间匹配分支
   */
  const handleTimeChoice = (time: string, lineIndex: number) => {
    const line = displayedLines.value[lineIndex]
    if (line?.type !== 'timeChoice') return

    // 查找匹配的时间选项
    let matchedChoice = null
    for (const choice of line.choices) {
      if (choice.time === '*' || choice.time === time) {
        matchedChoice = choice
        break
      }
    }

    if (matchedChoice) {
      // 设置 flag
      if (matchedChoice.setFlag) {
        gameState.value.unlockedFlags.add(matchedChoice.setFlag)
      }

      // 记录选择历史
      gameState.value.choiceHistory.push({
        choiceText: `时间: ${time}`,
        timestamp: Date.now()
      })

      // 显示匹配的时间（作为对话）
      const timeLine: ScriptLine = {
        type: 'dialogue',
        text: `{italic}时间：{/italic} ${time}`
      }

      // 在当前行之后插入时间显示和后续内容
      insertLines(lineIndex, [timeLine, ...matchedChoice.lines])

      // 移动到下一行
      moveToLine(lineIndex + 1)
    }
  }

  /**
   * 回到开始
   */
  const backToStart = () => {
    currentSegment.value = startSegment
    displayTime.value = ''
  }

  /**
   * 初始化
   */
  const init = () => {
    currentSegment.value = startSegment
  }

  return {
    currentSegment,
    displayTime,
    handleTimeInput,
    handleChoice,
    handleTimeChoice,
    backToStart,
    init
  }
}

