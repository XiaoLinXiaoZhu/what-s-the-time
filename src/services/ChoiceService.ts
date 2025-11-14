import { stateStore } from '@/stores/StateStore'
import type { ChoiceLine, DisplayedLine, LineStatus, ScriptLine } from '@/types'

/**
 * 选择服务
 * 处理选择分支的逻辑
 */
export class ChoiceService {
  /**
   * 处理选择
   */
  handleChoice(choice: ChoiceLine['choices'][0], lineId: string, choiceIndex: number): void {
    const displayState = stateStore._internalDisplayState
    const line = displayState.displayedLines.find(l => l.id === lineId)

    if (!line || line.type !== 'choice') {
      return
    }

    // 检查是否已完成
    const status = stateStore._internalLineStates.get(lineId)
    if (status === 'completed' || status === 'disabled') {
      return
    }

    // 更新行状态
    stateStore.updateLineState(lineId, 'completed')

    // 更新游戏状态
    if (choice.setFlag) {
      const flags = new Set(stateStore._internalGameState.unlockedFlags)
      flags.add(choice.setFlag)
      stateStore.updateGameState({ unlockedFlags: flags })
    }

    // 记录选择历史
    const choiceHistory = [...stateStore._internalGameState.choiceHistory]
    choiceHistory.push({
      choiceText: choice.text,
      timestamp: Date.now()
    })
    stateStore.updateGameState({ choiceHistory })

    // 插入新行
    const lineIndex = displayState.displayedLines.findIndex(l => l.id === lineId)
    
    // 同步更新 displayedLines 中对应行的状态和选中的选项索引
    const displayedLines = [...displayState.displayedLines]
    const lineToUpdate = displayedLines[lineIndex]
    if (lineToUpdate && lineToUpdate.type === 'choice') {
      displayedLines[lineIndex] = {
        ...lineToUpdate,
        status: 'completed',
        selectedChoiceIndex: choiceIndex
      }
    }
    
    const newLines = this._createDisplayedLines(choice.lines, lineIndex)
    displayedLines.splice(lineIndex + 1, 0, ...newLines)

    // 初始化新行的状态
    const lineStates = new Map<string, LineStatus>()
    newLines.forEach(line => {
      lineStates.set(line.id, 'pending')
    })
    stateStore.updateLineStates(lineStates)

    // 更新显示状态
    stateStore.updateDisplayState({
      displayedLines,
      currentLineIndex: lineIndex + 1,
      pendingSideEffects: [
        { type: 'startTyping', target: lineIndex + 1, delay: 0 }
      ]
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
export const choiceService = new ChoiceService()

