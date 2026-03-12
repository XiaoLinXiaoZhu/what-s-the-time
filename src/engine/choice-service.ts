/**
 * 选择服务
 *
 * 处理 choice 行的选择逻辑。
 * 选择后跳转到目标片段（引用式，非内联）。
 */

import type { ChoiceLine, DisplayedLine, LineStatus } from "@/types";
import { navigationService } from "./navigation-service";
import { stateStore } from "./state-store";

class ChoiceService {
  /** 处理选择 */
  async handleChoice(
    choice: ChoiceLine["choices"][0],
    lineId: string,
    choiceIndex: number,
  ): Promise<void> {
    const { displayState, gameState, lineStates } = stateStore._internal;

    const status = lineStates.get(lineId);
    if (status === "completed" || status === "disabled") return;

    const lineIndex = displayState.displayedLines.findIndex((l) => l.id === lineId);
    if (lineIndex === -1) return;

    // 标记行为已完成
    stateStore.updateLineState(lineId, "completed");

    // 设置 flag
    if (choice.setFlag) {
      const flags = new Set(gameState.unlockedFlags);
      flags.add(choice.setFlag);
      stateStore.updateGameState({ unlockedFlags: flags });
    }

    // 记录选择历史
    gameState.choiceHistory.push({
      choiceText: choice.text,
      timestamp: Date.now(),
    });

    // 更新选中状态
    const displayedLines = [...displayState.displayedLines];
    const line = displayedLines[lineIndex];
    if (line) {
      displayedLines[lineIndex] = {
        ...line,
        status: "completed" as LineStatus,
        selectedChoiceIndex: choiceIndex,
      } as DisplayedLine;
    }

    stateStore.updateDisplayState({
      displayedLines,
      currentLineIndex: lineIndex,
    });

    // 跳转到目标片段
    if (choice.targetSegments.length > 0) {
      await navigationService.navigateToSegment(choice.targetSegments[0]);
    }
  }
}

export const choiceService = new ChoiceService();
