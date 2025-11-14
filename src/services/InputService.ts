import { stateStore } from '@/stores/StateStore'
import { navigationService } from './NavigationService'
import { timeChoiceService } from './TimeChoiceService'
import { lineConversionService } from './LineConversionService'

/**
 * 输入服务
 * 处理时间输入的逻辑
 */
export class InputService {
  /**
   * 处理输入完成
   */
  handleInputComplete(time: string, lineId: string): void {
    const displayState = stateStore._internalDisplayState
    const lineIndex = displayState.displayedLines.findIndex(l => l.id === lineId)

    if (lineIndex === -1) {
      return
    }

    // 将 input 行转换为 timeDisplay 行（显示输入的值）
    this._convertInputToTimeDisplay(lineIndex, time)

    // 检查下一行是否是 timeChoice
    const nextLine = displayState.displayedLines[lineIndex + 1]
    if (nextLine?.type === 'timeChoice') {
      // 如果下一行是 timeChoice，直接使用刚才输入的时间处理 timeChoice
      timeChoiceService.handleTimeChoice(time, nextLine.id, lineId)
    } else {
      // 否则，执行原来的逻辑：查找匹配的片段
      navigationService.navigateToTime(time)
    }
  }

  /**
   * 将 input 行转换为 timeDisplay 行
   * 使用统一的转换服务，保持系统一致性
   */
  private _convertInputToTimeDisplay(lineIndex: number, time: string): void {
    lineConversionService.convertInputToTimeDisplay(lineIndex, time)
  }
}

// 单例
export const inputService = new InputService()

