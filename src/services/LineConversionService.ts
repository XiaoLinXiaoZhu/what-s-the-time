import { stateStore } from '@/stores/StateStore'
import type { DisplayedLine, TimeDisplayLine, LineStatus } from '@/types'

/**
 * 行转换服务
 * 统一处理交互行到显示行的转换逻辑
 * 解决系统性问题：不同类型的交互行在完成后应该有一致的转换行为
 */
export class LineConversionService {
  /**
   * 将 input 行转换为 timeDisplay 行
   */
  convertInputToTimeDisplay(lineIndex: number, time: string): void {
    console.log('[LineConversionService] convertInputToTimeDisplay called', {
      lineIndex,
      time,
      timestamp: new Date().toISOString()
    })

    const displayState = stateStore._internalDisplayState
    const line = displayState.displayedLines[lineIndex]

    console.log('[LineConversionService] Current input line:', {
      found: !!line,
      lineType: line?.type,
      lineId: line?.id,
      lineStatus: line?.status,
      lineIndex,
      totalLines: displayState.displayedLines.length
    })

    if (line?.type === 'input') {
      // 创建新的 timeDisplay 行
      const timeDisplayLine: DisplayedLine & TimeDisplayLine = {
        ...line,
        type: 'timeDisplay',
        value: time,
        id: line.id, // 保持相同的 ID，维持位置
        status: 'completed' as LineStatus // 标记为已完成（输入已完成）
      }

      console.log('[LineConversionService] Created timeDisplayLine from input:', {
        id: timeDisplayLine.id,
        type: timeDisplayLine.type,
        value: timeDisplayLine.value,
        status: timeDisplayLine.status
      })

      // 更新显示状态
      const displayedLines = [...displayState.displayedLines]
      displayedLines[lineIndex] = timeDisplayLine

      console.log('[LineConversionService] Updating display state (input->timeDisplay)', {
        beforeType: displayState.displayedLines[lineIndex]?.type,
        afterType: displayedLines[lineIndex]?.type,
        beforeStatus: displayState.displayedLines[lineIndex]?.status,
        afterStatus: displayedLines[lineIndex]?.status
      })

      stateStore.updateDisplayState({ displayedLines })

      console.log('[LineConversionService] Display state updated (input->timeDisplay), verifying:', {
        updatedType: stateStore._internalDisplayState.displayedLines[lineIndex]?.type,
        updatedValue: (stateStore._internalDisplayState.displayedLines[lineIndex] as any)?.value,
        updatedStatus: stateStore._internalDisplayState.displayedLines[lineIndex]?.status
      })
    } else {
      console.log('[LineConversionService] Line is not input, skipping conversion', {
        lineType: line?.type
      })
    }
  }

  /**
   * 将 timeChoice 行转换为 timeDisplay 行
   * 解决系统性问题：timeChoice 完成后应该显示输入的时间，而不是消失
   */
  convertTimeChoiceToTimeDisplay(lineIndex: number, time: string): void {
    console.log('[LineConversionService] convertTimeChoiceToTimeDisplay called', {
      lineIndex,
      time,
      timestamp: new Date().toISOString()
    })

    const displayState = stateStore._internalDisplayState
    const line = displayState.displayedLines[lineIndex]

    console.log('[LineConversionService] Current line:', {
      found: !!line,
      lineType: line?.type,
      lineId: line?.id,
      lineIndex,
      totalLines: displayState.displayedLines.length
    })

    if (line?.type === 'timeChoice') {
      // 创建新的 timeDisplay 行
      const timeDisplayLine: DisplayedLine & TimeDisplayLine = {
        ...line,
        type: 'timeDisplay',
        value: time,
        id: line.id, // 保持相同的 ID，维持位置
        status: 'completed' as LineStatus // 标记为已完成
      }

      console.log('[LineConversionService] Created timeDisplayLine:', {
        id: timeDisplayLine.id,
        type: timeDisplayLine.type,
        value: timeDisplayLine.value,
        status: timeDisplayLine.status
      })

      // 更新显示状态 - 创建新数组以确保响应式更新
      const displayedLines = [...displayState.displayedLines]
      displayedLines[lineIndex] = timeDisplayLine

      console.log('[LineConversionService] Updating display state', {
        beforeType: displayState.displayedLines[lineIndex]?.type,
        afterType: displayedLines[lineIndex]?.type,
        arrayLength: displayedLines.length
      })

      stateStore.updateDisplayState({ displayedLines })

      console.log('[LineConversionService] Display state updated, verifying:', {
        updatedType: stateStore._internalDisplayState.displayedLines[lineIndex]?.type,
        updatedValue: (stateStore._internalDisplayState.displayedLines[lineIndex] as any)?.value
      })
    } else {
      console.log('[LineConversionService] Line is not timeChoice, skipping conversion', {
        lineType: line?.type
      })
    }
  }
}

// 单例
export const lineConversionService = new LineConversionService()

