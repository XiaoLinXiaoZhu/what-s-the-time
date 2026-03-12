/**
 * 时间选择服务
 *
 * 处理 timeChoice 行的匹配逻辑。
 * 匹配后直接替换为 timeDisplay 行并插入后续内容。
 */

import type { DisplayedLine, LineStatus } from "@/types";
import { useSystemTime } from "@/composables/useSystemTime";
import { stateStore } from "./state-store";

class TimeChoiceService {
  /** 处理时间选择 */
  handleTimeChoice(time: string, lineId: string): void {
    const { displayState, gameState } = stateStore._internal;

    const line = displayState.displayedLines.find((l) => l.id === lineId);
    if (!line || line.type !== "timeChoice") return;

    const status = stateStore.lineStates.get(lineId);
    if (status === "completed" || status === "disabled") return;

    // 获取系统时间用于 NOW 匹配
    const { getCurrentSystemTime } = useSystemTime();
    const systemTime = getCurrentSystemTime();

    // 查找匹配的选项
    let matched: (typeof line)["choices"][0] | null = null;
    for (const choice of line.choices) {
      if (choice.time === "*") {
        matched = choice;
        break;
      }
      if (choice.time === "NOW" && time === systemTime) {
        matched = choice;
        break;
      }
      if (choice.time === time) {
        matched = choice;
        break;
      }
    }

    if (!matched) return;

    // 更新行状态
    stateStore.updateLineState(lineId, "completed");

    // 设置 flag
    if (matched.setFlag) {
      const flags = new Set(gameState.unlockedFlags);
      flags.add(matched.setFlag);
      stateStore.updateGameState({ unlockedFlags: flags });
    }

    // 记录选择历史
    gameState.choiceHistory.push({
      choiceText: `时间: ${time}`,
      timestamp: Date.now(),
    });

    // 替换 timeChoice 为 timeDisplay
    const lineIndex = displayState.displayedLines.findIndex((l) => l.id === lineId);
    if (lineIndex === -1) return;

    const displayedLines = [...displayState.displayedLines];
    displayedLines[lineIndex] = {
      type: "timeDisplay",
      value: time,
      id: lineId,
      status: "completed" as LineStatus,
    } as DisplayedLine;

    // 插入目标片段的内容行
    if (matched.targetSegments.length > 0) {
      const insertIndex = lineIndex + 1;
      const newLines = this.createInsertedLines(matched.targetSegments, insertIndex);
      displayedLines.splice(insertIndex, 0, ...newLines);

      // 初始化新行状态
      const lineStates = new Map<string, LineStatus>();
      for (const l of newLines) {
        lineStates.set(l.id, "pending");
      }
      stateStore.updateLineStates(lineStates);

      stateStore.updateDisplayState({
        displayedLines,
        currentLineIndex: insertIndex,
        pendingSideEffects: [{ type: "startTyping", target: insertIndex, delay: 0 }],
      });
    } else {
      stateStore.updateDisplayState({ displayedLines });
    }
  }

  private createInsertedLines(
    _targetSegments: string[],
    _baseIndex: number,
  ): DisplayedLine[] {
    // TODO: 从 segmentRegistry 加载目标片段的行
    // 目前返回空数组，等待片段加载集成
    return [];
  }
}

export const timeChoiceService = new TimeChoiceService();
