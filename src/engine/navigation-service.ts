/**
 * 导航服务
 *
 * 管理片段间的导航、时间匹配和调用栈。
 * 所有状态通过 stateStore 管理，不持有独立状态。
 */

import type { DisplayedLine, LineStatus, ScriptSegment } from "@/types";
import { segmentLoader } from "./segment-loader";
import { segmentRegistry } from "./segment-registry";
import { stateStore } from "./state-store";

class NavigationService {
  private callStack: string[] = [];
  private readonly maxCallDepth = 50;

  /** 导航到指定片段 */
  async navigateToSegment(segmentId: string): Promise<void> {
    if (this.callStack.includes(segmentId)) {
      throw new Error(`检测到循环引用: ${segmentId}`);
    }
    if (this.callStack.length > this.maxCallDepth) {
      throw new Error(`调用栈深度超过限制: ${this.maxCallDepth}`);
    }

    let segment = segmentRegistry.get(segmentId);
    if (!segment) {
      segment = await segmentLoader.load(segmentId);
    }
    if (!segment) {
      console.warn(`未找到片段: ${segmentId}`);
      return;
    }

    this.callStack.push(segmentId);
    this.loadSegment(segment);
  }

  /** 导航到时间对应的片段 */
  async navigateToTime(time: string): Promise<void> {
    const { gameState } = stateStore._internal;
    const segments = segmentRegistry.getByTime(time);

    let target: ScriptSegment | undefined;
    for (const seg of segments) {
      if (seg.unlockFlags?.length) {
        const unlocked = seg.unlockFlags.every((f) => gameState.unlockedFlags.has(f));
        if (!unlocked) continue;
      }
      if (gameState.viewedSegments.has(seg.id)) continue;
      target = seg;
      break;
    }

    if (target) {
      gameState.viewedSegments.add(target.id);
      stateStore.updateGameState({ currentTime: time });
      await this.navigateToSegment(target.id);
    }
  }

  /** 导航到开始片段 */
  async navigateToStart(): Promise<void> {
    this.callStack = [];
    const { gameState } = stateStore._internal;

    const startSegments = segmentRegistry.getByTime("START");
    let target: ScriptSegment | undefined;

    if (gameState.currentLoop) {
      target = startSegments.find((s) => s.loop === gameState.currentLoop);
    }
    if (!target && startSegments.length > 0) {
      target = startSegments[0];
    }

    if (target) {
      this.loadSegment(target);
    }
  }

  /** 返回上一个片段 */
  returnToPrevious(): void {
    if (this.callStack.length > 1) {
      this.callStack.pop();
    }
  }

  clearCallStack(): void {
    this.callStack = [];
  }

  /** 加载片段到显示状态 */
  private loadSegment(segment: ScriptSegment): void {
    const displayedLines: DisplayedLine[] = segment.lines.map((line, i) => ({
      ...line,
      id: `${segment.id}-${i}`,
      status: "pending" as LineStatus,
    }));

    // 初始化行状态
    const lineStates = new Map<string, LineStatus>();
    for (const line of displayedLines) {
      lineStates.set(line.id, "pending");
    }

    stateStore.batchUpdate({
      displayState: {
        currentSegment: segment,
        currentLineIndex: 0,
        displayedLines,
        typingRefs: new Map(),
        pendingSideEffects: [{ type: "startTyping", target: 0, delay: 0 }],
      },
      lineStates,
    });
  }
}

export const navigationService = new NavigationService();
