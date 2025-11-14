import { stateStore } from '@/stores/StateStore'
import { findSegmentById, findSegment, getStartSegment } from '@/data/script'
import type { ScriptSegment, DisplayedLine, LineStatus } from '@/types'

/**
 * 导航服务
 * 处理片段切换和导航逻辑
 */
export class NavigationService {
  /**
   * 导航到指定片段
   */
  navigateToSegment(segmentId: string): void {
    const segment = findSegmentById(segmentId)
    if (!segment) {
      console.warn(`Segment not found: ${segmentId}`)
      return
    }

    this._navigateToSegment(segment)
  }

  /**
   * 导航到指定时间对应的片段
   */
  navigateToTime(time: string): void {
    const gameState = stateStore._internalGameState
    const segment = findSegment(
      time,
      gameState.unlockedFlags,
      gameState.viewedSegments
    )

    if (segment) {
      gameState.viewedSegments.add(segment.id)
      this._navigateToSegment(segment)
      stateStore.updateGameState({ currentTime: time })
    } else {
      // 未找到片段，显示空白
      const blankSegment = findSegment('*')
      if (blankSegment) {
        this._navigateToSegment(blankSegment)
        stateStore.updateGameState({ currentTime: time })
      }
    }
  }

  /**
   * 导航到开始片段
   */
  navigateToStart(): void {
    const gameState = stateStore._internalGameState
    const segment = getStartSegment(gameState.currentLoop)
    this._navigateToSegment(segment)
  }

  /**
   * 内部方法：导航到片段
   */
  private _navigateToSegment(segment: ScriptSegment): void {
    // 先清除该片段相关的行状态（重置状态）
    this._clearSegmentLineStates(segment)

    // 创建 DisplayedLine 数组（现在会使用重置后的状态）
    const displayedLines = this._createDisplayedLines(segment)

    // 初始化行状态（所有行默认为 pending）
    const lineStates = new Map<string, LineStatus>()
    displayedLines.forEach(line => {
      lineStates.set(line.id, 'pending')
    })

    // 更新状态
    stateStore.batchUpdate({
      displayState: {
        currentSegment: segment,
        currentLineIndex: 0,
        displayedLines,
        typingRefs: new Map(),
        pendingSideEffects: [
          { type: 'startTyping', target: 0, delay: 0 }
        ]
      },
      lineStates
    })
  }

  /**
   * 清除片段相关的行状态
   */
  private _clearSegmentLineStates(segment: ScriptSegment): void {
    const lineStates = stateStore._internalLineStates
    // 清除该片段的所有行状态
    segment.lines.forEach((_, index) => {
      const lineId = `${segment.id}-${index}`
      lineStates.delete(lineId)
    })
  }

  /**
   * 创建 DisplayedLine 数组
   */
  private _createDisplayedLines(segment: ScriptSegment): DisplayedLine[] {
    const lineStates = stateStore._internalLineStates
    return segment.lines.map((line, index) => {
      const lineId = `${segment.id}-${index}`
      // 从 lineStates 读取状态，如果不存在则默认为 'pending'
      // 由于已经清除了该片段的状态，这里应该总是 'pending'
      const status = lineStates.get(lineId) || 'pending'
      return {
        ...line,
        id: lineId,
        status,
        // 清除 selectedChoiceIndex（如果存在）
        selectedChoiceIndex: undefined
      }
    })
  }
}

// 单例
export const navigationService = new NavigationService()

