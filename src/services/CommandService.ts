import { stateStore } from '@/stores/StateStore'
import { navigationService } from './NavigationService'
import type { CommandLine, ScriptLine, DisplayedLine } from '@/types'

/**
 * 命令服务
 * 处理命令行的执行
 */
export class CommandService {
  /**
   * 执行命令
   */
  handleCommand(command: CommandLine, lineIndex: number): void {
    const { command: cmd, params } = command

    switch (cmd) {
      case 'setFlag': {
        const flag = params.flag as string
        if (flag) {
          const flags = new Set(stateStore._internalGameState.unlockedFlags)
          flags.add(flag)
          stateStore.updateGameState({ unlockedFlags: flags })
        }
        break
      }

      case 'unsetFlag': {
        const flag = params.flag as string
        if (flag) {
          const flags = new Set(stateStore._internalGameState.unlockedFlags)
          flags.delete(flag)
          stateStore.updateGameState({ unlockedFlags: flags })
        }
        break
      }

      case 'jump': {
        // 支持通过 segmentId 或 time 跳转
        const segmentId = params.segmentId as string | undefined
        const time = params.time as string | undefined

        if (segmentId) {
          navigationService.navigateToSegment(segmentId)
        } else if (time) {
          navigationService.navigateToTime(time)
        }
        break
      }

      case 'end': {
        // 结束游戏：可以显示结束信息
        const message = params.message as string | undefined

        if (message) {
          const endLine: ScriptLine = {
            type: 'dialogue',
            text: message
          }

          const displayState = stateStore._internalDisplayState
          const displayedLines = [...displayState.displayedLines]
          const newLine: DisplayedLine = {
            ...endLine,
            id: `end-${Date.now()}`,
            status: 'pending'
          }
          displayedLines.splice(lineIndex + 1, 0, newLine)

          stateStore.updateDisplayState({
            displayedLines,
            currentLineIndex: lineIndex + 1,
            pendingSideEffects: [
              { type: 'startTyping', target: lineIndex + 1, delay: 0 }
            ]
          })
        }
        break
      }

      default:
        console.warn(`未知命令: ${cmd}`)
    }
  }
}

// 单例
export const commandService = new CommandService()

