import { stateStore } from '@/stores/StateStore'
import { useSystemTime } from '@/composables/useSystemTime'
import { lineConversionService } from './LineConversionService'
import type { DisplayedLine, LineStatus, ScriptLine } from '@/types'

/**
 * 时间选择服务
 * 处理时间匹配分支的逻辑
 */
export class TimeChoiceService {
  /**
   * 处理时间匹配
   * @param time 输入的时间
   * @param lineId timeChoice 行的 ID
   * @param inputLineId 输入行的 ID（如果存在，表示 timeChoice 前面有 input 行，此时应该移除 timeChoice 而不是转换）
   */
  handleTimeChoice(time: string, lineId: string, inputLineId?: string): void {
    console.log('[TimeChoiceService] handleTimeChoice called', {
      time,
      lineId,
      inputLineId,
      timestamp: new Date().toISOString()
    })

    const displayState = stateStore._internalDisplayState
    const line = displayState.displayedLines.find(l => l.id === lineId)

    console.log('[TimeChoiceService] Found line:', {
      found: !!line,
      lineType: line?.type,
      lineId: line?.id,
      lineIndex: displayState.displayedLines.findIndex(l => l.id === lineId)
    })

    if (!line || line.type !== 'timeChoice') {
      console.log('[TimeChoiceService] Early return: line not found or wrong type')
      return
    }

    // 检查是否已完成
    const status = stateStore._internalLineStates.get(lineId)
    if (status === 'completed' || status === 'disabled') {
      return
    }

    // 获取当前系统时间
    const { getCurrentSystemTime } = useSystemTime()
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

    if (!matchedChoice) {
      return
    }

    // 更新行状态
    stateStore.updateLineState(lineId, 'completed')

    // 设置 flag
    if (matchedChoice.setFlag) {
      const flags = new Set(stateStore._internalGameState.unlockedFlags)
      flags.add(matchedChoice.setFlag)
      stateStore.updateGameState({ unlockedFlags: flags })
    }

    // 记录选择历史
    const choiceHistory = [...stateStore._internalGameState.choiceHistory]
    choiceHistory.push({
      choiceText: `时间: ${time}`,
      timestamp: Date.now()
    })
    stateStore.updateGameState({ choiceHistory })

    // 判断处理方式：
    // 1. 如果前面有 input 行，则移除 timeChoice（因为 input 已经转换为 timeDisplay 了）
    // 2. 如果前面没有 input 行，则将 timeChoice 转换为 timeDisplay
    const lineIndex = displayState.displayedLines.findIndex(l => l.id === lineId)
    console.log('[TimeChoiceService] Processing conversion', {
      lineIndex,
      hasInputLine: inputLineId !== undefined,
      inputLineId,
      displayedLinesCount: displayState.displayedLines.length
    })

    if (lineIndex === -1) {
      console.log('[TimeChoiceService] Early return: lineIndex is -1')
      return
    }

    const hasInputLine = inputLineId !== undefined
    let displayedLines: DisplayedLine[]
    let insertIndex: number

    if (hasInputLine) {
      // 情况1：前面有 input 行，移除 timeChoice 行（input 已经转换为 timeDisplay）
      console.log('[TimeChoiceService] Case 1: Has input line, removing timeChoice')
      
      // 先找到 input 行（已经转换为 timeDisplay）的位置
      const inputLineIndex = displayState.displayedLines.findIndex(l => l.id === inputLineId)
      console.log('[TimeChoiceService] Input line (timeDisplay) index:', inputLineIndex)
      
      // 移除 timeChoice 行
      displayedLines = displayState.displayedLines.filter(l => l.id !== lineId)
      
      // 插入位置：在 input 行（timeDisplay）之后
      // 因为移除了 timeChoice，如果 timeChoice 在 input 之后，insertIndex 应该是 inputLineIndex + 1
      // 如果 timeChoice 在 input 之前，insertIndex 应该是 inputLineIndex + 1（因为移除了 timeChoice）
      insertIndex = inputLineIndex + 1
      console.log('[TimeChoiceService] Removed timeChoice, insertIndex after input line:', insertIndex)
    } else {
      // 情况2：独立的 timeChoice 行，转换为 timeDisplay
      console.log('[TimeChoiceService] Case 2: Standalone timeChoice, converting to timeDisplay')
      console.log('[TimeChoiceService] Before conversion:', {
        lineIndex,
        lineType: displayState.displayedLines[lineIndex]?.type,
        lineId: displayState.displayedLines[lineIndex]?.id
      })
      
      // 执行转换
      lineConversionService.convertTimeChoiceToTimeDisplay(lineIndex, time)
      
      // 重新获取更新后的状态
      const updatedDisplayState = stateStore._internalDisplayState
      displayedLines = [...updatedDisplayState.displayedLines] // 创建新数组以确保响应式更新
      
      console.log('[TimeChoiceService] After conversion:', {
        lineIndex,
        lineType: displayedLines[lineIndex]?.type,
        lineId: displayedLines[lineIndex]?.id,
        value: (displayedLines[lineIndex] as any)?.value,
        displayedLinesCount: displayedLines.length
      })
      
      insertIndex = lineIndex + 1
      console.log('[TimeChoiceService] Converted to timeDisplay, insertIndex:', insertIndex)
    }

    // 插入后续内容
    const newLines = this._createDisplayedLines(matchedChoice.lines, insertIndex)
    displayedLines.splice(insertIndex, 0, ...newLines)

    console.log('[TimeChoiceService] After inserting new lines:', {
      displayedLinesCount: displayedLines.length,
      insertIndex,
      newLinesCount: newLines.length,
      lineAtInsertIndex: displayedLines[insertIndex]?.type,
      lineBeforeInsert: displayedLines[insertIndex - 1]?.type,
      lineAfterInsert: displayedLines[insertIndex + newLines.length]?.type
    })

    // 初始化新行的状态
    const lineStates = new Map<string, LineStatus>()
    newLines.forEach(line => {
      lineStates.set(line.id, 'pending')
    })
    stateStore.updateLineStates(lineStates)

    // 更新显示状态
    console.log('[TimeChoiceService] Updating display state with:', {
      displayedLinesCount: displayedLines.length,
      currentLineIndex: insertIndex,
      firstFewLines: displayedLines.slice(0, Math.min(5, displayedLines.length)).map(l => ({
        id: l.id,
        type: l.type,
        value: (l as any).value
      }))
    })

    stateStore.updateDisplayState({
      displayedLines,
      currentLineIndex: insertIndex,
      pendingSideEffects: [
        { type: 'startTyping', target: insertIndex, delay: 0 }
      ]
    })

    console.log('[TimeChoiceService] Display state updated, final state:', {
      displayedLinesCount: stateStore._internalDisplayState.displayedLines.length,
      currentLineIndex: stateStore._internalDisplayState.currentLineIndex
    })
  }

  /**
   * 创建 DisplayedLine 数组（用于插入的行）
   */
  private _createDisplayedLines(lines: ScriptLine[], baseIndex: number): DisplayedLine[] {
    return lines.map((line, index) => ({
      ...line,
      id: `inserted-${baseIndex}-${index}`,
      status: 'pending' as LineStatus
    }))
  }
}

// 单例
export const timeChoiceService = new TimeChoiceService()

