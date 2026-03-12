import type { Ref } from "vue";
import type { DisplayedLine, LineStatus } from "@/types";

export interface UseLineStateOptions {
  displayedLines: Ref<DisplayedLine[]>;
}

/**
 * 行状态管理 Composable
 */
export function useLineState(options: UseLineStateOptions) {
  const { displayedLines } = options;

  const markLineCompleted = (index: number) => {
    const line = displayedLines.value[index];
    if (line) line.status = "completed";
  };

  const markLineDisabled = (index: number) => {
    const line = displayedLines.value[index];
    if (line) line.status = "disabled";
  };

  const markLineActive = (index: number) => {
    const line = displayedLines.value[index];
    if (line) line.status = "active";
  };

  const markLinesCompleted = (indices: number[]) => {
    for (const i of indices) markLineCompleted(i);
  };

  const isLineCompleted = (index: number): boolean => {
    const line = displayedLines.value[index];
    return line?.status === "completed" || line?.status === "disabled";
  };

  const isLineDisabled = (index: number): boolean => {
    return displayedLines.value[index]?.status === "disabled";
  };

  const getLineStatus = (index: number): LineStatus | undefined => {
    return displayedLines.value[index]?.status;
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
