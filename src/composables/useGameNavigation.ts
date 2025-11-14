import { ref } from 'vue'
import { findSegment, findSegmentById, getStartSegment } from '@/data/script'
import type { ScriptSegment, ScriptLine, ChoiceLine, CommandLine } from '@/types'
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
    const line = displayedLines.value[lineIndex]
    if (line?.type !== 'choice') return

    // 检查是否已经选择过（防止重复选择）
    if ((line as any).status === 'completed' || (line as any).status === 'disabled') {
      return
    }

    // 标记行为已完成，防止重复选择
    ;(line as any).status = 'completed'

    // 设置 flag
    if (choice.setFlag) {
      gameState.value.unlockedFlags.add(choice.setFlag)
    }

    // 记录选择历史
    gameState.value.choiceHistory.push({
      choiceText: choice.text,
      timestamp: Date.now()
    })

    // 直接插入选择的后续内容（不再显示"你选择了"的提示文本）
    insertLines(lineIndex, choice.lines)

    // 移动到下一行
    moveToLine(lineIndex + 1)
  }

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
   * 将 input 行转换为 timeDisplay 行（显示输入的值）
   */
  const convertInputToTimeDisplay = (lineIndex: number, time: string) => {
    const line = displayedLines.value[lineIndex]
    if (line?.type === 'input') {
      // 将 input 行替换为 timeDisplay 行，显示输入的时间
      displayedLines.value[lineIndex] = {
        type: 'timeDisplay',
        value: time
      }
    }
  }

  /**
   * 处理时间匹配分支
   */
  const handleTimeChoice = (time: string, lineIndex: number) => {
    const line = displayedLines.value[lineIndex]
    if (line?.type !== 'timeChoice') return

    // 检查是否已经选择过（防止重复选择）
    if ((line as any).status === 'completed' || (line as any).status === 'disabled') {
      return
    }

    // 获取当前系统时间
    const systemTime = getCurrentSystemTime()

    // 查找匹配的时间选项
    let matchedChoice = null
    for (const choice of line.choices) {
      if (choice.time === '*') {
        // 通配符匹配
        matchedChoice = choice
        break
      } else if (choice.time === 'NOW') {
        // 特殊值 NOW：匹配当前系统时间
        if (time === systemTime) {
          matchedChoice = choice
          break
        }
      } else if (choice.time === time) {
        // 精确匹配
        matchedChoice = choice
        break
      }
    }

    if (matchedChoice) {
      // 标记行为已完成，防止重复选择
      ;(line as any).status = 'completed'

      // 设置 flag
      if (matchedChoice.setFlag) {
        gameState.value.unlockedFlags.add(matchedChoice.setFlag)
      }

      // 记录选择历史
      gameState.value.choiceHistory.push({
        choiceText: `时间: ${time}`,
        timestamp: Date.now()
      })

      // timeChoice 行是匹配逻辑行，匹配完成后应该被移除
      // 只有用户实际输入的 input 行才显示为 timeDisplay
      // input 行已经在 handleInputComplete 中转换为 timeDisplay 了
      
      // 移除 timeChoice 行（它是逻辑控制行，不需要显示）
      displayedLines.value.splice(lineIndex, 1)

      // 插入后续内容
      const insertIndex = lineIndex
      insertLines(insertIndex, matchedChoice.lines)

      // 移动到下一行（插入后的第一行）
      moveToLine(insertIndex + 1)
    }
  }

  /**
   * 处理命令
   */
  const handleCommand = (command: CommandLine, lineIndex: number) => {
    const { command: cmd, params } = command

    switch (cmd) {
      case 'setFlag': {
        const flag = params.flag as string
        if (flag) {
          gameState.value.unlockedFlags.add(flag)
        }
        break
      }

      case 'unsetFlag': {
        const flag = params.flag as string
        if (flag) {
          gameState.value.unlockedFlags.delete(flag)
        }
        break
      }

      case 'jump': {
        // 支持通过 segmentId 或 time 跳转
        const segmentId = params.segmentId as string | undefined
        const time = params.time as string | undefined

        if (segmentId) {
          // 根据 segmentId 查找片段
          const segment = findSegmentById(segmentId)
          if (segment) {
            currentSegment.value = segment
            displayTime.value = segment.time === 'START' ? '' : segment.time
            gameState.value.viewedSegments.add(segment.id)
            
            // 重置显示的行，切换到新片段
            // 注意：这里需要外部调用 setDisplayedLines 来更新显示
            // 但为了保持接口简洁，我们只更新 currentSegment
            // 实际的显示更新应该在 GameView 中处理
          }
        } else if (time) {
          // 根据时间查找片段
          const segment = findSegment(time, gameState.value.unlockedFlags, gameState.value.viewedSegments)
          if (segment) {
            currentSegment.value = segment
            displayTime.value = time
            gameState.value.viewedSegments.add(segment.id)
          }
        }
        break
      }

      case 'end': {
        // 结束游戏：可以显示结束信息或重置游戏
        const message = params.message as string | undefined
        
        // 可以插入结束对话
        if (message) {
          const endLine: ScriptLine = {
            type: 'dialogue',
            text: message
          }
          insertLines(lineIndex, [endLine])
        }
        
        // 如果需要重置游戏，可以调用 resetGame
        // const { resetGame } = useGameState()
        // resetGame()
        break
      }

      default:
        console.warn(`未知命令: ${cmd}`)
    }
  }

  /**
   * 回到开始
   */
  const backToStart = () => {
    currentSegment.value = getStartSegment(gameState.value.currentLoop)
    displayTime.value = ''
  }

  /**
   * 初始化
   */
  const init = () => {
    currentSegment.value = getStartSegment(gameState.value.currentLoop)
  }

  return {
    currentSegment,
    displayTime,
    handleTimeInput,
    handleChoice,
    handleTimeChoice,
    handleCommand,
    convertInputToTimeDisplay,
    backToStart,
    init
  }
}

