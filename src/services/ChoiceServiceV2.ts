import type { ChoiceLineV2 } from "@/types/script-v2";
import type {
  GameStateV2,
  NavigationServiceV2 as NavigationServiceV2Type,
} from "./NavigationServiceV2";

/**
 * 选择服务（V2）
 *
 * 改进：
 * - 使用引用跳转而非内联插入
 * - 支持多片段依次执行
 */
export class ChoiceServiceV2 {
  // 依赖注入，不直接依赖 V1 的 stateStore
  private navigationService: NavigationServiceV2Type;
  private gameState: GameStateV2;
  private displayState: any;

  constructor(navigationService: NavigationServiceV2Type) {
    this.navigationService = navigationService;
    this.gameState = navigationService.getGameState();
    this.displayState = navigationService.getDisplayState();
  }

  /**
   * 处理选择（V2：跳转到目标片段）
   */
  async handleChoice(
    choice: ChoiceLineV2["choices"][0],
    lineId: string,
    choiceIndex: number,
  ): Promise<void> {
    const line = this.displayState.displayedLines.find((l) => l.id === lineId);

    if (!line || line.type !== "choice") {
      return;
    }

    // 检查是否已完成
    const lineStates = this.navigationService.getLineStates();
    const status = lineStates.get(lineId);
    if (status === "completed" || status === "disabled") {
      return;
    }

    // 更新行状态
    lineStates.set(lineId, "completed");

    // 更新游戏状态
    if (choice.setFlag) {
      const flags = new Set(this.gameState.unlockedFlags);
      flags.add(choice.setFlag);
      this.gameState.unlockedFlags = flags;
    }

    // 记录选择历史
    this.gameState.choiceHistory.push({
      choiceText: choice.text,
      timestamp: Date.now(),
    });

    // 更新选中状态
    const lineIndex = this.displayState.displayedLines.findIndex(
      (l) => l.id === lineId,
    );
    const displayedLines = [...this.displayState.displayedLines];
    const lineToUpdate = displayedLines[lineIndex];
    if (lineToUpdate && lineToUpdate.type === "choice") {
      displayedLines[lineIndex] = {
        ...lineToUpdate,
        status: "completed",
        selectedChoiceIndex: choiceIndex,
      };
    }

    this.displayState.displayedLines = displayedLines;
    this.displayState.currentLineIndex = lineIndex;

    // ✅ V2：跳转到目标片段而非插入行
    if (choice.targetSegments.length > 0) {
      const targetSegmentId = choice.targetSegments[0];

      // 保存返回点（如果需要）
      this.gameState.returnToSegment = this.displayState.currentSegment?.id;
      this.gameState.returnToLineIndex = lineIndex + 1;

      // 跳转到目标片段
      await this.navigationService.navigateToSegment(targetSegmentId);
    }
  }
}

// 不导出单例，而是通过构造函数创建实例
