import type { ScriptSegmentV2, ContentLine, DisplayedLineV2, LineStatus } from '@/types/script-v2'

/**
 * V2 专用的游戏状态
 * 独立于 V1 的 GameState，支持渐进式迁移
 */
export interface GameStateV2 {
  currentLoop: string
  unlockedFlags: Set<string>
  viewedSegments: Set<string>
  currentTime?: string
  choiceHistory: Array<{
    choiceText: string
    timestamp: number
  }>
  returnToSegment?: string
  returnToLineIndex?: number
}

/**
 * V2 专用的显示状态
 */
export interface DisplayStateV2 {
  currentSegment: ScriptSegmentV2 | null
  currentLineIndex: number
  displayedLines: DisplayedLineV2[]
  typingRefs: Map<number, any>
  pendingSideEffects: Array<{
    type: 'startTyping' | 'focusInput' | 'scrollToLine' | 'removeLine' | 'insertLines'
    target: string | number
    delay?: number
    data?: any
  }>
}

/**
 * 导航服务（V2）
 * 
 * 改进：
 * - 使用片段ID查找
 * - 支持片段引用跳转
 * - 支持返回功能
 */
export class NavigationServiceV2 {
  private callStack: string[] = []
  private maxCallDepth = 50
  
  // V2 专用状态
  private gameState: GameStateV2 = {
    currentLoop: 'P0',
    unlockedFlags: new Set(),
    viewedSegments: new Set(),
    currentTime: undefined,
    choiceHistory: [],
    returnToSegment: undefined,
    returnToLineIndex: undefined
  }
  
  private displayState: DisplayStateV2 = {
    currentSegment: null,
    currentLineIndex: 0,
    displayedLines: [],
    typingRefs: new Map(),
    pendingSideEffects: []
  }
  
  private lineStates: Map<string, LineStatus> = new Map()

  /**
   * 导航到指定片段
   */
  async navigateToSegment(segmentId: string): Promise<void> {
    // 检测循环引用
    if (this.callStack.includes(segmentId)) {
      console.warn(`检测到循环引用: ${segmentId}`)
      throw new Error(`检测到循环引用: ${segmentId}`)
    }
    
    // 检查调用深度
    if (this.callStack.length > this.maxCallDepth) {
      throw new Error(`调用栈深度超过限制: ${this.maxCallDepth}`)
    }

    // TODO: 从注册表获取片段
    // const segment = segmentRegistry.get(segmentId)
    
    // 暂时返回，等待 SegmentRegistry 集成
    console.warn(`NavigationServiceV2: 需要集成 SegmentRegistry 来加载片段 ${segmentId}`)
    return
  }

  /**
   * 导航到指定时间对应的片段
   */
  async navigateToTime(time: string): Promise<void> {
    const segments = [] // TODO: 从注册表获取
    
    let targetSegment: ScriptSegmentV2 | undefined
    for (const segment of segments) {
      if (segment.unlockFlags) {
        const unlocked = segment.unlockFlags.every(flag => 
          this.gameState.unlockedFlags.has(flag)
        )
        if (!unlocked) continue
      }
      
      if (this.gameState.viewedSegments.has(segment.id)) continue
      
      targetSegment = segment
      break
    }

    if (targetSegment) {
      this.gameState.viewedSegments.add(targetSegment.id)
      await this.navigateToSegment(targetSegment.id)
      this.gameState.currentTime = time
    } else {
      console.warn(`未找到时间 ${time} 对应的片段`)
    }
  }

  /**
   * 返回到上一个片段
   */
  async returnToPrevious(): Promise<void> {
    if (this.gameState.returnToSegment) {
      const returnSegmentId = this.gameState.returnToSegment
      const returnLineIndex = this.gameState.returnToLineIndex
      
      this.gameState.returnToSegment = undefined
      this.gameState.returnToLineIndex = undefined
      
      await this.navigateToSegment(returnSegmentId)
      this.displayState.currentLineIndex = returnLineIndex || 0
    } else {
      console.warn('没有返回点')
    }
  }

  /**
   * 导航到开始片段
   */
  async navigateToStart(): Promise<void> {
    // TODO: 从注册表查找 start 片段
    const startSegments: ScriptSegmentV2[] = []
    
    if (this.gameState.currentLoop && startSegments.length > 0) {
      const loopSegment = startSegments.find(seg => seg.loop === this.gameState.currentLoop)
      if (loopSegment) {
        await this.navigateToSegment(loopSegment.id)
        return
      }
    }
    
    if (startSegments.length > 0) {
      await this.navigateToSegment(startSegments[0].id)
    }
  }

  /**
   * 内部方法：导航到片段
   */
  private _navigateToSegment(segment: ScriptSegmentV2): void {
    this._clearSegmentLineStates(segment)
    const displayedLines = this._createDisplayedLines(segment)
    
    // 初始化行状态
    segment.lines.forEach((_, index) => {
      this.lineStates.set(`${segment.id}-${index}`, 'pending')
    })

    // 更新状态
    this.displayState = {
      currentSegment: segment,
      currentLineIndex: 0,
      displayedLines,
      typingRefs: new Map(),
      pendingSideEffects: [
        { type: 'startTyping', target: 0, delay: 0 }
      ]
    }
  }

  /**
   * 清除片段相关的行状态
   */
  private _clearSegmentLineStates(segment: ScriptSegmentV2): void {
    segment.lines.forEach((_, index) => {
      const lineId = `${segment.id}-${index}`
      this.lineStates.delete(lineId)
    })
  }

  /**
   * 创建 DisplayedLine 数组
   */
  private _createDisplayedLines(segment: ScriptSegmentV2): DisplayedLineV2[] {
    return segment.lines.map((line, index) => {
      const lineId = `${segment.id}-${index}`
      const status = this.lineStates.get(lineId) || 'pending'
      return {
        ...line,
        id: lineId,
        status,
        selectedChoiceIndex: undefined
      }
    })
  }
  
  /**
   * 清空调用栈
   */
  clearCallStack(): void {
    this.callStack = []
  }
  
  /**
   * 获取当前游戏状态（只读）
   */
  getGameState(): Readonly<GameStateV2> {
    return this.gameState
  }
  
  /**
   * 获取当前显示状态（只读）
   */
  getDisplayState(): Readonly<DisplayStateV2> {
    return this.displayState
  }
  
  /**
   * 获取行状态映射（只读）
   */
  getLineStates(): Readonly<Map<string, LineStatus>> {
    return this.lineStates
  }
}

// 单例
export const navigationServiceV2 = new NavigationServiceV2()
