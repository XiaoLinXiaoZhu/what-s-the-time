import { reactive, readonly } from 'vue'
import type { GameState, DisplayState, LineStatus } from '@/types'

/**
 * 统一的状态管理 Store
 * 提供单一数据源和统一更新接口
 */
class StateStore {
  // 游戏状态
  private _gameState = reactive<GameState>({
    currentLoop: 'P0',
    unlockedFlags: new Set<string>(),
    viewedSegments: new Set<string>(),
    currentTime: undefined,
    choiceHistory: []
  })

  // 显示状态
  private _displayState = reactive<DisplayState>({
    currentSegment: null,
    currentLineIndex: 0,
    displayedLines: [],
    typingRefs: new Map(),
    pendingSideEffects: []
  })

  // 行状态映射
  private _lineStates = reactive<Map<string, LineStatus>>(new Map())

  // Getters (只读访问)
  get gameState(): Readonly<GameState> {
    return readonly(this._gameState) as Readonly<GameState>
  }

  get displayState(): Readonly<DisplayState> {
    return readonly(this._displayState) as Readonly<DisplayState>
  }

  get lineStates(): Readonly<Map<string, LineStatus>> {
    return readonly(this._lineStates) as Readonly<Map<string, LineStatus>>
  }

  // 内部访问（用于 Service 层修改）
  get _internalGameState(): GameState {
    return this._gameState
  }

  get _internalDisplayState(): DisplayState {
    return this._displayState
  }

  get _internalLineStates(): Map<string, LineStatus> {
    return this._lineStates
  }

  /**
   * 更新游戏状态
   */
  updateGameState(updates: Partial<GameState>): void {
    Object.assign(this._gameState, updates)
  }

  /**
   * 更新显示状态
   */
  updateDisplayState(updates: Partial<DisplayState>): void {
    Object.assign(this._displayState, updates)
  }

  /**
   * 更新单个行状态
   */
  updateLineState(lineId: string, status: LineStatus): void {
    this._lineStates.set(lineId, status)
  }

  /**
   * 批量更新行状态
   */
  updateLineStates(updates: Map<string, LineStatus>): void {
    updates.forEach((status, lineId) => {
      this._lineStates.set(lineId, status)
    })
  }

  /**
   * 批量更新多个状态
   */
  batchUpdate(updates: {
    gameState?: Partial<GameState>
    displayState?: Partial<DisplayState>
    lineStates?: Map<string, LineStatus>
  }): void {
    if (updates.gameState) {
      this.updateGameState(updates.gameState)
    }
    if (updates.displayState) {
      this.updateDisplayState(updates.displayState)
    }
    if (updates.lineStates) {
      this.updateLineStates(updates.lineStates)
    }
  }

  /**
   * 重置所有状态
   */
  reset(): void {
    this._gameState = reactive<GameState>({
      currentLoop: 'P0',
      unlockedFlags: new Set<string>(),
      viewedSegments: new Set<string>(),
      currentTime: undefined,
      choiceHistory: []
    })
    this._displayState = reactive<DisplayState>({
      currentSegment: null,
      currentLineIndex: 0,
      displayedLines: [],
      typingRefs: new Map(),
      pendingSideEffects: []
    })
    this._lineStates.clear()
  }
}

// 单例
export const stateStore = new StateStore()

