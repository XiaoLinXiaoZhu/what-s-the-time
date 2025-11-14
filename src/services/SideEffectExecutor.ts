import { watchEffect, nextTick } from 'vue'
import { stateStore } from '@/stores/StateStore'
import { INPUT_FOCUS_DELAY } from '@/constants'

/**
 * 副作用执行器
 * 响应状态变化自动执行副作用
 */
export class SideEffectExecutor {
  private initialized = false

  /**
   * 初始化副作用执行器
   */
  init(): void {
    if (this.initialized) {
      return
    }

    // 监听 pendingSideEffects 变化
    watchEffect(() => {
      const effects = stateStore.displayState.pendingSideEffects
      if (effects.length > 0) {
        nextTick(() => {
          effects.forEach(effect => {
            this._execute(effect)
          })
          // 清空已执行的副作用
          stateStore.updateDisplayState({ pendingSideEffects: [] })
        })
      }
    })

    this.initialized = true
  }

  /**
   * 执行副作用
   */
  private _execute(effect: { type: string; target: string | number; delay?: number; data?: any }): void {
    const delay = effect.delay || 0

    if (delay > 0) {
      setTimeout(() => {
        this._executeEffect(effect)
      }, delay)
    } else {
      this._executeEffect(effect)
    }
  }

  /**
   * 执行具体的副作用
   */
  private _executeEffect(effect: { type: string; target: string | number; data?: any }): void {
    switch (effect.type) {
      case 'startTyping':
        this._startTyping(Number(effect.target))
        break
      case 'focusInput':
        this._focusInput(Number(effect.target))
        break
      case 'scrollToLine':
        this._scrollToLine(Number(effect.target))
        break
      case 'removeLine':
        // 已在 Service 层处理
        break
      case 'insertLines':
        // 已在 Service 层处理
        break
      default:
        console.warn(`未知副作用类型: ${effect.type}`)
    }
  }

  /**
   * 启动打字效果
   */
  private _startTyping(lineIndex: number): void {
    const displayState = stateStore._internalDisplayState
    const typingComponent = displayState.typingRefs.get(lineIndex)
    if (typingComponent && typeof typingComponent.startTyping === 'function') {
      typingComponent.startTyping()
    }
  }

  /**
   * 聚焦输入框
   */
  private _focusInput(_lineIndex: number): void {
    setTimeout(() => {
      // TimeInput 组件会自动处理聚焦
      // 这里可以添加额外的聚焦逻辑
    }, INPUT_FOCUS_DELAY)
  }

  /**
   * 滚动到指定行
   */
  private _scrollToLine(_lineIndex: number): void {
    // 可以添加滚动逻辑
  }
}

// 单例
export const sideEffectExecutor = new SideEffectExecutor()

