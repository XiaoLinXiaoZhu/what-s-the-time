/**
 * 命令服务
 *
 * 处理 command 行的执行逻辑。
 */

import type { CommandLine } from "@/types";
import { navigationService } from "./navigation-service";
import { stateStore } from "./state-store";

class CommandService {
  /** 执行命令 */
  handleCommand(command: CommandLine, lineIndex: number): void {
    const { displayState } = stateStore._internal;
    const line = displayState.displayedLines[lineIndex];
    if (line) {
      stateStore.updateLineState(line.id, "completed");
    }

    switch (command.command) {
      case "setFlag": {
        const flags = new Set(stateStore._internal.gameState.unlockedFlags);
        flags.add(command.params.flag);
        stateStore.updateGameState({ unlockedFlags: flags });
        break;
      }
      case "unsetFlag": {
        const flags = new Set(stateStore._internal.gameState.unlockedFlags);
        flags.delete(command.params.flag);
        stateStore.updateGameState({ unlockedFlags: flags });
        break;
      }
      case "jump":
        navigationService.navigateToSegment(command.params.segmentId);
        break;
      case "end":
        // 游戏结束
        break;
      case "return":
        navigationService.returnToPrevious();
        break;
    }

    // 自动推进到下一行
    const nextIndex = lineIndex + 1;
    if (nextIndex < displayState.displayedLines.length) {
      stateStore.updateDisplayState({
        currentLineIndex: nextIndex,
        pendingSideEffects: [{ type: "startTyping", target: nextIndex, delay: 0 }],
      });
    }
  }
}

export const commandService = new CommandService();
