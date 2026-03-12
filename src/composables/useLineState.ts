import type { Ref } from "vue";
import type { DisplayedLineV2, LineStatus } from "@/types";

export interface UseLineStateOptions {
  displayedLines: Ref<DisplayedLineV2[]>;
}

/**
 * 行状态管理 Composable
 * 管理行的状态（pending、active、completed、disabled）
 */
export function useLineState(options: UseLineStateOptions) {
  const { displayedLines } = options;

  /**
   * 标记行为已完成
   */
  const markLineCompleted = (index: number) => {
    if (index >= 0 && index < displayedLines.value.length) {
      const line = displayedLines.value[index];
      if (line && "status" in line) {
        (line as any).status = "completed";
      }
    }
  };

  /**
   * 标记行为已禁用
   */
  const markLineDisabled = (index: number) => {
    if (index >= 0 && index < displayedLines.value.length) {
      const line = displayedLines.value[index];
      if (line && "status" in line) {
        (line as any).status = "disabled";
      }
    }
  };

  /**
   * 标记行为激活状态
   */
  const markLineActive = (index: number) => {
    if (index >= 0 && index < displayedLines.value.length) {
      const line = displayedLines.value[index];
      if (line && "status" in line) {
        (line as any).status = "active";
      }
    }
  };

  /**
   * 标记多个行为已完成
   */
  const markLinesCompleted = (indices: number[]) => {
    for (const index of indices) {
      markLineCompleted(index);
    }
  };

  /**
   * 检查行是否已完成
   */
  const isLineCompleted = (index: number): boolean => {
    if (index >= 0 && index < displayedLines.value.length) {
      const line = displayedLines.value[index];
      if (line && "status" in line) {
        return (
          (line as any).status === "completed" ||
          (line as any).status === "disabled"
        );
      }
    }
    return false;
  };

  /**
   * 检查行是否已禁用
   */
  const isLineDisabled = (index: number): boolean => {
    if (index >= 0 && index < displayedLines.value.length) {
      const line = displayedLines.value[index];
      if (line && "status" in line) {
        return (line as any).status === "disabled";
      }
    }
    return false;
  };

  /**
   * 获取行的状态
   */
  const getLineStatus = (index: number): LineStatus | undefined => {
    if (index >= 0 && index < displayedLines.value.length) {
      const line = displayedLines.value[index];
      if (line && "status" in line) {
        return (line as any).status;
      }
    }
    return undefined;
  };

  return {
    markLineCompleted,
    markLineDisabled,
    markLineActive,
    markLinesCompleted,
    isLineCompleted,
    isLineDisabled,
    getLineStatus,
  };
}
